function loadEvents() {
  var events = chrome.extension.getBackgroundPage().selectedEvents;
  if (events)
  {
	  var div = document.getElementById("results");
	  var i;
	  var html = "<ol>";
	  for(i=0; i<events.length; ++i) {
		  console.log(events[i]);
		  html = html + "<li><details><summary><time>" + events[i].date.toISOString() + '</time><span>' + events[i].name + "</span></summary><pre>" + JSON.stringify(events[i].data, null, ' ') + "</pre></details></li>";
	  }
	  html = html + "</ol>";
	  div.innerHTML = html;
  }
}
window.onload = loadEvents;