# Online Study Group - server-side
## assignment_category_0001
The described project is a comprehensive online assignment management system that enables users to create, delete, update, and view assignments. Users can filter assignments based on difficulty levels and, With logging in, explore assignment details and submit assignments. The system ensures secure assignment deletion, only allowing the creator to delete and update their assignments. Upon updating an assignment, users are provided with a pre-filled form for convenience. The platform also supports assignment marking, allowing instructors to review submitted assignments, provide marks, and offer feedback. The system employs various features like modals, toasts, and private pages to enhance user experience and communication. Overall, it offers a seamless and user-friendly environment for managing, submitting, and grading assignments in an educational setting.


## Project features and functionalities:

#### 1. User Registration: 
Users can create accounts with their name, email, password, and profile photo.

#### 2.	Social Login: 
Users can log in using social platforms such as Google.

#### 3. Assignment Creation: 
Any logged-in user can create assignments with various details.

#### 4.	Assignment Deletion
Users can delete assignments they have created.

#### 5.	Assignment Update: 
Users can update assignment details, and the form is pre-filled for convenience they have created.

#### 6.	Assignment Filtering: 
Users can filter assignments by difficulty level (easy, medium, hard).

#### 7.	Assignment Submission:
Users can submit assignments with PDF links insert only not typing and add notes with typing.

#### 8: Marking System: 
Any users can mark assignments, provide feedback, and give marks.

#### 9: Status Tracking
Assignments can change status from pending to complete after marking. For that two different database collections are working. If each assignment complete that will show my assignment page and in same time that same assignment will remove from submitted assignment page those were in pending status.

#### 10:User-Friendly Interface:
The system offers a user-friendly interface with toast messages and models for better user experience.

#### 11: JWT validation:
JWT verifyToken is generated when login and when the user logs out, that token is removed automatically from the browser cookie.



### Note: Important GitHub commits:
#### Server side:
* MongoDB database connected
* I have created one endpoint for creating assignments with a user email address also
* I have created all assignments to show the endpoint and also single assignments to show the endpoint
* An updated endpoint has been created for get and put
* I have created an assignment to submit end-point api
* created endpoint to get assignment details with assignment ID
* I have added an endpoint to handle assignments completed 
* added endpoint to handle deleting a submitted assignment by assignmentId
* I have added an endpoint to get completed assignments
* I have created an endpoint to get completed assignments for a specific user
* I have created one assignment delete endpoint
* submitted assignment endpoint we have verified with verifyToken. Also, I have added JWT endpoint and also logout endpoint
* completed assignment API verification with verifyToken
* completed assignments endpoint I have added verifyToken validation
* given marks endpoint verified with JWT verifyToken
* single assignment endpoint has verified with verifyToken JWT

### Live URL: https://online-group-study-be2ef.web.app/



