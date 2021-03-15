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
console.log(number);
localStorage.setItem('number',number);
}

console.log(productsPicturesNames);
console.log(productsPictures);
console.log(productsPictures[0]);

  /**/