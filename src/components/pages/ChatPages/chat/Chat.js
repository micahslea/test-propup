import React, { Component } from "react";
import LoginString from "../../Login/LoginStrings";
import firebase from "../../../../auth";
import "./Chat.css";
import ReactLoading from "react-loading";
import ChatBox from "../chatBox/ChatBox";
import WelcomeBoard from "../welcome/Welcome";
import SearchIcon from "@material-ui/icons/Search";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null,
      displayedContactSwitchNotification: [],
      displayedContacts: [],
    };
    this.currentUserName = localStorage.getItem(LoginString.Name);
    this.currentUserId = localStorage.getItem(LoginString.ID);
    this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);
    this.currentUserDocumentId = localStorage.getItem(
      LoginString.FirebaseDocumentId
    );

    this.currentUserMessages = [];
    this.searchUsers = [];
    this.notificationMessagesErase = [];

    this.onProfileClick = this.onProfileClick.bind(this);
    this.getListUser = this.getListUser.bind(this);
    this.renderListUser = this.renderListUser.bind(this);
    this.getClassNameforUserandNotification = this.getClassNameforUserandNotification.bind(
      this
    );
    this.notificationErase = this.notificationErase.bind(this);
    this.updateRenderList = this.updateRenderList.bind(this);
  }

  logout = () => {
    firebase.auth().signOut();
    this.props.history.push("/");
    localStorage.clear();
  };

  onProfileClick = () => {
    this.props.history.push("/Profile");
  };

  componentDidMount() {
    if (!localStorage.getItem(LoginString.ID)) {
      this.props.history.push("/");
    } else {
      firebase
        .firestore()
        .collection("user")
        .doc(this.currentUserDocumentId)
        .get()
        .then((doc) => {
          doc.data().messages.map((item) => {
            this.currentUserMessages.push({
              notificationId: item.notificationId,
              number: item.number,
            });
          });
          this.setState({
            displayedContactSwitchNotification: this.currentUserMessages,
          });
        });
      this.getListUser();
    }
  }

  getListUser = async () => {
    const result = await firebase.firestore().collection("user").get();
    if (result.docs.length > 0) {
      let listUsers = [];
      listUsers = [...result.docs];
      listUsers.forEach((item, index) => {
        this.searchUsers.push({
          key: index,
          documentKey: item.id,
          id: item.data().id,
          name: item.data().name,
          messages: item.data().messages,
          URL: item.data().URL,
          description: item.data().description,
        });
      });
      this.setState({
        isLoading: false,
      });
    }
    this.renderListUser();
  };

  getClassNameforUserandNotification = (itemId) => {
    let number = 0;
    let className = "";
    let check = false;
    if (
      this.state.currentPeerUser &&
      this.state.currentPeerUser.id === itemId
    ) {
      className = "viewWrapItemFocused";
    } else {
      this.state.displayedContactSwitchNotification.forEach((item) => {
        if (item.notificationId.length > 0) {
          if (item.notificationId === itemId) {
            check = true;
            number = item.number;
          }
        }
      });
      if (check === true) {
        className = "viewWrapItemNotification";
      } else {
        className = "viewWrapItem";
      }
    }
    return className;
  };

  notificationErase = (itemId) => {
    this.state.displayedContactSwitchNotification.forEach((el) => {
      if (el.notificationId.length > 0) {
        if (el.notificationId != itemId) {
          this.notificationMessagesErase.push({
            notificationId: el.notificationId,
            number: el.number,
          });
        }
      }
    });
    this.updateRenderList();
  };

  updateRenderList = () => {
    firebase
      .firestore()
      .collection("user")
      .doc(this.currentUserDocumentId)
      .update({ messages: this.notificationMessagesErase });

    this.setState({
      displayedContactSwitchNotification: this.notificationMessagesErase,
    });
  };

  renderListUser = () => {
    if (this.searchUsers.length > 0) {
      let viewListUser = [];
      let className = "";
      this.searchUsers.map((item) => {
        if (item.id != this.currentUserId) {
          className = this.getClassNameforUserandNotification(item.id);
          viewListUser.push(
            <button
              id={item.key}
              key={item.key}
              className={className}
              onClick={() => {
                this.notificationErase(item.id);
                this.setState({
                  currentPeerUser: item,
                  displayedContactSwitchNotification: this
                    .notificationMessagesErase,
                });
                document.getElementById(item.key).style.backgroundColor =
                  "#fff";
                if (document.getElementById(item.key)) {
                  document.getElementById(item.key).style.color = "#fff";
                }
              }}
            >
              <img className="viewAvatarItem" src={item.URL} alt="" />

              <div className="viewWrapContentItem">
                <span className="textItem">{`${item.name}`}</span>
              </div>
              {className === "viewWrapItemNotification" ? (
                <div className="notificationpragraph">
                  <p id={item.key} className="newmessages">
                    New Messages
                  </p>
                </div>
              ) : null}
            </button>
          );
        }
      });
      this.setState({
        displayedContacts: viewListUser,
      });
    } else {
      console.log("No user is present");
    }
  };

  searchHandler = (event) => {
    let searchQuery = event.target.value.toLowerCase(),
      displayedContacts = this.searchUsers.filter((el) => {
        let searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      });
    this.displayedContacts = displayedContacts;
    this.displaySearchedContacts();
  };

  displaySearchedContacts = () => {
    if (this.searchUsers.length > 0) {
      let viewListUser = [];
      let className = "";
      this.displayedContacts.map((item) => {
        if (item.id != this.currentUserId) {
          className = this.getClassNameforUserandNotification(item.id);
          viewListUser.push(
            <button
              id={item.key}
              className={className}
              onClick={() => {
                this.notificationErase(item.id);
                this.setState({
                  currentPeerUser: item,
                });
                document.getElementById(item.key).style.backgroundColor =
                  "#fff";
                document.getElementById(item.key).style.color = "#fff";
              }}
            >
              <img className="viewAvatarItem" src={item.URL} alt="" />

              <div className="viewWrapContentItem">
                <span className="textItem">{`${item.name}`}</span>
              </div>
              {className === "viewWrapItemNotification" ? (
                <div className="notificationpragraph">
                  <p id={item.key} className="newmessages">
                    New Messages
                  </p>
                </div>
              ) : null}
            </button>
          );
        }
      });
      this.setState({
        displayedContacts: viewListUser,
      });
    } else {
      console.log("No user is present");
    }
  };

  render() {
    return (
      <div className="root">
        <div className="body" id="chatdiv">
          <div className="viewListUser">
            <div className="profileviewleftside">
              <img
                className="ProfilePicture"
                alt=""
                src={this.currentUserPhoto}
                onClick={this.onProfileClick}
              />
              <button className="Logout" onClick={this.logout}>
                Logout
              </button>
            </div>
            <div className="rootsearchbar">
              <div className="input-container">
                <SearchIcon className="icon" />
                <input
                  className="input-field"
                  type="text"
                  onChange={this.searchHandler}
                  placeholder="Search"
                />
              </div>
            </div>
            {this.state.displayedContacts}
          </div>
          <div className="viewBoard">
            {this.state.currentPeerUser ? (
              <ChatBox
                currentPeerUser={this.state.currentPeerUser}
                showToast={this.props.showToast}
              />
            ) : (
              <WelcomeBoard
                currentUserName={this.currentUserName}
                currentUserPhoto={this.currentUserPhoto}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
