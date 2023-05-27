import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import './Content.css';
import VisitButton from '../visit_button/VisitButton';

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      menuOpen: false,
      isVisited: false
    };
    this.contentRef = React.createRef();
    this.visitButtonRef = React.createRef(); // Create a ref for VisitButton
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

  setVisited () {
    this.setState({isVisited: false});
    setTimeout(() => {
      this.visitButtonRef.current.setButtonPressedState(this.state.isVisited); // Call setButtonPressedState through the ref
    }, 50);
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
          ref={this.menuRef}
        >
          <div className="review">
            <div className="header">
              <h2 className="title">{this.state.title}</h2>
              <div className="">
              </div>
              <VisitButton ref={this.visitButtonRef} />
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
            </div>
          </div>

        </Menu>
      </div>
    )
  }
}

export default Sidebar;