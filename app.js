const express = require('express')
const ejs = require('ejs');
const app = express()
const router = express.Router();
const port = 3000 

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express); 
app.use('/public', express.static('public'));

app.use(express.urlencoded({extended: true}))

const InventoryManager = require('./constructor/logistics') 
const inventorymanager = new InventoryManager

app.get('/viewItems', async (req, res) => {   
    let AllInventoryResults = await inventorymanager.GetInventoryItemsList()
    res.render('Items', {InventoryItemsList: AllInventoryResults})
}) 

app.get('/addItem', (req, res) => {
  res.render('CreateItem')
}) 

app.post('/submitNewItem', async (req, res) => {
  const NewItemObject = {itemName: req.body.itemName, itemDescription: req.body.itemDescription, quantity: req.body.quanity, warehouseAssigned: req.body.warehouseAssigned}  
  await inventorymanager.CreateNewInventoryItem(NewItemObject)
  res.redirect('/viewItems')
}) 

app.get('/oneItem/:id', async (req, res) => {
  const ItemID = req.params.id  
  const ResultForOneItem = await inventorymanager.FindInventoryItem(ItemID) 
  res.render('DeleteItem', {InventoryItem: ResultForOneItem})
}) 

app.get('/DeleteItem/:id', async (req, res) => {
  const ItemID = req.params.id  
  await inventorymanager.DeleteInventoryItem(ItemID) 
  res.redirect('/viewItems')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 

