let canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
let style_canvas = getComputedStyle(canvas)
const initial_window_canvas_width = style_canvas.width
const initial_window_canvas_height = style_canvas.height
let redElement = document.getElementById("red")
let greenElement = document.getElementById("green")
let blueElement = document.getElementById("blue")
let alphaElement = document.getElementById("alpha")
let saveImage = document.getElementById("saveImage")

redElement.value = Math.floor(redElement.max/2)
greenElement.value = Math.floor(greenElement.max/2)
blueElement.value = Math.floor(blueElement.max/2)
alphaElement.value = Math.floor(alphaElement.max/2)
const input_file = document.getElementById("input-file")
const img1 = new Image()
img1.src = 'img/black_panther.jpg' 

canvas.width = parseInt(style_canvas.width) 
canvas.height = parseInt(style_canvas.height) 


// Resizing image for previewing 

let reSize = function(canvas,img) {
  if (img.height<=canvas.height & img.width<=canvas.width){
   canvas.width= img.height
   canvas.height= img.width
  }
  else if (img.height>canvas.height & img.width<=canvas.width){
    canvas.width = Math.floor((canvas.height/img.height)*canvas.width)
  }

  else if (img.width>canvas.width & img.height<=canvas.height){
    canvas.height = Math.floor((canvas.width/img.width)*canvas.height)
  }

  else if (img.width>canvas.width & img.height > canvas.height){
    if (img.width>=img.height){
      canvas.height = Math.floor((canvas.width/img.width)*img.height)
    }
    else {
      canvas.width = Math.floor((canvas.height/img.height)*canvas.width)
    }
  }

}

// read an image after the image is loaded

let readImage = function(){

  const file = this.files[0]
  if (file){
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener("load",function(){
      img1.src = reader.result
    })
  }
}

// read original image and make changes on original image

let modifyOriginalImage = function(){

  let file = input_file.files[0]  
  if (file){
    let resizedCanvas = document.createElement("canvas")
    let resizedCtx = resizedCanvas.getContext("2d")
    let newImage = new Image()
    resizedCanvas.width = img1.width
    resizedCanvas.height = img1.height
    console.log(img1.width,img1.height)
    const original_reader = new FileReader()
    original_reader.readAsDataURL(file)
    original_reader.addEventListener("load",function(){
      newImage.src = original_reader.result  
      resizedCtx.drawImage(newImage,0,0)
      let originalImage = resizedCtx.getImageData(0,0,resizedCanvas.width,resizedCanvas.height)
      originalImageData = originalImage.data
      let red =redElement.value/100
      let green = greenElement.value/100
      let blue = blueElement.value/100
      let alpha = alphaElement.value/100
      console.log(originalImageData[0],red)
      for (let i=0;i<originalImageData.length;i+=4){
        originalImageData[i] = originalImageData[i]*red
        originalImageData[i+1] = originalImageData[i+1]*green
        originalImageData[i+2] = originalImageData[i+2]*blue
        originalImageData[i+3] = originalImageData[i+3]*alpha 
      }
      resizedCtx.putImageData(originalImage,0,0)
      let link = document.createElement("a")
      link.download = file.name 
      link.href =  resizedCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })

  }

}

// dynamic linear gradient for slider

let modifySliderColor = function(ip){
  let compStyle = getComputedStyle(ip)
  let bgImage = compStyle.backgroundImage
  let left_color = bgImage.slice(bgImage.indexOf('rgb('),bgImage.indexOf(')'))+")"
  let right_color = bgImage.slice(bgImage.indexOf('rgb(',bgImage.indexOf('rgb(')+1),bgImage.indexOf(')',bgImage.indexOf(')')+1)) +")"
  let latest_percentage = (ip.value/ip.max)*100 + "%"
  ip.style.backgroundImage = "linear-gradient(90deg,"+left_color+" "+latest_percentage+","+right_color+" "+latest_percentage +")" 
}

/*Modifying RGB and alpha of an image 
Here the image and canvas variables are fixed so keep that in mind*/ 

let modifyRGB = function(){
  ctx.drawImage(img1,0,0,canvas.width,canvas.height)
  let canvasImage = ctx.getImageData(0,0,canvas.width,canvas.height)
  const imageData = canvasImage.data
  let red =redElement.value/100
  let green = greenElement.value/100
  let blue = blueElement.value/100
  let alpha = alphaElement.value/100
  for (let i=0;i<imageData.length;i+=4){
     imageData[i] = imageData[i]*red
     imageData[i+1] = imageData[i+1]*green
     imageData[i+2] = imageData[i+2]*blue
     imageData[i+3] = imageData[i+3]*alpha 
  }
  ctx.putImageData(canvasImage,0,0)
  modifySliderColor(this)
}


// Executes readImage function whenever image gets uploaded
input_file.addEventListener("change",readImage)
// Save Image listener
// After image gets converted into dataURL draw the image 
img1.addEventListener('load',function(){
  reSize(canvas,img1)  
  canvas.style.height = canvas.height+"px"  
  canvas.style.width = canvas.width+"px"
  ctx.drawImage(img1,0,0,canvas.width,canvas.height)
  // whenever any change happens in the slider run modifyRGB function

  redElement.addEventListener("change", modifyRGB)
  greenElement.addEventListener("change",modifyRGB)
  blueElement.addEventListener("change",modifyRGB)
  alphaElement.addEventListener("change",modifyRGB)
  saveImage.addEventListener("click",modifyOriginalImage)
})