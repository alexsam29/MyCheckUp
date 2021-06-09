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
-	The clinic representatives signed a partnership contract.
-	The clinic representatives provided all necessary documents with the information about.

1.6 **System Use Case Successful Post Conditions**:
-	An Admin has successfully added a clinic information to the system.
-	An Admin can create doctor accounts for the clinic.
-	Patients can select the newly added clinic as their clinic in the system.

1.7 **Applicable Business Rules**:
-	An Admin must receive an approval from the management before adding a clinic.
-	Clinics may have many doctors.
-	Clinics may have many patients.
-	Clinics may request to receive and review all their data stored in the system.

1.8 **Main Flow**:
|   | Actor(s): Admin|           System              |
|---| ---------------|-------------------------------|
| 1 | Requests to add a new clinic to the system. | Asks to enter name, address, and postal code.|
| 2 | Enters name, address, and postal code.    | Validates the clinic information (*1). If valid, asks to enter a clinic representative|
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
| A3| Admin rejects when asked to proceed. | System returns to the main menu. |
| A4| If passwords don’t match. | System will display a message passwords do not  match until both passwords are the same.| 

---------------------------------------------------------------------------------------------------------------------------------------------------------------

