import React, { Component } from "react";
import Modal from "react-awesome-modal";
import LoginString from "../Login/LoginStrings";
import firebase from "../../../auth";

export default class UploadPicModal extends Component {
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.currentPhotoFile = [];
    this.onChoosePhoto = this.onChoosePhoto.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  onChoosePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.currentPhotoFile.unshift(event.target.files);
      this.prefixFileType = event.target.files[0].type.toString();
      const file = event.target.files;
      for (let i = 0; i < file.length; i++) {
        this.files = file[i];
        console.log(`onChoose-files = ${this.files}`);
      }

      for (let i = 0; i < this.currentPhotoFile[0].length; i++) {
        if (this.prefixFileType.indexOf("image/") === 0) {
          this.fileArray.push(URL.createObjectURL(this.currentPhotoFile[0][i]));
        }
        this.setState({
          pic: this.fileArray,
        });

        this.uploadPhoto();
      }
    }
  };

  uploadPhoto = (e) => {
    if (this.fileArray.length) {
      localStorage.setItem(LoginString.PhotoURL, this.fileArray[0]);

      const uploadTask = firebase
        .storage()
        .ref(this.props.ownerName + "/")
        .child("ProfilePhoto")
        .put(this.files);

      uploadTask.on(
        LoginString.UPLOAD_CHANGED,
        null,
        (err) => {
          this.setState({ isLoading: false });
          this.props.showToast(0, err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            localStorage.setItem(LoginString.PhotoURL, downloadURL);
            // firebase
            //   .firestore()
            //   .collection("user")
            //   .doc(localStorage.getItem(LoginString.ID))
            //   .update({
            //     URL: downloadURL,
            //   });
            this.setState({
              isLoading: false,
            });
          });
        }
      );
    } else {
      this.setState({ isLoading: false });
      this.props.showToast(0, "File is null");
    }
  };

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
    const image = (
      <img
        className="ProfilePicture is-rounded"
        src={localStorage.getItem(LoginString.PhotoURL)}
        alt=""
        type="button"
        value="Open"
        onClick={() => this.openModal()}
      />
    );
    return (
      <section>
        <div className="column is-6">
          <div className="field">
            <div className="control">
              <label className="label">
                <i class="fas fa-camera-retro"></i> Add a Profile Picture:
              </label>
              {(this.fileArray || []).map((url) => (
                <img
                  className="image"
                  src={url}
                  alt="Property Image"
                  key={url}
                />
              ))}
              <button
                type="button"
                id="avatar"
                className="icOpenGallery"
                alt="input_file"
                onClick={() => {
                  if (!this.props.ownerName) {
                    alert("Please enter your Name");
                  } else {
                    this.refInput.click();
                  }
                }}
              >
                Upload Images
              </button>
              <input
                ref={(el) => {
                  this.refInput = el;
                }}
                className="viewInputGallery"
                accept="image/*"
                type="file"
                onChange={this.onChoosePhoto}
              />
            </div>
          </div>
        </div>

        {this.state.show ? (
          <Modal
            visible={this.state.show}
            width="400"
            height="500"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <div>
              <h1 className="centerStuff">
                {localStorage.getItem(LoginString.Name)}
              </h1>
              <img
                className="centerPic is-rounded"
                id="ProfilePicture"
                src={localStorage.getItem(LoginString.PhotoURL)}
                alt=""
              />
              <label className="label centerStuff">
                <i class="fas fa-camera-retro"></i> Change Your Profile Picture:
              </label>

              <button
                type="button"
                id="avatar"
                className="centerButt icOpenGallery"
                alt="input_file"
                onClick={() => {
                  this.refInput.click();
                }}
              >
                Upload Image
              </button>
              <input
                ref={(el) => {
                  this.refInput = el;
                }}
                className="centerStuff viewInputGallery"
                accept="image/*"
                type="file"
                onChange={this.onChoosePhoto}
              />
              <br />

              <a className="navbar-item centerStuff" href="/Dashboard">
                Go To Your Dashboard
              </a>

              <a className="centerStuff" onClick={() => this.closeModal()}>
                Close
              </a>
            </div>
          </Modal>
        ) : null}
      </section>
    );
  }
}
