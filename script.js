/*
  Kierin Doherty(dohertki)
  CS290-week 5   
  7 Apr 2017
*/


var newTable = document.createElement("table");
    newTable.style.border = "thick solid black";
for(var y = 0; y < 4; y++){
	var newRow = document.createElement("tr");
    newRow.style.backgroundColor = 'orange';
    newRow.style.border = "thin solid black";
    newTable.appendChild(newRow);
    
    for(var x = 1; x <= 4; x ++){
        if(y === 0){
            var newCell = document.createElement("th");
            var t = document.createTextNode("Header" + x );
        }
        else{
            var newCell = document.createElement("td");
            var t = document.createTextNode(x + "," + y);

        }
        
        newCell.appendChild(t);
        newRow.appendChild(newCell);

    }
}


/*Make an element with a button*/
var newButton = document.createElement("button");
var tb = document.createTextNode("Mark Cell");
var upButton    = document.createElement("button");
var downButton  = document.createElement("button");
var rightButton = document.createElement("button");
var leftButton  = document.createElement("button");


var ub = document.createTextNode("  up   ");
var db = document.createTextNode(" down  ");
var rb = document.createTextNode(" right ");
var lb = document.createTextNode(" left  ");




newButton.appendChild(tb);

upButton.appendChild(ub);



/*Place the table and the button into the webpage */
document.body.innerHTML = '<div id="mytable">Use Arrow keys to change cells </div><div id="mybutton"></div>'
document.getElementById("mytable").appendChild(newTable);
document.getElementById("mybutton").appendChild(newButton);
document.getElementById("mybutton").appendChild(upButton);

//UP key pressed
// Code referenced @ https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names_and_Char_values
function shiftCell(side, vert){

            currentBox.style.border = "none";
            pos = pos + side ;
            r_pos = r_pos + vert;
            currentBox = tableBox[pos];
            currentRow = tableRow[r_pos];
            currentBox.style.border = "thick solid black";


}



function handler(){

   var keyName = event.key;
   console.log( event.key);
    console.log("Is first child in row? ");
    console.log( currentRow.firstChild == currentBox);
  
    if(keyName === 'ArrowUp'){
       if(currentRow.previousSibling.previousSibling != null){
            shiftCell( -4, -1); 
        }
    }


    if(keyName === 'ArrowDown'){
       if(currentRow.nextSibling != null){
            shiftCell( 4, 1);          
        }
    }
    
    if(keyName === 'ArrowRight'){
       if(currentBox.nextSibling != null){
           shiftCell( 1, 0);
        }
    }
    
    if(keyName === 'ArrowLeft'){
       if(currentRow.firstChild != currentBox){
           shiftCell( -1, 0);
        }
    }

    document.removeEventListener('keydown', handler);

}



document.addEventListener( 'keydown', handler, false);    

var tableBox = document.querySelectorAll("td");
var pos = 0;
var r_pos = 1;
var currentBox = tableBox[pos];
currentBox.style.backgroundColor = 'blue';
currentBox.style.border = "thick solid black";

var tableRow = document.querySelectorAll("tr");

var currentRow = tableRow[r_pos];




//BOX OUT

var button = document.querySelector("button");
button.addEventListener("click", function(){currentBox.style.backgroundColor = 'yellow'});




























