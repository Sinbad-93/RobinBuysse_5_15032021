var costumerOrder = document.querySelector('.order');


var inBucket2 = JSON.parse(localStorage.getItem('orderData'));
  console.log('Dans votre panier initial :');console.log(inBucket2);
  /*localStorage.setItem('inBucket', JSON.stringify(inBucket2));
  console.log('Dans votre panier désormais :');console.log(inBucket2);*/
var contact = inBucket2['contact'];
var products = inBucket2['products'];
var orderId =  inBucket2['orderId'];

for (i in contact){
costumerOrder.innerHTML +=   i + ' : ' + contact[i] + '<br>' ;
}
 
costumerOrder.innerHTML += '<br><strong>Numéro de commande</strong> : ' + orderId + '<br>';

for (i in products){
    costumerOrder.innerHTML +=   'produit ' + i + ' : ' + products[i]['name'] + '<br>' ;
    }