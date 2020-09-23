import React, { Component } from "react";
import Modal from "react-awesome-modal";
import LoginString from "../Login/LoginStrings";
import firebase from "../../../auth";
import { Redirect } from "react-router-dom";

const db = firebase.firestore();

export default class BidModal extends Component {
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.openModal = this.openModal.bind(this);
    this.delete = this.delete.bind(this);
    this.closeModal = this.closeModal.bind(this)
  }

  delete() {
    db.collection("property")
      .doc(this.props.propId)
      .delete()
      .then(alert("Property Deleted. Click 'Back To Dashboard'"));
  }

  componentDidMount() {}

  openModal() {
    this.setState({
      show: true,
    });
    console.log("opened modal");
  }

  closeModal() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <section>
        <button
          className="button is-danger"
          type="button"
          value="Open"
          onClick={this.openModal}
        >
          {" "}
          Delete{" "}
        </button>
        <Modal
          visible={this.state.show}
          width="400"
          height="400"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <h1 className="centerStuff">
              {`Are you sure you want to delete this property?`}
            </h1>

            <br />
            <br />
            <button
              className="button is-danger"
              type="button"
              href="/Dashboard"
              onClick={this.delete}
            >
              Delete
            </button>

            <a
              className="centerStuff"
              href="/Dashboard"
              onClick={() => this.closeModal()}
            >
              Back To Dashboard
            </a>

            {/* <a
              className="centerStuff"
              //   href="/Renter"
              onClick={() => this.closeModal()}
            >
              Cancel
            </a> */}
          </div>
        </Modal>
      </section>
    );
  }
}
