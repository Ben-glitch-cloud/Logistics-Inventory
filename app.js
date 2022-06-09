const express = require('express') 
const ejs = require('ejs');
const app = express()
const router = express.Router();
const port = 3000 
const session = require('express-session')

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express); 
app.use('/public', express.static('public'));


app.use(express.urlencoded({extended: true}))

const InventoryManager = require('./constructor/logistics')  
const AssignInventoryManager = require('./constructor/storage') 

const assigninventorymanager = new AssignInventoryManager
const inventorymanager = new InventoryManager 

let ErrorMessage = '' 

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(400).send('Wrong page name:(')
})

app.get('/', (req, res) => { res.redirect('/viewItems')})

app.get('/viewItems', async (req, res) => {   
    let AllInventoryResults = await inventorymanager.GetInventoryItemsList()
    res.render('Items', {InventoryItemsList: AllInventoryResults})
})  

app.get('/addItem', async (req, res) => { 
  const WarehousesResult = await assigninventorymanager.GetStorageLocations() 
  res.render('CreateItem', {WarehousesList: WarehousesResult})
}) 

app.post('/submitNewItem', async (req, res) => { 
  const NewItemObject = {itemName: req.body.itemName, itemDescription: req.body.itemDescription, quantity: req.body.quanity, warehouseAssigned: req.body.warehouseAssigned}   
  await inventorymanager.CreateNewInventoryItem(NewItemObject) 
  res.redirect('/viewItems')
}) 

app.get('/getOneItem/:id/:type', async (req, res) => {
  const ItemID = req.params.id, ResultForOneItem = await inventorymanager.FindInventoryItem(ItemID), WarehousesResult = await assigninventorymanager.GetStorageLocations()
  if(req.params.type === 'delete'){ res.render('DeleteItem', {InventoryItem: ResultForOneItem})} 
  if(req.params.type === 'edit'){ res.render('EditItem', {InventoryItem: ResultForOneItem, WarehousesList: WarehousesResult})}  
  if(req.params.type === 'getOneItem'){ res.render('ViewItem', {InventoryItem: ResultForOneItem}) }
}) 

app.get('/deleteItem/:id', async (req, res) => {
  const ItemID = req.params.id  
  await inventorymanager.DeleteInventoryItem(ItemID) 
  res.redirect('/viewItems')
}) 

app.post('/editItem/:id', async (req, res) => {
  const ItemID = req.params.id, EditdItemObject = {itemName: req.body.itemName, itemDescription: req.body.itemDescription, quantity: req.body.quanity, warehouseAssigned: req.body.warehouseAssigned}  
  await inventorymanager.EditInventoryItem(ItemID, EditdItemObject) 
  res.redirect('/viewItems')
}) 

app.get('/warehouses', async (req, res) => { 
  const WarehousesResult = await assigninventorymanager.GetStorageLocations()
  ErrorMessage = ''
  res.render('Warehouses', {WarehousesList: WarehousesResult})
})  

app.get('/addNewWarehouse', (req, res) => {   
  res.render('CreateWarehouse', {error: ErrorMessage})
})

app.post('/submitNewWarehouse', async (req, res) => {
  const NewStoargeLocation = {location: req.body.location, warehouseName: req.body.warehouseName, currentOperationalStatus: req.body.warehouseAssigned}  
  const FindNameResult = await assigninventorymanager.FindWarehouseByName(NewStoargeLocation['warehouseName'])  
  if(FindNameResult){  
    ErrorMessage = 'Two warehouses can not have the same name.'
    res.redirect('/addNewWarehouse')  
  } else {
    await assigninventorymanager.CreateNewStoargeLocation(NewStoargeLocation)    
    res.redirect('/warehouses')
  }
}) 

app.get('/getOneLocation/:id/:type', async (req, res) => {
  const StorageID = req.params.id, WarehousesResult = await assigninventorymanager.FindWarehouse(StorageID)  
  if(req.params.type === 'delete')(res.render('DeleteWarehouse', {OneWarehouses: WarehousesResult})) 
  if(req.params.type === 'edit')(res.render('EditWarehouse', {OneWarehouses: WarehousesResult})) 
}) 

app.get('/deleteLocation/:id/:location', async (req, res) => {  
  const StorageID = req.params.id, locationName = req.params.location
  await assigninventorymanager.DeleteLocation(StorageID, locationName)
  res.redirect('/warehouses')
}) 

app.post('/submitEditedWarehouse/:id', async (req, res) => { 
  const StorageID = req.params.id, EditedWarehouseObject = {location: req.body.location, warehouseName: req.body.warehouseName, currentOperationalStatus: req.body.warehouseAssigned} 
  await assigninventorymanager.EditStoargeLocation(StorageID, EditedWarehouseObject)
  res.redirect('/warehouses')
}) 

app.get('/about', (req, res) => { res.render('/About')})

app.listen(port, () => { console.log(`Example app listening on port ${port}`)}) 

