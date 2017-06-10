//script.js










document.getElementById('submitWorkout').addEventListener("submit", function(event){
  event.preventDefault()
  /*Create formData object*/
  var workout_form = document.getElementById('workout_form')
  var formData = new FormData(workout_form);


    var req = new XMLHttpRequest();

    req.open("POST","localhost:3000/test-post/",true);    
    req.send({ "eat":"poop"});

})




/*Create new XMLHttpRequest object*/

