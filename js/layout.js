if ($("#pia_container").is(':visible')) {
	console.log("Pia is visible. Now hiding.");
	var currentSession = Number(document.getElementById('pia_container').getAttribute('data-session-id'));
	var newSession = (currentSession + 0.5).toString();
	console.log("Pia session: " + newSession);
	document.getElementById('pia_container').setAttribute('data-session-id', newSession);
	$("#pia_container").animate({right:"30px"},200).animate({right:"-330px"},300, function() {
		$("#pia_container").hide();
	});
}
else if ($('#pia_container').is(':hidden')) {
	console.log("Pia is hidden. Now making visible again.");
	$("#pia_container").show();
	$("#pia_container").animate({right:"-300px"},0).animate({right:"30px"},300).animate({right:"15px"},200);
	var currentSession = Number(document.getElementById('pia_container').getAttribute('data-session-id'));
	var newSession = (currentSession + 0.5).toString();
	console.log("Pia session: " + newSession);
	document.getElementById('pia_container').setAttribute('data-session-id', newSession);
}
else {
	console.log("Pia is being initialized for the first time. Creating Pia.");
	var stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = chrome.extension.getURL('../css/microphone.css');
	document.head.appendChild(stylesheet);

	var div = document.createElement('div');
	var microphone_div = document.createElement('div');
	var text_div = document.createElement('div');
	var result_div = document.createElement('div');
	var info_div = document.createElement('div');
	var sound_container = document.createElement('span');

	div.id = 'pia_container';
	div.setAttribute('data-session-id', '0');
	console.log("Pia session: 0");
	document.body.appendChild(div);

	text_div.id = 'pia_text_div';
	microphone_div.id = 'pia_microphone';
	result_div.id = 'pia_result';
	info_div.id = 'pia_info';
	sound_container.id = 'sound_container';

	div.appendChild(microphone_div);
	div.appendChild(text_div);
	div.appendChild(sound_container);
	text_div.appendChild(result_div);
	text_div.appendChild(info_div);

	$("#pia_container").animate({right:"-300px"},0).animate({right:"30px"},400).animate({right:"15px"},200);
}