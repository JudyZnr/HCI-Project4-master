import React from "react";
import { Route, Switch } from "react-router-dom";
import PropsRoute from "./common/PropsRoute";
import Home from "./modules/signup/Home";
import Login from "./modules/signup/Login";
import Signup from "./modules/signup/Signup";
import Dashboard from "./modules/dashboard/Dashboard";
import About from "./modules/about/About";
import Doctor from "./modules/doctor/Doctor";
import Medications from "./modules/medications/Medications";
import Insulin from "./modules/order/orderInsulin";
import Levoxyl from "./modules/order/orderLevoxyl";
import Lipitor from "./modules/order/orderLipitor";
import Lyrica from "./modules/order/orderLyrica";
import Metformin from "./modules/order/orderMetformin";
import Tylenol from "./modules/order/orderTylenol";


import AddEditGoal from "./modules/goal/AddEditGoal";
import NotFound from "./modules/notFound/NotFound";

interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.SFC<RouteProps> = (childProps) =>
  <Switch>
    <PropsRoute path="/" exact component={Home} props={childProps} />
    <PropsRoute path="/login" exact component={Login} props={childProps} />
    <PropsRoute path="/signup" exact component={Signup} props={childProps} />
    <PropsRoute path="/dashboard" exact component={Dashboard} props={childProps} />
    <PropsRoute path="/about" exact component={About} props={childProps} />
    <PropsRoute path="/doctor" exact component={Doctor} props={childProps} />
    <PropsRoute path="/medications" exact component={Medications} props={childProps} />
    <PropsRoute path="/orderInsulin" exact component={Insulin} props={childProps} />
    <PropsRoute path="/orderLevoxyl" exact component={Levoxyl} props={childProps} />
    <PropsRoute path="/orderLipitor" exact component={Lipitor} props={childProps} />
    <PropsRoute path="/orderLyrica" exact component={Lyrica} props={childProps} />
    <PropsRoute path="/orderMetformin" exact component={Metformin} props={childProps} />
    <PropsRoute path="/orderTylenol" exact component={Tylenol} props={childProps} />
    <Route path="/goal/:id?" exact component={AddEditGoal} props={childProps} />
    <Route component={NotFound} />
  </Switch>;