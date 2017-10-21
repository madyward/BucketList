---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
						NOTES, EXPLANATIONS, QUESTIONS, ETC.
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
KEY:
	Notes (quick tips, observations, to-dos, etc.) = !!!
	Explanations = +++
	Questions = ???
	Answers = ***
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
NOTES:
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
!!! Node has a built-in http module

*******************************************

!!! Case-sensitivity WILL MATTER with Mongo!

*******************************************

!!! ES6 has backticks (``) for concatination

---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
EXPLANATIONS:
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
+++ Mongo vs Mongoose: Mongo is a database, like Postgres. Mongoose is an ORM (Object 
	Relational Mapping), and is what connects the server to MongoDB, like sequelize!

*******************************************

+++ JSON Web Tokens (jwt) vs Cookies: Both JWTs and Cookies are used to authenticate users.
	JSON Web Tokens are given to the client by the server, and have an expiration. Cookies do
	not have an expiration, and stay on the client's browser unless cleared manually by the
	user.

*******************************************

+++ auth.js TASKS:
	//TASK 1: TAKE IN REQUEST, GET & STORE INCOMING DATA FROM IT:
	//TASK 2: CHECK IF USER WITH THAT EMAIL EXISTS
	//TASK 3: CREATE A USER IF THAT EMAIL DOESN'T EXIST
	//TASK 4: SHOW RESPONSE TO USER

---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
QUESTIONS:
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
??? What is body parser?
*** body-parser is a built-in express middleware. It is used commonly with JSON, as JSON is
	just one huge string of code, and body-parser allows us to to parse out sections one bit
	at a time (Google defines parse as: "analyze (a sentence) into its parts and describe 
	their syntactic roles").

*******************************************

??? What does body-parser do?
*** Essentially, body-parser just extracts the whole body portion of an incoming request, and
	puts it out there on req.body in a way that is simpler to interface. It just makes
	exchanging data within the body a lot easier!
	 
*******************************************

