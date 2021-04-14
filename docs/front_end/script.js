/* se relier aux éléments du DOM*/
var picture = document.querySelector('.teddy');
var teddyName = document.querySelector('.teddyName');
var price = document.querySelector('.teddyPrice');
const container = document.querySelector('.picture_container');
/*initialiser variable pour les futurs données*/
let teddyData = "";
let testo;
async function getAllProduct(){
    await fetch('http://localhost:3000/api/teddies/')
  .then( response => {
const data = response.json()
  .then(data => showAllTeddies(data));});}

/*afficher les données sur le DOM*/
function showAllTeddies(data){
  /*gérer le cas du panier vide*/
if (data.length === 0) {
  container.innerHTML = "<span>Accès aux produits impossible</span>";
return;}

for (i in data){
/*insérer les données dans la variable en bouclant sur chaque produit*/
  teddyData = `<div class='picture shadow_picture'><a href='product.html'>
  <img id='teddy${i+1+'_'+data[i]['_id']}' 
  class='teddy' onclick='getId(this.id);'
   src='${data[i]['imageUrl']}' alt=''></a><p> 
  <span class='teddyName'>${data[i]['name']}</span>
  <span class='teddyPrice'>${data[i]['price']}</span>
  </p></div>`;

/*insérer la variable dans un élément du DOM pour afficher données */
container.innerHTML += teddyData;}

  /*for (var i = 0; i < 5; i++){
  var path = data[i]['imageUrl'];
  picture.src = path;
  teddyName.textContent = data[i]['name'];
  price.textContent = data[i]['price'] + ' ¥';
  }*/
}



/*fonction déclanchée sur le onclick html, permet de mémoriser sur quel produit l'on a cliqué */
function getId(number)
{
/* séparer nom du produit et id produit*/
const separateString = number.split('_');
/*save id*/
localStorage.setItem('productId',separateString[1]);
/*save name*/
localStorage.setItem(separateString[0],separateString[1]);
}

getAllProduct();
/*getPageProducts()*/