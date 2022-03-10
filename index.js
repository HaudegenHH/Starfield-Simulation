const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const log = console.log

const WIDTH = canvas.width = 1200
const HEIGHT = canvas.height = 800

let stars = []
let speed = 15

/* ****************************************************************** */

function map(inputNum, minInput, maxInput, minOutput, maxOutput) {
  return (inputNum - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput
}

function randomBetween(min, max) {
  if(min < 0) {
    return min + Math.random() * (Math.abs(min)+max)
  } else {
    return min + Math.random() * (max - min)
  }
}

/* ****************************************************************** */

class Star {
	constructor(){
  	this.x = randomBetween(-WIDTH, WIDTH)
  	this.y = randomBetween(-HEIGHT, HEIGHT)
  	this.z = randomBetween(0, WIDTH)
    this.prevX = this.x
    this.prevY = this.y
    this.prevZ = this.z
  } 
  update(){
  	this.z -= speed

    if(this.z <= 1){
    	this.z = randomBetween(0, WIDTH)
  		this.x = randomBetween(-WIDTH, WIDTH)
  		this.y = randomBetween(-HEIGHT, HEIGHT)
      
      this.prevZ = this.z
    }
  }
  draw(){
  	ctx.save()
  	ctx.beginPath()
    ctx.fillStyle = "white"		
    ctx.translate(WIDTH/2, HEIGHT/2)
    
    let sx = map(this.x / this.z, 0, 1, 0, WIDTH)
    let sy = map(this.y / this.z, 0, 1, 0, HEIGHT)
    
    let radius = map(this.z, 0, WIDTH, 10, 0)
    ctx.arc(sx, sy, radius, 0, Math.PI*2)
    ctx.fill()
    
    this.prevX = map(this.x / this.prevZ, 0, 1, 0, WIDTH)
    this.prevY = map(this.y / this.prevZ, 0, 1, 0, HEIGHT)
    
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255,255,255,0.1)"
    ctx.moveTo(sx, sy)
    ctx.lineTo(this.prevX, this.prevY)
    ctx.stroke()
           
    this.prevX = sx
    this.prevY = sy
    
    ctx.restore()
  }
}

/* ****************************************************************** */

function init() {
	for(let i = 0; i < 300; i++){
  	stars.push(new Star())
  }
  animate() 
}

function animate() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT)
  stars.forEach(star => {
    star.update()
  	star.draw()
  })
	requestAnimationFrame(animate)
}



init()