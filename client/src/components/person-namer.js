import React, { Component } from "react";

class PersonNamer extends Component {
  render () {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input type='text' value={this.props.name} placeholder='input name' onChange={this.props.onChange} />
      </form>
    )
  }
}

export default PersonNamer