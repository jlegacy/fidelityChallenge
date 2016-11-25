/*********************************************************      */
/*Fidelity Challenge                                            */
/*Author: By Joseph Legacy                                      */
/*Date:   25-Nov-2016                                           */
/*Instructions:                                                 */
/* At bottom of program, manipulate the following variables.    */
/* var iterations = [10, 12, 16, 32];                           */
/* var startChar = 'E';                                         */
/* This example will runs 4 sequences with the following lengths*/
/* 10, 12, 16, 32                                               */
/* Use startChar to set initial Starting position               */
/*********************************************************      */
var keyPad = [];
var keyPadWorking = [];
var rows = [];
var sequences = [];
var workingSequences = [];
var rowCount = 4;
var rulesArray = [];
var invalidSequences = [];
var foundStart, pseq;
var loadKeyPad = function () {
  //Load keyPad Array//
  for (var z = 0; z < rowCount; z++) {
    keyPad.push([]);
  }
  keyPad[0].push('1', 'A', 'B', 'C', '3');
  keyPad[1].push('D', '2', 'E', '4', 'F');
  keyPad[2].push('G', 'H', 'I', 'J', 'K');
  keyPad[3].push('', 'L', 'M', 'N', '');
}
var generateRules = function () {
  rulesArray.push({
    'dir1': { 'position': 'north', 'spaces': 2 },
    'dir2': { 'position': 'west', 'spaces': 1 }
  });
  rulesArray.push({
    'dir1': { 'position': 'north', 'spaces': 2 },
    'dir2': { 'position': 'east', 'spaces': 1 }
  });
  rulesArray.push({
    'dir1': { 'position': 'east', 'spaces': 2 },
    'dir2': { 'position': 'north', 'spaces': 1 }
  });
  rulesArray.push({
    'dir1': { 'position': 'east', 'spaces': 2 },
    'dir2': { 'position': 'south', 'spaces': 1 }
  });
  rulesArray.push({
    'dir1': { 'position': 'south', 'spaces': 2 },
    'dir2': { 'position': 'east', 'spaces': 1 }
  });
  rulesArray.push({
    'dir1': { 'position': 'south', 'spaces': 2 },
    'dir2': { 'position': 'west', 'spaces': 1 }
  });
  rulesArray.push({
    'dir1': { 'position': 'west', 'spaces': 2 },
    'dir2': { 'position': 'north', 'spaces': 1 }
  });
  rulesArray.push({
    'dir1': { 'position': 'west', 'spaces': 2 },
    'dir2': { 'position': 'south', 'spaces': 1 }
  });
}
var generateSequence = function (start, n) {
  var printSequence = [];
  var searchCharacter = "";
  var captureSequence = [];
  var workingSequences = [];
  workingSequences = sequences.slice(0);
  printSequence.push(keyPad[start.row][start.column]);
  //create sequence//
  for (var z = 0; z < n; z++) {
    for (x in workingSequences) {
      if (z === 0) {
        searchCharacter = keyPad[start.row][start.column];
      }
      if (workingSequences[x]["start"] === searchCharacter) {
        printSequence.push(workingSequences[x]["end"]);
        captureSequence = workingSequences[x];
        workingSequences.splice(x, 1);
        workingSequences.push(captureSequence);
        searchCharacter = printSequence[printSequence.length - 1];
        break;
      }
    }
  }
  return printSequence;
}
var setSequenceStart = function (keyValue) {
  var foundObj = {};
  for (var row = 0; row < keyPad.length; row++) {
    for (var column = 0; column < keyPad[row].length; column++) {
      if (keyPad[row][column] === keyValue) {
        foundObj.row = row;
        foundObj.column = column;
        return foundObj;
      }
    }
  }
  return null;
}
var verifyValidCells = function (dir, col, row, spaces) {
  var invalid = false;
  var index;
  switch (dir) {
    case 'north':
      index = 0;
      for (var z = 0; z < spaces; z++) {
        if (typeof keyPad[row - z] === 'undefined' || keyPad[row - z] === '') {
          invalid = true;
          return;
        }
        if (typeof keyPad[row - z][col] === 'undefined' || keyPad[row - z][col] === '') {
          invalid = true;
          return;
        }
        ++index;
      }
      if (!invalid)
        return row - index;
      return null;
    case 'south':
      index = 0;
      for (var z = 1; z <= spaces; z++) {
        if (typeof keyPad[row + z] === 'undefined' || keyPad[row + z] === '') {
          invalid = true;
          return;
        }
        if (typeof keyPad[row + z][col] === 'undefined' || keyPad[row + z][col] === '') {
          invalid = true;
          return;
        }
        ++index;
      }
      if (!invalid)
        return row + index;
      return null;
    case 'east':
      index = 0;
      for (var z = 1; z <= spaces; z++) {
        if (typeof keyPad[row] === 'undefined' || keyPad[row] === '') {
          invalid = true;
          return;
        }
        if (typeof keyPad[row][col + z] === 'undefined' || keyPad[row][col + z] === '') {
          invalid = true;
          return;
        }
        ++index;
      }
      if (!invalid)
        return col + index;
      return null;
    case 'west':
      index = 0;
      for (var z = 1; z <= spaces; z++) {
        if (typeof keyPad[row] === 'undefined' || keyPad[row] === '') {
          invalid = true;
          return;
        }
        if (typeof keyPad[row][col - z] === 'undefined' || keyPad[row][col - z] === '') {
          invalid = true;
          return;
        }
        ++index;
      }
      if (!invalid)
        return col - index;
      return null;
  }
}
var createRuleEndPoints = function (row, column) {
  var colStartRow, colStartCol;
  if (keyPad[row][column] > '') {
    for (var x in rulesArray) {
      //calculate new position//
      switch (rulesArray[x].dir1.position) {
        case 'north':
        case 'south':
          colStartRow = verifyValidCells(rulesArray[x].dir1.position, column, row, rulesArray[x].dir1.spaces);
          break;
        case 'east':
        case 'west':
          colStartCol = verifyValidCells(rulesArray[x].dir1.position, column, row, rulesArray[x].dir1.spaces);
          break;
      }
      switch (rulesArray[x].dir2.position) {
        case 'north':
        case 'south':
          colStartRow = verifyValidCells(rulesArray[x].dir2.position, colStartCol, row, rulesArray[x].dir2.spaces);
          break;
        case 'east':
        case 'west':
          colStartCol = verifyValidCells(rulesArray[x].dir2.position, column, colStartRow, rulesArray[x].dir2.spaces);
          break;
      }
      if (typeof keyPad[colStartRow] !== 'undefined') {
        if (typeof keyPad[colStartRow][colStartCol] !== 'undefined') {
          if (keyPad[colStartRow][colStartCol] > '') {
            sequences.push({ 'start': keyPad[row][column], 'end': keyPad[colStartRow][colStartCol] })
          }
        }
      }
    }
  }
}
var generateEndPoints = function () {
  for (x in keyPad) {
    for (var z = 0; z < keyPad[x].length; z++) {
      createRuleEndPoints(parseInt(x), z);
    }
  }
}
/********************************************** */
//Main Driver//
/********************************************** */
var iterations = [10, 12, 16, 32];
var startChar = 'E';
loadKeyPad();
generateRules();
generateEndPoints();

for (x in iterations) {
  console.log('Generated ' + iterations[x] + ' sequences: ' + generateSequence(setSequenceStart(startChar), iterations[x]));
}