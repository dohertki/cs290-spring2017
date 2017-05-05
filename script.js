
var hi;

var newList = document.createElement("ul");
for(var i = 0; i < 3; i++){
    var newItem = document.createElement("li");
    newItem.textContent = "I am item " + i + ".";
    newList.appendChild(newItem);
}


var newTable = document.createElement("table");
for(var x = 0; x < 5; x++){
	var newRow = document.createElement("tr");
    newRow.style.backgroundColor = 'orange';
    newTable.appendChild(newRow);
}



document.body.innerHTML = '<div id="mytable">boo!</div>'
document.getElementById("mytable").appendChild(newTable);

