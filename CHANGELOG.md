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

- Dashboard UI
- Profile page UI
- Ability to edit/add information to patient profile

Improvements:

- Redirect to login page when session expires
- Register page now has input fields for gender and health card number

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

## [0.4.0] - 2022-02-23

### Web Application

New Features:

- Create Doctor account added to sign-up page
- Doctor Dashboard (can't be accessed without admin approval)
- Admin Dashboard
- Admin can approve, decline, and deactivate Doctor Accounts
- Book Appointment form UI implemented (not fully functional yet)

Improvements:

- Landing page sign-in and create account buttons are bigger and disappear when a user is logged in
- Sign-up form UI improved
- Sign-up page includes radio buttons to specify user type
- Log-in form UI improved
- Log-in form includes radio buttons to specify user type
- Logout destroys session cookie
- Improvements to form validation for all forms

### Backend API

New Features:

- Doctor registration
- Admins can now approve/reject newly registered doctor accounts
- Doctor availability to determine when Patients can book appointments
- Patients can now book and cancel appointments
- System ensures that each booked appointment does not cause conflicts
- API documentation with all end-points

Improvements:

- Modified Availability model to reflect Doctor's availability for each day of the week
- Replaced role-specific login and logout endpoints with universal ones

## [0.5.0] - 2022-03-22

### Web Application

New Features:

- Ability for a patient to book an appointment with a doctor of their choosing
- A patient can now view all current appointments 
- Appointments can be cancelled or rescheduled by a patient

Improvements:

-  Added working links in the header

### Backend API

New Features:

- Appointment booking
- Appointment rescheduling
- Appointment cancellation
- Patients can now check their appointments
- Doctor can now check their appointments
- Self-assessment functionality
- Added common medical symptoms to be used in Self-Assessments

Improvements:

- Updated Availability model to properly store start and end times
- Enforced consistent formatting

Bug Fixes:

- Resolved minor routing issues

## [0.5.1] - 2022-03-30

### Web Application

New Features:

- Added patient self-assessment after booking appointment
- Added ability for a doctor to view all appointments with an option to cancel

## [0.6.0] - 2022-04-13

### Backend API

New Features:

- Doctors can issue prescriptions to patients
- Patients can request prescriptions from doctors
- Doctors can approve or deny requested prescriptions
- Doctors can view prescriptions issued by them
- Patients can view prescriptions they received and requested

Improvements:

- Added status field to the Prescription model
