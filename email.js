var path = require('path');
var Email = require('email-templates');

module.exports = function (config) {
  var email = new Email({
    message: {
      from: config.email.from
    },
    transport: config.email.transport,
    views: {
      root: path.join(__dirname, 'emails'),
      options: {
        extension: 'mustache'
      }
    }
  });

  return function (template, to, data) {
    var locals = data || {};
    locals.server_url = locals.server_url || config.server_url;

    email
      .send({
        template: template,
        message: {
          to: to
        },
        locals: locals,
      });
  };
};
