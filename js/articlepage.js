var url = window.location.href
var title = document.querySelector("title").innerText
var twitterBtn = document.querySelector(".bg-twitter")
var facebookBtn = document.querySelector(".bg-facebook")
var linkedinBtn = document.querySelector(".bg-linkedin")

twitterBtn.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`
linkedinBtn.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`