/*import { appWindow } from '@tauri-apps/api/window';
document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize());
document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());*/

document.getElementById('titlebar-close').addEventListener('click', () => window.close());
var editor = ace.edit("editor");
var iRowPosition;
var iColumnPosition;
var oPositionObject;
var filename = "myfile.py";
var langu = "";
var coin = 0;
var path = ['C:', 'User', 'AppData', 'Code'];

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
    langu = "Text"
    mode = prefix + "text";
  }

  switch (ext) {
    case "js":
      langu = "JavaScript";
      return prefix + "javascript";
    case "cs":
      langu = "CSharp";
      return prefix + "csharp";
    case "php":
      langu = "PHP";
      return prefix + "php";
    case "rb":
      langu = "Ruby";
      return prefix + "ruby";
    case "html":
      langu = "HTML";
      return prefix + "html";
    case "py":
      langu = "Python";
      return prefix + "python";
    case "rs":
      langu = "Rust";
      return prefix + "rust";
    case "ts":
      langu = "TypeScript";
      return prefix + "typescript";
    case "json":
      langu = "JSON";
      return prefix + "json";
    case "md":
      langu = "Markdown";
      return prefix + "markdown";
    case "css":
      langu = "CSS";
      return prefix + "css";
  }
}

var mode = autoImplementedMode(filename);
editor.session.setMode(mode);
document.getElementById('languages').innerHTML = langu;

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

for (let i=0; i<path.length; i++) {
  var crumb = document.createElement('button');
  crumb.setAttribute("class", "crumb");
  crumb.textContent = path[i];
  document.getElementById('breadcrumbs').appendChild(crumb);
  document.getElementById('breadcrumbs').innerHTML += "/";
}

// for (let j=0; j<path.length; j++) {
//   var tab = document.createElement('button');
//   tab.setAttribute("class", "tab");
//   tab.textContent = path[i];
//   tab.getElementById('table').appendChild(tab);
// }

$(".tab").click( function() {
  document.querySelectorAll(".tab").forEach(el => {
    el.style.backgroundColor = "var(--ui-sec-background)";
    el.style.color = "var(--ui-sec-text)";
  });
  this.style.backgroundColor = "var(--ui-background)";
  this.style.color = "var(--ui-text)";
  filename = this.innerHTML;

  mode = autoImplementedMode(filename);
  editor.session.setMode(mode);
  document.getElementById('languages').innerHTML = langu;
  
  codeFetch('Themes/'+filename).then((result) => {
    editor.session.setValue(result);
  });
});

async function codeFetch(path) {
  let response = await fetch(path);
  let data = await response.text();
  return data;
}