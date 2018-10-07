import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({
        count: this.state.count + 1
      });
    });
  }

  render() {
    return (
      <div style={{width: '100%', color: '#eee', backgroundColor: '#222', paddingLeft: 10, marginBottom: 6}}>
        Content Count: {this.state.count}
      </div>
    );
  }
}

export default App;
