// Name: Rolando Velasco
// Term: VFW 1303
// Project Part 2

// Line to wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function() {
	
	// function to create the select field element
	function makeGoalTypes() {
		var myformTag = document.getElementsByTagName("form"), selectList = document.getElementById("selecttype"), createSelect = document.createElement("select");
		createSelect.setAttribute("id", "types");
	
		for (var i = 0, j = goalTypes.length; i < j; i++) {
			var createOption = document.createElement("option");
			var optionText = goalTypes[i];
			createOption.setAttribute("value", optionText);
			createOption.innerHTML = optionText;
			createSelect.appendChild(createOption);
		}
		selectList.appendChild(createSelect);
	
	}
	
	function getGoalCompleteCheckBoxValue() {
		if(document.getElementById("goalcomplete").checked) {
			goalCompleteValue = document.getElementById("goalcomplete").value;
		} else {
			goalCompleteValue = "Goal Not Yet Achieved";
		}
	}
	
	function addNewGoal() {
	
		// random number generator
		var uniqueID = Math.floor(Math.random() * 1000001);
		
		// Find out if Goal Complete checkbox is checked or not
		getGoalCompleteCheckBoxValue();
		
		// Initialize the local variables with the html elements
		// Create an Object with each property an array that contains the form label and the input value
		var goalObj 			= {};
		goalObj.goalHeadline 	= ["Goal:", document.getElementById("goalheadline").value];
		goalObj.goalType 		= ["Goal Type:", document.getElementById("types").value];
		goalObj.deadline 		= ["Deadline:", document.getElementById("deadline").value];
		goalObj.size 			= ["Size:", document.getElementById("size").value];
		goalObj.details 		= ["Details", document.getElementById("details").value];
		goalObj.goalcomplete 	= ["Goal Complete:", goalCompleteValue];
			
		// Save the data into local Storage
		// Use Stringify to convert the object into a string
		localStorage.setItem(uniqueID, JSON.stringify(goalObj));
		alert("Goal Saved!");	
		return;
	}
	
	function toggleDisplay() {
		if (flagDisplayData) {
			flagDisplayData = false;
			document.getElementById("goalform").style.display = "block";
			document.getElementById("clear").style.display = "inline";
			document.getElementById("display").style.display = "inline";
			document.getElementById("add").style.display = "none";
			document.getElementById("goals").style.display = "none";

		} else {
			flagDisplayData = true;
			document.getElementById("goalform").style.display = "none";
			document.getElementById("clear").style.display = "inline";
			document.getElementById("display").style.display = "none";
			document.getElementById("add").style.display = "inline";
		}
		
		return;
	}
	
	// Grab the data from Local Storage and display it on screen
	function displayGoalsList() {
		
		// toggle function to display the data
		toggleDisplay();
		
		if (localStorage.length === 0) {
			alert("There are no goals to display.");
			
		}
		
		// Create a div tag
		var createDisplayGoalsDiv = document.createElement("div");
		createDisplayGoalsDiv.setAttribute("id", "goals");
		var createUList = document.createElement("ul");
		createDisplayGoalsDiv.appendChild(createUList);
		document.body.appendChild(createDisplayGoalsDiv);
		document.getElementById("goals").style.display = "block";
		for (var i = 0, j = localStorage.length; i < j; i++) {
			var createListItem = document.createElement("li");
			var createLinksList = document.createElement("li");
			createUList.appendChild(createListItem);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			// "parse" converts string value from Local Storage back into an object
			var goalObj = JSON.parse(value);
		
			var createSubUList = document.createElement("ul");
			createListItem.appendChild(createSubUList);
			
			for(var n in goalObj) {
				var createSubListItem = document.createElement("li");
				createSubUList.appendChild(createSubListItem);
				var goalObjText = goalObj[n][0] + " " + goalObj[n][1];
				createSubListItem.innerHTML = goalObjText;
				createSubUList.appendChild(createLinksList);
			}
			
			// calling the function that will create links for each goal
			createGoalLinks(key, createLinksList);
		}
	}
	
	// Function to create buttons for editing and deleting a goal in the list
	function createGoalLinks(key, createLinksList) {
		
		// adds edit goal link
		var editGoalLink = document.createElement("a");
		editGoalLink.href = "#";
		editGoalLink.key = key;
		editGoalLink.setAttribute("class", "goallinks");
		editGoalText = "Edit Goal";
		editGoalLink.addEventListener("click", editGoal);
		editGoalLink.innerHTML = editGoalText;
		createLinksList.appendChild(editGoalLink);
	
		// adds delete goal link
		var deleteGoalLink = document.createElement("a");
		deleteGoalLink.href = "#";
		deleteGoalLink.key = key;
		deleteGoalLink.setAttribute("class", "goallinks");
		deleteGoalText = "Delete Goal";
//		deleteGoalLink.addEventListener("click", deleteGoal);
		deleteGoalLink.innerHTML = deleteGoalText;
		createLinksList.appendChild(deleteGoalLink);
	
	}
	
	// function to edit the goal
	function editGoal() {
		// grab the data from this specific goal from Local Storage
		var value = localStorage.getItem(this.key);
		var goalObj = JSON.parse(value);
		
		// bring back the form to the display
		toggleDisplay();
	
		// fill in the form with this specific goal data pulled from Local Storage
		document.getElementById("goalheadline").value = goalObj.goalHeadline[1];
		document.getElementById("types").value = goalObj.goalType[1];
		document.getElementById("deadline").value = goalObj.deadline[1];
		document.getElementById("size").value = goalObj.size[1];
		document.getElementById("details").value = goalObj.details[1];
		if (goalObj.goalcomplete[1] === "Goal Achieved") {
			document.getElementById("goalcomplete").setAttribute("checked", "checked");
		}
		
		// Remove the event listener from the "save goal" button
		saveGoalButton.removeEventListener("click", addNewGoal);
		
		// Change the "save goal" value to "edit goal"
		document.getElementById("savegoal").value = "Edit Goal";
		var editSaveGoal = document.getElementById("savegoal");
		
		editSaveGoal.addEventListener("click", validate);
		editSaveGoal.key = key;
	}
	
	function clearGoalsList() {
		if(localStorage.length === 0) {
			alert("There are no goals to remove.");
		} else {
			localStorage.clear();
			alert("All goals are deleted.");
			window.location.reload();
			return false;
		}
	}
	
	function validate() {
		// elements to check
		var getGoalHeadline = document.getElementById("goalheadline");
		var getGoalType = document.getElementById("types");
		
		// error messages
		var errorMessageArray = [];
		
		// goal headline validation
		if(getGoalHeadline.value === "") {
			var goalHeadlineError = "Please enter a goal.";
			goalHeadline.style.border = "1px solid red";
			errorMessageArray.push(goalHeadlineError);
		}
		
		// goal type validation
		if(getGoalType.value === "--Choose a Type--") {
			var typeError = "Please select a goal type.";
			getGoalType.style.border = "1px solid red";
			errorMessageArray.push(typeError);
		}
		
		// display errors on the screen if required form fields are not valid
		if(errorMessageArray.length > 0) {
			for(var i = 0, j = errorMessageArray.length; i < j; i++) {
				var text = document.createElement("li");
				text.innerHTML = errorMessageArray[i];
			
			}
	
	}
	
	// array for the goal types
	var goalTypes = ["--Choose a Type--", "Personal", "Business", "Travel", "Finance", "Education"];
	var goalCompleteValue = "Goal Not Yet Achieved";
	makeGoalTypes();
	
	// toggle variable for checking when to hide the form to display the data or vice versa
	var flagDisplayData = false;
	
	var saveGoalButton = document.getElementById("savegoal");
	saveGoalButton.addEventListener("click", validate);
	
	var displayDataLink = document.getElementById("display");
	displayDataLink.addEventListener("click", displayGoalsList);
	
	var clearDataLink = document.getElementById("clear");
	clearDataLink.addEventListener("click", clearGoalsList);

});