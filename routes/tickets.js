var express = require('express');
var User = require('../models/user');
var Ticket = require('../models/ticket');
const authUtils = require('../utils/auth');

var router = express.Router();

router.post('/', authUtils.authenticateToken, async function (req, res) {
	const user = req.user;

	const now = new Date();
	const dueDate = new Date(req.body.dueDate);

	if (now.getTime() > dueDate.getTime()) {
		return res.send('dueDate can not be from past.')
	}

	const newTicket = await Ticket.create({
		...req.body,
		createdBy: user.userId,
		assignedUsers: []
	});

	return res.send(newTicket);
});

router.post('/:ticketId/assign', authUtils.authenticateToken, async function (req, res) {
	const ticketId = req.params.ticketId;
	const { userId: assignTo } = req.body;

	const ticket = await Ticket.findOne({ _id: ticketId });
	const assignToUser = await User.findOne({ _id: assignTo });

	let assignedUsers = ticket.assignedUsers;

	if (!assignToUser) {
		return res.send({ message: 'User does not exist' });
	}

	if (ticket.status == 'closed') {
		return res.send({ message: 'Cannot assign users to a closed ticket' });
	}

	if (assignedUsers.includes(assignTo)) {
		return res.send({ message: 'User already assigned' });
	}

	if (assignedUsers.length >= 5) {
		return res.send({ message: 'User assignment limit reached' });
	}

	if (ticket.createdBy != req.user.userId) {
		return res.sendStatus(401);
	}

	assignedUsers.push(mongoose.Types.ObjectId(assignTo));

	const result = await Ticket.updateOne({ _id: ticketId }, { assignedUsers: assignedUsers });
	console.log(result)

	return res.send({ message: 'User assigned successfully' });
});

router.get('/:ticketId', authUtils.authenticateToken, async function (req, res) {
	const ticketId = req.params.ticketId;

	const tickets = await Ticket.aggregate([
		{
			'$match': {
				'$expr': {
					'_id': ticketId
				}
			}
		}, {
			'$lookup': {
				'from': 'users',
				'localField': 'assignedUsers',
				'foreignField': '_id',
				'as': 'assignedUsers'
			}
		}, {
			'$addFields': {
				'statistics': {
					'totalAssigned': {
						'$size': '$assignedUsers'
					},
					'status': '$status'
				}
			}
		}, {
			'$unset': [
				'__v',
				'assignedUsers.__v',
				'assignedUsers.password'
			]
		}
	]);

	return res.send(tickets);
});

router.get('/analytics', authUtils.authenticateToken, async function (req, res) {
	/*
	startDate : Filter tickets created after this date
	endDate : Filter tickets created before this date
	status : Filter tickets by status (e.g., "closed")
	priority : Filter tickets by priority (e.g., "high")
	type : Filter tickets by type (e.g., "concert")
	*/

	// TODO: Add Filters, remaining statistics (partially completed)
	const result = await Ticket.aggregate([
		{
			'$group': {
				'_id': null,
				'tickets': {
					'$push': '$$ROOT'
				}
			}
		}, {
			'$addFields': {
				'totalTickets': {
					'$size': '$tickets'
				}
			}
		}
	]);

	return res.send(result);
});

module.exports = router;