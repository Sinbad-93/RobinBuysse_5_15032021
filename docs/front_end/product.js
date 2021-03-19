/* relier des variables aux éléments au DOM*/
var product = document.querySelector('.product');
var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var color3 = document.querySelector('.color3');
var addToBucket = document.querySelector('.addToBucket');
var quantity = document.querySelector('.quantity');
/*initialiser en local des array qui manipuleront des données dans les fonctions*/
var savedProducts = [];
/*récupérer l'id du produit*/
var id = localStorage.getItem('productId');

/*récuperer les informations sur le produit cliqué via l'API*/
function getOneProduct(string_id){
  fetch('http://localhost:3000/api/teddies/' + string_id)
  .then(async response => {
const data = await response.json()
  .then(data => showData(data));	
     });}

/*afficher les données sur le DOM*/
function showData(data){
  var path = data['imageUrl'];
  product.setAttribute("src", path);
  title.textContent = data['name'];
  price.textContent = data['price'];
  description.textContent = data['description'];
  color1.textContent = data['colors'][0];
  color2.textContent = data['colors'][1];
  color3.textContent = data['colors'][2];
}

/*vérifier si un élément existe dans notre local storage, return true || false*/
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
  /*récupérer le contenu du panier avec une variable REF01 */
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  /*ajouter le nouveau produit*/
  inBucket.push(productAdded);
  /*remettre les produits dans la database*/
  localStorage.setItem('inBucket', JSON.stringify(inBucket));

  /*inBucket =  JSON.parse(localStorage.getItem('inBucket'));*/

  /*compter le nombre d'exemplaire du produit dans le panier*/
  productCount(productAdded);
}

/*---------------ENLEVER UN ARTICLE DU PANIER--------------------*/
function removeProductToBucket(productAdded){
  /*REF01*/
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  /*récuperer le dernier exemplaire ajouté*/
  var position = inBucket.indexOf(productAdded);
  /*supprimer l'exemplaire, si déjà 0, notifier*/
  if (position > -1 ){
    var removedItem = inBucket.splice(position, 1);
  }
  else { alert('quantité déjà à zéro dans votre panier')};
  /*retourner le nouveau panier dans la database*/
  localStorage.setItem('inBucket', JSON.stringify(inBucket));

  /*inBucket =  JSON.parse(localStorage.getItem('inBucket'));*/
  
  /*compter le nombre d'exemplaire du produit dans le panier*/
  productCount(productAdded);
}
/*----------------COMPTER LE NOMBRE D ARTICLE DANS LE PANIER----------*/
function productCount(string_id){
  /*REF01*/
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  /*compteur d'id identiques*/
  var repetitonOfId = 0;
  for (i in inBucket){ 
    /*comparer tous les id du panier avec notre id produit*/
    if (inBucket[i]=== string_id){
      repetitonOfId += 1;
    }
  }
  /*actualiser les quantités*/
  quantity.textContent = repetitonOfId;
}

/*AJOUTER ou ENLEVER un article du panier grace au click, relié au DOM onclick*/
function addProductToBucketClick(){
  addProductToBucket(id)
}
function removeProductToBucketClick(){
  removeProductToBucket(id)
}
/*lancer le script*/  
getOneProduct(id);
productCount(id);
initialiseBucket();





















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