var section = document.getElementById("products");
var request = new XMLHttpRequest();

request.open("GET", "http://localhost:3000/api/cameras");
request.responseType = "json";
request.send();

//HOW DO I CREATE A CLASS AND AN ARRAY FROM THE JAVASCRIPT OBJECT I RECEIVE?

let data = request.response;


for (var i = 0; i < data.length; i++) {


// Creating an object:
//class camera[i] = ${data[i]};

// And then create our markup:

const markup = `

<div class="camera">
<h2>${request.response[i].name}</h2>
<p class="">${request.response[i].price}</p>
<p class="">${request.response[i].description}</p>


//The button will load on click the options corresponding
<button onclick="Options[i]()"></button>

</div>
`;


function Options[i] {

for (var i = 0; i < data.length; i++) || (var j = 0; j < lenses.length; i++) {

// Creating an object:
class option[i] = ${[i].lenses[j]};

// And then create our markup:

const markup = `

<div class="option">
<h3>${request.response[i].lenses[j]}</h3>


}


document.getElementById("products").innerHTML = markup[i];

}

