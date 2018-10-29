//Audio for train noise
var audio = document.createElement('audio');
    audio.setAttribute('src', 'https://www.soundjay.com/transportation/sounds/cable-car-pass-by-01.mp3');

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
  

  var timeNow = moment().format('HH:mm');
  $("#currentTime").text("Current Time: "+ timeNow);

//variables
  var name = "";
  var destination = "";
  var frequency = "";
  var away = "";
  
  $("#submit").on("click", function(event) {
    event.preventDefault();
    audio.play();
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

  });
  

  db.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trName = childSnapshot.val().name;
    var trDest = childSnapshot.val().destination;
    var trFreq = childSnapshot.val().frequency;
    var trFirst = childSnapshot.val().first;
    // var formatted = "hh:mm";
    // var convertTime = moment(trFirst, formatted);
    // console.log("convertTime:", convertTime.i);
  
    // Train Info
    console.log(trName);
    console.log(trDest);
    console.log(trFreq);
    console.log(trFirst);

    //Gets current time and diplays in HTML

var firstMil = moment(trFirst, 'HH:mm').format('HH:mm');
console.log("FirstMil", firstMil);

console.log(moment(trFirst).fromNow());

// var minutes = (firstMil - timeNow);
// console.log(minutes);

// var diff = timeNow.from(firstMil);
// var diff = trFirst.diff(moment(), 'minutes');
// console.log("diff: "+ diff);
      
//make new row and add train info to table
    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDest),
        $("<td>").text(trFreq),
        $("<td>").text(trFirst)
    );
      $(".table").append(newRow);

  });
  
  
  
  
  
  
  