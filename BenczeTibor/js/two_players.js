$(document).ready(function() {
	var vibration = "true";
	var first_request = indexedDB.open('optionsdb', 1);
	first_request.onsuccess = function(e) {
		db = e.target.result;
		
		var transaction = db.transaction(['options']);
		var objectStore = transaction.objectStore('options');
		var request = objectStore.get(1);
		
		request.onsuccess = function(event) {
			if (request.result != undefined) {
				vibration = request.result.optionValue;
			}
		}
	}
	
	
	var start_time = null;
	var touch_time = null;
	var randomSeconds = Math.floor(Math.random() * ((10 - 2) + 1) + 2);
	var isGreen = false;
	var isStarted = true;
	setTimeout(function() {
		$("body").css("background-color", "#BAFF3B");
		$("#player_one").css("background-color", "#BAFF3B");
		$("#player_two").css("background-color", "#BAFF3B");
		isGreen = true;
		start_time = new Date().getTime();
	}, randomSeconds * 1000);

	$("#player_one").click(function(e) {
		if (e.target.id != "button_back") {
			if (isStarted == true && isGreen == true) {
				touch_time = new Date().getTime();
				if (vibration == "true") {
					alert("rezgés");
					window.navigator.vibrate(500);
				}
				alert("Player One wins with " + (touch_time - start_time) + "ms");
				window.location.href = "two_players.html";		
			} else if (isStarted == true && isGreen == false) {
				if (vibration == "true") {
					alert("rezgés");
					window.navigator.vibrate(500);
				}
				alert("Too soon, Player Two wins!");
				window.location.href = "two_players.html";		
			}
		} else {
			window.location.href = "index.html";
		}
	});

	$("#player_two").click(function(e) {
		if (e.target.id != "button_back") {
			if (isStarted == true && isGreen == true) {
				touch_time = new Date().getTime();
				if (vibration == "true") {
					alert("rezgés");
					window.navigator.vibrate(500);
				}
				alert("Player Two wins with " + (touch_time - start_time) + "ms");
				window.location.href = "two_players.html";		
			} else if (isStarted == true && isGreen == false) {
				if (vibration == "true") {
					alert("rezgés");
					window.navigator.vibrate(500);
				}
				alert("Too soon, Player One wins!");
				window.location.href = "two_players.html";		
			}
		} else {
			window.location.href = "index.html";
		}
	});
});
