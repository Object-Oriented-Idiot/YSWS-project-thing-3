//importing
import './style.css'
import * as THREE from 'three';

//the developer has trauma from js :(


// initialising everyhting
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( {canvas: document.querySelector('#bg'),} );
renderer.setPixelRatio(window.devicePixelRatio);
//renderer.setAnimationLoop( animate );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);
scene.background = 0x0F6FF7;





//making the torus'
const geometry = new THREE.TorusGeometry( 19,3,16,100 )
const geometry1 = new THREE.TorusGeometry( 10,3,16,100 )
const geometry2 = new THREE.TorusGeometry( 28,3,16,100 )
const material = new THREE.MeshStandardMaterial( { color: 0x0000FF, wireframe: true} );
const material1 = new THREE.MeshStandardMaterial( { color: 0xFF00FF, wireframe: true} );
const material2 = new THREE.MeshStandardMaterial( { color: 0xFF8888, wireframe: true} );
const mesh = new THREE.Mesh( geometry, material );
const mesh1 = new THREE.Mesh( geometry1, material1 );
const mesh2 = new THREE.Mesh( geometry2, material2 );


//initialising lights
const pointLight = new THREE.PointLight( 0xFFFF00 )
pointLight.position.set( 20,20,20 )
const ambientLight = new THREE.AmbientLight( 0xFFFFFF );

//making mahito
const mahitoTexture = new THREE.TextureLoader().load('mahito.jpg');
const mahito = new THREE.Mesh( new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial( {map: mahitoTexture} ) );

//making stars (from tutorial)
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xEEEEFF });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}




//adding everything to canvas
scene.add( pointLight, ambientLight )
scene.add(mesh)
scene.add(mesh1)
scene.add(mesh2)
Array(200).fill().forEach(addStar)
scene.add(mahito);


//rotation function to save code length
function rotate(object, number1, number2, number3 ) {
  object.rotation.x += number1
  object.rotation.y += number2
  object.rotation.z += number3
}

//animating mahito and the torus
function animate() {
  requestAnimationFrame( animate )
  rotate(mesh,0.01, 0.005, 0.01);
  rotate(mesh1,0.02, 0.005, -0.01);
  rotate(mesh2,-0.01, 0.005, 0.02);
  rotate(mahito, -0.005, -0.01, -0.005);
  renderer.render( scene,camera );
}
animate();