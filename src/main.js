document.getElementById('titlebar-close').addEventListener('click', () => window.close());
var editor = ace.edit("editor");

editor.session.setMode("ace/mode/javascript");