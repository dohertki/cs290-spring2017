//script.js


/*Wait till document is loaded before continue*/
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	
	var catalyst = {
		hot: 44,
	};
	
	document.getElementById('submitWorkout').addEventListener("click", function(event){
   
    	/*Create formData object*/
    	var workout_form = document.getElementById('workoutForm'); //mising ; ??
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
				rowID = response.results.id;
				newRow.id=rowID;	
   	   		} else {
	     		console.log("Error in network request: " + req.statusText);
      		}	
		return rowID;
		});
			

		req.send(JSON.stringify(payload));
    	event.preventDefault();

    
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
		if (payload.lbs == "1"){
			w = "lbs";
		}else{
			w = "kg";
		}
		var t = document.createTextNode(String(w));
		newCell.appendChild(t);
        newRow.appendChild(newCell);	
				
		var btn1 = document.createElement("BUTTON");
    	//	btn1.onclick = "deleteRow('workoutTable',this)";
			btn1.id = "delete";
			btn1.name = "delete";
			btn1.value = "DELETE"
			btn1.setAttribute("onclick","deleteRow('workoutTable',this)");
		var btn2 = document.createElement("BUTTON");
    		
			btn2.id = "edit";
			btn2.name = "edit";
			btn2.setAttribute('type','button');
			btn2.setAttribute('id','edit');
			btn2.setAttribute("onclick","editRow('workoutTable',this)");
		//	btn2.onclick = "editRow('workoutTable',this)";
			btn2.value = "edit";
			
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






 
/***************************************************************************************/
	/*Event listner for update form summit button*/	
	document.getElementById('updateWorkout').addEventListener("click", function(event){
			
			/*Create an object to hold updated form data*/
			var currentID = document.getElementById('id').value;
			var currentRow = document.getElementById(currentID);
			/*Set payload properties to the values in current row*/
			var payload = pullValues(currentID);
	

	

		var update_form = document.getElementById('updateForm');
		
		/*Put updated values if valid into payload*/
		if(update_form[1].value){
			payload.name = update_form[1].value;
			/*change table*/
		}
		if(!isNaN(update_form[2].value) && (update_form[2].value != "")){
			payload.weight = update_form[2].value;
		}
    	if(!isNaN(update_form[3].value) && (update_form[3].value != "") ){
			payload.reps = update_form[3].value;
		}
		if(update_form[4].value != ""){
			payload.date = update_form.date.value;
		}
	 	payload.lbs = update_form[5].value;
		update_form[6].value = payload.id;
	
		/*Create new XMLHttpRequest object*/
    	var req = new XMLHttpRequest();
		req.open("POST","/update/",true);    
    	req.setRequestHeader('Content-Type', 'application/json');
		
		req.addEventListener('load',function(){
      		if(req.status >= 200 && req.status < 400){
        	    response = JSON.parse(req.responseText);
        		console.log('Response:' + response);
					
   	   		} else {
	     		console.log("Error in network request: " + req.statusText);
      		}	
	
		});
	req.send(JSON.stringify(payload)); //moved up two lines
	event.preventDefault;

	updateRow(payload);

	document.getElementById("updateForm").style.visibility = "hidden";


	});		

	

};  /*bindbuttons close tag*/




/***************************************************************************************/

/*Fuction fires when edit button pressed, starts form*/
function editRow(tableID,buttonNode){
	var bodyRect = document.body.getBoundingClientRect(),
    	elemRect = buttonNode.getBoundingClientRect(),
    	offset   = elemRect.top - bodyRect.top;

	console.log("Edit row ID:" + buttonNode.parentNode.parentNode.id);
	var currentRow = buttonNode.parentNode.parentNode;
	var currentId = buttonNode.parentNode.parentNode.id;
	
	document.getElementById("updateForm").style.visibility = "visible";
	

    document.getElementById('id').value=currentId;

	var payload = pullValues(currentId);

	/*Set placeholders in form with current row values*/
	document.getElementById("updateName").placeholder = payload.name;
	document.getElementById("updateReps").placeholder = payload.reps;
	document.getElementById("updateWeight").placeholder = payload.weight;
	console.log(document.getElementById("updateDate").attributes.dataplaceholder.nodeValue);                 
	document.getElementById("updateDate").attributes.dataplaceholder.nodeValue = payload.date;


}

/***************************************************************************************/

/*function finds values in current row*/
function pullValues(currentId){	
	var payload={};
	var currentRow = document.getElementById(currentId);
	
	payload.id = currentId;
	payload.name = currentRow.children[0].innerText;
	payload.weight =currentRow.children[1].innerText;
	payload.reps = currentRow.children[2].innerText;
	payload.date = currentRow.children[3].innerText;
	payload.lbs = currentRow.children[4].innerText;
	console.log(payload.id);
	return payload;
}	

/***************************************************************************************/

/*fuction updates row */
function updateRow(payload){

	var currentRow = document.getElementById(payload.id);
	currentRow.children[0].innerHTML = payload.name;
	currentRow.children[1].innerHTML = payload.reps;
	currentRow.children[2].innerHTML = payload.weight;
	currentRow.children[3].innerHTML = payload.date;                 
	if(payload.lbs == "1"){
		currentRow.children[4].innerHTML = "lbs";
	}else{
		currentRow.children[4].innerHTML = "kg";
	}
	
}


/***************************************************************************************/




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
                console.log(currentRow.parentNode.parentNode.id);
				var payload={};
   				payload.id = currentRow.parentNode.parentNode.id;
				
				table.deleteRow(i);
                rowCount--;
                i--;		
    			/*Create new XMLHttpRequest object*/
    			var req = new XMLHttpRequest();
    			req.open("POST","/delete",true);    
    			req.setRequestHeader('Content-Type', 'application/json');
    			console.log("status:" + req.status)
    
    			req.send(JSON.stringify(payload));
    
  
            }
        }
    
}
/***************************************************************************************/
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

}

