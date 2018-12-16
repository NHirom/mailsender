const sent_from = 'crediation.dev@gmail.com';
const subject = 'Would you please share your challenges with us?';
const text =
  '';

const html = text;

var getMessage = function(arg_to) {
  const msg = {
    to: arg_to,
    from: sent_from,
    subject: subject,
    text: text,
    html: html
  };

  return msg;
}

module.exports = {
  getMessage: getMessage
}