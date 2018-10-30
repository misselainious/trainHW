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


// var provider = new firebase.auth.GoogleAuthProvider();

// firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

//will work whenever the auth state is changed
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $("#login-div").hide();
      $("#user-div").show();
      var user = firebase.auth().currentUser;
      if(user != null){
          var email_id = user.email;
          $("#userPara").text("Welcome, " + email_id);
      }
    } else {
      // No user is signed in.
      $("#login-div").show();
      $("#user-div").hide();
    }
  });

  function login(){
      var userEmail = $("#email_field").val();
      var userPass = $("#password_field").val();

      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: ", errorMessage);
        // ...
      });
  }

  function logout(){
    firebase.auth().signOut();
  }
//Audio for train noise
var audio = document.createElement('audio');
    audio.setAttribute('src', 'https://www.soundjay.com/transportation/sounds/cable-car-pass-by-01.mp3');


  //variable for database so I don't have to type it every time.
  var db = firebase.database();
  
    //Gets current time and diplays in HTML
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

   

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trFirst, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var due = moment(nextTrain).format("hh:mm");
      
//make new row and add train info to table
    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDest),
        $("<td>").text(trFreq),
        $("<td>").text(trFirst),
        $("<td>").text(due),
        $("<td>").text(tMinutesTillTrain)
    );
      $(".table").append(newRow);

  });
  
  
  
  
  
  
  