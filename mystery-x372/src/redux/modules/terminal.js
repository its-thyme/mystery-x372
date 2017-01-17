export const ADD_USER_MESSAGE = 'terminal/ADD_USER_MESSAGE';
export const ADD_COMPUTER_MESSAGE = 'terminal/ADD_COMPUTER_MESSAGE';

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

export const initialState = {
  inputEnabled: true,
  computerThinking: false,
  messages: []
};

export default function terminal(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_MESSAGE:
      return {
        ...state,
        messages: [
          ...messages,
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
          ...messages,
          {
            type: 'COMPUTER',
            text: action.text
          }
        ],
        inputEnabled: true,
        computerThinking: false
      };
    default:
      return state;
  }
}
