import React, { Component } from "react"

import PersonNamer from './components/person-namer'
import SimpleContractDisplay from './components/simple-contract-display'
import Network from './components/network'
import NetworkContext from './components/network-context'

import "./App.css"

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    networkId: null,
    name: ''
  }

  runExample = async () => {
    const { accounts, contract } = this.state

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] })

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call()

    // Update state with the result.
    this.setState({ storageValue: response })
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onNameSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  onNetworkResolve = (network) => {
    this.setState({
      web3: network.web3,
      accounts: network.accounts,
      networkId: network.networkId
    })
  }

  render() {
    if (!this.state.web3 || !this.state.networkId) {
      return <div>
        <Network onResolve={this.onNetworkResolve} />
        Loading Web3, accounts, and contract...
      </div>
    }

    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        
        <Network onResolve={this.onNetworkResolve} />
        <NetworkContext.Provider value={
          {
            accounts: this.state.accounts,
            web3: this.state.web3,
            networkId: this.state.networkId,
          }
          }>
          <SimpleContractDisplay />
          <PersonNamer name={this.state.name} onChange={this.onNameChange} onSubmit={this.onNameSubmit} />
        </NetworkContext.Provider>
      </div>
    )
  }
}

export default App
