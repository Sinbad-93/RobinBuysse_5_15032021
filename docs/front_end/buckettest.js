var product = document.querySelector('.product');
var allData = [];
var totalPrices = document.querySelector('.total');
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

var requestData = [];
var totali = [];
function getOneProduct(product_id){
  let data;
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
    data = await response.json()
      .then(data => { requestData.push(data); loadHTMLTable(data); });
})}

    console.log(requestData[0]);
    
      /*var Multi = a*b;*/
      /*totali.push(requestData['0']['price']);
      console.log(totali);*/
     totalPrices.innerHTML = totali;
    
    /*var path = requestData['imageUrl'];
    product.setAttribute("src", path);
    title.textContent = requestData['name'];
    price.textContent = requestData['price'];
    description.textContent = requestData['description'];
    color1.textContent = requestData['colors'][0];	*/
    



  function getAllBasket() {
  var inBucket = JSON.parse(localStorage.getItem('inBasket'));
  
  console.log(inBucket);
  /* récupérer les articles en exemplaire uniques en comparant deux array,
  possible avec includes, mais non compatible Internet Explorer*/
  for (i in inBucket){
    if (differentsProducts.indexOf(inBucket[i]) != -1){}
    else {differentsProducts.push(inBucket[i])}
    }
    
      getOneProduct(differentsProducts[0]);
   
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
      tableauHtml += `<td><img class="little_picture" src='${data['imageUrl']}'></td>`;
      tableauHtml += `<td class='name'>${data['name']}</td>`;
      tableauHtml += `<td class='price'>${data['price']}</td>`;
      tableauHtml += `<td> Quantité <span id="Id${data['_id']}" class=quantity>${productCountBefore(data['_id'])}</span>
      <button id="${data['_id']}" onclick="removeProductToBasketClick(this.id);" >-</button>
    <button id="${data['_id']}" onclick="addProductToBasketClick(this.id);" >+</button></td>`;
      tableauHtml += "</tr>";
 
  totalPriceBefore(data['price'],productCountBefore(data['_id']) );
  /*convertit tout en string puis le rentre dans le DOM */
  tableau.innerHTML += tableauHtml;
}
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
  console.log('ID' + productAdded );
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
var totalSum = [];
function totalPriceBefore(a,b){
  /*var Multi = a*b;*/
  
  totalSum.push(a*b);
  console.log(totalSum);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  console.log(totalSum.reduce(reducer));
 totalPrices.innerHTML = totalSum.reduce(reducer);
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
/*console.log(arrayOfNames);*/
/*liste des prix des produits dans l'ordre d'affichage*/
  for (value of productsPrices.values()){
    arrayOfPrices.push(value.textContent);
  }
  /*console.log(arrayOfPrices);*/
/*liste des quantités des produits dans l'ordre d'affichage*/
  for (value of productsQuantity.values()){
    arrayOfQuantity.push(value.textContent)
  }
  /*console.log(arrayOfQuantity);*/
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
  console.log(totalSum);
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

/*GLOBAL*/
/*lancer le script*/
getAllBasket();
