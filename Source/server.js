const express = require('express');
const undici = require('undici')
const app = express();

function parseUrl(usrUrl){
  const slashIndex = usrUrl.indexOf('/')
  const slashNextIndex = usrUrl.indexOf('/', (slashIndex + 2))
  const path = usrUrl.slice(slashNextIndex)
  const url = usrUrl.slice(0, slashNextIndex)
  return { url, path }
}

// set the view engine to ejs
app.set('view engine', 'ejs');

// static assets directory
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get("/uploadPath", (req, res) => {
  const usrUrl = req.query.myURL
  let { url, path } = parseUrl(usrUrl)
  //let url = "https://mywebsite.com"
  //let path = "/myfile.md"
  const {
    statusCode,
    headers,
    trailers,
    body
  } = undici.request({origin: url, pathname: path})

  return res.send({ status: "success", path: url+path });
})

app.listen(3000);
console.log('Server is listening on port 3000');
