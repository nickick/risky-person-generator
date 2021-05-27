import React, { Component } from 'react'

import NetworkContext from './network-context'
import SimpleStorageContract from "../contracts/SimpleStorage.json"

class SimpleContractDisplay extends Component {
  static contextType = NetworkContext

  state = {
    networkId: null,
    web3: null,
    contract: null
  }

  componentDidUpdate = async () => {
    if (!this.state.networkId || !this.state.web3) {
      const { networkId, web3 } = this.context
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({networkId, web3, contract: instance})
    }
  }

  render () {
    console.log(this.context)
    return ''
  }
}

export default SimpleContractDisplay