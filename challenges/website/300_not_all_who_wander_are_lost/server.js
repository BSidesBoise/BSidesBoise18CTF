const express = require('express');
const fileUpload = require('./lib/index.js');
const app = express();
//const evalMe = require('/home/eval/eval.js')
var fs = require('fs');


app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.get('/', function(req, res) {
  res.send('Zip-a-dee-doo-dah, zip-a-dee-ay');
});

app.get('/eval', function(req, res) {
  /*eval(evalMe(function(answer) {
    var response = "<html><body>Dev'ing out eval<br/>" + answer + "<!-- FOR DEVELOPMENT PURPOSES ONLY!!  DO NOT EXPOSE IN PROD!!  Answer exported from /home/eval/eval.js --></body></html>";
    res.type('html');
    res.end(response);
  }));*/
  var testEval = eval(fs.readFileSync('/home/eval/eval.js')+'');
  //console.log(answer);
  try {
    testEval(function(answer) {
      var response = "<html><body>Dev'ing out eval<br/>" + answer + "<!-- FOR DEVELOPMENT PURPOSES ONLY!!  DO NOT EXPOSE IN PROD!!  Answer exported from /home/eval/eval.js simpleEval = function(callback) {callback(40+2);}; --></body></html>";
      res.type('html');
      res.end(response);
    });  }
  catch(error) {
    var response = "<html><body>Dev'ing out eval<br/> OOPS, eval function is missing <!-- FOR DEVELOPMENT PURPOSES ONLY!!  DO NOT EXPOSE IN PROD!!  Answer exported from /home/eval/eval.js simpleEval = function(callback) {callback(40+2);}; --></body></html>";
    res.send(response);
  }
  
  
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  if(sampleFile.mimetype === 'application/zip'){
    uploadPath = __dirname + '/test/zips' + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        var myPythonScriptPath = './lib/unzipper.py';

        var options = {
          pythonPath: '/usr/bin/python',
          args: [uploadPath]
      };

        // Use python shell
        const {PythonShell} = require("python-shell");//var PythonShell = require('python-shell');
        var pyshell = new PythonShell(myPythonScriptPath, options);

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
            if (err){
                throw err;
            };

            console.log('finished');
        });
      }
  
      res.send('File uploaded to ' + uploadPath + '. ' + 'Extraction will commence shortly...');

      //you have a brief amount of time to execute your code
      setTimeout(function(){ 
        console.log('executed after response?');
        var data = "simpleEval = function(callback) {callback(40+2);};"
        fs.writeFile('/home/eval/eval.js', data, function(err, data){
          if (err) console.log(err);
          console.log("Successfully Written to File.");
        });
      }, 10000);
    });
  }
  else {
    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      var response = "<html><body>File uploaded to " + uploadPath + "<!-- zip files located in different directory --></body></html>";

      res.send(response);
    });
  }

  
});

app.listen(666, function() {
  console.log('Express server listening on port 666'); // eslint-disable-line
});
