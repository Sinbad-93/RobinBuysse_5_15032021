var product = document.querySelector('.product');
var requestData = [];

id = localStorage.getItem('number');

var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var color3 = document.querySelector('.color3');

console.log(title);

// |text| vaut "Ceci est un exemple de texte".


function getOneProduct(product_id){
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
const data = await response.json()
  .then(data => requestData = data);
    console.log(requestData);
    var path = requestData['imageUrl'];
    product.setAttribute("src", path);
    title.textContent = requestData['name'];
    price.textContent = requestData['price'];
    description.textContent = requestData['description'];
    color1.textContent = requestData['colors'][0];
    color2.textContent = requestData['colors'][1];
    color3.textContent = requestData['colors'][2];	

     });}
  

getOneProduct(id);
