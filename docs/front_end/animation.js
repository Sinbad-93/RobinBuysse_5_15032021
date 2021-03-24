var sideBar = document.querySelector('.sidebar');
var showHide = document.querySelector('.showHide');
console.log(showHide.textContent === '⇦');
var sideBarWidth = window.getComputedStyle(sideBar,null).getPropertyValue("width");
console.log(sideBarWidth);

function showHideSideBar(){  
    console.log('fn');
    console.log(showHide.textContent, '⇦');
    if (showHide.textContent === '⇦'){
    sideBar.style.transition = 'width 2s';
    sideBar.style.width = '20px';
    showHide.textContent ='⇨';}
    else if (showHide.textContent ==='⇨'){
        sideBar.style.width = '140px';
        showHide.textContent ='⇦';}}
