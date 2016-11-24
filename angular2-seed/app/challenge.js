var keyPad = [];
var rows = [];
var sequences = [];
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

var verifyValidCells = function(dir, col, row, spaces) {
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

var createRuleEndPoints = function(row, column) {
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
         
          //    colStartCol = column + rulesArray[x].dir1.spaces;
          break;
        case 'west':
          colStartCol = verifyValidCells(rulesArray[x].dir1.position, column, row, rulesArray[x].dir1.spaces);
        
          //     colStartCol = column - rulesArray[x].dir1.spaces;
          break;
      }

      switch (rulesArray[x].dir2.position) {
        case 'north':
          colStartRow = verifyValidCells(rulesArray[x].dir2.position, column, row, rulesArray[x].dir2.spaces);
          break;
        case 'south':
          colStartRow = verifyValidCells(rulesArray[x].dir2.position, column, row, rulesArray[x].dir2.spaces);
          break;
        case 'east':
          colStartCol = verifyValidCells(rulesArray[x].dir2.position, column, row, rulesArray[x].dir2.spaces);
          break;
        case 'west':
         colStartCol = verifyValidCells(rulesArray[x].dir2.position, column, row, rulesArray[x].dir2.spaces);
          break;

      } 

      if (typeof keyPad[colStartRow] !== 'undefined') {
        if (typeof keyPad[colStartRow][colStartCol] !== 'undefined') {

          if (keyPad[colStartRow][colStartCol] > '') {
            console.log(colStartRow, colStartCol);
            console.log('found', keyPad[colStartRow][colStartCol]);
          }

        }
      }
    }
  }
}


for (x in keyPad) {
  for (var z = 0; z < keyPad[x].length; z++) {
    //  console.log(x,z);
    if (parseInt(x) === 3 && z === 1) {
      createRuleEndPoints(parseInt(x), z);
    }

  }


}
