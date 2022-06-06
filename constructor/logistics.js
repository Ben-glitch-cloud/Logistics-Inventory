"use strict";

class InventoryManager{
    GetInventoryItemsList() {
        let ItemsList = [{id: 0, itemName: 'Paper sheets', itemDescription: 'HR White Office A4 Paper 80gsm (Pack of 2500) HR F0317', quantity: 4, wareHouse: false, Date: "04/05/2022"}, {id: 1, itemName: 'Ballpoint Fountain and Rollerball Pen Kit', itemDescription: 'A three pen kit with a leather case.', quantity: 16, wareHouse: false, Date: "20/07/2022"}, {id: 2, itemName: 'pencils', itemDescription: 'Standed Noris school Pencils', quantity: 24, wareHouse: false, Date: "01/03/2022"}] 
        return ItemsList
    }
}  

module.exports = InventoryManager