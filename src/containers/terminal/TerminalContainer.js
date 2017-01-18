import { connect } from 'react-redux';
import Terminal from '../../components/terminal/Terminal';
import { parseUserMessage } from '../../utils/terminal';
import {
  addUserMessage,
  addComputerMessage
} from '../../redux/modules/terminal';


function mapStateToProps(state) {
  return {
    inputEnabled: state.terminal.inputEnabled,
    computerThinking: state.terminal.computerThinking,
    messages: state.terminal.messages,
    currentDir: state.terminal.currentDir
  };
}

const mapDispatchToProps = (dispatch) => ({
  addMessage: (text, currentDir) => {
    dispatch(addUserMessage(text));
    dispatch(addComputerMessage(parseUserMessage(text, currentDir)));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminal);
