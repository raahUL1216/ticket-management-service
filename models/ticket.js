const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	title: String,
	description: String,
	type: String,
	venue: String,
	status: String,
	priority: String,
	dueDate: Date,
	createdBy: String,
	assignedUsers: [mongoose.Schema.Types.ObjectId]
});

TicketSchema.set('toJSON', { versionKey: false }); 

module.exports = mongoose.model('Ticket', TicketSchema);