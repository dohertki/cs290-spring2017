//script.js



/*Wait till document is loaded before continue*/
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('submitWorkout').addEventListener("click", function(event){
   
    	/*Create formData object*/
    	var workout_form = document.getElementById('workoutForm')
    	var formData = new FormData(workout_form);
		var rowID = "";
    	let response = "";
		var payload={};
		payload.call = "input";      
		payload.name = workout_form.name.value;
    	payload.weight = workout_form.weight.value;
		payload.reps = workout_form.reps.value;
    	payload.date = workout_form.date.value;
    	payload.lbs = workout_form.lbs.value;
		
		/*Check for valid form fields*/
  		if(checkField(payload)){
			return;
		 } 	
 		
		  console.log("halt");
		

		/*Create new XMLHttpRequest object*/
    	var req = new XMLHttpRequest();

    	req.open("POST","/data/",true);    
    	req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load',function(){
      		if(req.status >= 200 && req.status < 400){
        	    response = JSON.parse(req.responseText);
        		console.log(response.results);
				rowID = response.id;
   	   		} else {
	     		console.log("Error in network request: " + req.statusText);
      		}	
    	});
		req.send(JSON.stringify(payload));
    	event.preventDefault();
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
        var w = "";
		if (payload.lbs){
			w = "lbs";
		}else{
			w = "kg";
		}
		var t = document.createTextNode(String(w));
		newCell.appendChild(t);
        newRow.appendChild(newCell);	
				
		var btn1 = document.createElement("BUTTON");
//    		btn1.onclick = 'deleteRow('workoutTable',this)';
			btn1.id = "delete";
			btn1.name = "delete";
			btn1.value = "DELETE"
		//	btn1.setAttribute(onClick,)
		var btn2 = document.createElement("BUTTON");
    		btn2.onClick = "deleteRow('workoutTable',this)";
			btn2.id = "delete";
			btn2.name = "edit";
			btn2.setAttribute('value','Update');
			btn2.value = "Edit";
		
		var newCell = document.createElement("td");
		var t = document.createTextNode("Edit");
		btn2.appendChild(t);
		newCell.appendChild(btn2);
		newRow.appendChild(newCell);
		
		var newCell = document.createElement("td");
		var t = document.createTextNode("Delete");
		btn1.appendChild(t);
		newCell.appendChild(btn1);
		newRow.appendChild(newCell);
		
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

/*Check for valid form fields*/
function checkField(payload) {	
	for (var p in payload) {
    	if( payload.hasOwnProperty(p) === null ) {
        	return true;
		} 
	}
	if(new Date(payload.date)=="Invalid Date"){
		return true;
    }	 
  return false;
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