/*récupérer les données de commandes*/
var objetContact = JSON.parse(localStorage.getItem('orderData'));

/*poster les donner de commandes pour récupérer un id de commande*/
function saveOrder(data){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( data )};
    fetch('http://localhost:3000/api/teddies/order', requestOptions)
    .then(async response => {
        const data = await response.json()
    .then(data => showOrder(data));/*afficher les données récupérés sur la page web*/
    // check for error response
     if (!response.ok) {
    // get error message from body or default to response status
    const error = (data && data.message) || response.status;
    return Promise.reject(error); }})
    .catch(error => {
    this.errorMessage = error;
    console.error('There was an error!', error);});
  }

/*compteur utilisé dans la fonction showOrder*/
var numero = 1;
/*function qui permet d'afficher les données récupérés sur la page web*/
function showOrder(data){
/*récupérer les éléments du DOM*/
var costumerOrder = document.querySelector('.order');
var totalPrice = document.querySelector('.totalPrice');
/*récupérer l'Id de commande et les coordonées du client*/
var contact = data['contact'];
var orderId =  data['orderId'];
/*récupérer -> nom, prix et quantités des articles*/
var orderResume = JSON.parse(localStorage.getItem('resumeOrder'));

/*afficher coordonnées */
for (i in contact){
costumerOrder.innerHTML +=   i + ' : ' + contact[i] + '<br>' ;
}
/*afficher id order */
costumerOrder.innerHTML += '<br><strong>Command order</strong> : ' + orderId + '<br>';

/*initialiser pour la somme des prix */
var sumPrices = 0;
if (orderResume){
/*afficher les données d'articles de commande + calculer le total*/
for (i = 0; i < (orderResume.length-2); i +=3){
    costumerOrder.innerHTML +=   
    ' <br> ' + 'product ' + numero + ' : ' 
    + orderResume[i] + ' ' 
    + '('+orderResume[i+1]+')' + '  '
    + 'quantity : '+ orderResume[i+2] ;
    /*calcul du total puis addition entre chaque produit*/
    sumPrices += orderResume[i+1]*orderResume[i+2];
    /*nb de produits*/
    numero += 1;
    }
    /*afficher le total*/
    totalPrice.innerHTML = 'Final price order : ' + sumPrices + ' ¥';

  }}
/*lancer le script*/
saveOrder(objetContact);
/*réinitialiser le magasin*/
function cleanBasket(){
localStorage.clear();
alert('le localStorage a été vidé')}