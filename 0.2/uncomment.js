window.addEventListener('load', function() {
	// “Uncomment”
	document.querySelector('#uncomment').addEventListener('click', function() {
	  sendToCurrentTab({command: "uncomment"});
	});
  
	// “display: none -> inline-block”
	document.querySelector('#display').addEventListener('click', function() {
	  sendToCurrentTab({command: "change_display"});
	});
  
	// “class=hidden -> reveal_”
	document.querySelector('#class').addEventListener('click', function() {
	  sendToCurrentTab({command: "class_unhide"});
	});
  
	// Do all
	document.querySelector('#all').addEventListener('click', function() {
	  sendToCurrentTab({command: "try_all"});
	});
  
	// “Enable” button (remove disabled attributes)
	document.querySelector('#enable').addEventListener('click', function() {
	  sendToCurrentTab({command: "enable"});
	});
  
	// Sed-like feature
	document.querySelector('#sedButton').addEventListener('click', function() {
	  const matchValue   = document.querySelector('#regexMatch').value;
	  const replaceValue = document.querySelector('#regexReplace').value;
	  if (!matchValue) {
		alert("Please enter a valid regex match pattern.");
		return;
	  }
	  sendToCurrentTab({
		command: "sed",
		match: matchValue,
		replace: replaceValue
	  });
	});
  });
  
  function sendToCurrentTab(messageObj) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, messageObj, function(response) {
		console.log("Sent to content script:", messageObj);
	  });
	});
  }
  