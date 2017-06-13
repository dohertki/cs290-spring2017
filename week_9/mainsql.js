var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
/*
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    formatTime: function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
 	}
  }
});
*/

//handlebars.registerHelper('formatTime', function (date, format) {
//    var mmnt = moment(date);
//    return mmnt.format(format);
// });

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

var pooltemp = mysql.createPool({
    connectionLimit: 10,
    host           : 'classmysql.engr.oregonstate.edu',
    user           : 'cs290_dohertki',
    password       :  '0248',
    database       : 'cs290_dohertki'
});


app.set('port',2800);
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

      res.render('new_row',context);

     
    })
  });
});


app.get('/',function(req,res,next){

  var content = {};


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
app.post('/data', function(req,res,next){
	var context = {};
	console.log("insert data");
 
	pool.query('INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)',
    [req.body['name'], req.body['reps'], req.body['weight'], req.body['date'], req.body['lbs']], function(err, result){
    		if(err){
      			next(err);
      			return;
    		}		
	});
      		  
	next();			 
	}, function(req,res){			  
		var context = {};
		pool.query('SELECT id FROM workouts ORDER BY id DESC LIMIT 1', function(err, rows, fields) {
			if(err){
				console.log("error");
				next(err);
				return;
			}
		context.results = rows[0];
	
		console.log(context.results);	
		res.send(JSON.stringify(context));
		console.log("new input");

	 	});	
});   	  
			  
			  
app.post('/update',function(req,res,next){
	var context = {};
	console.log("update " + req.body.id);
  	pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
    	if(err){
			console.log("sql error");
      		next(err);
      		return;
    	}
    	if(result.length == 1){
      		var curVals = result[0];
      		pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        		[req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id],
        	function(err, result){
        		if(err){
          			next(err);
          		return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        
		res.end();
      });
    }
  });
});			  


 


app.get('/insert',function(req,res,next){
  var context = {};
  pool.query("INSERT INTO student.workouts(name, reps, weight, date, lbs) VALUES('Extreme Turd Push', '5', '120', '2017-01-01', '19')", function(err, result){

  //pool.query("INSERT INTO workouts (`name`) VALUES (?)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});


app.post('/delete', function(req,res,next){
	console.log("delete");
	pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
    	next(err);
    return;
    }
 
    res.end();
  });
});



app.get('/ping',function(req,res){
  res.type('text/plain');
  res.send('Welcome to the Jungle!');
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








