import React, { Component } from "react";
import Modal from "react-awesome-modal";
import LoginString from "../Login/LoginStrings";
import firebase from "../../../auth";
// import "./style.css";

const db = firebase.firestore();

export default class BidModal extends Component {
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      newBid: null,
      name: "",
      address: "",
      description: "",
      minBid: "",
      city: "",
      province: "",
      pic: [],
      zipC: "",
      owner: "",
      highBidder: "",
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getOne = this.getOne.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.getOne();
  }

  openModal() {
    this.setState({
      show: true,
    });
    console.log("opened modal");
    this.getOne();
  }

  closeModal() {
    this.setState({
      show: false,
    });
  }

  updateInputValue(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    console.log(evt.target.value);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  }
  handleSubmit(event) {
    event.preventDefault();

    const db = firebase.firestore();

    db.collection("property")
      .doc(this.state.name)
      .update({
        name: this.state.name,
        address: this.state.address,
        province: this.state.province,
        zipC: this.state.zipC,
        minBid: this.state.minBid,

        description: this.state.description,
        city: this.state.city,
      })
      .then(() => {
        console.log("prop submitted");
        console.log(this.state.ownerID);

        window.location.reload(false);
      });
  }

  getOne() {
    db.collection("property")
      .doc(this.props.propId)
      .get()
      .then((doc) => {
        db.collection("user")
          .doc(doc.data().ownerID)
          .get()
          .then((snap) => {
            this.setState({
              name: doc.data().name,
              address: doc.data().address,
              description: doc.data().description,
              minBid: doc.data().minBid,
              city: doc.data().city,
              province: doc.data().province,
              pic: doc.data().pic,
              zipC: doc.data().zipC,
              owner: snap.data().name,
              docID: doc.id,
            });
          });
      });
  }

  render() {
    return (
      <section>
        <button
          className="button is-warning"
          type="button"
          value="Open"
          onClick={this.openModal}
        >
          {" "}
          Update Prop{" "}
        </button>
        <Modal
          visible={this.state.show}
          width="75%"
          height="85%"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <form id="form" onSubmit={this.handleSubmit}>
              <div className="columns is-desktop is-12 is-centered">
                <div className="column is-3">
                  <div className="field">
                    <div className="control">
                      <label className="label">Property Name:</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Sherwood Forest Getaway"
                        name="name"
                        value={this.state.name}
                      />
                    </div>
                  </div>
                </div>

                <div className="column is-4">
                  <div className="field">
                    <div className="control">
                      <label className="label">Street Address:</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="e.g 123 Spooner St."
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="column is-2">
                  <div className="field">
                    <div className="control">
                      <label className="label">City:</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Nasvhille"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns is-desktop is-centered">
                <div className="column is-3">
                  <div className="field">
                    <div className="control">
                      <label className="label">Choose Your State:</label>
                      <div
                        className="select"
                        name="province"
                        value={this.state.province}
                        onChange={this.handleChange}
                      >
                        <select
                          name="province"
                          value={this.state.province}
                          onChange={this.handleChange}
                        >
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="DC">District Of Columbia</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-3">
                  <div className="field">
                    <div className="control">
                      <label className="label">Zip Code:</label>
                      <input
                        className="input"
                        placeholder="37129"
                        name="zipC"
                        value={this.state.zipC}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="column is-3">
                  <div className="field">
                    <div className="control">
                      <label className="label">
                        Desired Starting Bid (per night)
                      </label>
                      <input
                        className="input"
                        type="text"
                        placeholder="$300"
                        name="minBid"
                        value={this.state.minBid}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns is-centered">
                <div className="field">
                  <div className="control">
                    <label className="label">Property Description:</label>
                    <textarea
                      className="textarea"
                      placeholder="Enter Your Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                  <button className="is-centered" type="submit" id="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <br />
            <br />

            <a className="centerStuff" onClick={() => this.closeModal()}>
              Close
            </a>
          </div>
        </Modal>
      </section>
    );
  }
}
