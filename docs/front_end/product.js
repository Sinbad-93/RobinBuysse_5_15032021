/* relier des variables aux éléments au DOM*/
var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var color3 = document.querySelector('.color3');
var addToBasket = document.querySelector('.addToBasket');
var quantity = document.querySelector('.quantity');
var loupe = document.getElementById('Loupe');
var product = document.querySelector('.picture');

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
  /*product.setAttribute("src", path);*/
  product.style.backgroundImage = 'url('+path+')';
  loupe.style.backgroundImage = 'url('+path+')';
  title.textContent = data['name'];
  price.textContent = data['price'] + ' ¥';
  description.textContent = data['description'];
  color1.textContent = data['colors'][0];
  color2.textContent = data['colors'][1];
  color3.textContent = data['colors'][2];
}

/*vérifier si un élément existe dans notre local storage, return true || false*/
function isKeyExist(obj,key){
      return obj.hasOwnProperty(key);
  }

/*vérifier si le panier existe, sinon l'initialiser*/
function initialiseBasket() {
 if (isKeyExist(localStorage,'inBasket') === false ){
  var product_id = [];
  localStorage.setItem('inBasket', JSON.stringify(product_id));
 }
}

/*-------------------AJOUTER UN ARTICLE DANS LE PANIER----------------*/
function addProductToBasket(productAdded){
  /*récupérer le contenu du panier avec une variable REF01 */
  var inBasket = JSON.parse(localStorage.getItem('inBasket'));
  /*ajouter le nouveau produit*/
  inBasket.push(productAdded);
  /*remettre les produits dans la database*/
  localStorage.setItem('inBasket', JSON.stringify(inBasket));

  /*inBasket =  JSON.parse(localStorage.getItem('inBasket'));*/

  /*compter le nombre d'exemplaire du produit dans le panier*/
  productCount(productAdded);
}

/*---------------ENLEVER UN ARTICLE DU PANIER--------------------*/
function removeProductToBasket(productAdded){
  /*REF01*/
  var inBasket = JSON.parse(localStorage.getItem('inBasket'));
  /*récuperer le dernier exemplaire ajouté*/
  var position = inBasket.indexOf(productAdded);
  /*supprimer l'exemplaire, si déjà 0, notifier*/
  if (position > -1 ){
    var removedItem = inBasket.splice(position, 1);
  }
  else { alert('quantité déjà à zéro dans votre panier')};
  /*retourner le nouveau panier dans la database*/
  localStorage.setItem('inBasket', JSON.stringify(inBasket));

  /*inBasket =  JSON.parse(localStorage.getItem('inBasket'));*/
  
  /*compter le nombre d'exemplaire du produit dans le panier*/
  productCount(productAdded);
}
/*----------------COMPTER LE NOMBRE D ARTICLE DANS LE PANIER----------*/
function productCount(string_id){
  /*REF01*/
  var inBasket = JSON.parse(localStorage.getItem('inBasket'));
  /*compteur d'id identiques*/
  var repetitonOfId = 0;
  for (i in inBasket){ 
    /*comparer tous les id du panier avec notre id produit*/
    if (inBasket[i]=== string_id){
      repetitonOfId += 1;
    }
  }
  /*actualiser les quantités*/
  quantity.textContent = repetitonOfId;
}

/*AJOUTER ou ENLEVER un article du panier grace au click, relié au DOM onclick*/
function addProductToBasketClick(){
  addProductToBasket(id)
}
function removeProductToBasketClick(){
  removeProductToBasket(id)
}

/*------------FONCTION LOUPE POUR ZOOMER SUR IMAGE ------------------*/
/* associer un autre nom pour une meilleur lisibilité*/
var loupeContainer = product;
/* rapport de zoom *2 */
var zoom = 2;
/* variable pour activer /desactiver le zoom*/
var activeZoom = false;
/* ecouter le passage de la souris sur la photo*/
loupeContainer.addEventListener('mousemove',magnifierProduct);
/*par défaut désactivée*/
loupe.style.display = "none";
/* fonction pour créer la loupe sur les photos*/
function magnifierProduct(){
  if (activeZoom === true){
  loupe.style.left = event.clientX - 260 + 'px';
  loupe.style.top = event.clientY - 290 +'px';
  loupe.style.backgroundSize = (500*zoom) + "px";
  loupe.style.backgroundPosition = 'left ' + (-loupe.offsetLeft*zoom-50) + 'px ' + 'top ' + (-loupe.offsetTop*zoom-50) + "px";
}}
/* activer desactiver loupe au click*/
function onOffZoom(){
  if(activeZoom === false){
  activeZoom = true;
  loupe.style.display = "block";
  product.style.cursor = 'none';}
  else if(activeZoom === true){
    activeZoom = false;
    loupe.style.display = "none";
    product.style.cursor = 'initial';}
}

/*GLOBAL*/
/*lancer le script*/  
getOneProduct(id);
productCount(id);
initialiseBasket();





















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