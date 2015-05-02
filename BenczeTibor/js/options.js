// variable which will hold the database connection
var db;

function initializeDB() {
	if (window.indexedDB) {
	  alert("IndexedDB support is there");
	}
	else {
	   alert("Indexed DB is not supported. Where are you trying to run this ? ");
	}
	
	var request = indexedDB.open('optionsdb', 1);
	
	request.onsuccess = function(e) {
		db = e.target.result;
		
		var transaction = db.transaction(['options']);
		var objectStore = transaction.objectStore('options');
		var request = objectStore.get(1);
		
		request.onsuccess = function(event) {
			if (request.result == undefined) {
				alert("nincs benne");
				var tr = db.transaction(['options'], 'readwrite');
				
				var value = {};
				value.optionName = "vibration";
				value.optionValue = "true";
				
				var store = tr.objectStore('options');
				var req = store.add(value);
				
				req.onsuccess = function(e) {
					// alert("Hozzáadva");
				}
				
				req.onerror = function(e) {
					// alert("Hiba");
				}
			}
			else 
			{
				var transaction = db.transaction(['options']);
				var store = transaction.objectStore('options');
				store.openCursor().onsuccess = function(e) {
					var cursor = e.target.result;
					if (cursor) {
						var value = cursor.value;
						$("#op1").val(value.optionValue);
						cursor.continue();
					}
				}
			}
		}	
		alert("Success db <= result");
	}
	
	request.onerror = function(e) {
		alert("Failure");
	}

	request.onupgradeneeded = function(e) {
		db = e.target.result;
		
		if (db.objectStoreNames.contains("options")) {
			db.deleteObjectStore("options");
		}
		
		var objectStore = db.createObjectStore('options', { keyPath: 'id', autoIncrement: true });
		objectStore.createIndex('optionName', 'optionName', {unique: false});
		
		alert("Object store has been created");
	}
};

$(document).ready(function(){
	$("#button_back").click(function() {
		window.location.href = "index.html";
	});
		
	//Initialize the Database first
    initializeDB();
	
	$("#button_save_options").click(function() {
		var transaction = db.transaction(['options'], 'readwrite');
		var objectStore = transaction.objectStore('options');
		var request = objectStore.get(1);
		request.onsuccess = function(event) {
			var data = request.result;
			var val = "";
			if (data.optionValue == "true") {
				val = "false";
			} else {
				val = "true";
			}
			data.optionValue = val;
			var requestUpdate = objectStore.put(data);
			requestUpdate.onsuccess = function(event) {
				alert("Az adatok sikeresen frissítve");
			}
		}		 
	});
});	