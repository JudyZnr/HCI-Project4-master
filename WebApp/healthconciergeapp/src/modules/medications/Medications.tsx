import React, { Component } from "react";  
import { Button, Table, Spinner } from "react-bootstrap";  
import API from "@aws-amplify/api";  
import { Link, Redirect } from "react-router-dom";  
  
import insulin from "../../images/medicationinsulin.jpg";
import levoxyl from "../../images/medicationlevoxyl.jpg";
import lyrica from "../../images/medicationlyrica.jpeg";
import tylenol from "../../images/medicationtylenol.jpg";
import lipitor from "../../images/medicationlipitor.png";
import metformin from "../../images/medicationmetformin.jpg";

import "./medications.css";  
  
interface MedicationsProps {  
  isAuthenticated: boolean;  
}  
  
interface MedicationsState {  
  isLoading: boolean;  
  redirect: boolean;  
}  
  
  
export default class Medications extends Component<MedicationsProps, MedicationsState> {  
  constructor(props: MedicationsProps) {  
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
  
  onCreate = () => {  
    this.setState({ redirect: true });  
  }  

  renderMedications() {  
    return (
      <div>
      <div className="goals">
        <h1 className="text-center">Medications</h1>
        <hr />
      </div>
      <div className="grid2x2">

        <div className="box box1">
          <Link to="/orderInsulin">
            <div>
              <img src={insulin}></img>
            </div>
          </Link>
        </div>

        <div className="box box2">
          <Link to="/orderLevoxyl">
            <div>
              <img src={levoxyl}></img>
            </div>
          </Link>
        </div>

        <div className="box box3">
          <Link to="/orderLyrica">
            <div>
              <img src={lyrica}></img>
            </div>
          </Link>
        </div>
        
        <div className="box box4">
          <Link to="/orderTylenol">
            <div>
              <img src={tylenol}></img>
            </div>
          </Link>
        </div>

        <div className="box box4">
          <Link to="/orderLipitor">
            <div>
              <img src={lipitor}></img>
            </div>
          </Link>
        </div>

        <div className="box box4">
          <Link to="/orderMetformin">
            <div>
              <img src={metformin}></img>
            </div>
          </Link>
        </div>

      </div>
    </div>
    );
  }  
  
  render() {  
    let { redirect } = this.state;  
    if (redirect) {  
      return <Redirect push to={'/goal/'} />;  
    }  
  
    return (  
      <div className="Medications">  
        {this.props.isAuthenticated ? this.renderMedications() : this.renderMedications()}  
      </div>  
    );  
  }  
}  