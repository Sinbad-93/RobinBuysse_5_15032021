var product = document.querySelector('.product');
var requestData = [];
var dataa = [];
var allData = [];
id = localStorage.getItem('productId');

var title = document.querySelector('.title');
var price = document.querySelector('.price');
var description = document.querySelector('.description');
var color1 = document.querySelector('.color1');

console.log(title);

// |text| vaut "Ceci est un exemple de texte".


function getOneProduct(product_id){
  fetch('http://localhost:3000/api/teddies/' + product_id)
  .then(async response => {
const data = await response.json()
  .then(data => requestData = data);
    keepData(requestData);
    /*console.log(requestData);*/
    /*var path = requestData['imageUrl'];
    product.setAttribute("src", path);
    title.textContent = requestData['name'];
    price.textContent = requestData['price'];
    description.textContent = requestData['description'];
    color1.textContent = requestData['colors'][0];	*/
    
     });}
  
function getAllBucket() {
  var inBucket = JSON.parse(localStorage.getItem('inBucket'));
  var differentsProducts = [];
  console.log(inBucket);
  /* récupérer les articles en exemplaire uniques en comparant deux array,
  possible avec includes, mais non compatible Internet Explorer*/
  for (i in inBucket){
    if (differentsProducts.indexOf(inBucket[i]) != -1){}
    else {differentsProducts.push(inBucket[i])}
    }
    for (i in differentsProducts){
      getOneProduct(differentsProducts[i]);
    }; 
  }

function keepData(data){
  allData.push(data);
}

/*fonction GET charger les données sur la page*/
function loadHTMLTable(data) {
  
  const tableau = document.querySelector('table tbody');
 
  /*if (data.length === 0) {/* au cas ou il n'y a pas de données
      tableau.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;}*/

let tableauHtml = "";

/*var path = requestData['imageUrl'];
product.setAttribute("src", path);
color1.textContent = requestData['colors'][0];*/

/*data = param de la fn*/

 for (i in data){
      tableauHtml += "<tr>";
      tableauHtml += `<td>${data[i]['name']}</td>`;
      tableauHtml += `<td>${data[i]['price']}}</td>`;
      tableauHtml += `<td>${data[i]['description']}}</td>`;
      tableauHtml += "</tr>";
 }
  /*convertit tout en string puis le rentre dans le DOM */
  tableau.innerHTML = tableauHtml;
}

console.log(localStorage);
/*getOneProduct(id);*/
getAllBucket();
console.log(allData);
console.log(allData[0]);
loadHTMLTable(allData);