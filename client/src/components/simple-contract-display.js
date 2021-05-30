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

  componentDidMount = async () => {
    if (!this.state.networkId || !this.state.web3) {
      const { networkId, web3 } = this.context
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({networkId, web3, contract: instance}, this.runExample )
    }
  }

  runExample = async () => {
    const { contract } = this.state
    const { accounts } = this.context

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] })

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call()

    // Update state with the result.
    this.setState({ storageValue: response })
  }

  render () {
    return <div>The stored value is: {this.state.storageValue}</div>
  }
}

export default SimpleContractDisplay