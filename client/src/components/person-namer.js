import React, { Component } from "react";

import NetworkContext from './network-context'
import PersonContract from '../contracts/PersonFactory.json'

class PersonNamer extends Component {
  static contextType = NetworkContext

  state = {
    networkId: null,
    web3: null,
    contract: null,
    name: '',
    people: null,
    count: 0
  }

  componentDidMount = async () => {
    if (!this.state.networkId || !this.state.web3) {
      const { networkId, web3 } = this.context
      const deployedNetwork = PersonContract.networks[networkId];
      const instance = new web3.eth.Contract(
        PersonContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({networkId, web3, contract: instance}, this.getCount)
    }
  }

  getCount = async () => {
    const { contract } = this.state
    const result = await contract.methods.get().call()
    this.setState({ count: result[1] })
  }

  onChange = (e) => {
    this.setState({name: e.target.value})
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { contract } = this.state
    const { accounts } = this.context
    await contract.methods.createPerson(this.state.name).send({ from: accounts[0], gas: 1000000 })
    const response = await contract.methods.get().call()
    this.setState({people: response[0], count: response[1]})
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' value={this.state.name} placeholder='input name' onChange={this.onChange} />
        <div>{this.state.people}</div>
        <div>{this.state.count}</div>

      </form>
    )
  }
}

export default PersonNamer