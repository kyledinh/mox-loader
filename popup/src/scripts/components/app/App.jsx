import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Type} from '../../../../../system';

class App extends Component {
  constructor(props) {
    super(props);
  }

  resetCounter() {
    this.props.dispatch({
      type: Type.RESET_COUNT
    });
  }

  changeColor() {
    let color = '#ff0000';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  }

  render() {
    return (
      <div style={{width: 300, height: 100}}>
        This is the popup! {this.props.count}
        <div>
          <button type="button" onClick={this.resetCounter.bind(this)}>Reset!</button>
          <button type="button" onClick={this.changeColor.bind(this)}>Color BG Red</button>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
