
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyCmb8rfDQt8NBFNV2a6NdyXznQRvqLtm4Y",
authDomain: "healthdatarecord.firebaseapp.com",
databaseURL: "https://healthdatarecord.firebaseio.com",
projectId: "healthdatarecord",
storageBucket: "healthdatarecord.appspot.com",
messagingSenderId: "679530692995",
appId: "1:679530692995:web:b5f1ed190c2b57903676b6",
measurementId: "G-JT0HGZN8D2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();



var database = firebase.database();

function submit(){
    alert("empty data")
    var weight = document.getElementById("weight");
    // var Height = document.getElementById(height);
    // var Calories = document.getElementById(calories);
    // var HeartRate = document.getElementById(heartRate)
    // var BloodPressure = document.getElementById(bloodPressure);
    // var SleepingTime = document.getElementById(sleepingTime);
    // var Activewear = document.getElementById(activewear);

    // var messageWeight = Wei.value();

    database.child("text").set(weight)
    // var messageHeight = Height.value();
    // var messageCalories = Calories.value();
    // var messageHeartRate = HeartRate.value();
    // var messagebloodPressure = BloodPressure.value();
    // var messageSleepingTime = SleepingTime.value();
    // var messageActivewear = Activewear.value();

    // database.child('Text').set(messageWeight);
    

    //   database.set({
    //       Weight: messageWeight,
    //       Height: messageHeight,
    //       Calories: messageCalories,
    //       HeartRate: messageHeartRate,
    //       BloodPressure: messagebloodPressure,
    //       SleepingTime: messageSleepingTime,
    //       Activewear: messageActivewear
    //   })
    // window.location.href = "file:///Users/nairongzhang/Documents/fall2019/IntroHCI/HCI-Project4-master/HCI-P4-website/home.html"
  }