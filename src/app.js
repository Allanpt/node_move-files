/* eslint-disable no-console */
'use strict';

const fs = require('fs');

function handlePathMoveTo(moveToStr) {
  if (moveToStr[moveToStr.length - 1] === '\\') {
    return moveToStr.slice(0, moveToStr.length - 1);
  }

  return moveToStr;
}

function handlePathMoveFrom(moveFromStr) {
  const splited = moveFromStr.split('\\');

  return splited[splited.length - 1];
}

function moveFile() {
  const [moveFrom, moveTo] = process.argv.slice(2);

  if (!moveFrom || !moveTo) {
    console.error('Is missing fields');

    return;
  }

  if (moveFrom === moveTo) {
    return;
  }

  fs.access(moveFrom, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`The file ${moveFrom} DOES NOT exist.`);

      return false;
    }
  });

  fs.stat(moveTo, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.rename(moveFrom, moveTo, (error) => {
          if (error) {
            console.error('Something went wrong:', error);

            return;
          }

          console.log('');
          console.log('File moved successfully');
          console.log('');
        });
      }
    } else if (stats.isDirectory()) {
      fs.rename(
        moveFrom,
        `${handlePathMoveTo(moveTo)}/${handlePathMoveFrom(moveFrom)}`,
        (error) => {
          if (error) {
            console.error('Something went wrong:', error);

            return;
          }

          console.log('');
          console.log('File moved successfully');
          console.log('');
        },
      );
    }
  });
}

moveFile();
