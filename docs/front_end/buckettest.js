var product = document.querySelector('.product');
let requestData;
var allData = [];
var differentsProducts = [];
id = localStorage.getItem('productId');
var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');
var quantity = document.querySelector('.quantity');
console.log(title);
var allData = [];
var compteur = 0;

function getOneProduct(product_id){
  let data;
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
    data = await response.json()
      .then(data => { loadHTMLTable(data); });
})}
  
    /*console.log(requestData);*/
    /*var path = requestData['imageUrl'];
    product.setAttribute("src", path);
    title.textContent = requestData['name'];
    price.textContent = requestData['price'];
    description.textContent = requestData['description'];
    color1.textContent = requestData['colors'][0];	*/
    



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

/*quantityCount(allData);*/
compteur += 1;
 
console.log('le compteur : ' + compteur);
/*fonction GET charger les données sur la page*/
function loadHTMLTable(data) {
  const tableau = document.querySelector('table tbody');
  /*if (data.length === 0) {/* au cas ou il n'y a pas de données
      tableau.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;}*/
let tableauHtml = "";
console.log(data);
/*var path = requestData['imageUrl'];
product.setAttribute("src", path);
color1.textContent = requestData['colors'][0];*/
/*data = param de la fn*/
 
      tableauHtml += "<tr>";
      /*tableauHtml += `<td><img class="little_picture" src='${data[i]['imageUrl']}'></td>`;*/
      tableauHtml += `<td>${data['name']}</td>`;
      tableauHtml += `<td>${data['price']}</td>`;
      tableauHtml += `<td> Quantité <span class=quantity>${productCountBefore(data['_id'])}</span>
      <button onclick=onclick="removeProductToBucketClick()" >-</button>
    <button onclick="addProductToBucketClick()" >+</button></td>`;
      tableauHtml += "</tr>";
 
  /*convertit tout en string puis le rentre dans le DOM */
  tableau.innerHTML += tableauHtml;
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


console.log(localStorage);
getAllBucket();
/*loadHTMLTable(allData);*/



