"use strict";

const { dotenv } = require('dotenv').config()

const { MongoClient } = require('mongodb');   

const ObjectId = require('mongodb').ObjectID;

let userName = process.env.USERNAME
let Password = process.env.PASSWORD

const uri = `mongodb+srv://${userName}:${Password}@catalogueinventory.xontjal.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);   

class AssignInventoryManager{
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

    NewStorageInfo(NewStoargeLocation){
        NewStoargeLocation['currentOperationalStatus'] === 'Warehouse in use' ? NewStoargeLocation['currentOperationalStatus'] = true : NewStoargeLocation['currentOperationalStatus'] = false 
        let CurrentDate = new Date() 
        NewStoargeLocation['timeStamp'] = CurrentDate.toDateString().split(' ').join('/') 
        return NewStoargeLocation
    } 

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