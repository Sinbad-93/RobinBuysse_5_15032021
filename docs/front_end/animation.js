var sideBar = document.querySelector('.sidebar');
var showHide = document.querySelector('.showHide');
console.log(showHide.textContent === 'Hide');
var sideBarWidth = window.getComputedStyle(sideBar,null).getPropertyValue("width");
console.log(sideBarWidth);

function showHideSideBar(){  
    if (showHide.textContent === 'Hide'){
    sideBar.style.transition = 'width 2s';
    sideBar.style.width = '20px';
    showHide.textContent ='Show';}
    else if (showHide.textContent ==='Show'){
        sideBar.style.width = '140px';
        showHide.textContent ='Hide';}}
