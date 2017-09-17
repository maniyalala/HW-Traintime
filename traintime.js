 var config = {
    apiKey: "AIzaSyA5E5ulc3462_NHeF1TKWKp-hTjkAmZ9Hs",
    authDomain: "traintime-798d7.firebaseapp.com",
    databaseURL: "https://traintime-798d7.firebaseio.com",
    projectId: "traintime-798d7",
    storageBucket: "traintime-798d7.appspot.com",
    messagingSenderId: "823658790391"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var start = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: start,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val(" ");
  $("#destination-input").val(" ");
  $("#start-input").val(" ");
  $("#frequency-input").val(" ");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().role;
  var start = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(start);
  console.log(frequency);

  // Prettify the employee start
  var firstTrain = moment.unix(start).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var minFrequency = moment().diff(moment.unix(start, "X"), "minutes");
  console.log(minFrequency);

  // Calculate the total billed rate
  var arrival = minFrequency * frequency;
  console.log(arrival);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrain + "</td><td>" + minFrequency + "</td><td>" + frequency + "</td><tr>");
});