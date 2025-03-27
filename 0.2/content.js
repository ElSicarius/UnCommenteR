// --------------------
// Helper functions
// --------------------

function naiveUncomment() {
	const content = document.documentElement.innerHTML;
	const html = content.replace(/<!--/g, "").replace(/-->/g, "");
	document.documentElement.innerHTML = html;
  }
  
  function displayThis() {
	const content = document.documentElement.innerHTML;
	const html = content.replace(/display:\s*?none/g, "display:inline-block");
	document.documentElement.innerHTML = html;
  }
  
  function unhideClass() {
	let content = document.documentElement.innerHTML;
	const lines = content.split('\n');
	for (let i = 0; i < lines.length; i++) {
	  const match = lines[i].match(/class="[^"]*?hidd?e[^"]*?/gi);
	  if (match) {
		lines[i] = lines[i].replace(/hidd?e/gi, "reveal_");
	  }
	}
	const html = lines.join("\n");
	document.documentElement.innerHTML = html;
  }
  
  function doAll() {
	naiveUncomment();
	displayThis();
	unhideClass();
  }
  
  /**
   * Sed-like function to globally regex-replace all of document HTML.
   */
  function applySed(regexString, replacement) {
	try {
	  const pattern = new RegExp(regexString, 'g');
	  let docHtml = document.documentElement.innerHTML;
	  let newHtml = docHtml.replace(pattern, replacement);
	  document.documentElement.innerHTML = newHtml;
	} catch (e) {
	  console.error("Error applying sed-like replacement:", e);
	  alert("Invalid regex pattern. Check console for details.");
	}
  }
  
  /**
   * Remove the “disabled” attribute from every element that has it.
   */
  function removeDisabledAttributes() {
	// DOM-based approach for clarity:
	document.querySelectorAll('[disabled]').forEach(el => {
	  el.removeAttribute('disabled');
	});
  }
  
  // --------------------
  // Listen for messages
  // --------------------
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.command === "uncomment") {
	  naiveUncomment();
	}
	else if (request.command === "change_display") {
	  displayThis();
	}
	else if (request.command === "class_unhide") {
	  unhideClass();
	}
	else if (request.command === "try_all") {
	  doAll();
	}
	else if (request.command === "sed") {
	  applySed(request.match, request.replace);
	}
	else if (request.command === "enable") {
	  removeDisabledAttributes();
	}
  });
  