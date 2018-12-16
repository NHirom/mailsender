const fs = require("fs");
const sgMail = require('@sendgrid/mail');
const msg = require('./message');

const InProgressPath = './metadata/inprogress.txt';

var inProgressList = [];

var send = function(contactList) {
  for (let contact of contactList) {
    var m = msg.getMessage(contact);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(m);
  }
};

var remove = function(array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  };
};

fs.readFile(InProgressPath, 'utf8', function (err, text) {
  if (err) {throw err};
  inProgressList = text.toString().split(',');
  console.log(inProgressList);

  for (let targetPath of inProgressList) {
    if (targetPath !== '') {
        fs.readFile(targetPath, 'utf8', function (err, text) {
        let targetList = text.toString().split(',');
        send(targetList);
        remove(inProgressList, targetPath);
        //console.log(inProgressList);
        fs.writeFile(InProgressPath, inProgressList);
      });
    };
  };
});
