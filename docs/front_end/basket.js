/* init variable*/
let requestData;
var allData = [];
var differentsProducts = [];
var totalSum = 0;
var allData = [];
var compteur = 0;
var id = localStorage.getItem("productId");
/*formulaire*/
let inBasket;
let products;
/*-----*/
/*récupérer elements du DOM*/
var product = document.querySelector(".product");
var title = document.querySelector(".title");
var price = document.querySelector(".price");
var description = document.querySelector(".description");
var color1 = document.querySelector(".color1");
var totalPrices = document.querySelector(".total");
var helpBtn = document.querySelector(".help_btn");
var helpMessage = document.querySelector(".help_message");
const tableau = document.querySelector("table tbody");

/*récuperer un produit en fonction de son id, graçe à l'api*/
async function getOneProduct(product_id) {
  try {const response = await fetch("http://localhost:3000/api/teddies/" + product_id);
  const data = await response.json();
  loadHTMLTable(data);}
  catch (error) {
    console.error(error);}
}

/*récuperer le contenu du panier pour pouvoir afficher les données*/
function getAllBasket() {
  /*REF01 récuperer l'etat du panier*/
  inBasket = JSON.parse(localStorage.getItem("inBasket"));
  /*gérer le cas du panier vide*/
  if (inBasket.length === 0) {
    loadHTMLTable(inBasket);
  }
  /* récupérer les articles en exemplaire uniques en comparant deux array,
  également possible et plus simple avec includes, mais non compatible Internet Explorer*/
  for (i in inBasket) {
    /*si le produit est déjà dans la liste, ne rien faire*/
    if (differentsProducts.indexOf(inBasket[i]) != -1) {
    } else {
      /*sinon insérer le produit en exemplaire unique*/
      differentsProducts.push(inBasket[i]);
    }
  }
  /*boucler sur l'API les Id de produits du panier*/
  for (i in differentsProducts) {
    getOneProduct(differentsProducts[i]);
  }
}

/*inserer les données récupérée sur la page*/
function loadHTMLTable(data) {
  /*récuperer élément du DOM*/
  /*const tableau = document.querySelector("table tbody");*/
  /*gérer le cas du panier vide*/
  if (data.length === 0) {
    tableau.innerHTML =
      "<tr><td class='no-data' colspan='5'>Votre panier est vide</td></tr>";
    return;
  }
  /*initialiser insertion de données*/
  let tableauHtml = "";
  /*insérer les données dans la variable en bouclant sur chaque produit*/
  tableauHtml += `<tr id="product_${data["_id"]}">`;
  tableauHtml += `<td><img class="little_picture" src='${data["imageUrl"]}'></td>`;
  tableauHtml += `<td class='name'>${data["name"]}</td>`;
  tableauHtml += `<td class='price'>${convertPrice(data["price"])}</td>`;
  tableauHtml += `<td> <span id="Id${
    data["_id"]
  }" class="quantity">${productCountBefore(data["_id"])}</span>
      <button id="${
        data["_id"]
      }" onclick="removeProductToBasketClick(this.id);" >-</button>
    <button id="${
      data["_id"]
    }" onclick="addProductToBasketClick(this.id);" >+</button>
    <button alt="trash all quantity of this product" id="${
      data["_id"]
    }" onclick="removeAllProductsById(this.id);" ><i class="fas fa-trash-alt"></i></button></td>`;
  tableauHtml += "</tr>";

  /*faire le total des prix*quantités au fur et à mesure*/
  totalPriceBefore(convertPrice(data["price"]), productCountBefore(data["_id"]));
  /*insérer la variable dans un élément du DOM pour afficher données */
  tableau.innerHTML += tableauHtml;
  /*Autre manière de faire :
  tableau.insertAdjacentHTML("afterbegin", tableauHtml);*/
}

/* convertir le prix en €*/
function convertPrice(number){
  string = number.toString();
  var virg = ",";
  var convert = string.substring(0, 2) + virg + string.substring(2);
  var convertNumber = parseFloat(convert);
    return convertNumber;
}
/*----------------Afficher les quantités du panier au chargement du DOM----------*/
function productCountBefore(string_id) {
  /*fonction similaire à celle dans product.js*/
  var inBasket = JSON.parse(localStorage.getItem("inBasket"));
  var repetitonOfId = 0;
  for (i in inBasket) {
    if (inBasket[i] === string_id) {
      repetitonOfId += 1;
    }
  }
  /*actualiser les quantités*/
  return repetitonOfId;
}
/*----------------Afficher le total quantités*prix au chargement du DOM----------*/
var totalSum = [];
/* fonction d'affichage du prix total au chargement de la page*/
function totalPriceBefore(a, b) {
  totalSum.push(a * b);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  totalPrices.innerHTML = totalSum.reduce(reducer);
}

/*-------------------AJOUTER UN ARTICLE DANS LE PANIER----------------*/
function addProductToBasketById(productAdded) {
  /*fonction déjà commenté dans product.js*/
  var inBasket = JSON.parse(localStorage.getItem("inBasket"));
  inBasket.push(productAdded);
  localStorage.setItem("inBasket", JSON.stringify(inBasket));

  /*inBasket =  JSON.parse(localStorage.getItem('inBasket'));*/

  productCount(productAdded);

  totalPrice();
}

/*---------------ENLEVER UN ARTICLE DU PANIER--------------------*/
function removeProductToBasketById(productAdded) {
  /*fonction déjà commenté dans product.js*/
  var inBasket = JSON.parse(localStorage.getItem("inBasket"));
  var position = inBasket.indexOf(productAdded);
  if (position > -1) {
    var removedItem = inBasket.splice(position, 1);
  } else {
    alert("quantité déjà à zéro dans votre panier");
  }
  localStorage.setItem("inBasket", JSON.stringify(inBasket));

  /*inBasket =  JSON.parse(localStorage.getItem('inBasket'));*/

  productCount(productAdded);
  totalPrice();
}

/*Supprimer tous les produits du panier */
function removeAllProductsById(productAdded){
    /*fonction déjà commenté dans product.js*/
  var inBasket = JSON.parse(localStorage.getItem("inBasket"));
  var position = inBasket.indexOf(productAdded);
  while (position > -1) {
    var position = inBasket.indexOf(productAdded);
    if (position === null){return}
    var removedItem = inBasket.splice(position, 1);
  } 
  localStorage.setItem("inBasket", JSON.stringify(inBasket));

  /*inBasket =  JSON.parse(localStorage.getItem('inBasket'));*/

  productCount(productAdded);
  totalPrice();
}

/*-COMPTER LE NOMBRE D ARTICLE DANS LE PANIER POUR ACTUALISER LES DONNEES quantités, 
 après ajout ou suppression d'un produit----------*/
function productCount(string_id) {
  /*similaire à product.js*/
  var inBasket = JSON.parse(localStorage.getItem("inBasket"));
  var repetitonOfId = 0;
  for (i in inBasket) {
    if (inBasket[i] === string_id) {
      repetitonOfId += 1;
    }
  }
  /*vérifer que le noeud Html a déjà été créé*/
  if (document.querySelector(".quantity") != null) {
    /*récuperer l'élément quantité par sa classe et par son id*/
    var quantity = document.querySelectorAll(".quantity");
    var domElementById = document.querySelector("#Id" + string_id);
    /*comparer les deux pour changer la quantité uniquement
  du produit concerné par l'id passé en paramètre*/
    for (domElement of quantity.values()) {
      if (domElement === domElementById) {
        /*actualiser les quantités du produit cliqué*/
        domElement.textContent = repetitonOfId;
        if (domElement.textContent === '0'){
          var productQuantityZero = document.getElementById('product_'+string_id);
          productQuantityZero.remove();
          /*console.log(tableau.hasChildNodes());
          console.log(tableau);*/
          //Attention il ne doit pas y avoir de balise commentaire ni d'espace dans la balise tbody
          if (!tableau.hasChildNodes()) {
            /*console.log('pas de données');*/
            tableau.innerHTML =
              "<tr><td class='no-data' colspan='5'>Votre panier est vide</td></tr>";
          }
        }
      }
    }
  }
}
/*----------------appeler les fonctions à l'aide de onclick sur html----------*/
function addProductToBasketClick(idOnButton) {
  addProductToBasketById(idOnButton);
}
function removeProductToBasketClick(idOnButton) {
  removeProductToBasketById(idOnButton);
}

/*-----------CALCULATEUR DE PRIX TOTAL, articles * quantités----------*/
function totalPrice() {
  totalSum = 0;
  /*outils de calcul */
  var resumeOrder = [];
  var arrayOfNames = [];
  var arrayOfPrices = [];
  var arrayOfQuantity = [];
  /*éléments concernés*/
  var productsNames = document.querySelectorAll(".name");
  var productsPrices = document.querySelectorAll(".price");
  var productsQuantity = document.querySelectorAll(".quantity");
  /*liste des noms des produits dans l'ordre d'affichage*/
  for (value of productsNames.values()) {
    arrayOfNames.push(value.textContent);
  }
  /*liste des prix des produits dans l'ordre d'affichage*/
  for (value of productsPrices.values()) {
    arrayOfPrices.push(value.textContent);
  }
  /*liste des quantités des produits dans l'ordre d'affichage*/
  for (value of productsQuantity.values()) {
    arrayOfQuantity.push(value.textContent);
  }
  /*ranger les trois listes dans un objet*/
  var multiplicateur = {};
  multiplicateur["name"] = arrayOfNames;
  multiplicateur["price"] = arrayOfPrices;
  multiplicateur["quantity"] = arrayOfQuantity;
  /*itérer sur l'objet pour lier les données de façon symétriques*/
  for (i in arrayOfPrices) {
    /*multiplier puis additionner pour obtenir le prix total*/
    totalSum += multiplicateur["price"][i] * multiplicateur["quantity"][i];
    /*garder en mémoire nom/prix/quantité pour la page order*/
    resumeOrder.push(
      multiplicateur["name"][i],
      multiplicateur["price"][i],
      multiplicateur["quantity"][i]
    );
  }
  /*afficher le prix total*/
  totalPrices.innerHTML = totalSum;
  /* informations de commandes triés pour la page order*/
  localStorage.setItem("resumeOrder", JSON.stringify(resumeOrder));
}
/*Enregistrer les données pour la requete POST*/
function saveData() {
  totalPrice();
  /*données de contact formulaire*/
  var costumerFirstName = document.querySelector("#firstName");
  var costumerLastName = document.querySelector("#lastName");
  var costumerAddress = document.querySelector("#address");
  var costumerCity = document.querySelector("#city");
  var costumerEmail = document.querySelector("#email");
  /*insérer dans un objet*/
  contact = {
    firstName: costumerFirstName.value,
    lastName: costumerLastName.value,
    address: costumerAddress.value,
    city: costumerCity.value,
    email: costumerEmail.value,
  };
  /*VARIABLE RAJ APRES SOUTENANCE EVITER BUG*/
  var inBasket = JSON.parse(localStorage.getItem("inBasket"));
  /* syntaxe pour la requête*/
  products = inBasket;
  let objetContact = { contact, products };
  localStorage.setItem("orderData", JSON.stringify(objetContact));
  /*console.log(JSON.stringify(objetContact));*/
  /*redirection vers la page order*/
  if (inBasket.length != 0) {
    document.location.href = "order.html";
  } else {
    alert("Vous ne pouvez pas passer commande avec un panier vide !");}
}
/* bouton d'aide au formulaire, afficher/cacher texte*/
helpBtn.addEventListener("click", function () {
  if (helpMessage.style.opacity === "") {
    helpMessage.style.opacity = "1";
    helpBtn.style.opacity = "0.5";
  } else if (helpMessage.style.opacity === "1") {
    helpMessage.style.opacity = "";
    helpBtn.style.opacity = "1";
  }
});

/*--------------------Ajout après mentorat------------------------*/
/*relier chaque élément du formulaire à une variable*/
var firstNameInput = document.querySelector("#firstName");
var lastNameInput = document.querySelector("#lastName");
var addressInput = document.querySelector("#address");
var cityInput = document.querySelector("#city");
var emailInput = document.querySelector("#email");
/*(les spans sont invisibles par défaut et apparaitrons en cas de mauvaise saisie)*/
var firstNameSpan = document.querySelector(".firstNameSpan");
var lastNameSpan = document.querySelector(".lastNameSpan");
var addressSpan = document.querySelector(".addressSpan");
var citySpan = document.querySelector(".citySpan");
var emailSpan = document.querySelector(".emailSpan");
var formButton = document.querySelector("#formButton");

/*fonction qui change la couleur du bouton du formulaire en fonction de la bonne saisie*/
function colorOrderButton() {
  /*si il n'y a pas de message d'aide...*/
  if (
    (emailSpan.style.display != "inline") &
    (citySpan.style.display != "inline") &
    (addressSpan.style.display != "inline") &
    (lastNameSpan.style.display != "inline") &
    (firstNameSpan.style.display != "inline")
  ) {
    /*...alors couleur normale*/
    formButton.style.backgroundColor = "rgba(238,238,154,0.7)";
  } else {
    /*...sinon couleur rouge*/
    formButton.style.backgroundColor = "red";
  }
}

/*se relier au formulaire*/
var form = document.querySelector("form");
/*écouter l'evenement click sur le formulaire*/
form.addEventListener("click", function () {
  /* -INPUT1-réagir en fonction de l'élément qui est activé*/
  if (document.activeElement === firstNameInput) {
    /*écouter le click pour savoir si l'on est sorti de l'input,
    et afficher une aide si la saisie est mauvaise
    enlver l'aide si la saisie est bonne*/
    window.addEventListener("click", function () {
      if (document.activeElement != firstNameInput) {
        if (firstNameInput.checkValidity() === false) {
          firstNameSpan.style.display = "inline";
          /*passer dans la fonction de gestion de couleur du bouton formulaire*/
          colorOrderButton();
        } else {
          firstNameSpan.style.display = "none";
          /*passer dans la fonction de gestion de couleur du bouton formulaire*/
          colorOrderButton();
        }
      }
    });
  } else if (document.activeElement === lastNameInput) {
    /*même principe que -INPUT1- juste au dessus*/
    window.addEventListener("click", function () {
      if (document.activeElement != lastNameInput) {
        if (lastNameInput.checkValidity() === false) {
          lastNameSpan.style.display = "inline";
          colorOrderButton();
        } else {
          lastNameSpan.style.display = "none";
          colorOrderButton();
        }
      }
    });
  } else if (document.activeElement === addressInput) {
    /*même principe que les autres input*/
    window.addEventListener("click", function () {
      if (document.activeElement != addressInput) {
        if (addressInput.checkValidity() === false) {
          addressSpan.style.display = "inline";
          colorOrderButton();
        } else {
          addressSpan.style.display = "none";
          colorOrderButton();
        }
      }
    });
  } else if (document.activeElement === cityInput) {
    /*même principe que les autres input*/
    window.addEventListener("click", function () {
      if (document.activeElement != cityInput) {
        if (cityInput.checkValidity() === false) {
          citySpan.style.display = "inline";
          colorOrderButton();
        } else {
          citySpan.style.display = "none";
          colorOrderButton();
        }
      }
    });
  } else if (document.activeElement === emailInput) {
    /*même principe que les autres inputé*/
    window.addEventListener("click", function () {
      if (document.activeElement != emailInput) {
        if (emailInput.checkValidity() === false) {
          emailSpan.style.display = "inline";
          colorOrderButton();
        } else {
          emailSpan.style.display = "none";
          colorOrderButton();
        }
      }
    });
  }
});
function logBasket(){
console.log(inBasket)
 }
/*GLOBAL*/
/*lancer le script*/
getAllBasket();
