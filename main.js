// lenear interpolation (lerp) experiment

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

//coordinations
const A = {
  x: canvas.width / 3,
  y: 200,
};

const B = {
  x: canvas.width / 1.6,
  y: 195,
};

//background color
const green = { r: 0, g: 0, b: 50 };
const blue = { r: 51, g: 0, b: 102 };

//transition
let t = null;

//draw function
function draw(crdn, text, line = {}) {
  c.beginPath();
  c.moveTo(line.x, line.y);
  c.lineWidth = 0.01;
  c.lineTo(canvas.width / 2, -canvas.height);
  c.arc(crdn.x, crdn.y, 25, 0, Math.PI * 2);
  c.fillStyle = `hsl(${text < 0.5 ? text * 100 : 180},100%, 50%)`;
  c.fill();
  c.stroke();
  c.fillStyle = "black";
  c.textBaseline = "middle";
  c.textAlign = "center";
  c.font = "bold 14px Arial";
  c.fillText(text, crdn.x, crdn.y);
}

//formula based object structure
function formula(a, b, t) {
  const obj = {};
  for (const attr in a) {
    obj[attr] = lerpFormula(a[attr], b[attr], t);
  }
  return obj;
}

//lenear interpolation formula
function lerpFormula(a, b, c) {
  return a + (b - a) * c;
}

//frame animation
animate();

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  const sec = new Date().getTime() / 1000;
  t = (Math.sin(sec * Math.PI) + 1) / 2;
  const vlerp = {
    x: formula(A, B, t).x,
    y: formula(A, B, t).y,
  };

  const { r, g, b } = formula(green, blue, t);
  canvas.style.backgroundColor = `rgb(${r},${g},${b} )`;

  draw(A, "0");
  draw(B, "1");
  draw(vlerp, t.toFixed(1), vlerp);
  requestAnimationFrame(animate);
}
