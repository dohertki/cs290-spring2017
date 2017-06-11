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

      res.render('home',context);

     
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
  var qParams = [];
 // for (var p in req.body){
 //   qParams.push({'name':p,'value':req.body[p]})
  //}
  var context = {};
  context.request = "POST";
 console.log(context.request);
 if(req.body){
  
		switch(req.body.call){
			case "input":
	    	pool.query('INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)',
    		[req.body['name'], req.body['reps'], req.body['weight'], req.body['date'], req.body['lbs']], function(err, result){
    		if(err){
      			next(err);
      			return;
    		}
    		//context.results = "Inserted id " + result.insertId;
    		//res.render('home',context);
      		});
      		console.log("new input");
      		break;
			case "delete":
   //    	var context = {};
       	  pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result){
        		if(err){
          			next(err);
          			return;
        		}
        	//	context.results = "Deleted " + result.changedRows + " rows.";
        	//	res.render('home',context);
      	}); 
				console.log("delete row");   
      	break;
    case "edit":
      break;
    default:
      /*load page*/
      break;

  }

 
 }; /*close if(req.body)*/  
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
  var context = {};
  //mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
  //  if(err){
  //    next(err);
  //    return;
  //  }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});




app.get('/test_case', function(req,res){




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









///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});


/*
app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});
*/