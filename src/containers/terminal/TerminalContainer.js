import { connect } from 'react-redux';
import Terminal from '../../components/terminal/Terminal';
import { parseUserMessage } from '../../utils/terminal';
import {
  addUserMessage,
  addComputerMessage,
  printDirectory,
  changeDirectory,
  listDirectory,
  clear,
  showFileContents,
  showHelp
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
          break;
        case 'cd':
          dispatch(changeDirectory(command.path));
          break;
        case 'ls':
          dispatch(listDirectory(command.path, command.showHidden));
          break;
        case 'clear':
          dispatch(clear());
          break;
        case 'cat':
          dispatch(showFileContents(command.path));
          break;
        case 'help':
          dispatch(showHelp());
          break;
        default:
          dispatch(addComputerMessage(`${text}: command not found`));
          break;
      }
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminal);
