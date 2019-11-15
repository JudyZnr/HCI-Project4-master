var mainText = document.getElementById("mainText")
var submitBtn = document.getElementById("submitBtn")

function submitClick(){
    var firebaseRef = firebase.databae();
    window.alert("testing")
    firebaseRef.child("Text").set("hellp");
}