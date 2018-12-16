const fs = require("fs");
const SentPath = './metadata/sent.txt';
const InProgressPath = './metadata/inprogress.txt';
const InputPath = './workspace/input/input.txt';

const TargetPath = function(count) {
  return './workspace/target/target'+ count.toString() +'.txt';
};
const DirtyPath = function(count) {
  return './workspace/dirty/dirty'+ count.toString() +'.txt';
};

const CounterPath = './metadata/counter.txt';

const google = '@gmail.com'

var sentList = [];
var inProgressList = [];
var dirtyList = [];
var inputList = [];
var targetList = [];
var count = 0;

var sentLoaded = false;

fs.readFile(SentPath, 'utf8', function (err, text) {
  if (err) {throw err};
  sentList = text.toString().split(',');

  fs.readFile(InputPath, 'utf8', function (err, text) {
    if (err) {throw err};
    inputList = text.toString().split(',');

    fs.readFile(CounterPath, 'utf8', function (err, text) {
      if (err) {throw err};
      count = new Number(text.toString());

      fs.readFile(InProgressPath, 'utf8', function (err, text) {
        if (err) {throw err};
        inProgressList = text.toString().split(',');

        sanitize();
        count++
        inProgressList.push(TargetPath(count));
        updateAll();
      });
    });
  });
});


var sanitize = function() {
  for (let input of inputList) {
    if (isDirty(input)) {
      dirtyList.push(input);
    } else {
      if (!isExistInSentList(input)) {
        targetList.push(input);
        sentList.push(input);
      };
    }
  };
  console.log('target count:' + targetList.length);
};

var isDirty = function(input) {
  let dirty = true;
  if (input.indexOf(google) !== -1) {dirty = false};
  return dirty;
}

var isExistInSentList = function(input) {
  return sentList.includes(input);
}

var updateAll = function() {

  fs.writeFile(CounterPath, count);
  fs.writeFile(SentPath, sentList);
  fs.writeFile(TargetPath(count), targetList);
  fs.writeFile(DirtyPath(count), dirtyList);
  fs.writeFile(InProgressPath, inProgressList);

};
