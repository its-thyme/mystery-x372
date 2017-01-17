import { connect } from 'react-redux';
import Terminal from '../../components/terminal/Terminal';

import { addUserMessage, addComputerMessage } from '../../redux/modules/terminal';

function mapStateToProps(state) {
  return {
    inputEnabled: state.terminal.inputEnabled,
    computerThinking: state.terminal.computerThinking,
    messages: state.terminal.messages
  };
}

const mapDispatchToProps = (dispatch) => ({
  addUserMessage: (text) => {
    dispatch(addUserMessage(text));
  },
  addComputerMessage: (text) => {
    dispatch(addComputerMessage(text));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminal);
