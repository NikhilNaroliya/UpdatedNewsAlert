import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <LoadingBar
        height= {3}
        color='#f11946'
        progress={this.state.progress}
      />
       <NavBar/>
       
       <News setProgress={this.setProgress}/>
      </div>
    )
  }
}

