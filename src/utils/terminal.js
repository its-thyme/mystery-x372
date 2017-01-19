import findKey from 'lodash.findkey';
import get from 'lodash.get';

const fileTypes = {
  DIRECTORY: 'DIRECTORY',
  EXECUTABLE: 'EXECUTABLE',
  FILE: 'FILE'
};


export function parseUserMessage(text) {
  const ciText = text.split(' ');
  switch (ciText[0].toLowerCase()) {
    case 'pwd':
    case 'clear':
      return {
        command: ciText[0].toLowerCase()
      };
    case 'cd':
    case 'cat':
      return {
        command: ciText[0].toLowerCase(),
        path: ciText[1]
      };
    case 'ls':
      let showHidden = false;
      if (ciText[1] === '-a') {
        showHidden = true;
      }
      return {
        command: 'ls',
        path: showHidden ? ciText[2] : ciText[1],
        showHidden
      };
    default:
      return null;
  }
};

export function parsePath(dir, currentDir) {
  const path = dir.split('/');
  let outputPath = '';

  let loc = fileStructure;
  if (currentDir !== '/') {
    const currentPath = currentDir.substring(1).split('/');
    for (let i = 0; i < currentPath.length; i++) {
      loc = loc[currentPath[i]];
      outputPath += `/${currentPath[i]}`;
    }
  }

  for (let i = 0; i < path.length; i++) {
    if (path[i] === '.') {
      continue;
    }
    if (path[i] === '..') {
      const pathSplit = outputPath.lastIndexOf('/');
      const tempLoc = get(fileStructure,
        outputPath.substr(1, pathSplit - 1).replace(/\//g, '.'));
      /** findKey(fileStructure, (file) => {
        return file.hasOwnProperty(outputPath.substr(pathSplit + 1));
      });*/
      if (tempLoc === undefined) {
        loc = fileStructure;
      } else {
        loc = tempLoc;
      }
      outputPath = outputPath.substr(0, pathSplit);
      continue;
    }
    if (loc[path[i]] === undefined) {
      return {
        valid: false,
        message: `${dir}: No such file or directory`
      };
    }
    if (i !== path.length -1 && loc[path[i]].type !== fileTypes.DIRECTORY) {
      return {
        valid: false,
        message: `${dir}: Not a directory`
      }
    }
    loc = loc[path[i]];
    outputPath += `/${path[i]}`;
  }

  return {
    valid: true,
    newPath: outputPath === '' ? '/' : outputPath,
    loc
  };
}

export function getFileContents(dir, currentDir) {
  if (!dir) {
    return {
      valid: false,
      message: `cat: No such file or directory`
    };
  }
  const pathInfo = parsePath(dir, currentDir);
  if (!pathInfo.valid) {
    return {
      valid: false,
      message: `cat: ${pathInfo.message}`
    }
  }
  if (pathInfo.loc.type !== fileTypes.FILE) {
    return {
      valid: false,
      message: `cd: ${dir}: Is a directory`
    }
  }
  return {
    valid: true,
    message: pathInfo.loc.contents
  };
}

export function showAllFiles(dir, showHidden) {
  const path = dir.substr(1).replace(/\//g, '.');
  const loc = dir === '/' ? fileStructure : get(fileStructure, path);
  return Object.keys(loc).filter((key) => {
    return key !== 'type' && (showHidden || key.charAt(0) !== '.');
  }).sort();
}

export function parseDirChange(dir, currentDir) {

  if (!dir) {
    return {
      valid: true,
      newPath: '/Users/Diana'
    };
  }

  const pathInfo = parsePath(dir, currentDir);
  if (!pathInfo.valid) {
    return {
      valid: false,
      message: `cd: ${pathInfo.message}`
    }
  }
  if (pathInfo.newPath === '/') {
    return pathInfo;
  }
  if (pathInfo.loc.type !== fileTypes.DIRECTORY) {
    return {
      valid: false,
      message: `cd: ${dir}: Not a directory`
    }
  }
  return pathInfo;
}

const fileStructure = {
  'Applications': {
    type: fileTypes.DIRECTORY
  },
  'Users': {
    type: fileTypes.DIRECTORY,
    'Diana': {
      type: fileTypes.DIRECTORY,
      'logs': {
        type: fileTypes.DIRECTORY,
        '7.13.34': {
          type: fileTypes.FILE,
          contents: "... Help us."
        },
        '.help': {
          type: fileTypes.FILE,
          contents: "Man Pages"
        }
      }
    }
  },
  'sbin': {
    type: fileTypes.DIRECTORY
  },
  'usr': {
    type: fileTypes.DIRECTORY,
    'bin': {
      type: fileTypes.DIRECTORY,
      'vim': {
        type: fileTypes.EXECUTABLE
      }
    }
  }
};
