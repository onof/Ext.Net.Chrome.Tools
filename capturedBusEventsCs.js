var port = chrome.runtime.connect({ name: "events"});
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  // Send events to background
  if (event.data.type && (event.data.type == "BusSniffer")) {
    console.debug("Content script received: " + event.data.text);
    port.postMessage({ name: event.data.text, data: event.data.data });
  }
}, false);
