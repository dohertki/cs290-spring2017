var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host           : 'localhost',
    user           : 'student',
    password       :  'Zinter01$',
    database       : 'student'
});



app.set('port',3000);
app.use(express.static(__dirname + '/public'));

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
     pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});


app.get('/',function(req,res,next){

  var content = {};



	pool.query('SELECT column_name FROM information_schema.columns WHERE table_name=\'workouts\' ', function(err, rows, fields) {
		if(err){
			console.log("error");
			return;
		}
    content.cols = rows;
    console.log(content.cols);

  });



	pool.query('SELECT * FROM workouts',function(err, rows, fields) {
		if(err){
			console.log("error");
			return;
		}
		
    content.results = rows;
    
		res.render('new_row',content);
	});
});	



/*Code below is referenced for class POST example*/
app.post('/test-post', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  context.request = "POST";
  context.dataList = qParams;
  res.render('display_table', context);
});














app.get('/test_case', function(req,res){


  switch(client_request){
    case "insert_row":
      break;
    case "delete_row":
      break;
    case "edit_row":
      break;
    default:
      /*load page*/
      break;
       

  }

//  res.render('new_row');
});

app.get('/handle', function(req,res){
  res.render('new_row');
});


app.get('/pling',function(req,res){

  
  res.type('text/plain');
  res.send('Welcome to the Jungle!');
});
/*copied directly from get post assignment needs a fixing*/
app.post('/forms', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  context.request = "POST";
  context.dataList = qParams;
  res.render('display_table', context);
});





app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
