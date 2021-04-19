/* se relier aux éléments du DOM*/
var picture = document.querySelector(".teddy");
var teddyName = document.querySelector(".teddyName");
var price = document.querySelector(".teddyPrice");
const container = document.querySelector(".picture_container");
/*initialiser variable pour les futurs données*/
let teddyData = "";

/*requete fetch asynchrone de récuparation des données*/
async function getAllProduct() {
  await fetch("http://localhost:3000/api/teddies/").then((response) => {
    const data = response.json().then((data) => showAllTeddy(data));
  });
}

/*afficher les données sur le DOM*/
function showAllTeddy(data) {
  for (i in data) {
    console.log( data[i]["price"]);
    /*insérer les données dans la variable en bouclant sur chaque produit*/
    teddyData = `<div class='picture shadow_picture'><a href='product.html'>
  <img id='teddy${i + 1 + "_" + data[i]["_id"]}' 
  class='teddy' onclick='getId(this.id);'
   src='${data[i]["imageUrl"]}' alt=''></a><p> 
  <span class='teddyName'>${data[i]["name"]}</span>
  <span class='teddyPrice'>${convertPrice(data[i]["price"])} €</span>
  </p></div>`;

    /*insérer la variable dans un élément du DOM pour afficher données */
    container.innerHTML += teddyData;
  }
}

function convertPrice(number){
  console.log(typeof number);
  string = number.toString();
  var virg = ",";
  var convert = string.substring(0, 2) + virg + string.substring(2);
  var convertNumber = parseFloat(convert);
    return convert;
}

/*fonction déclanchée sur le onclick html, permet de mémoriser sur quel produit l'on a cliqué */
function getId(string) {
  /* séparer nom du produit et id produit*/
  const separateString = string.split("_");
  /*save id*/
  localStorage.setItem("productId", separateString[1]);
  /*save name*/
  localStorage.setItem(separateString[0], separateString[1]);
}

/*lancer le script*/
getAllProduct();
