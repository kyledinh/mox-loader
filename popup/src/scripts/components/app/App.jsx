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

  downloadImage(url) {
    console.log("trying to download: ", url);
    chrome.downloads.download({
      url: url
    });
  }

  render() {
    return (
      <div style={{width: 600, height: 400}}>
        This is the popup! {this.props.count.clicks}
        <div>
          <button type="button" onClick={this.resetCounter.bind(this)}>Reset!</button>
          <button type="button" onClick={this.changeColor.bind(this)}>Color BG Red</button>
        </div>
        {this.props.count.links.map((n, i) => {
          console.log(n);
          if (n.src != null) {
          let src = n.src;
            return (
                <div key={i} onClick={(n) => {this.downloadImage(src)}}>{n.src}</div>
            )
          }
          })
        }
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
