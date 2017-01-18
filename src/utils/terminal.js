export function parseUserMessage(text, currentDir) {
  const ciText = text.toLowerCase();
  switch (ciText) {
    case 'pwd':
      return `${currentDir}`;
    default:
      return `${text}: command not found`;
  }
};
