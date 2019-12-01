import React, { Component } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import API from "@aws-amplify/api";
import { Redirect } from "react-router-dom";
import "./dashboard.css";

interface DashboardProps {
  isAuthenticated: boolean;
}

interface DashboardState {
  isLoading: boolean;
  goals: Goal[];
  redirect: boolean;
}

interface Goal {
  age: number;
  goalId: string; 
  name: string;
  weight: number;
  height: number;
  bloodtype: string;
}

export default class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      isLoading: true,
      goals: [],
      redirect: false,
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const goals = await this.goals();
      this.setState({ goals });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  goals() {
    return API.get("goals", "/goals", null);
  }

  renderGoalsList(goals: Goal[]) {
    let goalsList: Goal[] = [];

    return goalsList.concat(goals).map(
      (goal, i) =>
        <tr key={goal.goalId}>
          <td><a href={`/goal/${goal.goalId}`}>{goal.name}</a></td>
          <td><div className="description">{goal.age}</div></td>
          <td><div className="description">{goal.weight}</div></td>
          <td><div className="description">{goal.height}</div></td>
          <td><div className="description">{goal.bloodtype}</div></td>
        </tr>
    );
  }

  onCreate = () => {
    this.setState({ redirect: true });
  }

  renderDashboard() {
    return (
      <div className="goals">
        <h1 className="text-center">Health Dashboard</h1>
        <div className="mb-3 float-right">
          <Button variant="primary" onClick={this.onCreate}>Create Health Profile</Button>
        </div>
        <Table variant="dark'">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Height</th>
              <th>bloodtype</th>
            </tr>
          </thead>
          <tbody>
            {this.state.isLoading ? <Spinner animation="border" className="center-spinner" /> : this.renderGoalsList(this.state.goals)}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    let { redirect } = this.state;
    if (redirect) {
      return <Redirect push to={'/goal/'} />;
    }

    return (
      <div className="Dashboard">
        {this.props.isAuthenticated ? this.renderDashboard() : this.renderDashboard()}
      </div>
    );
  }
}