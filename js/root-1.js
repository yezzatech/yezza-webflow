//script for UI interaction
//Insert in root (Site Settings > Custom Code)
//Author: Hanif Rodili

// emulate click event for auto open tab
setTimeout(() => {
  var hash = $.trim(window.location.hash);
  if (hash) $('.w-tab-menu a[href$="' + hash + '"]').trigger('click');
}, 100);

//console.log(screen.width)
document.querySelector("html").classList.remove("w-mod-touch")
const dropdown = document.querySelectorAll(".yz-dropdown-menu-2")
dropdown.forEach(el => {
  el.onmouseover = function () { toggleExpandParent(el) }
  el.onmouseout = function () { toggleExpandParent(el) }
});

function toggleExpandParent(el) {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (windowWidth > 991) {
    toggleOpen(el)
    toggleOpen(el.parentElement)
  }
}

function toggleOpen(el) {
  el.classList.toggle("isMenubarOpen")
}

/*const navbtn1 = document.querySelectorAll(".yz-nav-button-1")
navbtn1.forEach(el => {
  if(screen.width > 991){
    el.onmouseover = function(){toggleOpen(el)}
    el.onmouseout = function(){toggleOpen(el)}
  }
});*/
const navbtn2 = document.querySelectorAll(".yz-nav-button-2")
navbtn2.forEach(el => {
  if (screen.width > 991) {
    el.onmouseover = function () { toggleOpen(el) }
    el.onmouseout = function () { toggleOpen(el) }
  }
});
const langBtn = document.querySelectorAll(".select-language")
langBtn.forEach(el => {
  el.onclick = function () {
    document.querySelector(".dialog-container").classList.add("isDialogOpen")
    document.querySelector("html").classList.add("isDialogOpen")
  }
});
const closeDialog = document.querySelector(".close-select-language")
closeDialog.onclick = function () {
  document.querySelector(".dialog-container").classList.remove("isDialogOpen")
  document.querySelector("html").classList.remove("isDialogOpen")
}
document.querySelector(".mobile-menu-button").onclick = function () {
  toggleOpen(document.querySelector(".yz-nav-header")),
    toggleOpen(document.querySelector(".yz-header-brand")),
    toggleOpen(document.querySelector("html"))
}
document.querySelectorAll(".yz-nav-item").forEach(el => {
  if (screen.width <= 991) {
    el.onclick = function () {
      toggleOpen(document.querySelector(".yz-nav-header")),
        toggleOpen(document.querySelector(".yz-header-brand")),
        toggleOpen(document.querySelector("html"))
    }
  }
})