import React, { Component } from "react";
import Modal from "react-awesome-modal";
import LoginString from "../Login/LoginStrings";
import firebase from "../../../auth";
import "./style.css";

const db = firebase.firestore();

export default class BidModal extends Component {
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      newBid: null,
      name: "",
      address: "",
      description: "",
      minBid: "",
      province: "",
      pic: [],
      zipC: "",
      owner: "",
      highBidder: "",
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.bidCheck = this.bidCheck.bind(this);
  }

  componentDidMount() {
    this.getOne();
  }

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

  updateInputValue(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    console.log(evt.target.value);
  }

  bidCheck(e) {
    e.preventDefault();
    let bidref = db.collection("property").doc(this.props.propId);

    let res = "";

    db.collection("property")
      .doc(this.props.propId)
      .onSnapshot((snapshot) => {
        console.log("snapshot.data()", snapshot);
        console.log("minimum bid: " + snapshot.get("minBid"));
        // query db checking if current bid exists
        let minBid = snapshot.get("minBid");
        if (minBid) {
          //comparing new bid to current bid
          if (this.state.newBid > snapshot.get("minBid")) {
            //if more update currentBid to newBid
            this.setState({
              highBidder: localStorage.getItem(LoginString.ID),
            });
            bidref.update({
              minBid: this.state.newBid,
              highBidder: this.state.highBidder,
            });
            console.log("updated bid from checking current bid");
            this.setState({show: true})
          } else {
            console.log("bid not higher than current bid");
          }
        } else {
          console.log("bid not higher than min bid");
        }
      });
    console.log(res);
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
        <input
          type="text"
          name="newBid"
          placeholder={+this.state.minBid + 1}
          value={this.state.newBid}
          onChange={this.updateInputValue}
        />
        <button
          className="bid"
          type="button"
          value="Open"
          onClick={this.bidCheck}
        >
          {" "}
          Make a Bid{" "}
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
              {`${localStorage.getItem(
                LoginString.Name
              )}, you currently have the highest bid!`}
            </h1>

            <br />
            <br />

            <a
              className="centerStuff"
              // href="/Renter"
              onClick={() => this.closeModal()}
            >
              Close
            </a>
          </div>
        </Modal>
      </section>
    );
  }
}
