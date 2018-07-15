# train-time
Uses html, css, bootstrap, javascript, JQuery, moment.js and firebase. 
Train scheduler that adds user input to database and displays on webpage.
1. Initialized Firebase by setting up account and configuration in code.
2. Added event listener to the add train button, assigned the input to different variables, and pushed them to the trains portion of the database. 
3. Empty input boxes
4. Input stored in Firebase was then displayed on a bootstrap table through the following steps.
- Values from Firebase childsnapshot were assigned variables. 
- Train's first time was converted to military time using moment.js.
- Minutes away and Next arrival variables were created using a combination of moment.js and simple equations using variables already created.
- Variables were then appended to the bootstrap table.
   