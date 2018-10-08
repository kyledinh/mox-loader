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

  render() {
    return (
      <div style={{width: 300, height: 100}}>
        This is the popup! {this.props.count}
        <div>
          <button type="button" onClick={this.resetCounter.bind(this)}>Reset!</button>
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
