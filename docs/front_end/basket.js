/* init variable*/
let requestData;
var allData = [];
var differentsProducts = [];
var totalSum = 0 ;
var allData = [];
var compteur = 0;
var id = localStorage.getItem('productId');
/*formulaire*/
let inBasket;
let products;
/*-----*/
/*récupérer elements du DOM*/
var product = document.querySelector('.product');
var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');
var helpBtn = document.querySelector('.help_btn');
var helpMessage = document.querySelector('.help_message');


/*récuperer un produit en fonction de son id, graçe à l'api*/
function getOneProduct(product_id){
  let data;
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
    data = await response.json()
  .then(data => requestData = data);
  /*insérer les données dans une array*/
    allData.push(requestData);
    /*surveiller l'etat de l'array*/
    dataWatch.watched= allData;
     })}

/*récuperer le contenu du panier pour pouvoir afficher les données*/
function getAllBasket() {
  /*REF01 récuperer l'etat du panier*/
  inBasket = JSON.parse(localStorage.getItem('inBasket'));
  /*gérer le cas du panier vide*/
  if (inBasket.length === 0){
    loadHTMLTable(inBasket);
  }
  /* récupérer les articles en exemplaire uniques en comparant deux array,
  également possible et plus simple avec includes, mais non compatible Internet Explorer*/
  for (i in inBasket){
    /*si le produit est déjà dans la liste, ne rien faire*/
    if (differentsProducts.indexOf(inBasket[i]) != -1){}
    /*sinon insérer le produit en exemplaire unique*/
    else {differentsProducts.push(inBasket[i])}
    }
    /*boucler sur l'API les Id de produits du panier*/
    for (i in differentsProducts){
      getOneProduct(differentsProducts[i]);
    }; 
  }

/*surveiller la fin de la requete fetch/ fin de la promesse avec getter et setter*/
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
/*fonction qui s'enclenche uniquement si la promesse est résolue*/
dataWatch.registerListener(function(value) {
  if (value.length === differentsProducts.length){ 
    /*console.log('les données sont chargées');*/
    /* A SUPPRIMER*/
    /*compter les quantités d'articles*/
    /*quantityCount(allData);*/

    /*insérer les données dans le html*/
    loadHTMLTable(allData);
    /*faire le total*/
    totalPrice();
    
    };
}); 

/*inserer les données sur la page*/
function loadHTMLTable(data) {
  /*récuperer élément du DOM*/
  const tableau = document.querySelector('table tbody');
  /*gérer le cas du panier vide*/
  if (data.length === 0) {
      tableau.innerHTML = "<tr><td class='no-data' colspan='5'>Votre panier est vide</td></tr>";
    return;}
/*initialiser insertion de données*/
let tableauHtml = "";
/*insérer les données dans la variable en bouclant sur chaque produit*/
 for (i in data){
   var memorisedId = data[i]['_id'];
      tableauHtml += "<tr>";
      tableauHtml += `<td><img class="little_picture" src='${data[i]['imageUrl']}'></td>`;
      tableauHtml += `<td class='name'>${data[i]['name']}</td>`;
      tableauHtml += `<td class='price'>${data[i]['price']}</td>`;
      tableauHtml += `<td> <span id="Id${memorisedId}" class="quantity">${productCountBefore(memorisedId)}</span>
      <button id="${memorisedId}" onclick="removeProductToBasketClick(this.id);" >-</button>
    <button id="${memorisedId}" onclick="addProductToBasketClick(this.id);" >+</button></td>`;
      tableauHtml += "</tr>";
 }
  /*insérer la variable dans un élément du DOM pour afficher données */
  tableau.innerHTML = tableauHtml;
  /*Autre manière de faire :
  tableau.insertAdjacentHTML("afterbegin", tableauHtml);*/
}

/*----------------Afficher les quantités au chargement du DOM----------*/
function productCountBefore(string_id){
  /*fonction similaire à celle dans product.js*/
  var inBasket = JSON.parse(localStorage.getItem('inBasket'));
  var repetitonOfId = 0;
  for (i in inBasket){ 
    if (inBasket[i]=== string_id){
      repetitonOfId += 1;
    }
  }
  /*actualiser les quantités*/
  return repetitonOfId;
}
/* A SUPPRIMER*/
/*function quantityCount(data){
  for (i in data){
    productCountBefore(data[i])
}}*/

/*-------------------AJOUTER UN ARTICLE DANS LE PANIER----------------*/
function addProductToBasketById(productAdded){
  /*fonction déjà commenté dans product.js*/
   var inBasket = JSON.parse(localStorage.getItem('inBasket'));
   inBasket.push(productAdded);
   localStorage.setItem('inBasket', JSON.stringify(inBasket));

   /*inBasket =  JSON.parse(localStorage.getItem('inBasket'));*/

   productCount(productAdded);

   totalPrice();

 ;}
 
 /*---------------ENLEVER UN ARTICLE DU PANIER--------------------*/
 function removeProductToBasketById(productAdded){
    /*fonction déjà commenté dans product.js*/
   var inBasket = JSON.parse(localStorage.getItem('inBasket'));
   var position = inBasket.indexOf(productAdded);
   if (position > -1 ){
     var removedItem = inBasket.splice(position, 1);
   }
   else { alert('quantité déjà à zéro dans votre panier')};
   localStorage.setItem('inBasket', JSON.stringify(inBasket));

   /*inBasket =  JSON.parse(localStorage.getItem('inBasket'));*/

   productCount(productAdded);
   totalPrice();
 }
 /*-COMPTER LE NOMBRE D ARTICLE DANS LE PANIER POUR ACTUALISER SUR LA PAGE, 
 APRES CHARGEMENT DU DOM----------*/
 function productCount(string_id){
   /*similaire à product.js*/
   var inBasket = JSON.parse(localStorage.getItem('inBasket'));
   var repetitonOfId = 0;
   for (i in inBasket){
     if (inBasket[i]=== string_id){
       repetitonOfId += 1;
     }
   }
   /*vérifer que le noeud Html a déjà été créé*/
   if (document.querySelector('.quantity') != null ){
    /*récuperer l'élément quantité par sa classe et par son id*/
   var quantity = document.querySelectorAll('.quantity');
   var compareId = document.querySelector('#Id'+string_id);
  /*comparer les deux pour changer la quantité uniquement
  du produit concerné par l'id passé en paramètre*/
   for (value of quantity.values()){
   if(value === compareId){
   /*actualiser les quantités du produit cliqué*/
   value.textContent = repetitonOfId;}
  else {/* ne rien faire, car si le DOM n'est pas completement chargé ne pas séléctionner le DOM*/}
}}
 }
/*----------------appeler les fonctions à l'aide de onclick sur html----------*/
 function addProductToBasketClick(idOnButton){
  addProductToBasketById(idOnButton)
}
function removeProductToBasketClick(idOnButton){
  removeProductToBasketById(idOnButton)
}

/*-----------CALCULATEUR DE PRIX TOTAL, articles * quantités----------*/
function totalPrice(){
  totalSum = 0;
  /*outils de calcul */
  var resumeOrder = [];
  var arrayOfNames = [];
  var arrayOfPrices = [];
  var arrayOfQuantity = [];
  /*éléments concernés*/
  var totalPrices = document.querySelector('.total');
  var productsNames = document.querySelectorAll('.name');
 var productsPrices = document.querySelectorAll('.price');
 var productsQuantity = document.querySelectorAll('.quantity');
/*liste des noms des produits dans l'ordre d'affichage*/
 for (value of productsNames.values()){
  arrayOfNames.push(value.textContent);
}
/*liste des prix des produits dans l'ordre d'affichage*/
  for (value of productsPrices.values()){
    arrayOfPrices.push(value.textContent);
  }
/*liste des quantités des produits dans l'ordre d'affichage*/
  for (value of productsQuantity.values()){
    arrayOfQuantity.push(value.textContent)
  }
  /*ranger les trois listes dans un objet*/
  var multiplicateur = {};
  multiplicateur['name']= arrayOfNames;
   multiplicateur['price']= arrayOfPrices;
   multiplicateur['quantity']= arrayOfQuantity;
   /*itérer sur l'objet pour lier les données de façon symétriques*/
    for (i in arrayOfPrices){
      /*multiplier puis additionner pour obtenir le prix total*/
    totalSum += multiplicateur['price'][i] * multiplicateur['quantity'][i];
    /*garder en mémoire nom/prix/quantité pour la page order*/
    resumeOrder.push(multiplicateur['name'][i],multiplicateur['price'][i],multiplicateur['quantity'][i]);
  };
  /*afficher le prix total*/
  totalPrices.innerHTML = totalSum;
  /* informations de commandes pour la page order*/
  localStorage.setItem('resumeOrder',JSON.stringify(resumeOrder));
  console.log(resumeOrder);
}
/*Enregistrer les données pour la requete POST*/
function saveData(){
  /*données de contact formulaire*/
  var costumerFirstName = document.querySelector('#firstName');
  var costumerLastName = document.querySelector('#lastName');
  var costumerAddress = document.querySelector('#address');
  var costumerCity = document.querySelector('#city');
  var costumerEmail = document.querySelector('#email');
  /*insérer dans un objet*/
  contact = {
    firstName: costumerFirstName.value,
    lastName: costumerLastName.value,
    address: costumerAddress.value,
    city: costumerCity.value,
    email: costumerEmail.value,
  };
  /* syntaxe pour la requête*/
  products = inBasket;
  let objetContact = {contact, products};
  localStorage.setItem('orderData',JSON.stringify(objetContact));
  /*console.log(JSON.stringify(objetContact));*/
  /*redirection vers la page order*/
  document.location.href="order.html" ;
}
/* bouton d'aide au formulaire, afficher/cacher texte*/
helpBtn.addEventListener('click', function(){
  if (helpMessage.style.opacity === ''){
  helpMessage.style.opacity = '1';
  helpBtn.style.opacity = '0.5';}
  else if (helpMessage.style.opacity === '1'){
    helpMessage.style.opacity = '';
    helpBtn.style.opacity = '1';}
})

/*GLOBAL*/
/*lancer le script*/
getAllBasket();


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