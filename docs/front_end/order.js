function saveOrder(data){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( data )};
    fetch('http://localhost:3000/api/teddies/order', requestOptions)
    .then(async response => {
        const data = await response.json()
    .then(data => showOrder(data));
    // check for error response
     if (!response.ok) {
    // get error message from body or default to response status
    const error = (data && data.message) || response.status;
    return Promise.reject(error); }})
    .catch(error => {
    this.errorMessage = error;
    console.error('There was an error!', error);});
    
  }

var compteur = 1;
var objetContact = JSON.parse(localStorage.getItem('orderData'));
saveOrder(objetContact);


function showOrder(data){
var costumerOrder = document.querySelector('.order');
var totalPrice = document.querySelector('.totalPrice');
  console.log('Dans votre panier initial :');console.log(data);

var contact = data['contact'];
var products = data['products'];
var orderId =  data['orderId'];
var orderResume = JSON.parse(localStorage.getItem('resumeOrder'));

for (i in contact){
costumerOrder.innerHTML +=   i + ' : ' + contact[i] + '<br>' ;
}
 
costumerOrder.innerHTML += '<br><strong>Numéro de commande</strong> : ' + orderId + '<br>';

var sumPrices = 0;

for (i = 0; i < (orderResume.length-2); i +=3){
    costumerOrder.innerHTML +=   
    ' <br> ' + 'produit ' + compteur + ' : ' 
    + orderResume[i] + ' ' 
    + '('+orderResume[i+1]+')' + '  '
    + 'quantity : '+ orderResume[i+2] ;
    sumPrices += orderResume[i+1]*orderResume[i+2];
    compteur += 1;
    }
    totalPrice.innerHTML = 'Montant total de la commande : ' + sumPrices;

  }