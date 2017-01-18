import { connect } from 'react-redux';
import Terminal from '../../components/terminal/Terminal';
import { parseUserMessage } from '../../utils/terminal';
import {
  addUserMessage,
  addComputerMessage,
  printDirectory,
  changeDirectory,
  listDirectory,
  clear
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
    const command = parseUserMessage(text);
    if (!command) {
      dispatch(addComputerMessage(`${text}: command not found`));
    }
    else {
      switch (command.command) {
        case 'pwd':
          dispatch(printDirectory());
          return;
        case 'cd':
          dispatch(changeDirectory(command.path));
          return;
        case 'ls':
          dispatch(listDirectory(command.path, command.showHidden));
          return;
        case 'clear':
          dispatch(clear());
          return;
        default:
          dispatch(addComputerMessage(`${text}: command not found`));
          return;
      }
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminal);
