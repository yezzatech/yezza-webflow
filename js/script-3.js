//script for populate list of published articles from google sheet
//Author: Hanif Rodili
function getArticlesList() {
  var id = '18YYDm8_0uR4qwS9SB7mFlsAPoSyZxR-S7m5-N4yge8g';
  var gid = '0';
  var url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;
  fetch(url)
    .then(response => response.text())
    .then(data => processArticles(data.slice(47, -2)));
}
function processArticles(jsonString) {
  var json = JSON.parse(jsonString);
  var rows = json.table.rows
  var cols = json.table.cols
  var articles = {}

  var labels = []
  cols.forEach((label, index) => {
    labels.push(label.label)
  });
  // console.log(labels);

  rows.reverse().forEach((row, index) => {
    var data = row.c
    var language = ""
    var category = ""

    var article = {}
    labels.forEach((keyName, index) => {
      keyName = keyName.toLowerCase().replaceAll(" ", "_")
      // console.log(keyName);
      //format date if label == Date Publish
      if (keyName == "date_publish") {
        const month = [
          "January", "February", "March", "April",
          "May", "June", "July", "August", "September",
          "October", "November", "December"
        ]
        const date = data[index].v.slice(
          data[index].v.indexOf("(") + 1,
          data[index].v.lastIndexOf(")"),
        ).split(',')

        const formattedDate = `${date[2]} ${month[date[1]]} ${date[0]}`
        // assign formatted date to Date Publish key
        article[keyName] = formattedDate
      } else {
        // assign value to key
        article[keyName] = data[index].v
      }

      // get name for language object and category array
      if (keyName == "language") {
        language = data[index].v
      }
      if (keyName == "category") {
        category = data[index].v.replaceAll(" ", "-")
      }
    });

    // check language object existed or not
    var isLanguageExist = language in articles
    if (!isLanguageExist) {
      // create language object
      articles[language] = {}
    }

    // check category array existed or not
    var isCategoryExist = category in articles[language]
    if (!isCategoryExist) {
      // create category array and push article into category
      articles[language][category] = []
      articles[language][category].push(article)
    } else {
      // push article into category
      articles[language][category].push(article)
    }
  });
  const articlesStr = JSON.stringify(articles)
  localStorage.setItem("published_articles", articlesStr);
}
getArticlesList()