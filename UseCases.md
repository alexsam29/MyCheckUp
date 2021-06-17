## Use Case Description's

### 1 System Use Case Name: Add Clinic
1.2 **Author**: Nikita Mezhenskyi\
\
1.3 **Description of the System Use Case**:\
An Admin will use the system to add a clinic.\
\
1.4 **Actor(s)**: Admin\
\
1.5 **System Use Case Preconditions**:
-	The system is online and working.
-	The Admin has logged in to use the system.

1.6 **System Use Case Successful Post Conditions**:
-	An Admin has successfully added a clinic information to the system.
-	An Admin can create doctor accounts for the clinic.
-	Patients can select the newly added clinic as their clinic in the system.

1.7 **Applicable Business Rules**:
-	The clinic representatives must sign a partnership contract.
-	The clinic representatives must provide all necessary documents with the information about the clinic.
-	An Admin must receive an approval from the management before adding a clinic.

1.8 **Main Flow**:
|   | Actor(s): Admin|           System              |
|---| ---------------|-------------------------------|
| 1 | Requests to add a new clinic to the system. | Asks to enter name, address, and postal code.|
| 2 | Enters name, address, and postal code.    | Validates the clinic information (*1). If valid, asks to enter a clinic representative contact information.|
| 3 | Enters full name, phone number, email, position.| Validates the contact information (*2). Asks if there are any other clinic representatives.|
| 4 | Repeats step 3 until all clinic representatives have been added.  | Asks to proceed.|
| 5 | Proceeds (*3). | Displays all entered information. Asks to confirm. | 
| 6 | Confirms (*4). | Saves the clinic to the database. Displays a confirmation message to the Admin and sends a confirmation email to clinic representatives.| 

1.9 **Alternative Flow**: 
|   | Alternative Flow | Description |
|---|------------------|-------------| 
| A1| The provided clinic information is invalid. | System asks to re-enter the information or cancel.| 
| A2| The provided contact information is invalid. | System asks to re-enter the information or cancel. |
| A3| Admin rejects when asked to proceed. | System returns to the main menu. |
| A4| Admin rejects when asked to confirm. | System allows Admin to edit the information or go back to the main menu.| 

 ------------------------------------------------------------------------------------------------------------------------------------
 
### 2 System Use Case Name: Admin Add Doctor's Account
2.2 **Author**: Atif Ali\
\
2.3 **Description of the System Use Case**:\
This system will be adding a doctor’s account and producing a link that will be sent to the doctor’s email to access their created account.\
\
2.4 **Actor(s)**: Admin\
\
2.5 **System Use Case Preconditions**:
-	Admin must be logged in to the system.
- Admin must have doctor’s details from the clinic.

2.6 **System Use Case Successful Post Conditions**:
-	The system creates a new a doctor’s account.

2.7 **Applicable Business Rules**:
-	Clinic must provide proof of a valid Licentiate of the Medical Council of Canada (LMCC) for that doctor.

2.8 **Main Flow**:
|   | Actor(s): Admin|           System              |
|---| ---------------|-------------------------------|
| 1 | Request to add a doctor’s account. | System will ask the admin to choose the clinic the doctor is associated with.|
| 2 | Select the name of the clinic the doctor is associated with. | Displays a form to provide the doctor’s details. |
| 3 | Enter doctor’s details.| Validate doctor’s details if is associated with the clinic (*1). If validated, ask the admin to type username.|
| 4 | Choose username for that doctor(first letter of first name and last name plus month of birth)(alternative add year of birth if username taken).  | Validate username (*2). If unique, The system will generate a random password for that doctor’s account and will ask the admin to re-enter the password.|
| 5 | Re-enter password. |Validate password (*3). Then ask the admin to confirm and send email to the doctor with new account details. | 
| 6 | Confirms. | Send email to doctor and save new account details to database.| 

2.9 **Alternative Flow**: 
|   | Alternative Flow | Description |
|---|------------------|-------------| 
| A1|If doctor’s details are not valid. |  System will display doctor not found. Please enter valid doctor’s details.| 
| A2|If username is not unique. |  System will display username Please choose another username. System will do this until unique username is chosen. |
| A3| If passwords don’t match. | System will display a message passwords do not  match until both passwords are the same.| 

---------------------------------------------------------------------------------------------------------------------------------------------------------------

### 3 System Use Case Name: Patient Self Assesment Tool (Symptoms Survey)
3.2 **Author**: Rad Eshghi\
\
3.3 **Description of the System Use Case**:\
This tool will allow the patient to complete several surveys, to guide the patient what to do in three different scenarios red,orange, and green then saves the report into the database allowing the doctor to have access whenever is needed.\
\
3.4 **Actor(s)**: Patient\
\
3.5 **System Use Case Preconditions**:
-	Website must be up and running.
- Patients must be logged in to the system.

3.6 **System Use Case Successful Post Conditions**:
-	Patient successfully submitted a report.
- Patients will be recommended to take further action after completing the survey based on the results status (Red, Orange, and Green). 
- Doctors can access survey reports.

3.7 **Applicable Business Rules**:
-	Patients can complete up to three surveys in 24h.
- Patient must select at least one checkbox. 
- Patients can't edit or undo a survey after submission.

3.8 **Main Flow**:
|   | Actor(s): Admin|           System              |
|---| ---------------|-------------------------------|
| 1 | From the dashboard patient select “Self Assessment”. | Check if the patient have compeleted the 3rd time(*1). Displays a form with checkboxes to select from and a comment section to write additional comments (optional). Survey includes common symptoms to select. |
| 2 | Selects symptoms(*2), and leave additional comment. |Save the selected checkboxes and comment. Ask the patient to submit. |
| 3 | Submits.| Flags the report (Red, Orange, and Green) then adds the report into the database. Shows recommended action to the patient to take.|


3.9 **Alternative Flow**: 
|   | Alternative Flow | Description |
|---|------------------|-------------| 
| A1|Patient attepted 3rd time. | The system will ask the patient to wait for the next 24h to do the self assesment. |
| A2|No checkbox has been selected. | The system will ask the patient to select atleast one checkbox before submitting.| 


----------------------------------------------------------------------------------------------------------------------------------------------------------------

### 4 System Use Case Name: Patient Book an Appointment
4.2 **Author**: Alexander Samaniego\
\
4.3 **Description of the System Use Case**:\
A patient can book an appointment to visit their doctor in-person.\
\
4.4 **Actor(s)**: Patient\
\
4.5 **System Use Case Preconditions**:
- Must be logged into an existing account.

4.6 **System Use Case Successful Post Conditions**:
-	The patient will have a scheduled appointment to visit a doctor.

4.7 **Applicable Business Rules**:
-	The time and date of the patient’s appointment must not conflict with any other appointment their doctor has. 

4.8 **Main Flow**:
|   | Actor(s): Admin|           System              |
|---| ---------------|-------------------------------|
| 1 | From the dashboard or after the patient completes the survey (system recommends to book an appointment), the patient selects “book an in-person appointment”. | Displays the input form to book an appointment.  Form includes a calendar to select a date and time (only displays available time slots). |
| 2 | Selects the time and date for appointment. |Saves selected date and time. Asks the user to confirm if they want to book the appointment. |
| 3 | Confirms (*1).| Adds appointment date and time into the database.  Sends the patient a confirmation email to the email address associated with the account.  Adds the appointment to the patient and doctor's dashboard.|

4.9 **Alternative Flow**: 
|   | Alternative Flow | Description |
|---|------------------|-------------|  
| A1|Patient does not confirm the appointment.| System does not submit the appointment time and date.  Asks the user to make necessary changes. |
