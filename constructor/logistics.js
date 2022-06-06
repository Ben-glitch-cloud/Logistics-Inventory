"use strict";

const { dotenv } = require('dotenv').config()

const { MongoClient } = require('mongodb');   

let userName = process.env.USERNAME
let Password = process.env.PASSWORD

const uri = `mongodb+srv://${userName}:${Password}@catalogueinventory.xontjal.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);  

class InventoryManager{ 
    // Read all Item in the Inventory
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
}  

module.exports = InventoryManager 


