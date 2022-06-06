const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000 

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.get('/viewItems', (req, res) => {
  res.render('items', {name: 'ben'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 

