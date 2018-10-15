import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Type} from '../../../../../system';
import {ImgLink} from '../ImgLink';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { people: [] };
  }

  resetCounter() {
    this.props.dispatch({
      type: Type.RESET_COUNT
    });
    this.setState({people: []});
  }

  changeColor() {
    let color = '#ff0000';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  }

  selectLink(i) {
    let formdata = this.props.count.links;
    let selected = formdata[i].selected ? true : false;
    formdata[i].selected = !selected;
    this.props.dispatch({
      type: Type.ADD_LINKS,
      links: formdata
    });
  }

  downloadImage(url) {
    console.log("trying to download: ", url);
    chrome.downloads.download({
      url: url
    });
  }

  downloadSelectedImages() {
    let cnt = 0;
    this.props.count.links.map((n, i) => {
      if (n.selected) {
        this.downloadImage(n.src);
        cnt++;
      }
    });
    if (cnt === 0) {
      alert('No image links are selected');
    } else {
      alert('Downloaded ' + cnt + ' images.')
    }
  }

  fetchStarWars() {
    fetch("https://swapi.co/api/people/?page=1&format=json")
    .then(res => res.json())
    .then(
      (payload) => {
        this.setState({
          isLoaded: true,
          people: payload.results
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    return (
      <div style={{width: 600, height: 400}}>
        Pages scraped: {this.props.count.clicks}
        <div>
          <button type="button" onClick={this.resetCounter.bind(this)}>Reset!</button>
          <button type="button" onClick={this.fetchStarWars.bind(this)}>Fetch SW</button>
          <button type="button" onClick={this.changeColor.bind(this)}>Color BG Red</button>
          <button type="button" onClick={this.downloadSelectedImages.bind(this)}>Download Selected Images</button>

        </div>
        { this.props.count.links.map((n, i) => {
          console.log(n);
          if (n.src != null) {
            let src = n.src;
            return ( <ImgLink key={i} onClick={(n) => {this.selectLink(i)}} value={n.src} />)
          }
        })}
        <br/>
        <br/>
        { this.state.people.map((p, i) => {
          console.log(p);
          if (p.name != null) {
            return ( <h6 key={i}>{p.name} </h6>)
          }
        })}
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
