// Global accessor that the popup uses.
var eventsOfTabs = {};
var selectedEvents = null;
var selectedId = null;

function updateEvents(tabId) {
  if(! eventsOfTabs[tabId])
		eventsOfTabs[tabId] = [];
}

function updateSelected(tabId) {
  selectedEvents = eventsOfTabs[tabId];
  if (selectedEvents != null) {
	chrome.pageAction.show(tabId);
	
	var newTitle = selectedEvents.length + " events on MessageBus";
    chrome.pageAction.setTitle({tabId:tabId, title: newTitle});
  }
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateEvents(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateEvents(tabs[0].id);
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "events");
  var tabId = port.sender.tab.id;
  port.onMessage.addListener(function(msg) {
	if(! eventsOfTabs[tabId])
		eventsOfTabs[tabId] = [];
	msg.date = new Date();
    eventsOfTabs[tabId].unshift(msg);
	
	if(selectedId == tabId) {
		updateSelected(tabId);
	}
  });
});