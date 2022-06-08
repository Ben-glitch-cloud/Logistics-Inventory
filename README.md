<h1 align='center'>Inventory-Tracking-web-Application</h1>

<h2 align='center'>Project Description</h2> 

<p>The project is an inventory tracking web application for a logistics company.  It stores inventory information and allows the user to select goods and assign  a warehouse location. When a user inserts an item, the data  saved is the name, product description, quantity, location/warehouse and date of entry. The user can add a new warehouse by entering information of location, warehouse name and current status. The user is able to add as many products and warehouses/locations as required.</p> 

<h3 align='center'>Technologies Used</h3> 

<p align='center'>Express, Javascript, NodeJS, Mongodb, ejs</p> 

<h3 align='center'>Proejct Challenges</h3> 

<p>In regard to challenges, drawing on my current coding knowledge I found the back aspect of the task straightforward, however,  laying out the data took me longer.</p> 

<h3 align='center'>Future Features</h3>  

<p>A feature I would wish to add would enable me to see, in real time, how much inventory is a warehouse, a warning or alert for low inventory level, and , fast selling inventory. Certain goods, ie perishable, may require specific storage solutions. </p>

<h2>Project Tech Test Requirements</h2> 

<p>Task areas completed: ✅</p>

<ul> 
  <li><b>Basic CRUD Functionality. You should be able to:</b></li> 
  <li>✅Create inventory items</li> 
  <li>✅Edit Them</li>
  <li>✅Delete Them</li> 
  <li>✅View a list of them</li>
</ul> 

<ul>
  <li><b>ONLY ONE OF THE FOLLOWING (We will only evaluate the first feature chosen, so please only choose one)</b></li>
  <li>When deleting, allow deletion comments and undeletion</li>
  <li>✅<b>Ability to create warehouses/locations and assign inventory to specific locations.</b></li>
  <li>Ability to create “shipments” and assign inventory to the shipment, and adjust inventory appropriately</li>
</ul>

<h2 align='center'>Project Set-up</h2>

Step 1:
Clone the git project into an empty folder.
```
$ https://github.com/Ben-glitch-cloud/Logistics-Inventory.git
```
Step 2:
Open the folder in Visual Studio Code or another code editer and install all of the npm dependenice.
```
$ npm install
```

Step 3: 
Set up a Mongodb account by following the link <a href='https://www.mongodb.com/docs/guides/atlas/account/'>Mongodb</a>.

Step 4: 
Create a cluster called <b>catalogueinventory</b> in your Mongodb account, your frist schemer is free. 

Step 5: 
This part might get a bit tricky, so here are some resouses to help you <a href='https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database'>Set-up Video</a> : <a href='https://www.mongodb.com/docs/atlas/tutorial/create-mongodb-user-for-cluster/'>Create a Database User for Your Cluster</a>

Step 5a: 
Within that cluster create a database called <b>CatalogueCollection</b> and a collection called <b>InventoryItems</b>.  

Step 5b:
Next create a second database called <b>StorageFacilities</b> and a collection called <b>WarehousesAndLocations</b>.

Step 6: 
Back in the project create a file at the root called <b>.env</b> which will store the Username and Password of the cluster. <b>This will not be your Mongodb account login</b>. 
Example  

```
USERNAME = TomD
PASSWORD = 123test
``` 

To set-up your username and password if you have not done so follow the link: <a href='https://www.mongodb.com/docs/atlas/security-add-mongodb-users/'>Authentication set-up</a>

Step 7:
To start running the app, run this command in the terminal on the line <b>inventory-tracking-web-application</b>. 

```
$ node app.js 
``` 

You should see the line, which means the project is running in the browser on port 3000. 

```
$ http://localhost:3000
```

And your done 👏 ✅

<h2 align='center'>User Stories</h2>  

``` 
As a user
I would like to see a list of Items 
So I can keep track of inventory storage
``` 

``` 
As a user 
I would like to add a new Item to a warehouse
So I can keep warehouse information up-to-date
``` 

``` 
As a user 
I would like to delete an item
So I can update warehouse information
``` 

```
As a user 
I would like to edit an item
So I can update an item that has changed
```

``` 
As a user 
I would like to create a warehouse/location 
So I can assign items to that warehouse/location
```

