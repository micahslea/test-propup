import React, { Component } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import firebase from "../../../auth/";
import LoginString from "../Login/LoginStrings";
import MyGallery from "../ImageGallery";
import UpdateModal from "../UpdateModal";
import DeleteModal from "../DeleteModal";

const db = firebase.firestore();

class Edit extends Component {
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
      path: "",
    };

    this.updateInputValue = this.updateInputValue.bind(this);
  }

  //   delete() {
  //     if (window.confirm("Are you sure you want to delete this property")) {
  //       db.collection("property")
  //         .doc(this.props.match.params.id)
  //         .delete()
  //         .then(this.props.history.push("/Dashboard"));
  //     } else {
  //       document.getElementById("root").innerHTML = (

  //         <div>
  //           <a href="/Dashboard">Go Back To Your Dashboard</a>
  //         </div>
  //       );
  //     }
  //   }

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
          <p className="subtitle is-6">
            Listed By: <i>{this.state.owner}</i>
          </p>
        </div>
        <div className="content text-center">
          <p>{this.state.description}</p>

          <br></br>
          <p>{`The current bid is $${this.state.minBid} per night`}</p>

          <UpdateModal propId={this.props.match.params.id} />
          <DeleteModal propId={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}
export default Edit;
