//script for page routing
//Insert in root (Site Settings > Custom Code)
//Author: Hanif Rodili
function geoip(json) {
  countrycode = json.country_code
  country = json.country
  console.table({ "Country": country, "Code": countrycode, "-": "-" })
}

var path = window.location.pathname
var currentLanguage = path.split("/")[1]
const langTextEl = document.querySelector("#language-text")
let languageText = ''
switch (currentLanguage) {
  case "en":
    languageText = "English"
    break;
  case "my":
    languageText = "Bahasa"
    break;
  case "id":
    languageText = "Indonesia"
    break;
  default:
    languageText = "English"
    break;
}
langTextEl.innerText = languageText
// currentLanguage = currentLanguage.replace('my', 'ms')

var prefLanguage = localStorage.getItem('preferred_language') || ""

var countrycode = ''
var country = ''
var rel_page = ''

var pageByPassLocalization = [
  "lp",
  "404"
]
var folderByPassLocalization = [
  "articles",
  "artikel"
]

var availableLang = [
  "en",
  "my",
  "id"
]

var pathList = path.split("/")

var isPage = folderByPassLocalization.includes(pathList.slice(-1)[0]);

var containsFolder = folderByPassLocalization.some(element => {
  return pathList.includes(element);
});
var containsPage = pageByPassLocalization.some(element => {
  return pathList.includes(element);
});
var isLangAvaiable = availableLang.includes(currentLanguage)
if (!containsPage) {
  document.querySelector("html").setAttribute("lang", currentLanguage.replace('my', 'ms'))
}

function preferredLanguage() {
  const langSelect = document.querySelectorAll(".language-name")
  langSelect.forEach(el => {
    el.onclick = function () {
      var lang = el.getAttribute("data-language").replace('en', 'x-default')
      rel_page = document.querySelector("link[hreflang='" + lang + "']").href || ""
      localStorage.setItem('preferred_language', lang);
      window.location.replace(rel_page);
      return
    }
  });
}

function redirectPage() {

  if (currentLanguage) {
    return
  }
  if (prefLanguage !== "" && currentLanguage !== prefLanguage) {
    prefLanguage = prefLanguage.replace('en', 'x-default')
    rel_page = document.querySelector("link[hreflang='" + prefLanguage + "']").href || ""
    window.location.replace(rel_page);
    return
  }
  if (countrycode === "MY" && currentLanguage !== "my") {
    rel_page = document.querySelector("link[hreflang='ms']").href || ""
    window.location.replace(rel_page);
    return
  }
  if (countrycode === "ID" && currentLanguage !== "id") {
    rel_page = document.querySelector("link[hreflang='id']").href || ""
    window.location.replace(rel_page);
    return
  }
  if ((countrycode !== "ID" || countrycode !== "MY") && currentLanguage === "") {
    rel_page = document.querySelector("link[hreflang='x-default']").href || ""
    window.location.replace(rel_page);
    return
  }
  if (!isLangAvaiable) {
    countrycode = 'en'
    rel_page = document.querySelector("link[hreflang='x-default']").href || ""
    window.location.replace(rel_page);
    return
  }
}

if (!containsPage && !containsFolder && !isPage) {
  preferredLanguage()
  setTimeout(() => {
    redirectPage()
  }, 300);
}
setTimeout(() => {
  //console.log(prefLanguage, currentLanguage, countrycode, country)
  document.querySelectorAll(".country-text")[0].innerText = country
  document.querySelectorAll(".country-text")[1].innerText = country

  var suggestCode = countrycode.toLowerCase()
  suggestCode = suggestCode.replace('en', 'x-default')
  suggestCode = suggestCode.replace('my', 'ms')
  const rel_page = document.querySelector("link[hreflang='" + suggestCode + "']").href
  currentLanguage = currentLanguage.replace('ms', 'my')

  function closeBanner() {
    document.querySelector("body").style.paddingTop = '0'
    document.querySelector("#suggest-page-banner").style.top = '-100%'
    document.querySelector("#main-header").style.marginTop = '0'
  }
  document.querySelector(".button-close").onclick = function () { closeBanner() };
  document.querySelector(".button-close-mobile").onclick = function () { closeBanner() };

  if (currentLanguage !== countrycode.toLowerCase() && currentLanguage !== prefLanguage) {
    document.querySelector("body").style.paddingTop = '90px'
    document.querySelector("#suggest-page-banner").style.top = 0
    document.querySelector("#main-header").style.marginTop = '90px'
    document.querySelector("#btn-goto").href = rel_page
  }
}, 500);