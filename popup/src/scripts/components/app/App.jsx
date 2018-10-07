import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 1000)
  }

  render() {
    return (
      <div style={{width: 300, height: 100}}>
        This is the popup! {this.state.count}
      </div>
    );
  }
}

export default App;
