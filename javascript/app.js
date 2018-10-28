var config = {
    apiKey: "AIzaSyCbAq9jE9Yi2x9G6mQn3ffdyuPn8wxPGFk",
    authDomain: "train-a6477.firebaseapp.com",
    databaseURL: "https://train-a6477.firebaseio.com",
    projectId: "train-a6477",
    storageBucket: "",
    messagingSenderId: "734109848774"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  var name = "";
  var destination = "";
  var frequency = "";
  var away = "";
  
  $("#submit").on("click", function(event) {
    
    event.preventDefault();
    
    name = $('#trainname').val();
    destination = $('#destinationtext').val();
    away = $('#firsttext').val();
    frequency = $('#freqtext').val();
    

    var newTrain = {
        name: name,
        destination: destination,
        frequency: frequency,
        away: away
    };
  
    // var formatstartDate = moment(startDate).format('MM/DD/YYYY');
    // var today = moment().format('MM/DD/YYYY');

  
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.away);


  
//     var newRow = $("<tr>").append(
//         $("<td>").text(name),
//         $("<td>").text(destination),
//         $("<td>").text(frequency),
//         $("<td>").text(away),
//     );
  
  
//   $(".table").append(newRow);
  
  });
  

    

  
  
  
  
  
  