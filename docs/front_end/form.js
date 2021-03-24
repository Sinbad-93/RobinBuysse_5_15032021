/*vérifier les données de formulaires*/
/*inutile graçe à HTML 5 pattern ? */
var fisrtNameForm = document.forms['Form_id'].elements['firstname'];
var lastNameForm = document.forms['Form_id'].elements['lastname'];
var addressForm = document.forms['Form_id'].elements['address'];
var cityForm = document.forms['Form_id'].elements['city'];
var emailForm = document.forms['Form_id'].elements['email'];
var formMessage = document.querySelector('.formMessage');

function valider(){

    if(fisrtNameForm.value != "") {
      return true;
    }
    else {
      alert("Saisissez le prénom");
      return false;
    }
  }
          
 