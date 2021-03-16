var product = document.querySelector('.product');
var requestData = [];
var savedProducts = [];
var id = localStorage.getItem('productId');

var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var color3 = document.querySelector('.color3');
var addToBucket = document.querySelector('.addToBucket');
var quantity = document.querySelector('.quantity');

console.log(title);

function getOneProduct(string_id){
  fetch('http://localhost:3000/api/teddies/' + string_id)
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

/*vérifier si une clef existe dans notre local storage, true/false*/
function isKeyExists(obj,key){
      return obj.hasOwnProperty(key);
  }

/*vérifier si le panier existe, sinon l'initialiser*/
function initialiseBucket() {
 if (isKeyExists(localStorage,'inBucket') === false ){
  var product_id = [];
  localStorage.setItem('inBucket', JSON.stringify(product_id));
 }
}

/*-------------------AJOUTER UN ARTICLE DANS LE PANIER----------------*/
function addProductToBucket(productAdded){
 /* console.log(localStorage);
  console.log(isKeyExists(localStorage,'inBucket'));*/
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  console.log('Dans votre panier initial :');console.log(inBucket);
  inBucket.push(productAdded);
  localStorage.setItem('inBucket', JSON.stringify(inBucket));
  inBucket =  JSON.parse(localStorage.getItem('inBucket'));
  productCount(productAdded);
  console.log('Dans votre panier désormais :');console.log(inBucket);
  /*Object.keys(localStorage).forEach(function(key){
  console.log(key,localStorage.getItem(key));
})*/
;}

/*---------------ENLEVER UN ARTICLE DU PANIER--------------------*/
function removeProductToBucket(productAdded){
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  console.log('Dans votre panier initial :');console.log(inBucket);
  var position = inBucket.indexOf(productAdded);
  if (position > -1 ){
    var removedItem = inBucket.splice(position, 1);
  }
  else { alert('quantité déjà à zéro dans votre panier')};
  localStorage.setItem('inBucket', JSON.stringify(inBucket));
  inBucket =  JSON.parse(localStorage.getItem('inBucket'));
  productCount(productAdded);
  console.log('Dans votre panier désormais :');console.log(inBucket);
}
/*----------------COMPTER LE NOMBRE D ARTICLE DANS LE PANIER----------*/
function productCount(string_id){
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  var repetitonOfId = 0;
  for (i in inBucket){
    console.log(inBucket[i]); 
    if (inBucket[i]=== string_id){
      repetitonOfId += 1;
    }
  }
  /*actualiser les quantités*/
  quantity.textContent = repetitonOfId;
   /*console.log('il y a ' + qtty);*/
}

function addProductToBucketClick(){
  addProductToBucket(id)
}
function removeProductToBucketClick(){
  removeProductToBucket(id)
}
  
getOneProduct(id);
productCount(id);
initialiseBucket();
/*addProductToBucket(id); AU CLICK*/





















/*var uRL = window.location.href;
console.log(uRL);*/

/*function getParameterByName(name)
{
 name = name.replace(/[[]/, [).replace(/[]]/, ]);
 var regexS = [?&] + name + =([^&#]*);
 var regex = new RegExp(regexS);
 var results = regex.exec(window.location.search);
 if(results == null)
 return ;
 else
 return decodeURIComponent(results[1].replace(/+/g, ));
}

getParameterByName(uRL);*/