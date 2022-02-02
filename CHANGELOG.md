# CHANGELOG

All changes to this project will be documented in this file.

## [0.1.0] - 2021-11-15

### Web Application

New Features:

- Angular app
- Sign-in page component and page view
- Dashboard component and page view
- Create-account component and page view

### Backend API

New Features:

- Configured server instance
- Two new end-points: 'GET /', 'GET /ping'
- Error handling middleware
- Logger
- Database connection through Typeorm
- Models: Admin, Patient, Doctor, Appointment, Self-assessment, Symptom, Task, Prescription

## [0.2.0] - 2021-12-07

### Web Application

New Features:

- Authentication and user registration
- Services to make calls to API. Used to authenticate logins and add users to the database
- Authentication guards to activate routes if the user is logged in
- Dashboard page with logout button to end the session

### Backend API

New Features:

- User Sessions
- Authentication and Authorization
- Patient registration end-point
- Patient login and logout end-points
- Patient profile end-point (requires Patient role)
- Admin registration end-point (requires Admin role)
- Admin login and logout end-points
- Admin profile end-point (requires Admin role)

Improvements:

- Updated Models
- Improved Error Handling and Logging

## [0.3.0] - 2022-02-01

### Web Application

New Features:

-

### Backend API

New Features:

- Doctor service layer
- Doctor login and logout end-points
- Doctor get profile information end-point
- Patient change password end-point

Improvements:

- Added gender and health card number fields to the Patient profile

Bug Fixes:

- Resolved CORS policy issue
