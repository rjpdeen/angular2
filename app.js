(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
	var tobuy = this;

	ShoppingListCheckOffService.addItem("Cookies", "100 bags of", "tobuy");
	ShoppingListCheckOffService.addItem("Chips", "50 bags of", "tobuy");
	ShoppingListCheckOffService.addItem("Coca cola", "10 bottles of", "tobuy");
	ShoppingListCheckOffService.addItem("Pepsi cola", "10 bottles of", "tobuy");
	ShoppingListCheckOffService.addItem("French fries", "75 bags of", "tobuy");
	
	tobuy.items = ShoppingListCheckOffService.getItems("tobuy");

	tobuy.moveItem = function (itemIndex) {
    	ShoppingListCheckOffService.moveItem(itemIndex);
    };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
	var bought = this;

	bought.items = ShoppingListCheckOffService.getItems("bought");

}

function ShoppingListCheckOffService(){
	var service = this;

	var itemsToBuy = [];
	var itemsBought = [];

	service.addItem = function(itemName, itemQuantity, stack){
		//console.log("service.addItem called");
		var item = {
			name: itemName,
			quantity: itemQuantity
		};

		if (stack == "tobuy"){
			itemsToBuy.push(item);
		}
		else {
			itemsBought.push(item);
		}	
	};

	service.getItems = function(stack){
		//console.log("service.getItems called");
		if (stack == "tobuy"){
			return itemsToBuy;
		}
		else {
			return itemsBought;
		}
	};

	service.getItem = function(itemIndex){
		//console.log("service.getItem called");
		//console.log(itemIndex);
		return itemsToBuy[itemIndex];
	};

	service.moveItem = function (itemIndex) {
		//console.log("service.moveItem called");
    	var item = service.getItem(itemIndex);
		service.addItem(item.name, item.quantity, "bought");
	
		itemsToBuy.splice(itemIndex, 1);
	};
}

})();