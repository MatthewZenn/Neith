/*import { appWindow } from '@tauri-apps/api/window';
document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize());
document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());*/

document.getElementById('titlebar-close').addEventListener('click', () => window.close());
var editor = ace.edit("editor");
var iRowPosition;
var iColumnPosition;
var oPositionObject;
var filename = "myfile.js";
var lang = "";
var coin = 0;
editor.session.setOptions({ tabSize: 2, useSoftTabs: true });
editor.setKeyboardHandler('ace/keyboard/vscode');

editor.session.selection.on('changeCursor', function(){
  oPositionObject = editor.selection.getCursor();
  iRowPosition = editor.selection.getCursor().row;
  iColumnPosition = editor.selection.getCursor().column;
  document.getElementById('counter').innerHTML = "Ln "+(iRowPosition+1)+", Col "+(iColumnPosition+1);
});

function autoImplementedMode(filename){
  var ext = filename.split('.').pop();
  var prefix = "ace/mode/";

  if(!ext){
      return prefix + "text";
  }

  switch (ext) {
      case "js":
        lang = "JavaScript";
        return prefix + "javascript";
      case "cs":
        lang = "CSharp";
        return prefix + "csharp";
      case "php":
        lang = "PHP";
        return prefix + "php";
      case "rb":
        lang = "Ruby";
        return prefix + "ruby";
      case "html":
        lang = "HTML";
        return prefix + "html";
      case "py":
        lang = "Python";
        return prefix + "python";
      case "rs":
        lang = "Rust";
        return prefix + "rust";
      case "ts":
        lang = "TypeScript";
        return prefix + "typescript";
      case "json":
        lang = "JSON";
        return prefix + "json";
      case "md":
        lang = "Markdown";
        return prefix + "markdown";
      case "css":
        lang = "CSS";
        return prefix + "css";
  }
}
var mode = autoImplementedMode(filename);
editor.session.setMode(mode);
document.getElementById('language').innerHTML = lang;

document.getElementById('feedback').addEventListener('click', () => {
  if (coin == 0) {
    document.getElementById('editor').style.fontFamily = "Flow";
    coin = 1;
  }
  else {
    document.getElementById('editor').style.fontFamily = "monospace";
    coin = 0;
  }
});