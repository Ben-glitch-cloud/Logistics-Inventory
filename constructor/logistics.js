"use strict";

const { dotenv } = require('dotenv').config()

const { MongoClient } = require('mongodb');   

const ObjectId = require('mongodb').ObjectID;

let userName = process.env.USERNAME
let Password = process.env.PASSWORD

const uri = `mongodb+srv://${userName}:${Password}@catalogueinventory.xontjal.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);  

class InventoryManager{ 
    // Read all items in the Inventory
    async GetInventoryItemsList() { 
        try{
            await client.connect();  
            let AllInventoryResults = await client.db("CatalogueCollection").collection("InventoryItems").find().toArray()  
            return AllInventoryResults
        }catch(error){
            console.log(`Error ${error}`)
        }finally{
            await client.close(); 
        } 
    }    

    // new Item adding current time and warhouse location
    NewItemInfo(NewItemObject){ 
        NewItemObject['quantity'] = Number(NewItemObject['quantity'])
        let CurrentDate = new Date()  
        NewItemObject['currentDate'] = CurrentDate.toDateString().split(' ').join('/') 
        return NewItemObject
    }

    // create new item 
    async CreateNewInventoryItem(NewItemObject){ 
        const modifiedNewItemObject = this.NewItemInfo(NewItemObject)
        try{
            await client.connect();   
            const Result = await client.db("CatalogueCollection").collection("InventoryItems").insertOne(modifiedNewItemObject) 
            return Result
        }catch(error){
            console.log(`Error: ${error}`)
        }finally{
            await client.close()
        }
    }  

    async FindInventoryItem(ItemID){
        try{
            await client.connect()
            const ItemResult = await client.db("CatalogueCollection").collection("InventoryItems").findOne({'_id': ObjectId(ItemID)}) 
            return ItemResult
        }catch(error){
            console.log(`Error: ${error}`)
        }finally{
            await client.close()
        }
    } 

    async DeleteInventoryItem(ItemID){
        try{
            await client.connect()
            await client.db("CatalogueCollection").collection("InventoryItems").deleteOne({'_id': ObjectId(ItemID)}) 
            return true
        }catch(error){
            console.log(error)
        }finally{
            client.close()
        }
    } 

    async EditInventoryItem(ItemID, EditdItemObject){
        try{
            await client.connect()
            await client.db("CatalogueCollection").collection("InventoryItems").updateOne({_id: ObjectId(ItemID)}, {$set: EditdItemObject}) 
            return true
        }catch(error){
            console.log(`Error ${error}`)
        }finally{
            client.close()
        }
    }
}  

module.exports = InventoryManager 


