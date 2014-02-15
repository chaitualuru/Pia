// document.body.style.backgroundColor = 'red';

var stylesheet = document.createElement('link');

var div = document.createElement('div');
var microphone_div = document.createElement('div');
var result_div = document.createElement('div');
var info_div = document.createElement('div');

var microphone_script = document.createElement('script');
var control_script = document.createElement('script');

stylesheet.rel = 'stylesheet';
stylesheet.href = 'http://athyuttamreddy.com/hosted/microphone.css';
document.head.appendChild(stylesheet);

document.body.appendChild(div);
div.id = 'myDivId';
div.style.position = 'fixed';
div.style.backgroundColor = 'blue';
div.style.top = '10px';
div.style.right = '10px';
div.style.width = '500px';
div.style.height = '500px';

microphone_div.id = 'microphone';
result_div.id = 'result';
info_div.id = 'info';

div.appendChild(microphone_div);
div.appendChild(result_div);
div.appendChild(info_div);

microphone_script.src = 'http://athyuttamreddy.com/hosted/microphone.js';
control_script.src = 'http://athyuttamreddy.com/hosted/control.js';

document.body.appendChild(microphone_script);
document.body.appendChild(control_script);