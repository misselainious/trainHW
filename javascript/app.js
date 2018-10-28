
//sets up firebase
var config = {
    apiKey: "AIzaSyCbAq9jE9Yi2x9G6mQn3ffdyuPn8wxPGFk",
    authDomain: "train-a6477.firebaseapp.com",
    databaseURL: "https://train-a6477.firebaseio.com",
    projectId: "train-a6477",
    storageBucket: "train-a6477.appspot.com",
    messagingSenderId: "734109848774"
  };
  
  firebase.initializeApp(config);
  //variable for database so I don't have to type it every time.
  var db = firebase.database();
  
//   var audio = new Audio('honk.mp3');

//variables
  var name = "";
  var destination = "";
  var frequency = "";
  var away = "";
  
  $("#submit").on("click", function(event) {
    
    event.preventDefault();
    //grabs info from form
    name = $('#trainname').val();
    destination = $('#destinationtext').val();
    first = $('#firsttext').val();
    frequency = $('#freqtext').val();
    
//Object for train
    var newTrain = {
        name: name,
        destination: destination,
        frequency: frequency,
        first: first
    };


  //pushes train info to firebase!
    db.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.first);

    //removes text from form
$("#trainname").val("");
$("#destinationtext").val("");
$("#firsttext").val("");
$("#freqtext").val("");
//   audio.play();
  });
  

  db.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trName = childSnapshot.val().name;
    var trDest = childSnapshot.val().destination;
    var trFreq = childSnapshot.val().frequency;
    var trFirst = childSnapshot.val().first;
    var formatted = "hh:mm";
  
    // Train Info
    console.log(trName);
    console.log(trDest);
    console.log(trFreq);
    console.log(trFirst);

    //Gets current time and diplays in HTML
    var timeNow = moment().format('LT');
    $("#currentTime").text(timeNow);
var firstMil = moment(trFirst, formatted);
console.log("FirstMil", firstMil);
var diff = trFirst.diff(timeNow, 'minutes');
console.log(diff);
      
//make new row and add train info to table
    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDest),
        $("<td>").text(trFreq),
        $("<td>").text(trFirst)
    );
      $(".table").append(newRow);

  });
  
  
  
  
  
  
  