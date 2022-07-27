//script for Articles page
//Author: Hanif Rodili

var path = window.location.pathname
var lang = path.split("/")[1]
//===================================================//
setTimeout(() => {
  appendAllArticles()
}, 900);
function appendAllArticles() {
  const articles = JSON.parse(localStorage.getItem("published_articles"))

  const mainArticlesList = document.querySelector(".articles-category-list")

  //get template elements
  const categoryBlock = document.querySelector(".articles-category")
  const cardParent = document.querySelector(".articles-list")
  const articleCard = document.querySelector(".article-card")

  for (const categoryName in articles[lang]) {
    //clone template
    const cloneList = cardParent.cloneNode(true);
    cloneList.children[0].remove()
    const cloneBlock = categoryBlock.cloneNode(true);
    cloneBlock.querySelector(".category-link").setAttribute("href", `${path}/${categoryName}`)
    cloneBlock.querySelector(".category-name").innerText = categoryName.replaceAll("-", " ").trim().replace(/^\w/, (c) => c.toUpperCase())
    cloneBlock.children[1].remove()

    articles[lang][categoryName].forEach(article => {
      //clone card template
      const cloneCard = articleCard.cloneNode(true);

      // console.log(cloneCard.children[0].children[0])

      //set article link to card
      cloneCard.setAttribute("href", `${path}/${categoryName}/${article.slug}`)

      const thumbnail = cloneCard.querySelector(".article-thumbnail")
      const authorName = cloneCard.querySelector(".article-author-name")
      const title = cloneCard.querySelector(".article-title")
      const publishedDate = cloneCard.querySelector(".article-published-date")

      // set article featured image link
      thumbnail.removeAttribute('srcset')
      thumbnail.setAttribute('src', article.featured_image_link)

      // set article author name
      authorName.innerText = article.author

      //set article title
      title.innerText = article.title

      // set article published date
      publishedDate.innerText = article.date_publish.toUpperCase()

      // append new article card
      cloneList.appendChild(cloneCard);
      cloneBlock.appendChild(cloneList);
    });
    cloneBlock.style.display = "block"
    mainArticlesList.appendChild(cloneBlock);
  }
  //remove template
  mainArticlesList.children[0].remove()
}