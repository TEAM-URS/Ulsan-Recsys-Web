import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import "./Content.css";
import VisitButton from "../visit_button/VisitButton";
import axios from "axios";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      menuOpen: false,
      isVisited: false,
      reviews: [],
      imageSrc: "",
    };
    this.contentRef = React.createRef();
    this.visitButtonRef = React.createRef(); // Create a ref for VisitButton
  }

  setTitle(title) {
    this.setState({ title: title });
    this.setState({ imageSrc: `img/${title}/1.jpg` });
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  setMenuOpen() {
    this.setState({ menuOpen: true });
  }

  setScrollTop() {
    const menu = document.querySelector(".bm-menu");
    const scrollToTop = () => {
      menu.scrollTop = 0;
    };
    window.requestAnimationFrame(scrollToTop);
  }

  setVisited() {
    this.setState({ isVisited: false });
    setTimeout(() => {
      this.visitButtonRef.current.setButtonPressedState(this.state.isVisited); // Call setButtonPressedState through the ref
    }, 50);
  }

  pullReviews(title) {
    axios
      .post("http://localhost:8000/pull_reviews/", {
        title: title,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ reviews: response.data }); // 상태 업데이트
      })
      .catch((error) => {
        console.error("Error pulling reviews:", error);
      });
  }
  render() {
    var reviewItems = <div key={0}></div>;
    const reviews = this.state.reviews; // 리뷰 데이터 가져오기
    reviewItems = reviews.map((review) => (
      <div>
        <p className="review-text">
          별점: {review.rating}
          <br />
          리뷰: {review.review}
        </p>
      </div>
    ));
    return (
      <div ref={this.contentRef}>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
          right
          width={"30%"}
          customCrossIcon={false}
          ref={this.menuRef}
        >
          <div className="review">
            <div className="header">
              <h2 className="title">{this.state.title}</h2>
              <div className=""></div>
              <VisitButton ref={this.visitButtonRef} title={this.state.title} /> {/* Pass the title value */}
            </div>
            <div className="image-wrapper">
              <img src={this.state.imageSrc} />
            </div>
            <div>{reviewItems}</div>
          </div>
        </Menu>
      </div>
    );
  }
}

export default Sidebar;
