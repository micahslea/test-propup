import React, { Component } from "react";
import "./styles.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import LoginString from "../Login/LoginStrings";
import firebase from "../../../auth";

class UploadProp extends Component {
  fileArray = [];
  imageArray = [];

  componentDidMount() {
    if (!localStorage.getItem(LoginString.ID)) {
      this.props.history.push("/Signup");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      ownerID: localStorage.getItem(LoginString.ID),
      name: "",
      address: "",
      province: "",
      zipC: "",
      minBid: "",
      pic: [null],
      description: "",
      city: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChoosePhoto = this.onChoosePhoto.bind(this);
    this.currentPhotoFile = [];
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
      .set({
        ownerID: this.state.ownerID,
        name: this.state.name,
        address: this.state.address,
        province: this.state.province,
        zipC: this.state.zipC,
        minBid: this.state.minBid,
        pic: this.imageArray,
        description: this.state.description,
        city: this.state.city,
      })
      .then(() => {
        console.log("prop submitted");
        console.log(this.state.ownerID);
        // window.location.reload(false);
        this.props.history.push("/Dashboard")
      });
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
      const timestamp = Date.now().toString();

      const uploadTask = firebase
        .storage()
        .ref(localStorage.getItem(LoginString.ID) + "/" + this.state.name + "/")
        .child(this.files.name)
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
            console.log("downloadURL = ", downloadURL);
            this.imageArray.push(downloadURL);
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
    document.getElementById("form").reset();
  };

  render() {
    return (
      <div className="hero">
        <div className="notification property is-desktop">
          <form onSubmit={this.handleSubmit} id="form">
            <div className="columns is-desktop is-12">
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
                      onChange={this.handleChange}
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

              <div className="column is-2">
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

              <div className="column is-1">
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
            </div>

            <div className="columns is-desktop">
              <div className="column">
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

              <div className="column">
                <div className="field">
                  <div className="control">
                    <label className="label">Add Property Pictures:</label>

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
                      id="upload"
                      className="icOpenGallery"
                      alt="input_file"
                      onClick={() => {
                        if (!this.state.name) {
                          alert("Please enter a Property Name");
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

              <div className="column is-half">
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
                  <button type="submit" id="submit" >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadProp;
