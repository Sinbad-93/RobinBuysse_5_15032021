/* ANIMER LA SIDEBAR SHOW/HIDE*/

/*selectionner éléments du DOM*/
var sideBar = document.querySelector('.sidebar');
var showHide = document.querySelector('.showHide');
var sideBarWidth = window.getComputedStyle(sideBar,null).getPropertyValue("width");
/*Fonction qui permet de switcher entre les deux etats*/
function showHideSideBar(){  
    if (showHide.textContent === '⇦'){
    sideBar.style.transition = 'width 2s';
    sideBar.style.width = '20px';
    showHide.textContent ='⇨';}
    else if (showHide.textContent ==='⇨'){
        sideBar.style.width = '140px';
        showHide.textContent ='⇦';}}
