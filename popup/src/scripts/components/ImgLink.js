import React, { Component } from 'react';

export class ImgLink extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };
  }

  render() {
    return (
      <div key={this.props.key} style={{width: '100%'}} >
        <input
          type="checkbox"
          checked={this.props.selected}
          onClick={ () => this.props.onClick() }/>
        <input
          style={{width: '80%'}}
          value={this.props.value}
          name={this.props.name}
          disabled={this.props.disabled}
          />
      </div>
    )
  }
}
