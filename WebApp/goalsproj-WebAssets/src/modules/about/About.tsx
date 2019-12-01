import React from "react"; 
import "./about.css"; 
import flowimg from "../../images/healthconcierge-flow.jpg";

 
export default () => 
  <div className="lander"> 
        <h2>About Health Concierge</h2> 
        <hr /> 
        <p> The Health Concierge application is a hybrid application system using both the Google Assistant and a web app interface to simulate a digital health application. This system seeks to demonstrate an extended system for usability access to digital health products. 

        With access to mobile devices with assistant features, users can use voice-activated assistants as a form of remote control to access the applications themselves. This new paradigm explores human computer interaction principles from accessibility, HCI + AI, and usability. </p>


        <img src={flowimg} className="img-fluid full-width" alt="health concierge flow"></img> 


      </div>;