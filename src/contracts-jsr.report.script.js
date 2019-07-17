/**
Define global functions beforeRender or (and) afterRender in script and use parameters req and res to reach your needs. 
script functions expect parameters to be req, res, done or req, res.
See https://jsreport.net/learn/scripts to learn more.

async function beforeRender(req, res) {
  // merge in some values for later use in engine
  // and preserve other values which are already in
  req.data = Object.assign({}, req.data, {foo: "foo"})
  req.data.computedValue = await someAsyncComputation()
}

or

function beforeRender(req, res, done) {
  // merge in some values for later use in engine
  // and preserve other values which are already in
  req.data = Object.assign({}, req.data, {foo: "foo"})
  done()
}

//you can also specify the template content directly
function beforeRender(req, res, done) { 
  req.template.content='hello'; 
  done(); 
}

//send the pdf report by mail
function afterRender(req, res, done) {
  var SendGrid = require('sendgrid');
  var sendgrid = new SendGrid('username', 'password');
  sendgrid.send({ to: '',  from: '', subject: '',
    html: 'This is your report',
    files: [ {filename: 'Report.pdf', content: new Buffer(res.content) }]
  }, function(success, message) {
    done(success);
  });
}
 */
function beforeRender(req, res, done) {
  // merge in some values for later use in engine
  // and preserve other values which are already in
  req.data = Object.assign({}, req.data, { report_name: "合同统计-jsreport插件示例" })
  done()
}