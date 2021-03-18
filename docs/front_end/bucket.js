var product = document.querySelector('.product');
let requestData;
var allData = [];
var differentsProducts = [];
id = localStorage.getItem('productId');
var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');

console.log(title);
var allData = [];
var compteur = 0;

function getOneProduct(product_id){
  let data;
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
    data = await response.json()
  .then(data => requestData = data);
  console.log(requestData['name'])
    allData.push(requestData);
    dataWatch.watched= allData;
    /*console.log(requestData);*/
    /*var path = requestData['imageUrl'];
    product.setAttribute("src", path);
    title.textContent = requestData['name'];
    price.textContent = requestData['price'];
    description.textContent = requestData['description'];
    color1.textContent = requestData['colors'][0];	*/
    
     })}


  function getAllBucket() {
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  
  console.log(inBucket);
  /* récupérer les articles en exemplaire uniques en comparant deux array,
  possible avec includes, mais non compatible Internet Explorer*/
  for (i in inBucket){
    if (differentsProducts.indexOf(inBucket[i]) != -1){}
    else {differentsProducts.push(inBucket[i])}
    }
    for (i in differentsProducts){
      getOneProduct(differentsProducts[i]);
    }; 
    console.log(differentsProducts)
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
      console.log(value);
      console.log(value.length);
      console.log(differentsProducts.length);
  if (value.length === differentsProducts.length){ 
    console.log('les données sont chargées');
    quantityCount(allData);
    loadHTMLTable(allData);
    totalPrice();
    compteur += 1;
    };
}); 
console.log('le compteur : ' + compteur);
/*fonction GET charger les données sur la page*/
function loadHTMLTable(data) {
  const tableau = document.querySelector('table tbody');
  /*if (data.length === 0) {/* au cas ou il n'y a pas de données
      tableau.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;}*/
      
let tableauHtml = "";


/*var path = requestData['imageUrl'];
product.setAttribute("src", path);
color1.textContent = requestData['colors'][0];*/
/*data = param de la fn*/
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
  /*tableau.insertAdjacentHTML("afterbegin", tableauHtml);*/
  
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

 function addProductToBucketClick(idOnButton){
  addProductToBucketById(idOnButton)
}
function removeProductToBucketClick(idOnButton){
  removeProductToBucketById(idOnButton)
}


function totalPrice(){
  
}

console.log(localStorage);
getAllBucket();
/*loadHTMLTable(allData);*/



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