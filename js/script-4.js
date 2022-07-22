//script for 404 page
//Author: Hanif Rodili

document.querySelector("html").setAttribute("lang", "en")
//const path = window.location.pathname
const page = path.split("/").slice(-1)[0]
fetch("https://yezza.com/sitemap.xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    getPage(xml, page, countrycode);
  })
  .catch(console.error);

function getPage(xml, typedPage, country) {
  document.querySelector("#page-lost").style.display = "none"
  document.querySelector("#please-wait").style.display = "block"
  console.log("Requested URL: https://yezza.com" + path, "Country: " + country);
  var locs = xml.querySelectorAll("loc")

  const rel_page = []
  locs.forEach(loc => {
    const url = loc.innerHTML
    // console.log(url)
    const urlArr = url.split("/")
    const page = urlArr.slice(-1)[0]
    const lang = urlArr[3]
    if (typedPage === page) {
      rel_page.push({ lang: lang, page: page, url: url })
    }
  });
  if (rel_page.length > 1) {
    rel_page.forEach(path => {
      if (country.toLowerCase() === path.lang) {
        localStorage.setItem('preferred_language', "");
        window.location.replace(path.url);
        console.log("Go to " + path.url);
      }
    });
  }
  if (rel_page.length > 0 && rel_page.length === 1) {
    localStorage.setItem('preferred_language', "");
    window.location.replace(rel_page[0].url);
    console.log("Go to " + rel_page[0].url);
  }
  setTimeout(() => {
    document.querySelector("#page-lost").style.display = "block"
    document.querySelector("#please-wait").style.display = "none"
  }, 1500);

}