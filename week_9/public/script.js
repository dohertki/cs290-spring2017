//script.js



/*Wait till document is loaded before continue*/
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('submitWorkout').addEventListener("click", function(event){
    	event.preventDefault()
    	/*Create formData object*/
    	var workout_form = document.getElementById('workoutForm')
    	var formData = new FormData(workout_form);

    	var payload={};
		payload.call = "input";      
		payload.name = workout_form.name.value;
    	payload.weight = workout_form.weight.value;
		payload.reps = workout_form.reps.value;
    	payload.date = workout_form.date.value;
    	payload.lbs = workout_form.lbs.value;
    
		/*Create new XMLHttpRequest object*/
    	var req = new XMLHttpRequest();

    	req.open("POST","/data/",true);    
    	req.setRequestHeader('Content-Type', 'application/json');
    
 //   req.addEventListener('load',function(){
 //     if(req.status >= 200 && req.status < 400){
   //     var response = JSON.parse(req.responseText);
   //     console.log(response);
    //    document.getElementById('originalUrl').textContent = response.longUrl;
    //    document.getElementById('shortUrl').textContent = response.id;
   //   } else {
   //     console.log("Error in network request: " + req.statusText);
   //   }
  //  });
		req.send(JSON.stringify(payload));
    
    //      var response = JSON.parse(req.responseText);
    //      document.getElementById('originalUrl').textContent = response.longUrl;
    //      document.getElementById('shortUrl').textContent = response.id;
		var toTable = document.getElementById("workoutTable");
		var newRow = document.createElement("tr")
       
	    var newCell = document.createElement("td");
        var t = document.createTextNode(payload.name);
		newCell.appendChild(t);
        newRow.appendChild(newCell);
		
		var newCell = document.createElement("td");
        var t = document.createTextNode(payload.reps);
		newCell.appendChild(t);
        newRow.appendChild(newCell);
		
		var newCell = document.createElement("td");
        var t = document.createTextNode(payload.weight);
		newCell.appendChild(t);
        newRow.appendChild(newCell);
		
		var newCell = document.createElement("td");
        var t = document.createTextNode(payload.date);
		newCell.appendChild(t);
        newRow.appendChild(newCell);
		
		var newCell = document.createElement("td");
        var t = document.createTextNode(payload.lbs);
		newCell.appendChild(t);
        newRow.appendChild(newCell);	
				
		var btn1 = document.createElement("BUTTON");
    		btn1.onclick = "deleteRow('workoutTable',this)";
			btn1.id = "delete";
			btn1.name = "DELETE";
		var btn2 = document.createElement("BUTTON");
    		btn2.onclick = "deleteRow('workoutTable',this)";
			btn2.id = "edit";
			btn2.nmae = "EDIT";

			newRow.appendChild(btn1);
			newRow.appendChild(btn2);

		toTable.appendChild(newRow);
		
		
		
		
		function myFunction() {
    		var btn = document.createElement("BUTTON");
    		btn.onclick = "deleteRow('workoutTable',this)";
			btn.id = "delete";

			
		}


       	 




});

 


  document.getElementById('delete').addEventListener("click", function(event){
    event.preventDefault()

   // var workout_form = document.getElementById('workoutForm')
   // var formData = new FormData(workout_form);
   console.log(this.parentNode.parentNode.id);
    
    
    var payload={};
   
    payload.call = "delete";      
    payload.id = this.parentNode.parentNode.id;
   
    /*Create new XMLHttpRequest object*/
    var req = new XMLHttpRequest();

    req.open("POST","/delete",true);    
    req.setRequestHeader('Content-Type', 'application/json');
    console.log("status:" + req.status)
    //req.addEventListener('load',function(){
   //   if(req.status >= 200 && req.status < 400){
  //  var response = JSON.parse(req.responseText);
   //     console.log(response);
    //    document.getElementById('originalUrl').textContent = response.longUrl;
    //    document.getElementById('shortUrl').textContent = response.id;
    //  } else {
    //    console.log("Error in network request: " + req.statusText);
   //   }
   // });
    req.send(JSON.stringify(payload));
    
    //      var response = JSON.parse(req.responseText);
    //      document.getElementById('originalUrl').textContent = response.longUrl;
    //      document.getElementById('shortUrl').textContent = response.id;
	});


  

};  /*bindbuttons close tag*/

/* copy from cited example in assignment http://jsfiddle.net/GRgMb/ */
function deleteRow(tableID,currentRow) {
    
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            /*var chkbox = row.cells[0].childNodes[0];*/
            /*if (null != chkbox && true == chkbox.checked)*/
            
            if (row==currentRow.parentNode.parentNode) {
                if (rowCount <= 1) {
                    alert("Cannot delete all the rows.");
                    break;
                }
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    
}

function loadRow(payload) {
	var toTable = document.getElementById("workoutTable");
	var result = "";
	var newRow = document.createElement("tr")
	for (var p in payload) {
    	if( payload.hasOwnProperty(p) ) {
        var newCell = document.createElement("td");
        var t = document.createTextNode(payload[p]);
        newCell.appendChild(t);
        newRow.appendChild(newCell);
	} 
  	
	} 
	toTable.appendChild(newRow);

 // return result;
}