import React, { Component } from 'react'
import styles from './App.less';

import TerminalContainer from '../containers/terminal/TerminalContainer';

class App extends Component {
  render () {
    return (
      <div>
        <TerminalContainer />
      </div>
    )
  }
}

export default App;
