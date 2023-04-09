import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import './Content.css';

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      menuOpen: false
    };
    this.contentRef = React.createRef();
  }

  setTitle(title) {
    this.setState({title: title});
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  setMenuOpen () {
    this.setState({menuOpen: true})
  }

  setScrollTop () {
    const menu = document.querySelector('.bm-menu');
    const scrollToTop = () => {
      menu.scrollTop = 0;
    };
    window.requestAnimationFrame(scrollToTop);
  }

  render () {
    return (
      <div ref={this.contentRef}>
        <Menu 
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
          right
          width={'30%'}
          customCrossIcon={false}
          ref={this.menuRef} // menuRef를 전달
        >
          <div className="review">
            <div className="header">
              <h2 className="title">{this.state.title}</h2>
              <div className="rating">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9734;</span>
                <span className="rating-text">4.0</span>
              </div>
            </div>
            <div className="image-wrapper">
            </div>
            <div>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
              <p className="review-text">리뷰 내용</p>
            </div>
          </div>

        </Menu>
      </div>
    )
  }
}

export default Sidebar;