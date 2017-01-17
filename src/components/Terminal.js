import React, { Component } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import './Terminal.css';

class Message extends Component {
  componentWillEnter(callback) {
    this.props.componentDidEnter();
    callback();
  }

  render() {
    const message = this.props.message;

    return (
      <div
        className={message.type === 'user' ?
          'userMessage' : 'computerMessage'}
      >
        {message.text}
      </div>
    );
  }
}

class Terminal extends Component {

  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputEnter = this.onInputEnter.bind(this);
    this.componentDidEnter = this.componentDidEnter.bind(this);
    this.state = {
      inputText: '',
      inputEnabled: true,
      chatLog: []
    };
  }

  onInputChange(newText) {
    this.setState({
      inputText: newText.target.value
    });
  }

  onInputEnter(keyEvent) {
    if (keyEvent.keyCode === 13) {
      this.setState({
        inputText: '',
        inputEnabled: false,
        chatLog: [...this.state.chatLog, {
          type: 'user',
          text: this.state.inputText
        }]
      });
    }
  }

  componentDidEnter() {
    window.setTimeout(() => {
      this.setState({
        chatLog: [...this.state.chatLog, {
          type: 'computer',
          text: '...'
        }]
      });
    }, 1500);
  }

  render() {
    return (
      <div>
        <div className="outputContainer">
          <div className="messageContainer">
            <TransitionGroup
              transitionName="fadeIn"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >
              {this.state.chatLog.map((message, index) => {
                return <Message
                  message={message}
                  key={index}
                  componentDidEnter={this.componentDidEnter}/>;
              })}
            </TransitionGroup>
          </div>
        </div>
        <div className="container">
          <input
            type="text"
            className="mainInput"
            value={this.state.inputText}
            disabled={!this.state.inputEnabled}
            onChange={this.onInputChange}
            onKeyDown={this.onInputEnter}
          />
          <span className="blinkingCursor"/>
        </div>
      </div>
    );
  }
}

export default Terminal;
