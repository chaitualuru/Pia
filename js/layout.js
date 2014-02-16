var stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = '../css/microphone.css';
document.head.appendChild(stylesheet);

var div = document.createElement('div');
var microphone_div = document.createElement('div');
var result_div = document.createElement('div');
var info_div = document.createElement('div');

document.body.appendChild(div);
div.id = 'pia_container';

microphone_div.id = 'microphone';
result_div.id = 'result';
info_div.id = 'info';

div.appendChild(microphone_div);
div.appendChild(result_div);
div.appendChild(info_div);