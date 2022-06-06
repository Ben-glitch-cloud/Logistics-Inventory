const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000 

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.get('/viewItems', (req, res) => { 
    let ItemsList = [{id: 0, itemName: 'Paper sheets', itemDescription: 'HR White Office A4 Paper 80gsm (Pack of 2500) HR F0317', quantity: 4, wareHouse: false, Date: "04/05/2022"}]
    res.render('items', {InventoryItemsList: ItemsList})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 

