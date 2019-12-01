import React, { Component } from "react";
import API from "@aws-amplify/api";
import { Button, FormGroup, FormControl, Modal, FormLabel, Spinner, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import "./AddEditGoal.css";

interface AddEditGoalProps {
  match: any;
  history: any;
}

interface AddEditGoalState {
  isExistingGoal: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  goal: Goal;
  showDeleteModal: boolean;
  redirect: string;
}

interface Goal {
  goalId: string;
  name: string;
  age: string;
  weight: string;
  height: string;
  bloodtype: string;
}

export default class AddEditGoal extends Component<AddEditGoalProps, AddEditGoalState> {
  constructor(props: AddEditGoalProps) {
    super(props);

    this.state = {
      redirect: '',
      isExistingGoal: false,
      isLoading: false,
      isUpdating: false,
      isDeleting: false,
      showDeleteModal: false,
      goal: {
        goalId: '',
        name: '',
        age: '',
        weight: '',
        height: '',
        bloodtype: '',
      },
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.getGoal(id);
      this.setState({
        isExistingGoal: true,
      });
    }

  }

  getGoal(goalId: string) {
    this.setState({
      isLoading: true,
    });

    return API.get("goals", `/goals/${goalId}`, null).then((value: any) => {
      this.setState({
        isLoading: false,
        goal: {
          name: value.name,
          age: value.age,
          goalId: this.props.match.params.id,
          weight: value.weight,
          height: value.height,
          bloodtype: value.bloodtype,
        }
      });
    });
  }

  validateForm = () => {
    return this.state.goal.name.length > 0 && this.state.goal.age.length > 0 && this.state.goal.weight.length > 0 && this.state.goal.height.length > 0 && this.state.goal.bloodtype.length > 0;
  }

  handleChange = (event: any) => {
    const { id, value } = event.target;
    this.setState({
      goal: {
        ...this.state.goal,
        [id]: value
      }
    } as any);
  }

  handleCancel = (event: any) => {
    this.setState({
      redirect: '/'
    });
  }

  handleSubmit = async (event: any) => {
    this.setState ({
      isUpdating: true,
    });
    event.preventDefault();
    this.state.isExistingGoal ? this.updateGoal() : this.saveGoal();
  }

  updateGoal = () => {
    const { goal } = this.state;
    return API.put("goals", `/goals/${this.props.match.params.id}`, {
      body: {
        name: goal.name,
        age: goal.age,
        weight: goal.weight,
        height: goal.height,
        bloodtype: goal.bloodtype,
      }
    }).then((value: any) => {
      this.setState({
        isUpdating: false,
        redirect: '/'
      });
    });
  }

  saveGoal = () => {
    const { goal } = this.state;
    return API.post("goals", "/goals", {
      body: {
        name: goal.name,
        age: goal.age,
        weight: goal.weight,
        height: goal.height,
        bloodtype: goal.bloodtype,
      }
    }).then((value: any) => {
      this.setState({
        isUpdating: false,
        redirect: '/'
      });
    });
  }

  showDeleteModal = (shouldShow: boolean) => {
    this.setState({
      showDeleteModal: shouldShow
    });
  }

  handleDelete = (event: any) => {
    this.setState({
      isDeleting: true,
    })

    return API.del("goals", `/goals/${this.props.match.params.id}`, null).then((value: any) => {
      this.setState({
        isDeleting: false,
        showDeleteModal: false,
        redirect: '/'
      });
    });

  }

  deleteModal() {
    return (
      <Modal
        show={this.state.showDeleteModal}
        onHide={() => this.showDeleteModal(false)}
        container={this}
        aria-labelledby="contained-modal-title"
        id="contained-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Delete goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your health record?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={this.handleDelete}>
            {this.state.isDeleting ?
              <span><Spinner size="sm" animation="border" className="mr-2" />Deleting</span> :
              <span>Delete</span>}
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { goal, isExistingGoal, showDeleteModal, redirect } = this.state;

    if (redirect) {
      return <Redirect push to={redirect} />;
    }

    return (
      <div className="goal">
        {this.state.isLoading ? 
          <Spinner animation="border" className="center-spinner" /> : 

          <Form noValidate onSubmit={this.handleSubmit}>

            <div className="form-body">
              <FormGroup className="blinking-cursor">
                <FormLabel>Name</FormLabel>
                <FormControl id="name"
                  onChange={this.handleChange}
                  value={goal.name}
                  minLength={1}
                  isValid={goal.name.length > 0}
                  placeholder="Enter Your Name"
                  required />
              </FormGroup>

              <FormGroup >
                <FormLabel>Age</FormLabel>
                <FormControl id="age"
                  onChange={this.handleChange}
                  value={goal.age}
                  minLength={1}
                  isValid={goal.age.length > 0}
                  placeholder="Enter your age"
                  required />
              </FormGroup>
              
              <FormGroup >
                <FormLabel>Weight</FormLabel>
                <FormControl id="weight"
                  onChange={this.handleChange}
                  value={goal.weight}
                  minLength={1}
                  isValid={goal.weight.length > 0}
                  placeholder="Enter your weight in KGs"
                  required />
              </FormGroup>

              <FormGroup >
                <FormLabel>Height</FormLabel>
                <FormControl id="height"
                  onChange={this.handleChange}
                  value={goal.height}
                  minLength={1}
                  isValid={goal.height.length > 0}
                  placeholder="Enter your height in cm"
                  required />
              </FormGroup>


              <Form.Group>
                <Form.Label>Blood Type</Form.Label>
                <FormControl id="bloodtype"
                  onChange={this.handleChange}
                  value={goal.bloodtype}
                  minLength={1}
                  isValid={goal.bloodtype.length > 0}
                  as="select"
                  required>
                  <option>"O-"</option>
                  <option>"O+"</option>
                  <option>"A-"</option>
                  <option>"A+"</option>
                  <option>"B-"</option>
                  <option>"B+"</option>
                  <option>"AB-"</option>
                  <option>"AB+"</option>
                </FormControl>
              </Form.Group>

            </div>

            {isExistingGoal &&
              <Button
                variant="outline-danger"
                onClick={() => this.showDeleteModal(true)}>
                Delete
              </Button>}

            <Button
              variant="primary"
              type="submit"
              disabled={!this.validateForm()}
              className="float-right"
              onClick={this.handleSubmit}>
              {this.state.isUpdating ?
                <span><Spinner size="sm" animation="border" className="mr-2" />{isExistingGoal ? 'Updating' : 'Creating'}</span> :
                <span>{isExistingGoal ? 'Update goal' : 'Create goal'}</span>}
            </Button>

            <Button
              variant="link"
              onClick={this.handleCancel}
              className="float-right">
              Cancel
            </Button>
          </Form>}

        {showDeleteModal && this.deleteModal()}
        
      </div>
    );
  }
}