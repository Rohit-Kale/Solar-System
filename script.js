const textureLoader = new THREE.TextureLoader()

const normalTextureOfSUN = textureLoader.load('./Sun.jpg')
const normalTextureOfEarth = textureLoader.load('./earthmap.jpeg')
const normalTextureOfJupiter = textureLoader.load('./jupiter.jpg')
const normalTextureOfSaturn = textureLoader.load('./saturn.jpg')
const normalTextureOfMercury = textureLoader.load('./mercury.jpg')
const normalTextureOfVenus = textureLoader.load('./venus.jpg')
const normalTextureOfMars = textureLoader.load('./mars.jpg')
const normalTextureOfNeptune = textureLoader.load('./neptune.jpg')
const normalTextureOfSaturnring = textureLoader.load('./saturnring.png')
const normalTextureOfUranus = textureLoader.load('./uranus.jpg')

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const Sungeometry = new THREE.SphereBufferGeometry(.9, 64, 64)
const Earthgeometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const Mercurygeometry = new THREE.SphereBufferGeometry(.2, 64, 64)
const Venusgeometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const Marsgeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const Jupitergeometry = new THREE.SphereBufferGeometry(.6, 64, 64)
const Saturngeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const Uranusgeometry = new THREE.SphereBufferGeometry(.45, 64, 64)
const Neptunegeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const Saturnringgeometry = new THREE.RingBufferGeometry(.5, .7, 60)

// Materials

const Sunmaterial = new THREE.MeshStandardMaterial()
Sunmaterial.transparent = true
Sunmaterial.opacity = 0.9
Sunmaterial.metalness = 0
Sunmaterial.roughness = 0.3
Sunmaterial.map = normalTextureOfSUN;
Sunmaterial.color = new THREE.Color( 0xfff917 )

const Earthmaterial = new THREE.MeshStandardMaterial()
Earthmaterial.roughness = 0.3
Earthmaterial.opacity = 0.9
Earthmaterial.map = normalTextureOfEarth;
const sphereEarth = new THREE.Mesh(Earthgeometry,Earthmaterial)

const Mercurymaterial = new THREE.MeshStandardMaterial()
Mercurymaterial.roughness = 0.3
Mercurymaterial.opacity = 0.9
Mercurymaterial.map = normalTextureOfMercury
const sphereMercury = new THREE.Mesh(Mercurygeometry,Mercurymaterial)

const Venusmaterial = new THREE.MeshStandardMaterial()
Venusmaterial.roughness = 0.3
Venusmaterial.opacity = 0.9
Venusmaterial.map = normalTextureOfVenus
const sphereVenus = new THREE.Mesh(Venusgeometry,Venusmaterial)

const Jupitermaterial = new THREE.MeshStandardMaterial()
Jupitermaterial.roughness = 0.3
Jupitermaterial.opacity = 0.9
Jupitermaterial.map = normalTextureOfJupiter
const sphereJupiter = new THREE.Mesh(Jupitergeometry,Jupitermaterial)

const Uranusmaterial = new THREE.MeshStandardMaterial()
Uranusmaterial.roughness = 0.3
Uranusmaterial.opacity = 0.9
Uranusmaterial.map = normalTextureOfUranus
const sphereUranus = new THREE.Mesh(Uranusgeometry,Uranusmaterial)

const Neptunematerial = new THREE.MeshStandardMaterial()
Neptunematerial.roughness = 0.3
Neptunematerial.opacity = 0.9
Neptunematerial.map = normalTextureOfNeptune
const sphereNeptune = new THREE.Mesh(Neptunegeometry,Neptunematerial)

const SaturnringMaterial = new THREE.MeshBasicMaterial()
SaturnringMaterial.map = normalTextureOfSaturnring
const sphereSaturnring = new THREE.Mesh(Saturnringgeometry,SaturnringMaterial)


const Marsmaterial = new THREE.MeshStandardMaterial()
Marsmaterial.roughness = 0.3
Marsmaterial.opacity = 0.9
Marsmaterial.map = normalTextureOfMars
const sphereMars = new THREE.Mesh(Marsgeometry,Marsmaterial)

const SatrunMaterial = new THREE.MeshStandardMaterial()
SatrunMaterial.opacity = 0.9
SatrunMaterial.roughness = 0.3
SatrunMaterial.map = normalTextureOfSaturn
const sphereSaturn = new THREE.Mesh(Saturngeometry,SatrunMaterial)


// Mesh
const sphere = new THREE.Mesh(Sungeometry,Sunmaterial)
scene.add(sphere)
scene.add(sphereEarth)
scene.add(sphereSaturn)
sphereSaturn.add(sphereSaturnring)
scene.add(sphereMercury)
scene.add(sphereVenus)
scene.add(sphereMars)
scene.add(sphereJupiter)
scene.add(sphereUranus)
scene.add(sphereNeptune)

const loader = new THREE.TextureLoader();
scene.background = loader.load('./star.jpg' , function(texture)
            {
             scene.background = texture;  
            });


const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 0
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphereMercury.position.y = window.scrollY * .001
    sphereVenus.position.y = window.scrollY * .001
    sphereEarth.position.y = window.scrollY * .001
    sphereMars.position.y = window.scrollY * .001
    sphereJupiter.position.y = window.scrollY * .001
    sphereSaturn.position.y = window.scrollY * .001
    sphereUranus.position.y = window.scrollY * .001
    sphereNeptune.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.z = 0.5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)
            
    sphereEarth.rotation.z = 1 * elapsedTime
    sphereEarth.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereEarth.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereEarth.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereMercury.rotation.z = 1 * elapsedTime
    sphereMercury.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereMercury.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereMercury.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereVenus.rotation.z = 1 * elapsedTime
    sphereVenus.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereVenus.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereVenus.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereMars.rotation.z = 1 * elapsedTime
    sphereMars.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereMars.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereMars.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereJupiter.rotation.z = 1 * elapsedTime
    sphereJupiter.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereJupiter.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereJupiter.position.z += -.05 * (targetY - sphereEarth.rotation.x)
 
    sphereSaturn.rotation.z = 1 * elapsedTime
    sphereSaturn.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereSaturn.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereSaturn.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereUranus.rotation.z = 1 * elapsedTime
    sphereUranus.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereUranus.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereUranus.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereNeptune.rotation.z = 1 * elapsedTime
    sphereNeptune.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereNeptune.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereNeptune.position.z += -.05 * (targetY - sphereEarth.rotation.x)

    const rotationOfMercury = Date.now() * 0.0010;
    sphereMercury.position.x = 2 * Math.cos(rotationOfMercury)
    sphereMercury.position.y = 1 * Math.sin(rotationOfMercury)

    const rotationOfVenus = Date.now() * 0.0009;
    sphereVenus.position.x = 3 * Math.cos(rotationOfVenus)
    sphereVenus.position.y = 1.5 * Math.sin(rotationOfVenus)
            
   
    const rotationOfEarth = Date.now() * 0.0008;
    sphereEarth.position.x = 4.5 * Math.cos(rotationOfEarth)
    sphereEarth.position.y = 2 * Math.sin(rotationOfEarth)

    const rotationOfMars = Date.now() * 0.0007;
    sphereMars.position.x = 5.5 * Math.cos(rotationOfMars)
    sphereMars.position.y = 3.1 * Math.sin(rotationOfMars)

    const rotationOfJupiter = Date.now() * 0.0006;
    sphereJupiter.position.x = 6.5 * Math.cos(rotationOfJupiter)
    sphereJupiter.position.y = 3.8 * Math.sin(rotationOfJupiter)

    const rotationOfSaturn = Date.now() * 0.0005;
    sphereSaturn.position.x = 7.5 * Math.cos(rotationOfSaturn)
    sphereSaturn.position.y = 5 * Math.sin(rotationOfSaturn)

    const rotationOfUranus = Date.now() * 0.0004;
    sphereUranus.position.x = 8.5 * Math.cos(rotationOfUranus)
    sphereUranus.position.y = 5.5 * Math.sin(rotationOfUranus)

    const rotationOfNeptune = Date.now() * 0.0003;
    sphereNeptune.position.x = 9.2 * Math.cos(rotationOfNeptune)
    sphereNeptune.position.y = 6.2 * Math.sin(rotationOfNeptune)
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
