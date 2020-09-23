import React from "react";
import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";

class MyGallery extends React.Component {
  render() {
    return <ImageGallery items={this.props.images} />;
  }
}

export default MyGallery;
