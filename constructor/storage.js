"use strict";

const { dotenv } = require('dotenv').config()

const { MongoClient } = require('mongodb');   

const ObjectId = require('mongodb').ObjectID;

let userName = process.env.USERNAME
let Password = process.env.PASSWORD

const uri = `mongodb+srv://${userName}:${Password}@catalogueinventory.xontjal.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);   

class AssignInventoryManager{ 

    // Gets a list of warehouses
    async GetStorageLocations() {
        try{
            await client.connect();  
            let AllInventoryResults = await client.db("StorageFacilities").collection("WarehousesAndLocations").find().toArray()  
            return AllInventoryResults
        }catch(error){
            console.log(`Error ${error}`)
        }finally{
            await client.close(); 
        } 
    }  

    // Finds one warehouse
    async FindWarehouse(StorageID){
        try{
            await client.connect()
            const ItemResult = await client.db("StorageFacilities").collection("WarehousesAndLocations").findOne({'_id': ObjectId(StorageID)}) 
            return ItemResult
        }catch(error){
            console.log(`Error: ${error}`)
        }finally{
            await client.close()
        }
    } 

    // Finds one warehouse with a name and double checks it does not already exited. 
    async FindWarehouseByName(WareHouseName){
        try{
            await client.connect()
            const ItemResult = await client.db("StorageFacilities").collection("WarehousesAndLocations").findOne({'warehouseName': WareHouseName})   
            return ItemResult !== null ? true : false
        }catch(error){
            console.log(`Error: ${error}`)
        }finally{
            await client.close()
        }
    }
    
    // Creats a new warehouse 
    async CreateNewStoargeLocation(NewStoargeLocation){
        try{
            await client.connect();  
            const  modifiedNewStoargeLocation = this.NewStorageInfo(NewStoargeLocation) 
            await client.db("StorageFacilities").collection("WarehousesAndLocations").insertOne(modifiedNewStoargeLocation)
            return true
        }catch(error){
            console.log(`Error: ${error}`)
        }finally{
            client.close()
        }
    } 

    // Updates the warehouse Object with Current Operational status and date
    NewStorageInfo(NewStoargeLocation){
        NewStoargeLocation['currentOperationalStatus'] === 'Warehouse in use' ? NewStoargeLocation['currentOperationalStatus'] = true : NewStoargeLocation['currentOperationalStatus'] = false 
        let CurrentDate = new Date() 
        NewStoargeLocation['timeStamp'] = CurrentDate.toDateString().split(' ').join('/') 
        return NewStoargeLocation
    } 

    // Updates a warehouse with new infomation
    async EditStoargeLocation(StorageID, EditedWarehouseObject){
        try{
            await client.connect()
            await client.db("StorageFacilities").collection("WarehousesAndLocations").updateOne({_id: ObjectId(StorageID)}, {$set: EditedWarehouseObject}) 
            return true
        }catch(error){
            console.log(`Error ${error}`)
        }finally{
            client.close()
        }
    }

    // Deletes a warehouse 
    async DeleteLocation(StorageID, locationName){
        try{
            await client.connect()
            await client.db("StorageFacilities").collection("WarehousesAndLocations").deleteOne({'_id': ObjectId(StorageID)}) 
            await client.db("CatalogueCollection").collection("InventoryItems").updateMany({warehouseAssigned: locationName}, { $set: {warehouseAssigned: 'Choose Warhouse'} })
            return true
        }catch(error){
            console.log(`Error: ${error}`)
        }finally{
            client.close()
        }
    }
}

module.exports = AssignInventoryManager