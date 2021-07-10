const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

let redElement = document.getElementById("red")
let greenElement = document.getElementById("green")
let blueElement = document.getElementById("blue")
let alphaElement = document.getElementById("alpha")
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const img1 = new Image()
img1.src = 'img/black_panther.jpg'




img1.addEventListener('load',function(){
  ctx.drawImage(img1,0,0,canvas.width,canvas.height)
  let RGBtoGray = function(){
  ctx.drawImage(img1,0,0,canvas.width,canvas.height)
  let canvasImage = ctx.getImageData(0,0,canvas.width,canvas.height)
  const imageData = canvasImage.data
  let red = document.getElementById("red").value/100
  let green = document.getElementById("green").value/100
  let blue = document.getElementById("blue").value/100
  let alpha = document.getElementById("alpha").value/100
  for (let i=0;i<imageData.length;i+=4){
     let avg = Math.floor((imageData[i]+imageData[i+1]+imageData[i+2])/3)
     imageData[i] = imageData[i]*red
     imageData[i+1] = imageData[i+1]*green
     imageData[i+2] = imageData[i+2]*blue
     imageData[i+3] = avg*alpha*3
     //imageData[i+3] = avg
  }
  ctx.putImageData(canvasImage,0,0)
  }
  
  redElement.addEventListener("change",RGBtoGray)
  greenElement.addEventListener("change",RGBtoGray)
  blueElement.addEventListener("change",RGBtoGray)
  alphaElement.addEventListener("change",RGBtoGray)
})