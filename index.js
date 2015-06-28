function addScript(base, src) {
	
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = base + src + '?zz='+(new Date()).getTime();
  document.getElementsByTagName('head')[0].appendChild(script);
}

function addScript2(base, src) {
	alert(7);
	  (function() {
	  	
    var po = document.createElement('script');
   
    po.type = 'text/javascript'; po.async = true;
    po.src = base + src + '?zz='+(new Date()).getTime();
    var s = document.getElementsByTagName('head')[0]; s.appendChild(po);
    window.alert('..');
  })();	
}

var base = 'https://raw.githubusercontent.com/mrdoob/three.js/master/';
addScript2(base, 'build/three.min.js');
addScript2(base, 'examples/js/renderers/Projector.js');
addScript2(base, 'examples/js/renderers/CanvasRenderer.js');
addScript2('https://raw.githubusercontent.com/runvnc/holoships/master/', 'game.js');



