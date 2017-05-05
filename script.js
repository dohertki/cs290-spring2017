
var hi;

var newList = document.createElement("ul");
for(var i = 0; i < 3; i++){
    var newItem = document.createElement("li");
    newItem.textContent = "I am item " + i + ".";
    newList.appendChild(newItem);
}


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
            //newCell.textContent = "Here I am";
            var t = document.createTextNode("Header" + x );
        }
        else{
            var newCell = document.createElement("td");
            //newCell.textContent = "Here I am";
            var t = document.createTextNode(x + "," + y);

        }
        
        newCell.appendChild(t);
        newRow.appendChild(newCell);

    }
}
document.body.innerHTML = '<div id="mytable">boo!</div>'
document.getElementById("mytable").appendChild(newTable);

