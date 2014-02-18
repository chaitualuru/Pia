Pia
===

Pia is a voice controlled personal assistant for Chrome.

Some things you can ask Pia:

- "Open Google"
- "Search for Kittens"
- "Search Wikipedia for Ponzi Scheme"
- "Search Wolfram for Distance to the Moon"
- "Search IMDb for Titanic"
- "Compare reviews for Frozen"
- "Email nick@yahoo.com"
- "Play Gangnam Style"
- "What's the weather like today?"
- "How far is New York City?"
- "How do I get from Philadelphia to San Francisco?"

Follow us at www.getpia.com.

##Workflow

Pia is a Chrome extension that works by injecting Javascript into the current webpage. Invoking Pia either through the address bar icon or the keyboard shortcut (Alt + P) overlays the Pia interface in the top right corner of the webpage. Pressing spacebar or clicking on the microphone then initiates voice recording, and pressing spacebar or clicking the icon once again completes voice recognition.

Natural Language Processing is powered by [Wit](http://wit.ai/ "Wit").

##Known Issues

Pia has a few issues that need to be fixed before we can push it to the Chrome Store. It started off as a project at the [PennApps Spring 2014](http://2014s.pennapps.com/ "PennApps Spring 2014") hackathon, and we now hope to finish it as an open-source project with your help.

If you have any experience with web development, setting up a custom server, or working with Chrome extensions, we we would really appreciate your help. Thank you so much!

- Doesn't work on https websites
- Requires microphone permission each time on non-https websites
- Each website where Pia is called needs to be authorized currently; need to proxy API queries through custom server
- Toggling on and off while on the same page causes issues of Pia disappearing
- Voice recording should start as soon as Pia is called
