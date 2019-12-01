import React, { Component } from "react"; 
import { Button, Table, Spinner } from "react-bootstrap"; 
import API from "@aws-amplify/api"; 
import { Redirect } from "react-router-dom"; 
import metformin from "../../images/medicationMetformin.jpg"; 
import "./order.css"; 

interface OrderProps { 
  isAuthenticated: boolean; 
} 
 
interface OrderState { 
  isLoading: boolean; 
  redirect: boolean; 
} 
 
export default class Order extends Component<OrderProps, OrderState> { 
  constructor(props: OrderProps) { 
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
 
 
  onOrder = () => { 
    this.setState({ redirect: true }); 
  } 
 
  renderOrder() { 
    return ( 
      <div className="goals"> 
        <h1 className="text-center">Order Insulin</h1>         
        <div className="lander"> 
          <hr /> 
          <img src={metformin} className="img-fluid full-width" alt="metformin"></img> 
          <hr />
          <Button variant="primary" onClick={this.onOrder}>Place Order with Uber-Med!</Button>
        </div>
      </div> 
    ); 
  } 
 
  render() { 
    let { redirect } = this.state; 
    if (redirect) { 
      //window.open("https://talky.io/hci-proj4-doctor");
      alert("your order for Insulin will be on its way!");
      return <Redirect push to={'/medications'} />;

    } 
 
    return ( 
      <div className="Dashboard"> 
        {this.props.isAuthenticated ? this.renderOrder() : this.renderOrder()} 
      </div> 
    ); 
  } 
} 
