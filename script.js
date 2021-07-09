const img1 = new Image()
img1.src = "img/picture.png"

img1.addEventListener('load',function(){
  const canvas = document.getElementById("canvas1")
  const ctx = canvas.getContext("2d")
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  let particlesArray = []
  const numberOfParticles = 2500

  class Particle{
    constructor(){
      this.x = Math.random()*canvas.width
      this.y = 0
      this.speed = 0
      this.velocity = 1+Math.random()*3.5
      this.size = Math.random()*3.5
    }

    update(){
      this.y+=this.velocity
      if (this.y>=canvas.height){
        this.y=0
        this.x=Math.random()*canvas.width
      }
    }

    draw(){
      ctx.beginPath()
      ctx.fillStyle = 'white'
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
      ctx.fill()
    }
  }

  function init(){
    for (let i=0;i<numberOfParticles;i++){
      particlesArray.push(new Particle )
    }
  }

  init()

  function Animate(){
    ctx.drawImage(img1,0,0,canvas.width,canvas.height)
    ctx.globalAlpha = 0.15
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    for (let i=0;i<numberOfParticles;i++){
      particlesArray[i].draw()
      particlesArray[i].update()
    }

    requestAnimationFrame(Animate)

  }

  Animate()

})

