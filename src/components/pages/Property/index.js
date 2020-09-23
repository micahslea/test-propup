import React, { Component } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import firebase from "../../../auth/";
import LoginString from "../Login/LoginStrings";
import MyGallery from "../ImageGallery";
import BidModal from "../BidModal";
import "./styles.css"

const db = firebase.firestore();

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBid: 0,
      name: "",
      address: "",
      description: "",
      minBid: "",
      province: "",
      pic: [],
      zipC: "",
      owner: "",
      highBidder: "",
      ownerPic: null,
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.bidCheck = this.bidCheck.bind(this);
  }

  componentDidMount() {
    this.getOne();
    if (!localStorage.getItem(LoginString.ID)) {
      this.props.history.push("/");
    }
  }

  updateInputValue(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    console.log(evt.target.value);
  }

  bidCheck(e) {
    e.preventDefault();
    let bidref = db.collection("property").doc(this.state.name);

    let res = "";

    db.collection("property")
      .where("name", "==", this.props.match.params.id)
      .get()
      .then((snapshot) => {
        console.log("snapshot.data()", snapshot.data());
        console.log("minimum bid: " + snapshot.minBid);
        // query db checking if current bid exists
        let minBid = snapshot.minBid;
        if (minBid) {
          //comparing new bid to current bid
          if (this.state.newBid > snapshot.minBid) {
            //if more update currentBid to newBid
            this.setState({
              highBidder: localStorage.getItem(LoginString.ID),
            });
            bidref.update({
              minBid: this.state.newBid,
              highBidder: this.state.highBidder,
            });
            console.log("updated bid from checking current bid");
            return <BidModal show={true} />;
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
      .doc(this.props.match.params.id)
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
              ownerPic: snap.data().URL,
              docID: doc.id,
            });
          });
      });
  }

  render() {
    let displayPics = this.state.pic.map((pics) => {
      console.log(`pics = ${pics}`);
      return <img src={pics} alt="House1" />;
    });

    let images = [];

    this.state.pic.map((pics) => {
      images.push({
        original: pics,
        thumbnail: pics,
      });
    });

    return (
      <div className="column" style={{ marginTop: "100px" }}>
        <MyGallery images={images} />
        <div className="media-content text-center">
        
          <p className="title is-4"> {this.state.name} </p>
          {/* <figure className="image is-48x48 is-centered centerPls"> */}
                  <img
                    className="is-centered is-48x48"
                    id="centerPls"
                    src={this.state.ownerPic ? this.state.ownerPic : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQE9tG_NFfmLde3aA3q3p2yib1KJslRRNlJQg&usqp=CAU"}
                    alt="Placeholder image"
                  />
         {/* </figure> */}
          <p className="subtitle is-6">
            Listed By: <i>{this.state.owner}</i>
          </p>
        </div>
        <div className="content text-center">
          <h4>Description:</h4>
          <p>{this.state.description}</p>

          <br></br>
          <p>{`The current bid is $${this.state.minBid} per night`}</p>

          <BidModal propId={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}
export default Property;
