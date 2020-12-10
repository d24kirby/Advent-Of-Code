// Read the file and print its contents.
const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

async function loadData(filename) {
  let data = await readFile(filename, 'utf8');
  return data.trim().split('\n');
}

function parse(data) {
  const values = data.map((item) => {
    const val = item.replace(':', '').split(' ')
    const range = val[0].split('-')
    return {
      min: range[0],
      max: range[1],
      string: val[1],
      text: val[2]
    }
  });
  return values;
}

async function range(filename) {
  const input = await loadData(filename);
  const values = parse(input);
  return values.filter(val => {
    const len = (val.text.match(new RegExp(val.string, "g")) || []).length
    if (len >= val.min && len <= val.max) {
      return true
    } else {
      return false
    }
  }).length
}

async function position(filename) {
  const input = await loadData(filename);
  const values = parse(input);
  return values.filter(val => {
    if (val.text[val.min - 1] === val.string && val.text[val.max - 1] === val.string) {
      return false
    } else if (val.text[val.min - 1] === val.string || val.text[val.max - 1] === val.string) {
      return true
    } else {
      return false
    }
  }).length
}

range('sample.txt').then(data => console.log('Sample - Part 1:', data));
range('input.txt').then(data => console.log('Input  - Part 1:', data));

position('sample.txt').then(data => console.log('Sample - Part 2:', data));
position('input.txt').then(data => console.log('Input  - Part 2:', data));

// solve('input.txt', 2020, 2).then(data => console.log('Input (2):', data));

// solve('sample.txt', 2020, 3).then(data => console.log('Sample (3):', data));
// solve('input.txt', 2020, 3).then(data => console.log('Input (3):', data));
