var actualCode = 'if(Ext && Ext.net && Ext.net.Bus) { ' +
  'Ext.net.Bus.subscribe("**", function(name, data) { ' + 
     'try { window.postMessage({ type: "BusSniffer", text: name, data: data }, "*"); } catch(err) { ' + 
	    'console.log("Ext.Net Chrome Tools", err);' + 
	    'window.postMessage({ type: "BusSniffer", text: name, data: "error retrieving data"}, "*");}'+
  '}); '+ 
'};';

var script = document.createElement('script');
script.textContent = actualCode;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);