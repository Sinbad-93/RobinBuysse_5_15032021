var product = document.querySelector('.product');
var requestData = [];

id = localStorage.getItem('number');


function getOneProduct(product_id){
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
const data = await response.json()
  .then(data => requestData = data);
    console.log(requestData);
    var path = requestData['imageUrl'];
    product.setAttribute("src", path);	

     });}
  

getOneProduct(id);






















/*var uRL = window.location.href;
console.log(uRL);*/

/*function getParameterByName(name)
{
 name = name.replace(/[[]/, [).replace(/[]]/, ]);
 var regexS = [?&] + name + =([^&#]*);
 var regex = new RegExp(regexS);
 var results = regex.exec(window.location.search);
 if(results == null)
 return ;
 else
 return decodeURIComponent(results[1].replace(/+/g, ));
}

getParameterByName(uRL);*/