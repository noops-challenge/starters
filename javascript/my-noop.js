let canvas;
let ctx;
let appWidth;
let appHeight;

let colors = ['#ff00a2','#00baff'];

// called by NOOPBOT on window.onload
function start_app() {

  // size canvas to window
  sizeCanvas();

  //set up a ticker to refresh page automatically.
  //let ticker = NOOPBOT_TICK_SETUP(draw, 1000);

  //fire a draw event.
  draw();

  //redraw when canvas is clicked.
  canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#f1f1f1' });
}

function draw() {
  // get the data!
  // change this for whatever API you're using.
  NOOPBOT_FETCH({
    API: 'hexbot',
    count: 100,
    width: appWidth,
    height: appHeight
  }, drawSet);
}

function drawSet(responseJson) {
  // clean the canvas. comment out to let them build up.
  NOOPBOT_SETUP_CANVAS({ canvas: canvas, bgColor: '#f1f1f1' });

  let { polygons } = responseJson;
  polygons.forEach(function(polygon) {
    drawPolygon(ctx, polygon);
  })
}

function drawPolygon(ctx, points) {

  // randomly choose fill color
  ctx.fillStyle = NOOPBOT_DECIDE(colors);

  // draw the polygon
  ctx.beginPath();
  let firstPoint = points.shift();
  ctx.moveTo(firstPoint.x, firstPoint.y);

  points.forEach(function(point) {
    ctx.lineTo(point.x, point.y);
  });

  // fill polygon
  ctx.fill();

}

// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};
