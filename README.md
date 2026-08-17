# Atlants-Gym
OSC Backend Training [Evaluation Project]

---
# For the team:
first clone the repo:
```bash
git clone <the repo link>
```
create `.env` and use the `.env.example` as template

download the package
```bash
npm install
```
run server:
```bash
nodemon --exec tsx src/server.ts
```
when you done:
```bash
git add .
git commit -m "your commit message"
git push
```
before evertime you start:
```bash
git pull
```

---
# TO DO:
- [ ] make booking model. `kareem`
- [x] make user model. `kamel`
- [ ] make class session model `farah`
- [ ] CRUD 
- [ ] user login and register `kamel`
- [ ] Password hashing (with authentication in middleware) `kamel`
- [ ] api documentation with sawgger `everone do his own documentation`
- [ ] deployment
### FUNCTION:
- [ ] user login , register `kamel` (almost done, login need somefixes)
- [ ] trainer :
	- [ ] create own session `farah`
	- [ ] delete own session `farah`
	- [ ] edit (update) own session `farah`
	- [ ] view booking for their session `kareem`
- [ ] member:
	- [ ] read class session `farah`
	- [ ] book available class session `kareem`
	- [ ] cancel(delete) own booking `kareem`
	- [ ] when the class session is full add him to the waitlist  (what the waitlist do) `kareem`
---
# The Task:

## Minimum Requirements (Applies to Every Idea)

Whichever idea is picked, the final project must include all of the following:

- Built with **Node.js**, **TypeScript**, and **Express.js** 
- Connected to **MongoDB** using **Mongoose**, with at least **2 schemas/models**
- Full **CRUD** operations on at least one resource
- **User authentication** — register and login endpoints
- Password hashing with **bcrypt** 
- **JWT-based authentication** with protected routes
- At least **one middleware** (auth guard, logger, or validator)
- Environment variables managed with **dotenv** 
- API documented with **Swagger** 
- Deployed to a live cloud URL (**Render** / **Railway**)
- Source code pushed to a **public GitHub repository** 

---
## User Types
- Member
- Trainer

---

## Core Entities

| Entity           | Fields                                                     |
| ---------------- | ---------------------------------------------------------- |
| **User**         | Full Name, Email, Password, Role (Member / Trainer)        |
| **ClassSession** | Title, Trainer, Time Slot, Capacity                        |
| **Booking**      | Session reference, Member, Status (`booked` / `cancelled`) |

---

## Roles & Permissions

### Trainer
- Register and log in
- Create, edit, and delete their own class sessions
- View bookings for their own sessions
- Cannot manage other trainers' sessions

### Member
- Register and log in
- Browse available class sessions
- Book a spot in a session
- Cancel their own bookings
- Cannot manage class sessions

---

## Authentication & Authorization

**Authentication**
- User registration & login
- Password hashing with `bcrypt`
- JWT-based authentication
- Protected routes

**Authorization**
- Role-based access control (Member / Trainer)
- Only a session's trainer can edit or delete that session
- Members can only manage their own bookings

---

## CRUD Operations

| Role        | Operations                              |
| ----------- | --------------------------------------- |
| **Trainer** | Create / update / delete class sessions |
| **Member**  | Create bookings, cancel own bookings    |

---

## Search & Filtering

Support searching and filtering by:
- Class title
- Trainer name
- Day / time slot
- Availability (spots remaining)

## Validation

- Valid email format
- Strong password
- Capacity must be a positive integer
- Sessions can only be created for future time slots
- Required fields present

---

## Bonus Features (Optional)

- Waitlist when a session is full
- Pagination
- Dashboard statistics (busiest classes, attendance rate)
- Logging middleware 
- Soft delete for class sessions

---

## Business Rules

- A booking cannot be made once a session reaches full capacity
- A member cannot book the same session twice
- Total booked seats must never exceed session capacity
- A cancelled booking automatically frees a spot in the session
- A trainer cannot delete a session if it has confirmed bookings
- Sessions can only be booked for future time slots
