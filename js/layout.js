if ($("#pia_container").length > 0) {
  	console.log("Pia exists. Now removing.");
  	$("#pia_container").remove();
}
else {
	console.log("Pia doesn't exist. Now creating.")
	var stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = chrome.extension.getURL('../css/microphone.css');
	document.head.appendChild(stylesheet);

	var div = document.createElement('div');
	var microphone_div = document.createElement('div');
	var result_div = document.createElement('div');
	var info_div = document.createElement('div');

	document.body.appendChild(div);
	div.id = 'pia_container';

	microphone_div.id = 'pia_microphone';
	result_div.id = 'pia_result';
	info_div.id = 'pia_info';

	div.appendChild(microphone_div);
	div.appendChild(result_div);
	div.appendChild(info_div);
}