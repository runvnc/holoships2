document.body.style.backgroundColor='black';
var canv = document.createElement('canvas');
canv.id = 'canvas';
canv.width = 768;
canv.height = 512;
canv.style.width = '768px';
canv.style.height = '512px';
canv.style.backgroundColor='black';
document.body.appendChild(canv);

var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(c) {window.setTimeout(c, 15)};
var requestAnimFrame = requestAnimationFrame;

function up1() {
  return Phoria.Entity.create({
    points: [ {x:0.0, y:0.0, z:1.0}]
  });
}

function onloadHandler()
{
   // get the canvas DOM element and the 2D drawing context
   var canvas = document.getElementById('canvas');
   
   // create the scene and setup camera, perspective and viewport
   var scene = new Phoria.Scene();
   scene.camera.position = {x:0.0, y:5.0, z:-15.0};
   scene.perspective.aspect = canvas.width / canvas.height;
   scene.viewport.width = canvas.width;
   scene.viewport.height = canvas.height;
   
   // create a canvas renderer
   var renderer = new Phoria.CanvasRenderer(canvas);
   
   // add a grid to help visualise camera position etc.
   var plane = Phoria.Util.generateTesselatedPlane(8,8,0,20);
   scene.graph.push(Phoria.Entity.create({
      points: plane.points,
      edges: plane.edges,
      polygons: plane.polygons,
      style: {
         drawmode: "wireframe",
         shademode: "plain",
         linewidth: 0.5,
         objectsortmode: "back",
         color: [ 140,155, 147 ]
      }
   }));
   var c = Phoria.Util.generateUnitCube();
   var cube = Phoria.Entity.create({
      points: c.points,
      edges: c.edges,
      polygons: c.polygons,
      style: {
        drawmode: "wireframe",
        shademode: "plain",
        linewidth: 1.0,
        color: [40, 150, 47]
      }
   });
   
   scene.graph.push(cube);
   scene.graph.push(new Phoria.DistantLight());

   window.addEventListener('deviceorientation',
     function(event) {
       var rot = up1();
       var up = scene.camera.up;
       var ratio = 0.1745;
       rot.rotateX(event.alpha*ratio);
       rot.rotateY(event.beta*ratio);
       rot.rotateZ(event.gamma*ratio);
       up.x = rot.points[0].x;
       up.y = rot.points[0].y; 
       up.z = rot.points[0].z;
   }, false);

   var pause = false;
   var fnAnimate = function() {
      if (!pause)
      {
         // rotate local matrix of the cube
         cube.rotateY(3.5*Phoria.RADIANS);
         
         // execute the model view 3D pipeline and render the scene
         scene.modelView();
         renderer.render(scene);
      }
      requestAnimFrame(fnAnimate);
   };

   // key binding
   document.addEventListener('keydown', function(e) {
      switch (e.keyCode)
      {
         case 27: // ESC
            pause = !pause;
            break;
      }
   }, false);
   
   // start animation
   requestAnimFrame(fnAnimate);
}

setTimeout(onloadHandler, 1000);

