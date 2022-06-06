const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000 

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express); 
app.use('/public', express.static('public'));


//class import 
const InventoryManager = require('./constructor/logistics') 
const inventorymanager = new InventoryManager

app.get('/viewItems', (req, res) => { 
    res.render('items', {InventoryItemsList: inventorymanager.GetInventoryItemsList()})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 

