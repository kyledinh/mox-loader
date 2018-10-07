import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Type} from '../../../../../system';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: Type.ADD_COUNT
      });
    });
  }

  render() {
    return (
      <div style={{width: 300, height: 100}}>
        This is the popup! {this.props.count}
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
