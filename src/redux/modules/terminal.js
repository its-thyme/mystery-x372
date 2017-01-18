import { parseDirChange, showAllFiles } from '../../utils/terminal';

export const ADD_USER_MESSAGE = 'terminal/ADD_USER_MESSAGE';
export const ADD_COMPUTER_MESSAGE = 'terminal/ADD_COMPUTER_MESSAGE';
export const CHANGE_DIRECTORY = 'terminal/CHANGE_DIRECTORY';
export const PRINT_DIRECTORY = 'terminal/PRINT_DIRECTORY';
export const LIST_DIRECTORY = 'terminal/LIST_DIRECTORY';
export const CLEAR = 'terminal/CLEAR';

export function addUserMessage(text) {
  return {
    type: ADD_USER_MESSAGE,
    text
  };
}

export function addComputerMessage(text) {
  return {
    type: ADD_COMPUTER_MESSAGE,
    text
  };
}

export function changeDirectory(newDirectory) {
  return {
    type: CHANGE_DIRECTORY,
    newDirectory
  };
}

export function printDirectory() {
  return {
    type: PRINT_DIRECTORY
  };
}

export function listDirectory(path, showHidden) {
  return {
    type: LIST_DIRECTORY,
    path,
    showHidden
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}

function attemptDirChange(newDirectory, state) {
  const destination = parseDirChange(newDirectory, state.currentDir);
  if (destination.valid) {
    return {
      ...state,
      inputEnabled: true,
      computerThinking: false,
      currentDir: destination.newPath
    };
  }
  return {
    ...state,
    messages: [
      ...state.messages,
      {
        type: 'COMPUTER',
        text: `cd: ${destination.message}`
      }
    ],
    inputEnabled: true,
    computerThinking: false
  };
}

function attemptListDirectory(path, showHidden, state) {

  let fileList;

  if (path) {
    const destination = parseDirChange(path, state.currentDir);
    if (!destination.valid) {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'COMPUTER',
            text: `ls: ${destination.message}`
          }
        ],
        inputEnabled: true,
        computerThinking: false
      };
    }
    fileList = showAllFiles(destination.newPath, showHidden);
  } else {
    fileList = showAllFiles(state.currentDir, showHidden);
  }
  return {
    ...state,
    messages: [
      ...state.messages,
      {
        type: 'COMPUTER',
        text: fileList.join('\n')
      }
    ],
    inputEnabled: true,
    computerThinking: false
  };
}

export const initialState = {
  inputEnabled: true,
  computerThinking: false,
  currentDir: '/Users/Diana',
  messages: []
};

export default function terminal(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'USER',
            text: action.text
          }
        ],
        inputEnabled: false,
        computerThinking: true
      };
    case ADD_COMPUTER_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'COMPUTER',
            text: action.text
          }
        ],
        inputEnabled: true,
        computerThinking: false
      };
    case CHANGE_DIRECTORY:
      return attemptDirChange(action.newDirectory, state);
    case PRINT_DIRECTORY:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'COMPUTER',
            text: state.currentDir
          }
        ],
        inputEnabled: true,
        computerThinking: false
      };
    case LIST_DIRECTORY:
      return attemptListDirectory(action.path, action.showHidden, state);
    case CLEAR:
      return {
        ...state,
        messages: [],
        inputEnabled: true,
        computerThinking: false
      }
    default:
      return state;
  }
}
