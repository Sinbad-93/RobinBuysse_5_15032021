/*DOM classe des articles*/
var productsPicturesNames = [];
var productsPictures = [];

/* générer une Array reliée aux éléments du DOM */
for(var i=0; i<5; i++){
  productsPicturesNames.push('.teddy_'+(i+1));
  productsPictures[i] = document.querySelector(productsPicturesNames[i]);
};

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