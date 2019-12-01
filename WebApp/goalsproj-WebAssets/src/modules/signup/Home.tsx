import React, { Component } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import API from "@aws-amplify/api";
import { Link, Redirect } from "react-router-dom";

import dashboardimg from "../../images/dashnavi.jpg";
import doctorimg from "../../images/docnavi.jpg";
import medicationsimg from "../../images/mednavi.jpg";
import aboutimg from "../../images/aboutnavi.jpg";

import "./home.css";

interface HomeProps {
  isAuthenticated: boolean;
}

interface HomeState {
  isLoading: boolean;
  redirect: boolean;
}


export default class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
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

  renderLanding() {
    return (
      <div className="lander">
        <h2>Health Concierge</h2>
        <hr />
        <p>Welcome to your Health Concierge! Your go to experience for your digital health dashboard and healthcare services.</p>
        <div className="button-container col-md-12">
          <a href="/signup" className="orange-link">Sign up if you are a new user</a>
        </div>
        
        <div className="button-container col-md-12">
          <a href="/login" className="orange-link">Log In if you are an existing user</a>
        </div>
        
        
      </div>);
  }

  renderHome() {
    return (
      <div>
      <div className="goals">
        <h1 className="text-center">Health Concierge</h1>
        <p className="text-center">choose a path below</p> 
        <hr />
      </div>
      <div className="grid2x2">

        <div className="box box1">
          <Link to="/dashboard">
            <div>
              <img src={dashboardimg}></img>
            </div>
          </Link>
        </div>

        <div className="box box2">
          <Link to="/medications">
            <div>
              <img src={medicationsimg}></img>
            </div>
          </Link>
        </div>

        <div className="box box3">
          <Link to="/doctor">
            <div>
              <img src={doctorimg}></img>
            </div>
          </Link>
        </div>
        
        <div className="box box4">
          <Link to="/about">
            <div>
              <img src={aboutimg}></img>
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
      <div className="Home">
        {this.props.isAuthenticated ? this.renderHome() : this.renderLanding()}
      </div>
    );
  }
}