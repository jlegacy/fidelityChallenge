var keyPad = [];
var keyPadWorking = [];
var rows = [];
var sequences = [];
var workingSequences = [];
var rowCount = 4;
var rulesArray = [];
var invalidSequences = [];


rulesArray.push({
  'dir1': {
    'position': 'north',
    'spaces': 2
  },
  'dir2': {
    'position': 'west',
    'spaces': 1
  }
});
rulesArray.push({
  'dir1': {
    'position': 'north',
    'spaces': 2
  },
  'dir2': {
    'position': 'east',
    'spaces': 1
  }
});
rulesArray.push({
  'dir1': {
    'position': 'east',
    'spaces': 2
  },
  'dir2': {
    'position': 'north',
    'spaces': 1
  }
});
rulesArray.push({
  'dir1': {
    'position': 'east',
    'spaces': 2
  },
  'dir2': {
    'position': 'south',
    'spaces': 1
  }
});
rulesArray.push({
  'dir1': {
    'position': 'south',
    'spaces': 2
  },
  'dir2': {
    'position': 'east',
    'spaces': 1
  }
});
rulesArray.push({
  'dir1': {
    'position': 'south',
    'spaces': 2
  },
  'dir2': {
    'position': 'west',
    'spaces': 1
  }
});
rulesArray.push({
  'dir1': {
    'position': 'west',
    'spaces': 2
  },
  'dir2': {
    'position': 'north',
    'spaces': 1
  }
});
rulesArray.push({
  'dir1': {
    'position': 'west',
    'spaces': 2
  },
  'dir2': {
    'position': 'south',
    'spaces': 1
  }
});

//Load keyPad Array//
for (var z = 0; z < rowCount; z++) {
  keyPad.push([]);
}

//console.log(keyPad);
keyPad[0].push('1');
keyPad[0].push('A');
keyPad[0].push('B');
keyPad[0].push('C');
keyPad[0].push('3');

keyPad[1].push('D');
keyPad[1].push('2');
keyPad[1].push('E');
keyPad[1].push('4');
keyPad[1].push('F');

keyPad[2].push('G');
keyPad[2].push('H');
keyPad[2].push('I');
keyPad[2].push('J');
keyPad[2].push('K');

keyPad[3].push('');
keyPad[3].push('L');
keyPad[3].push('M');
keyPad[3].push('N');
keyPad[3].push('');

var generateSequence = function (start, n) {
  var printSequence = [];
  var endCharacter = "";
  var searchCharacter = "";

  workingSequences = sequences.slice(0);

  printSequence.push(keyPad[start.row][start.column]);

  //set initial end//

  for (x in workingSequences) {
    if (workingSequences[x]["start"] === keyPad[start.row][start.column]) {
      printSequence.push(workingSequences[x]["end"]);
      workingSequences.splice(x,1);
      break;
    }
  }

  //create sequence//
  for (var z = 1; z < n; z++) {

    for (x in workingSequences) {

      if (workingSequences[x]["start"] === searchCharacter) {
        printSequence.push(workingSequences[x]["end"]);
        workingSequences.splice(x,1);
      }

      searchCharacter = printSequence[printSequence.length - 1];

    }

  }

  console.log(printSequence);

}




var printSequence = function (keyValue) {
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
  switch (dir) {
    case 'north':
      var z = 0;
      var index = 0;
      for (z = 0; z < spaces; z++) {
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
      var z = 0;
      var index = 0;
      for (z = 1; z <= spaces; z++) {
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
      var z = 0;
      var index = 0;
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
      var z = 0;
      var index = 0;
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
  console.log('creatingEndPoints');
  var colStartRow, colStartCol;
  if (keyPad[row][column] > '') {

    for (var x in rulesArray) {
      //  console.log(rulesArray[x].dir1)
      //calculate new position//
      switch (rulesArray[x].dir1.position) {
        case 'north':
          colStartRow = verifyValidCells(rulesArray[x].dir1.position, column, row, rulesArray[x].dir1.spaces);
          break;
        case 'south':
          colStartRow = verifyValidCells(rulesArray[x].dir1.position, column, row, rulesArray[x].dir1.spaces);
          break;
        case 'east':
          colStartCol = verifyValidCells(rulesArray[x].dir1.position, column, row, rulesArray[x].dir1.spaces);
          break;
        case 'west':
          colStartCol = verifyValidCells(rulesArray[x].dir1.position, column, row, rulesArray[x].dir1.spaces);
          break;
      }

      switch (rulesArray[x].dir2.position) {
        case 'north':
          colStartRow = verifyValidCells(rulesArray[x].dir2.position, colStartCol, row, rulesArray[x].dir2.spaces);
          break;
        case 'south':
          colStartRow = verifyValidCells(rulesArray[x].dir2.position, colStartCol, row, rulesArray[x].dir2.spaces);
          break;
        case 'east':
          colStartCol = verifyValidCells(rulesArray[x].dir2.position, column, colStartRow, rulesArray[x].dir2.spaces);
          break;
        case 'west':
          colStartCol = verifyValidCells(rulesArray[x].dir2.position, column, colStartRow, rulesArray[x].dir2.spaces);
          break;

      }

      if (typeof keyPad[colStartRow] !== 'undefined') {
        if (typeof keyPad[colStartRow][colStartCol] !== 'undefined') {

          if (keyPad[colStartRow][colStartCol] > '') {
            // console.log('found it start', keyPad[row][column]);
            console.log('found it end', keyPad[colStartRow][colStartCol]);
            sequences.push({ 'start': keyPad[row][column], 'end': keyPad[colStartRow][colStartCol] })

          }

        }
      }
    }
  }
}

for (x in keyPad) {
  for (var z = 0; z < keyPad[x].length; z++) {
    //if (parseInt(x) === 2 && z === 3) {
    createRuleEndPoints(parseInt(x), z);
    // }




  }

  var foundStart = printSequence('A');
  console.log(foundStart);

  generateSequence(foundStart, 10);

  console.log(sequences);

}
