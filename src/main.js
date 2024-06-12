document.getElementById('titlebar-close').addEventListener('click', () => window.close());
var editor = ace.edit("editor");
editor.session.setOptions({ tabSize: 2, useSoftTabs: true });

editor.session.setMode("ace/mode/javascript");