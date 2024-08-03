# ticket-management-service

## Start DB
> sudo docker run --name mongodb -d -p 27017:27017 -v $(pwd)/data:/data/db mongo:4.4

## Start Service
> npm i nodemon --global && nodemon server.js


### Register
curl -H 'Content-Type: application/json' \
      -d '{ "name":"Rahul","email":"rahul@gmail.com", "password": "test@123"}' \
      -X POST \
      http://localhost:8801/users

### Login
curl -H 'Content-Type: application/json' \
      -d '{ "email":"rahul@gmail.com", "password": "test@123"}' \
      -X POST \
      http://localhost:8801/auth/login

### Create Ticket
curl -H 'Content-Type: application/json' \
	 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFkZDgyY2UyY2E5OWVmNWJhM2ZkNWUiLCJuYW1lIjoiUmFodWwiLCJlbWFpbCI6InJhaHVsQGdtYWlsLmNvbSIsImlhdCI6MTcyMjY3NDAyOSwiZXhwIjoxNzIyNjc3NjI5fQ.VFrWuX0LGxdFHgSHj19qwVHFYVpPaCpUjAGUr0cwhZc" \
      -d '{ "title":"ticket 3", "description": "test ticket", "venue": "here", "status": "in progress", "priority": "high", "dueDate": "2024-09-01T18:00:00Z"}' \
      -X POST \
      http://localhost:8801/tickets

### Assign ticket to User
curl -H 'Content-Type: application/json' \
	 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFkZDgyY2UyY2E5OWVmNWJhM2ZkNWUiLCJuYW1lIjoiUmFodWwiLCJlbWFpbCI6InJhaHVsQGdtYWlsLmNvbSIsImlhdCI6MTcyMjY3NDAyOSwiZXhwIjoxNzIyNjc3NjI5fQ.VFrWuX0LGxdFHgSHj19qwVHFYVpPaCpUjAGUr0cwhZc" \
      -d '{ "userId":"66add82ce2ca99ef5ba3fd5e"}' \
      -X POST \
      http://localhost:8801/tickets/66ade81e56f91749e0fe2984/assign

### Get Ticket Details
curl -H 'Content-Type: application/json' \
	 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFkZDgyY2UyY2E5OWVmNWJhM2ZkNWUiLCJuYW1lIjoiUmFodWwiLCJlbWFpbCI6InJhaHVsQGdtYWlsLmNvbSIsImlhdCI6MTcyMjY3NDAyOSwiZXhwIjoxNzIyNjc3NjI5fQ.VFrWuX0LGxdFHgSHj19qwVHFYVpPaCpUjAGUr0cwhZc" \
      -X GET \
      http://localhost:8801/tickets/66ade81e56f91749e0fe2984

curl -H 'Content-Type: application/json' \
	 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFkZDgyY2UyY2E5OWVmNWJhM2ZkNWUiLCJuYW1lIjoiUmFodWwiLCJlbWFpbCI6InJhaHVsQGdtYWlsLmNvbSIsImlhdCI6MTcyMjY3NDAyOSwiZXhwIjoxNzIyNjc3NjI5fQ.VFrWuX0LGxdFHgSHj19qwVHFYVpPaCpUjAGUr0cwhZc" \
      -X GET \
      http://localhost:8801/tickets/analytics