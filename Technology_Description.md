## Use Case Description's

### 1.1 System Use Case Name: Add Clinic
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
| --| ---------------|-------------------------------|
| 1 | Requests to add a new clinic to the system. | Asks to enter name, address, and postal code.|
| 2 | Enters name, address, and postal code.    | Validates the clinic information (*1). If valid, asks to enter a clinic representative|
| 3 | Enters full name, phone number, email, position.| Validates the contact information (*2). Asks if there are any other clinic representatives.|
| 4 | Repeats step 3 until all clinic representatives have been added.  | Asks to proceed.|
| 5 | Proceeds (*3). | Displays all entered information. Asks to confirm. | 
| 6 | Confirms (*4). | Saves the clinic to the database. Displays a confirmation message to the Admin and sends a confirmation email to clinic representatives.| 





