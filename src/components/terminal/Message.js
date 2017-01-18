import React, { Component, PropTypes } from 'react';

import './Message.less';

class Message extends Component {

  static propTypes = {
    message: PropTypes.shape({
      type: PropTypes.oneOf(['USER', 'COMPUTER']).isRequired,
      text: PropTypes.string.isRequired
    }),
    thinking: PropTypes.bool
  };

  render() {

    const thinking = this.props.thinking;
    const isComputerMessage = thinking || this.props.message.type === 'COMPUTER';
    const text = thinking ? '...' : this.props.message.text;

    const className = thinking ? "thinkingMessage" :
      isComputerMessage ? "computerMessage" : "userMessage";

    return (
      <div className={className}>
        {text}
      </div>
    );
  }
}

export default Message;
