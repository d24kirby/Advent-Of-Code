// Read the file and print its contents.
const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

async function loadData(filename) {
  let data = await readFile(filename, 'utf8');
  return data.trim().split('\n');
}

function convert(data) {
  const numbers = data.map((item) => Number(item));
  return numbers;
}

function findDepth2(numbers, total) {
  let result = 0;
  numbers.forEach(outterNumber => {
    numbers.forEach(innerNumber => {
      if (outterNumber + innerNumber === total) {
        result = outterNumber * innerNumber;
      }
    })
  })
  return result;
}

function findDepth3(numbers, total) {
  let result = 0;
  numbers.forEach(outterNumber => {
    numbers.forEach(middleNumber => {
      numbers.forEach(innerNumber => {
        if (outterNumber + middleNumber + innerNumber === total) {
          result = outterNumber * middleNumber * innerNumber;
        }
      })
    })
  })
  return result;
}

async function solve(filename, total, depth) {
  const input = await loadData(filename);
  const numbers = convert(input);
  if (depth === 2) {
    return findDepth2(numbers, total)
  } else if (depth === 3) {
    return findDepth3(numbers, total)
  } else {
    return 0
  }
}

solve('sample.txt', 2020, 2).then(data => console.log('Sample (2):', data));
solve('input.txt', 2020, 2).then(data => console.log('Input (2):', data));

solve('sample.txt', 2020, 3).then(data => console.log('Sample (3):', data));
solve('input.txt', 2020, 3).then(data => console.log('Input (3):', data));
