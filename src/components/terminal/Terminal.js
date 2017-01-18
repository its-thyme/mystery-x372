import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Message from './Message';

import './Terminal.less';

class Terminal extends Component {

  static propTypes = {
    inputEnabled: PropTypes.bool.isRequired,
    computerThinking: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    addMessage: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputEnter = this.onInputEnter.bind(this);
    this.state = {
      text: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.computerThinking && !this.props.computerThinking) {
      // this.props.addComputerMessage('...');
    }
  }

  onInputChange(event) {
    this.setState({ text: event.target.value });
  }

  onInputEnter(event) {
    if (event.key === 'Enter') {
      this.props.addMessage(this.state.text, this.props.currentDir);
      this.setState({ text: '' });
    }
  }

  render() {

    const { inputEnabled, computerThinking, messages } = this.props;

    return (
      <div>
        <div className="outputContainer">
          <div className="messageContainer">
            <CSSTransitionGroup
              transitionName="fadeIn"
              transitionEnterTimeout={1500}
              transitionLeaveTimeout={1}
            >
              {messages.map((message, index) => {
                return <Message key={index} message={message} />;
              })}
              {computerThinking &&
                <Message
                  key={messages.length}
                  thinking
                />}
            </CSSTransitionGroup>
          </div>
        </div>
        <div className="mainContainer">
          <input
            className="mainInput"
            autoFocus
            onChange={this.onInputChange}
            onKeyPress={this.onInputEnter}
            disabled={!inputEnabled}
            value={this.state.text}
          />
          <div className={inputEnabled ? "blinkingCursor" : ''} />
        </div>
      </div>
    )
  }
}

export default Terminal;
