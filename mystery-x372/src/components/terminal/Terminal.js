import React, { Component, PropTypes } from 'react';
import styles from './Terminal.less';

class Terminal extends Component {

  static propTypes = {
    inputEnabled: PropTypes.bool.isRequired,
    computerThinking: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired
  };

  render() {

    const { inputEnabled, computerThinking, messages } = this.props;

    return (
      <div>
        <div className={styles.outputContainer}>
          <div className={styles.messgaeContainer}>

          </div>
        </div>
        <div className={styles.mainContainer}>
          <input className={styles.mainInput}/>
          <div className={inputEnabled ? styles.blinkingCursor : ''} />
        </div>
      </div>
    )
  }
}

export default Terminal;
