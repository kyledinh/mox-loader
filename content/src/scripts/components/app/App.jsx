import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Type} from '../../../../../system';


const NavBar = {
  width: '100%', display: 'flex', position: 'relative', zIndex: 100, justify: "space-between", spacing: 24,
  backgroundColor: 'rgba(0,0,0,.2)', padding: 10
}

const BarLeft = {
  marginRight: 10
}

const BarRight = {
  position: 'absolute',
  right: 10
}

const Button = {
  backgroundColor: '#232323',
  border: 'none',
  color: 'white',
  padding: '8px 8px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '12px'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkCount: 0,
      linkArray: []
    }
  }

  componentDidMount() {

    document.addEventListener('message', (e) => {
      const data = e.data;
      if (data) {
        switch (data.type) {
          case 'rc-call-ring-notify':
            // get call on ring event
            console.log('RingCentral Embeddable Voice Extension:', data.call);
            break;
          case 'rc-call-end-notify':
            // get call on call end event
            console.log('RingCentral Embeddable Voice Extension:', data.call);
            break;
          case 'rc-call-start-notify':
            // get call on start a outbound call event
            console.log('RingCentral Embeddable Voice Extension:', data.call);
            break;
          default:
            break;
        }
      }
    });
  }

  reportCount() {
    this.props.dispatch({
      type: Type.ADD_COUNT
    });
    this.props.dispatch({
      type: Type.ADD_LINKS,
      links: this.state.linkArray
    });
  }

  changeColor() {
    console.log("Called from Content page.");
    //document.body.bgColor="blue";
    let nodeList = document.querySelectorAll("img");
    let atags = [];

    nodeList.forEach((n) => {
      let obj = {
        src: n.src
      }
      atags.push(obj);
    });

    let pcount = atags.length;
    this.setState({
      linkCount: pcount,
      linkArray: atags
    });
  }

  render() {
    return (
      <div style={NavBar}>
        <div style={BarLeft}>
          Pages Scraped: {this.props.count.clicks}
        </div>
        <div style={BarLeft}>
          This Page's Img Count: {this.state.linkCount}
        </div>
        <div style={BarRight}>
          <button style={Button} type="button" onClick={() => this.changeColor()}>Scrape Img</button>
          <button style={Button} type="button" onClick={() => this.reportCount()}>Save</button>
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
