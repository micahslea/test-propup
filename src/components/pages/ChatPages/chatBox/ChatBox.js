import React, { Component } from "react";
import { Card } from "react-bootstrap";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../../../../auth/";
import images from "../../../../projectImages/ProjectImages";
import moment from "react-moment";
import "./ChatBox.css";
import LoginString from "../../Login/LoginStrings";
import "bootstrap/dist/css/bootstrap.min.css";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      inputValue: "",
    };
    this.currentUserName = localStorage.getItem(LoginString.Name);
    this.currentUserId = localStorage.getItem(LoginString.ID);
    this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);
    this.currentUserDocumentId = localStorage.getItem(
      LoginString.FirebaseDocumentId
    );
    this.stateChanged = localStorage.getItem(LoginString.UPLOAD_CHANGED);
    this.currentPeerUser = this.props.currentPeerUser;
    this.groupChatId = null;
    this.listMessages = [];
    this.currentPeerUserMessages = [];
    this.removeListener = null;
    this.currentPhotoFile = null;

    firebase
      .firestore()
      .collection("user")
      .doc(this.currentPeerUser.documentKey)
      .get()
      .then((docRef) => {
        this.currentPeerUserMessages = docRef.data().messages;
      });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentPeerUser) {
      this.currentPeerUser = newProps.currentPeerUser;
      this.getListHistory();
    }
  }

  componentDidMount() {
    this.getListHistory();
  }

  componentWillUnmount() {
    if (this.removeListener) {
      this.removeListener();
    }
  }

  getListHistory = () => {
    this.listMessages.length = 0;
    this.setState({
      isLoading: true,
    });
    if (
      this.hashString(this.currentUserId) <=
      this.hashString(this.currentPeerUser.id)
    ) {
      this.groupChatId = `${this.currentUserId}-${this.currentPeerUser.id}`;
    } else {
      this.groupChatId = `${this.currentPeerUser.id}-${this.currentUserId}`;
    }
    //Get history and listen new data added
    this.removeListener = firebase
      .firestore()
      .collection("Messages")
      .doc(this.groupChatId)
      .collection(this.groupChatId)
      .onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === LoginString.DOC) {
              this.listMessages.push(change.doc.data());
            }
          });
          this.setState({
            isLoading: false,
          });
        },
        (err) => {
          this.props.showToast(0, err.toString());
        }
      );
  };

  onSendMessage = (content, type) => {
    let notificationMessages = [];
    if (content.trim() === "") {
      return;
    }
    const timestamp = Date.now().toString();
    const itemMessage = {
      idFrom: this.currentUserId,
      idTo: this.currentPeerUser.id,
      timestamp: timestamp,
      content: content.trim(),
      type: type,
    };
    firebase
      .firestore()
      .collection("Messages")
      .doc(this.groupChatId)
      .collection(this.groupChatId)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        this.setState({
          inputValue: "",
        });
      });

    this.currentPeerUserMessages.map((item) => {
      if (item.notificationId != this.currentUserId) {
        notificationMessages.push({
          notificationId: item.notificationId,
          number: item.number,
        });
      }
    });
  };

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  onKeyboardPress = (event) => {
    if (event.key === "Enter") {
      this.onSendMessage(this.state.inputValue, 0);
    }
  };

  render() {
    return (
      <Card className="viewChatBoard">
        <div className="headerChatBoard">
          <img
            className="viewAvatarItem"
            src={this.currentPeerUser.URL}
            alt=""
          />
          <span className="textHeaderChatBoard">
            <p style={{ fontSize: "20px" }}>{this.currentPeerUser.name}</p>
          </span>
          <div>
            <span className="aboutme">
              <p>{this.currentPeerUser.description}</p>
            </span>
          </div>
        </div>
        <div className="viewListContentChat">
          {this.renderListMessage()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <div className="viewBottom">
          <img
            className="icOpenGallery"
            src={images.input_file}
            alt="input_file"
            onClick={() => {
              this.refInput.click();
            }}
          />
          <input
            ref={(el) => {
              this.refInput = el;
            }}
            className="viewInputGallery"
            accept="image/*"
            type="file"
            onChange={this.onChoosePhoto}
          />
          <input
            className="viewInput"
            placeholder="Type a message"
            value={this.state.inputValue}
            onChange={(event) => {
              this.setState({ inputValue: event.target.value });
            }}
            onKeyPress={this.onKeyboardPress}
          />
          <img
            className="icSend"
            src={images.send}
            alt="icon send"
            onClick={() => {
              this.onSendMessage(this.state.inputValue, 0);
            }}
          />
        </div>
        {this.state.isLoading ? (
          <div className="viewLoading">
            <ReactLoading
              type={"spin"}
              color={"#203152"}
              height={"3%"}
              width={"3%"}
            />
          </div>
        ) : null}
      </Card>
    );
  }

  onChoosePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ isLoading: true });
      this.currentPhotoFile = event.target.files[0];
      const prefixFileType = event.target.files[0].type.toString();
      if (prefixFileType.indexOf("image/") === 0) {
        this.uploadPhoto();
      } else {
        this.setState({ isLoading: false });
        this.props.showToast(0, "This file is not an image");
      }
    } else {
      this.setState({ isLoading: false });
    }
  };

  uploadPhoto = () => {
    if (this.currentPhotoFile) {
      const timestamp = Date.now().toString();
      const uploadTask = firebase
        .storage()
        .ref()
        .child(timestamp)
        .put(this.currentPhotoFile);

      uploadTask.on(
        LoginString.UPLOAD_CHANGED,
        null,
        (err) => {
          this.setState({ isLoading: false });
          this.props.showToast(0, err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.setState({ isLoading: false });
            this.onSendMessage(downloadURL, 1);
          });
        }
      );
    } else {
      this.setState({ isLoading: false });
      this.props.showToast(0, "File is null");
    }
  };

  renderListMessage = () => {
    if (this.listMessages.length > 0) {
      let viewListMessage = [];
      this.listMessages.forEach((item, index) => {
        if (item.idFrom === this.currentUserId) {
          if (item.type === 0) {
            viewListMessage.push(
              <div className="viewItemRight" key={item.timestamp}>
                <span className="textContentItem">{item.content}</span>
              </div>
            );
          } else if (item.type === 1) {
            viewListMessage.push(
              <div className="viewItemRight2" key={item.timestamp}>
                <img
                  className="imgItemRight"
                  src={item.content}
                  alt="Please update your image"
                />
              </div>
            );
          }
        } else {
          if (item.type === 0) {
            viewListMessage.push(
              <div className="viewWrapItemLeft" key={item.timestamp}>
                <div className="viewWrapItem3">
                  {this.isLastMessageLeft(index) ? (
                    <img
                      src={this.currentPeerUser.URL}
                      alt="avatar"
                      className="peerAvatarLeft"
                    />
                  ) : (
                    <div className="viewPaddingLeft" />
                  )}
                  <div className="viewItemLeft">
                    <span className="textContentItem">{item.content}</span>
                  </div>
                </div>
                {/* {this.isLastMessageLeft(index) ? (
                  <span className="textTimeLeft">
                    <div className="time">
                      {moment(Number(item.timestamp)).format("11")}
                    </div>
                  </span>
                ) : null} */}
              </div>
            );
          } else if (item.type === 1) {
            viewListMessage.push(
              <div className="viewWrapItemLeft" key={item.timestamp}>
                <div className="viewWrapItem2">
                  {this.isLastMessageLeft(index) ? (
                    <img
                      src={this.currentPeerUser.URL}
                      alt="avatar"
                      className="peerAvatarLeft"
                    />
                  ) : (
                    <div className="viewPaddingLeft" />
                  )}
                  <div className="viewItemLeft2">
                    <img
                      src={item.content}
                      alt="content message"
                      className="imgItemLeft"
                    />
                  </div>
                </div>
                {/* {this.isLastMessageLeft(index) ? (
                  <span className="textTimeLeft">
                    <div className="time">
                      {moment(Number(item.timestamp)).format("11")}
                    </div>
                  </span>
                ) : null} */}
              </div>
            );
          }
        }
      });
      return viewListMessage;
    }
  };

  hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash; // Covert to 32bit integer
    }
    return hash;
  };

  isLastMessageLeft(index) {
    if (
      (index + 1 < this.listMessages.length &&
        this.listMessages[index + 1].idFrom === this.currentUserId) ||
      index === this.listMessages.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  isLastMessageRight(index) {
    if (
      (index + 1 < this.listMessages.length &&
        this.listMessages[index + 1].idFrom === this.currentUserId) ||
      index === this.listMessages.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default ChatBox;
