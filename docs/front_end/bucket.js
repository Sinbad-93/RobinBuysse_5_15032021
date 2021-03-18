let requestData;
var allData = [];
var differentsProducts = [];
var totalSum = 0 ;
var allData = [];
var compteur = 0;
var product = document.querySelector('.product');
var id = localStorage.getItem('productId');
/*formulaire*/
var products = [id, '5beaa8bf1c9d440000a57d94'];
let contact;
console.log(products);
/*-----*/
var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');

function saveData(){
  var costumerFirstName = document.querySelector('#firstName');
  var costumerLastName = document.querySelector('#lastName');
  var costumerAddress = document.querySelector('#address');
  var costumerCity = document.querySelector('#city');
  var costumerEmail = document.querySelector('#email');
  contact = {
    firstName: costumerFirstName.value,
    lastName: costumerLastName.value,
    address: costumerAddress.value,
    city: costumerCity.value,
    email: costumerEmail.value,
  };
  let objetContact = {contact, products};
  console.log(JSON.stringify(objetContact));
  saveOrder(objetContact);
}



function saveOrder(data){
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify( data )};
  fetch('http://localhost:3000/api/teddies/order', requestOptions)
  .then(async response => {
      const data = await response.json()
  .then(data => localStorage.setItem('orderData',JSON.stringify(data))
  );
  // check for error response
   if (!response.ok) {
  // get error message from body or default to response status
  const error = (data && data.message) || response.status;
  return Promise.reject(error); }})
  .catch(error => {
  this.errorMessage = error;
  console.error('There was an error!', error);});
  document.location.href="http://127.0.0.1:5500/docs/front_end/order.html";
}

function getOneProduct(product_id){
  let data;
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
    data = await response.json()
  .then(data => requestData = data);
  /*console.log(requestData['name'])*/
    allData.push(requestData);
    dataWatch.watched= allData;
     })}


function getAllBucket() {
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  /*console.log(inBucket);*/
  /* récupérer les articles en exemplaire uniques en comparant deux array,
  possible avec includes, mais non compatible Internet Explorer*/
  for (i in inBucket){
    if (differentsProducts.indexOf(inBucket[i]) != -1){}
    else {differentsProducts.push(inBucket[i])}
    }
    for (i in differentsProducts){
      getOneProduct(differentsProducts[i]);
    }; 
    /*console.log(differentsProducts)*/
  }

/*surveiller la fin de la requete fetch*/
dataWatch = {
  watchedValue: allData.length,
  watchedListener: function(value) {},
  set watched(value) {
    this.watchedValue = value;
    this.watchedListener(value);
  },
  get watched() {
    return this.watchedValue;
  },
  registerListener: function(listener) {
    this.watchedListener = listener;
  }
}

dataWatch.registerListener(function(value) {
      /*console.log(value);
      console.log(value.length);
      console.log(differentsProducts.length);*/
  if (value.length === differentsProducts.length){ 
    console.log('les données sont chargées');
    quantityCount(allData);
    loadHTMLTable(allData);
    /*delayedAlert();*/
    totalPrice();
    
    };
}); 

/*inserer les données sur la page*/
function loadHTMLTable(data) {
  const tableau = document.querySelector('table tbody');
  /*if (data.length === 0) {/* au cas ou il n'y a pas de données
      tableau.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;}*/
let tableauHtml = "";
 for (i in data){
   var memorisedId = data[i]['_id'];
      tableauHtml += "<tr>";
      tableauHtml += `<td><img class="little_picture" src='${data[i]['imageUrl']}'></td>`;
      tableauHtml += `<td>${data[i]['name']}</td>`;
      tableauHtml += `<td class='price'>${data[i]['price']}</td>`;
      tableauHtml += `<td> Quantité <span id="Id${memorisedId}" class="quantity">${productCountBefore(memorisedId)}</span>
      <button id="${memorisedId}" onclick="removeProductToBucketClick(this.id);" >-</button>
    <button id="${memorisedId}" onclick="addProductToBucketClick(this.id);" >+</button></td>`;
      tableauHtml += "</tr>";
 }
  /*convertit tout en string puis le rentre dans le DOM */
  tableau.innerHTML = tableauHtml;

  /*Autre manière de faire :
  tableau.insertAdjacentHTML("afterbegin", tableauHtml);*/

}

/*----------------COMPTER LE NOMBRE D ARTICLE DANS LE PANIER----------*/
function productCountBefore(string_id){
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  var repetitonOfId = 0;
  for (i in inBucket){ 
    if (inBucket[i]=== string_id){
      repetitonOfId += 1;
    }
  }
  /*actualiser les quantités*/
  return repetitonOfId;
   /*console.log('il y a ' + qtty);*/
}
function quantityCount(data){
  for (i in data){
    productCountBefore(data[i])
}}

/*-------------------AJOUTER UN ARTICLE DANS LE PANIER----------------*/
function addProductToBucketById(productAdded){
  console.log('PAR ICI OHEEEEEE ' + productAdded);
  /* console.log(localStorage);
   console.log(isKeyExists(localStorage,'inBucket'));*/
   var inBucket = JSON.parse(localStorage.getItem('inBucket'));
   console.log('Dans votre panier initial :');console.log(inBucket);
   inBucket.push(productAdded);
   localStorage.setItem('inBucket', JSON.stringify(inBucket));
   inBucket =  JSON.parse(localStorage.getItem('inBucket'));
   productCount(productAdded);
   totalPrice();
   console.log('Dans votre panier désormais :');console.log(inBucket);
   /*Object.keys(localStorage).forEach(function(key){
   console.log(key,localStorage.getItem(key));
 })*/
 ;}
 
 /*---------------ENLEVER UN ARTICLE DU PANIER--------------------*/
 function removeProductToBucketById(productAdded){
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
   totalPrice();
   console.log('Dans votre panier désormais :');console.log(inBucket);
 }
 /*----------------COMPTER LE NOMBRE D ARTICLE DANS LE PANIER----------*/
 function productCount(string_id){
   var inBucket = JSON.parse(localStorage.getItem('inBucket'));
   var repetitonOfId = 0;
   for (i in inBucket){
     /*console.log(inBucket[i]);*/ 
     if (inBucket[i]=== string_id){
       repetitonOfId += 1;
     }
   }
   if (document.querySelector('.quantity') != null ){
   var quantity = document.querySelectorAll('.quantity');
   var compareId = document.querySelector('#Id'+string_id);
   for (value of quantity.values()){
   if(value === compareId){
   /*actualiser les quantités*/
   console.log('bravo');
   value.textContent = repetitonOfId;}
  else {}
}}
    /*console.log('il y a ' + qtty);*/
 }
/*----------------appeler les fonctions à l'aide de onclick sur html----------*/
 function addProductToBucketClick(idOnButton){
  addProductToBucketById(idOnButton)
}
function removeProductToBucketClick(idOnButton){
  removeProductToBucketById(idOnButton)
}

/*-----------CALCULATEUR DE PRIX TOTAL, articles * quantités----------*/
function totalPrice(){
  totalSum = 0;
  var arrayOfPrices = [];
  var arrayOfQuantity = [];
  var totalPrices = document.querySelector('.total');
 var productsPrices = document.querySelectorAll('.price');
 var productsQuantity = document.querySelectorAll('.quantity');
 /*console.log(productsPrices);*/
  for (value of productsPrices.values()){
    arrayOfPrices.push(value.textContent);
  }
  for (value of productsQuantity.values()){
    arrayOfQuantity.push(value.textContent)
  }
  var multiplicateur = {};
   multiplicateur['price']= arrayOfPrices;
   multiplicateur['quantity']= arrayOfQuantity;
    for (i in arrayOfPrices){
    totalSum += multiplicateur['price'][i] * multiplicateur['quantity'][i]
  };
 /*return Array.prototype.map.call(productsPrices, function(elem) { return elem.textContent; });*/
  /*console.log(totalSum)*/
  totalPrices.innerHTML = totalSum;
}


console.log(localStorage);
getAllBucket();


/*-------------BROUILLON------------------*/
/*function delayedAlert() {
  
  timeoutID = window.setTimeout(slowAlert, 5000);
}*/
/*loadHTMLTable(allData);*/

/*function slowAlert() {
  console.log('5 SECONDES');
  totalPrice();
}*/

/* with error gest */
/*function getOneProduct(product_id){
  try {
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
    if(response.ok){
      const data = await response.json()
  .then(data => requestData = data);
  if (requestData != []){
    allData.push(requestData);}} 
  else {
      console.error('Server response : ', response.status)
    }});}  catch (err){
      console.log(err)
}}     */