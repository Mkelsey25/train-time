
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyATar_YvdLvkFL6a85Iim6m2k080InYu8M",
    authDomain: "train-time-5e548.firebaseapp.com",
    databaseURL: "https://train-time-5e548.firebaseio.com",
    projectId: "train-time-5e548",
    storageBucket: "",
    messagingSenderId: "730379148321"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var trainDB = database.ref("/trains");

  //train event listener 
  $("#addTrain").click(function(event) {
    event.preventDefault();
    var name = $("#trainName").val().trim();
    var destination = $("#trainDestination").val().trim();
    var time = $("#trainTime").val().trim();
    var frequency = $("#trainFrequency").val().trim();
    //validation
    if(isNaN(time)){
    $("#trainTime").after("Please enter valid number.");
    return false;
    }
    if(isNaN(frequency)){
      $("#trainFrequency").after("Please enter valid number.");
      return false;
      }
    //set variables equal to database variables and push to firebase
    trainDB.push({
      name,
      destination,
      time,
      frequency
    })
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
    $("#trainFrequency").after("");
   

  });
  //make updates to table
  trainDB.on("child_added", function(childSnapshot) 
    {
      var data = childSnapshot.val();
      var trainsName = data.name;
      var trainsDestination = data.destination;
      var trainsFirstTime = data.time;
      var trainsFrequency = data.frequency;
      //set current time to military time
      var currentTimeMil = moment(trainsFirstTime, "HH:mm");
      
      //math time!
      var diffTime = moment().diff(moment(currentTimeMil), "minutes");
      console.log(diffTime);
      //Remainder
      var trainsRemainder = diffTime % trainsFrequency;
      console.log(trainsRemainder);
      var minutesAway = trainsFrequency - trainsRemainder;
      //need to do a math check and make sure this is correct
      console.log(minutesAway);

      var nextArrival = moment().add(minutesAway, "minutes");
      moment(nextArrival).format("HH:mm");
      console.log(nextArrival);

      var tRow = $("<tr>");
      tRow.append(
        $("<td>").text(trainsName),
        $("<td>").text(trainsDestination),
        $("<td>").text(trainsFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
      );
      $("#trainTable").append(tRow);

    })


