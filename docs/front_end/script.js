/*DOM classe des cartes*/
var productsPicturesNames = [];
var productsPictures = [];

/* générer une Array reliée aux éléments du DOM */
for(var i=0; i<5; i++){
  productsPicturesNames.push('.teddy_'+(i+1));
  productsPictures[i] = document.querySelector(productsPicturesNames[i]);
};
/*
productsPictures[0].addEventListener('click', function(){
  console.log('clické');
});
*/
/*utilisé sur le onclick html*/
function getId(number)
{
const separateString = number.split('_');
console.log(separateString);
/*localStorage.clear();*/
localStorage.setItem('productId',separateString[1]);
localStorage.setItem(separateString[0],separateString[1]);
console.log(localStorage);
}

console.log(productsPicturesNames);
console.log(productsPictures);
console.log(productsPictures[0]);

  /**/