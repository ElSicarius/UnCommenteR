chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ uncommented: false }, () => {
	  console.log("Uncommented flag initialized.");
	});
  
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
	  chrome.declarativeContent.onPageChanged.addRules([
		{
		  conditions: [
			// For demonstration, show on all URLs with http or https
			new chrome.declarativeContent.PageStateMatcher({
			  pageUrl: { schemes: ["http", "https"] }
			})
		  ],
		  actions: [ new chrome.declarativeContent.ShowAction() ]
		}
	  ]);
	});
  });
  