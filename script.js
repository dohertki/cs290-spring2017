/*
  Kierin Doherty(dohertki)
  CS290-week 5   
  7 Apr 2017
*/

/*Create a <div> for the table and a <div> for the buttons in the <body>*/
document.body.innerHTML = '<div id="mytable">Use Arrow keys to change cells </div><div id="mybutton"></div>'



/*Create the table*/
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

/*Place the table and the button into the webpage */
document.getElementById("mytable").appendChild(newTable);

/*Create the buttons and plave them in <div>*/
var newButton = document.createElement("button");
var tb = document.createTextNode("Mark Cell");
newButton.appendChild(tb);
document.getElementById("mybutton").appendChild(newButton);

var upButton  = document.createElement("button");
var ub = document.createTextNode("up");
upButton.appendChild(ub);
document.getElementById("mybutton").appendChild(upButton);

var downButton  = document.createElement("button");
var db = document.createTextNode("down");
downButton.appendChild(db);
document.getElementById("mybutton").appendChild(downButton);

var leftButton  = document.createElement("button");
var lb = document.createTextNode("left");
leftButton.appendChild(lb);
document.getElementById("mybutton").appendChild(leftButton);


var rightButton = document.createElement("button");
var rb = document.createTextNode("right");
rightButton.appendChild(rb);
document.getElementById("mybutton").appendChild(rightButton);


/*Move active cell and redraw border*/
function shiftCell(side, vert){
            currentBox.style.border = "none";
            pos = pos + side ;
            r_pos = r_pos + vert;
            currentBox = tableBox[pos];
            currentRow = tableRow[r_pos];
            currentBox.style.border = "thick solid black";


}
// Code referenced @ https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names_and_Char_values

/*Handle events*/
function handler(){
   console.log("into hanler");
  if(event.type === "keydown")
        var keyName = event.key;
    if(event.type === 'click'){
        var keyName = event.currentTarget.childNodes["0"].data;
    }
    console.log("type complete");
    if(keyName === 'ArrowUp'|| keyName === 'up'){
       if(currentRow.previousSibling.previousSibling != null){
            shiftCell( -4, -1); 
        }
    }

    if(keyName === 'ArrowDown'||keyName === 'down'){
       if(currentRow.nextSibling != null){
            shiftCell( 4, 1);          
        }
    }
    
    if(keyName === 'ArrowRight'||keyName=== 'right'){
       if(currentBox.nextSibling != null){
           shiftCell( 1, 0);
        }
    }
    
    if(keyName === 'ArrowLeft'||keyName === 'left'){
       if(currentRow.firstChild != currentBox){
           shiftCell( -1, 0);
        }
    }

 
}



/*Set up intial box*/
var tableBox = document.querySelectorAll("td");
var pos = 0;
var r_pos = 1;
var currentBox = tableBox[pos];
currentBox.style.border = "thick solid black";
var tableRow = document.querySelectorAll("tr");
var currentRow = tableRow[r_pos];

/*Listen for keyboard arrow key*/
document.addEventListener( 'keydown', handler, false);    

/*Listen for button clicked */
newButton.addEventListener("click", function(){currentBox.style.backgroundColor = 'yellow'});
upButton.addEventListener("click", handler, false);
downButton.addEventListener("click", handler, false);
leftButton.addEventListener("click", handler, false);
rightButton.addEventListener("click", handler, false);

























