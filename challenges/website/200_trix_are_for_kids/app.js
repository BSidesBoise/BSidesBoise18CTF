var express = require('express');
var cookieParser = require('cookie-parser');
var escape = require('escape-html');
var serialize = require('node-serialize');
var xorCrypt = require('xor-crypt')


var app = express();
app.use(cookieParser());

var body = `
<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>BSides Boise</title>

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">

  </head>

  <body>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="#">BSides Boise</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1 class="mt-5">BSides Boise</h1>
          <p class="lead">The purpose of BSidesBoise is to build a security community in the Treasure Valley which combines Technologists, IT professionals, Hackers, Makers and Engineers.</p>
        </div>
      </div>
      <div class="row justify-content-center text-center">
      <div class="col-4">
          <br /><br />
	  <form action="/" method="POST" >
	    <div class="form-group">
	       <label for="exampleFormControlTextarea1">Feedback</label>
	       <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
	     </div>
	     <button type="submit" class="btn btn-primary">Submit</button>
 	  </form>
          <br /><br /><br /><br /><br />
        </div>
      </div>
    </div>


    <footer class="footer text-center">
      <div class="container">
        <p class="text-muted small mb-0">Copyright &copy; BSides Boise 2018</p>
      </div>
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>

  </body>

</html>
`;
var postBody = `
<!DOCTYPE html>
<html lang="en">

  <head>
    <script type="text/javascript">
       setTimeout(function () {
          window.location.href = "/";
       }, 4000);
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>BSides Boise</title>

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">

  </head>

  <body>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="#">BSides Boise</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1 class="mt-5">BSides Boise</h1>
          <p class="lead">The purpose of BSidesBoise is to build a security community in the Treasure Valley which combines Technologists, IT professionals, Hackers, Makers and Engineers.</p>
        </div>
      </div>
      <div class="row justify-content-center text-center">
      <div class="col-4">
          <br /><br />
	  <h1>Thank you</h1>
	  <br /><br /><br /><br /><br />
        </div>
      </div>
    </div>


    <footer class="footer text-center">
      <div class="container">
        <p class="text-muted small mb-0">Copyright &copy; BSides Boise 2018 </p>
      </div>
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>

  </body>

</html>
`;

app.post('/', function(req, res) {
   res.send(postBody);
});
app.get('/', function(req, res) {
    try {
	    if (req.cookies.visit) {
		var str = xorCrypt(new Buffer.from(req.cookies.visit, 'base64').toString(), 1);
		var obj = serialize.unserialize(str);
	    } else {
		var firstDate = (new Date()).toISOString();
		var jsonData = {"first": firstDate, "ipAddress": req.connection.remoteAddress};
		var jsonString = JSON.stringify(jsonData);
		var cookieData = Buffer.from(xorCrypt(jsonString, 1)).toString('base64');
		res.cookie('visit', cookieData, {
		    maxAge: 1200000,
		    httpOnly: true
		});
	    }
    } catch(ex) {
       console.log(ex);
    }
    res.send(body);
});

app.listen(3000);
