import React, { Component } from "react"; 
import { Button, Table, Spinner } from "react-bootstrap"; 
import API from "@aws-amplify/api"; 
import { Redirect } from "react-router-dom"; 
import docimg from "../../images/doctorheadshot.jpg"; 
import "./doctor.css"; 

interface DoctorProps { 
  isAuthenticated: boolean; 
} 
 
interface DoctorState { 
  isLoading: boolean; 
  redirect: boolean; 
} 
 
export default class Doctor extends Component<DoctorProps, DoctorState> { 
  constructor(props: DoctorProps) { 
    super(props); 
 
    this.state = {
      isLoading: true, 
      redirect: false, 
    }; 
  } 
 
  async componentDidMount() { 
    if (!this.props.isAuthenticated) { 
      return; 
    } 
    this.setState({ isLoading: false }); 
  } 
 
 
  onVidCall = () => { 
    this.setState({ redirect: true }); 
  } 
 
  renderDoctor() { 
    return ( 
      <div className="goals"> 
        <h1 className="text-center">Your Doctor</h1>         
        <div className="lander"> 
          <hr /> 
          <img src={docimg} className="img-fluid full-width" alt="health concierge flow"></img> 
          <p> Hi there! Dr. Anad Roy at your service! I am happy to serve as your immediate telehealth doctor. I am available to chat with you at any time you please!</p>

          <hr />
          <p>Dr. Anad Roy was born in Philadelphia, Pennsylvania  and  is  a  graduate  of Johns Hopkins University. 
          He obtained his medical degree at Thomas Jefferson University in Philadelphia. His residency was at University of Maryland. 

          Dr. Roy has thirty years’ experience in general practice</p>

          <Button variant="primary" onClick={this.onVidCall}>Call Doctor</Button>
        </div>
      </div> 
    ); 
  } 
 
  render() { 
    let { redirect } = this.state; 
    if (redirect) { 
      //return <Redirect push to={'/about'} />;
      window.open("https://talky.io/hci-proj4-doctor");

    } 
 
    return ( 
      <div className="Dashboard"> 
        {this.props.isAuthenticated ? this.renderDoctor() : this.renderDoctor()} 
      </div> 
    ); 
  } 
} 
