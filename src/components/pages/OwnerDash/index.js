import React, { Component } from "react";
import "./styles.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Card } from "@material-ui/core";
import firebase from "../../../auth/";
import LoginString from "../Login/LoginStrings";
import UpdateModal from "../UpdateModal";

const db = firebase.firestore();

class OwnerDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propArray: [],
    };
  }

  getAll() {
    let docName = localStorage.getItem(LoginString.ID);
    console.log("docName = ", docName);
    db.collection("property")
      .where("ownerID", "==", docName)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.setState((prevState) => ({
            propArray: [
              ...prevState.propArray,
              {
                name: doc.data().name,
                address: doc.data().address,
                description: doc.data().description,
                minBid: doc.data().minBid,
                province: doc.data().province,
                pic: doc.data().pic,
                zipC: doc.data().zipC,
                ownerPic: localStorage.getItem(LoginString.PhotoURL),
                docID: doc.id,
              },
            ],
          }));
        });
      });
  }
  componentDidMount() {
    this.getAll();
    console.log(this.state.propArray);
    console.log(localStorage.getItem(LoginString.ID));
  }
  render() {
    let displayPosts = this.state.propArray.map((p) => (
      <div className="column is-desktop propCard propSingleCard">
        <div className="card animate__animated animate__fadeInUp">
          <div className="card-image">
            <figure className="image is-2by2">
              <img
                src={p.pic[0]}
                alt="House1"
                alt="Placeholder image"
                className="propPic"
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                <img
                    src={p.ownerPic }
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4"> {p.name} </p>
              </div>
            </div>
            <div className="content">
            <h6>Current Bid: </h6>
              <p>${p.minBid}</p>
              <h6>Description:</h6>
              <p>{p.description.length > 144 ? p.description.substring(0, 75) + "..." : p.description}</p>
              <br></br>
              <a href={`/edit/${p.docID}`} className="button" id="bid">
                Edit Prop
              </a>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="propresult">
        <div className="column">
          <h1>Your Current Listings:</h1>
        </div>
        <div className="columns is-desktop">
          <Card>{displayPosts}</Card>
        </div>
        <nav
          class="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <a class="pagination-previous">Previous</a>
          <a class="pagination-next">Next page</a>
          <ul class="pagination-list">
            <li>
              <a
                class="pagination-link is-current"
                aria-label="Goto page 1"
                href="/results"
              >
                1
              </a>
            </li>
            <li>
              <a
                class="pagination-link"
                aria-label="Goto page 2"
                href="/results"
              >
                2
              </a>
            </li>
            <li>
              <a
                class="pagination-link"
                aria-label="Page 3"
                aria-current="page"
                href="/results"
              >
                3
              </a>
            </li>
            <li>
              <a
                class="pagination-link"
                aria-label="Goto page 4"
                href="/results"
              >
                4
              </a>
            </li>
          </ul>
        </nav>
        <br></br>
      </div>
    );
  }
}
export default OwnerDash;
