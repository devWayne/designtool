var appendScript = function(file, targetNodeName) {
  var scriptNode, targetNode;
  targetNode = document.getElementsByTagName(targetNodeName)[0];

  scriptNode = document.createElement("script");
  scriptNode.setAttribute("type", "text/javascript");
  scriptNode.setAttribute("src", file);

  targetNode.appendChild(scriptNode);
};

appendScript(chrome.extension.getURL("zepto-v1.1.6.min.js"), "body");


var body = document.getElementsByTagName('body');

alert(1122233345444);
