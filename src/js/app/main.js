var Synth = function(){

  this.ctx = null
  this.imageData = null

  this.background = [0, 100, 255]
  this.foreground = [0, 255, 100]

  this.waves = [
    {
      value:0,
      counter:0,
      pulsewidth:0.5,
      wavelength1:10,
      wavelength2:50,
      threshold:1,
    },
    {
      value:0,
      counter:0,
      pulsewidth:0.5,
      wavelength1:11,
      wavelength2:50,
      threshold:1,
    },
    {
      value:0,
      counter:0,
      pulsewidth:0.25,
      wavelength1:11,
      wavelength2:50,
      threshold:1,
    },
    {
      value:0,
      counter:0,
      pulsewidth:0.5,
      wavelength1:11,
      wavelength2:50,
      threshold:1,
    }  
  ]

  this.resetSize = function(){
    width  = window.innerWidth/4
    height = window.innerHeight/4
    _canvas = document.getElementById('canvas')
    _canvas.style.width  = width+'px'
    _canvas.setAttribute('width',width)
    _canvas.style.height = height+'px'
    _canvas.setAttribute('height',height)
    this.ctx = _canvas.getContext('2d')
    this.imageData = this.ctx.getImageData(0, 0, width, height)
    return this.imageData
  }

  this.init = function(){ 
    
    this.resetSize()

    // get initial URL params of synth
    // used to recall synth falues from URL
    if( URLparam('bgRed') ){
    
      synth.background = [URLparam('bgRed'),URLparam('bgGreen'),URLparam('bgBlue')]
      synth.foreground = [URLparam('fgRed'),URLparam('fgGreen'),URLparam('fgBlue')]

      synth.waves[0].pulsewidth  = URLparam('pulsewidth1')
      synth.waves[0].wavelength1 = URLparam('wavelength1A')
      synth.waves[0].wavelength2 = URLparam('wavelength1B')
      synth.waves[0].threshold   = URLparam('threshold1')

      synth.waves[1].pulsewidth  = URLparam('pulsewidth2')
      synth.waves[1].wavelength1 = URLparam('wavelength2A')
      synth.waves[1].wavelength2 = URLparam('wavelength2B')
      synth.waves[1].threshold   = URLparam('threshold2')

      synth.waves[2].pulsewidth  = URLparam('pulsewidth3')
      synth.waves[2].wavelength1 = URLparam('wavelength3A')
      synth.waves[2].wavelength2 = URLparam('wavelength3B')
      synth.waves[2].threshold   = URLparam('threshold3')  
    
    }else{
      synth.randomize()
    }
  }

  this.refreshWave = function(index){
    s = this.waves[index]
    s.value = Math.sin( s.counter ) + s.pulsewidth 
    s.counter += Math.PI * s.wavelength1 / s.wavelength2
  }

  this.randomize = function(){
    synth.background = [r(255),r(255),r(255)]
    synth.foreground = [r(255),r(255),r(255)]

    synth.waves[0].pulsewidth = r(100)/100
    synth.waves[0].wavelength1 = r(10)
    synth.waves[0].wavelength2 = r(100)
    synth.waves[0].threshold = r(150) / 100

    synth.waves[1].pulsewidth = r(100)/100
    synth.waves[1].wavelength1 = r(100)
    synth.waves[1].wavelength2 = r(1000)
    synth.waves[1].threshold = r(150) / 100

    synth.waves[2].pulsewidth = r(100)/100
    synth.waves[2].wavelength1 = r(1000)
    synth.waves[2].wavelength2 = r(10000)
    synth.waves[2].threshold = r(150) / 100
  }

  this.saveLinkToClipboard = function(){

    var url = '/?'
    url += 'pulsewidth1='+synth.waves[0].pulsewidth
    url += '&wavelength1A='+synth.waves[0].wavelength1
    url += '&wavelength1B='+synth.waves[0].wavelength2
    url += '&threshold1='+synth.waves[0].threshold
    url += '&pulsewidth2='+synth.waves[1].pulsewidth
    url += '&wavelength2A='+synth.waves[1].wavelength1
    url += '&wavelength2B='+synth.waves[1].wavelength2
    url += '&threshold2='+synth.waves[1].threshold
    url += '&pulsewidth3='+synth.waves[2].pulsewidth
    url += '&wavelength3A='+synth.waves[2].wavelength1
    url += '&wavelength3B='+synth.waves[2].wavelength2
    url += '&threshold3='+synth.waves[2].threshold
    url += '&bgRed='+synth.background[0]
    url += '&bgGreen='+synth.background[1]
    url += '&bgBlue='+synth.background[2]
    url += '&fgRed='+synth.foreground[0]
    url += '&fgGreen='+synth.foreground[1]
    url += '&fgBlue='+synth.foreground[2]

    window.history.replaceState({}, 'Jagged Pixel Synth', url)
    copyTextToClipboard(window.location.host+url)

  }
}


var synth = new Synth()
synth.init()


// add all controls to the GUI
var gui = new dat.GUI()

gui.addColor(synth, 'background').listen()
gui.addColor(synth, 'foreground').listen()

gui.add(synth.waves[0], 'pulsewidth', 0, 2).listen()
gui.add(synth.waves[0], 'wavelength1', 1, 100).listen()
gui.add(synth.waves[0], 'wavelength2', 1, 100).listen()
gui.add(synth.waves[0], 'threshold', 0, 1.5).listen()

gui.add(synth.waves[1], 'pulsewidth', 0, 2).listen()
gui.add(synth.waves[1], 'wavelength1', 1, 100).listen()
gui.add(synth.waves[1], 'wavelength2', 1, 100).listen()
gui.add(synth.waves[1], 'threshold', 0, 1.5).listen()

gui.add(synth.waves[2], 'pulsewidth', 0, 2).listen()
gui.add(synth.waves[2], 'wavelength1', 1, 100).listen()
gui.add(synth.waves[2], 'wavelength2', 1, 100).listen()
gui.add(synth.waves[2], 'threshold', 0, 1.5).listen()

gui.add(synth, 'randomize')
gui.add(synth, 'saveLinkToClipboard')

// on window resize also resize synth
var resizeTimer;
window.onresize = function(){
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(function(){
    synth.imageData = synth.resetSize()
  }, 100)
}




var fps = 10
function draw() {

  setTimeout( draw, 1000/fps )

  pixels = synth.imageData.data

  // set every pixel
  // each pixel is four subsequent indexes (rgba)

  for (var i = 0; i < pixels.length; i += 4) {

    synth.refreshWave(0)
    synth.refreshWave(1)
    synth.refreshWave(2)

    // default to bg color
    pixels[i]     = synth.background[0]
    pixels[i + 1] = synth.background[1]
    pixels[i + 2] = synth.background[2]
    pixels[i + 3] = 255
    
    // do fg color if threshold is met
    if( 
        synth.waves[0].value > synth.waves[0].threshold || 
        synth.waves[1].value > synth.waves[1].threshold || 
        synth.waves[2].value > synth.waves[2].threshold
      ){
  
      pixels[i]     = valBetween( synth.foreground[0] + synth.waves[0].value * 100, 0, 255)
      pixels[i + 1] = valBetween( synth.foreground[1] + synth.waves[1].value * 100, 0, 255)
      pixels[i + 2] = valBetween( synth.foreground[2] + synth.waves[2].value * 100, 0, 255)
      pixels[i + 3] = 255
    }

  }

  synth.ctx.putImageData(synth.imageData,0,0)
}

draw()

document.getElementById('canvas').onclick = synth.randomize

// add about section
if( URLparam('info') !== 0 ){

  var _about = document.createElement('li')
  _about.classList.add('about')
  _about.innerHTML = "Pixel Synth is a lofi video synthesizer. Click the screen to randomize. Save link button is for sharing patches. Works with MIDI (in Chrome &amp; Opera). Press H or tap this message to hide it. <a href='https://github.com/gridwalk/pixel-synth' target='_blank'>Open Source</a>. Project by <a target='_blank' href='https://donaldhanson.net'>Donald Hanson</a>."
  var _guiList = document.querySelector('.dg.main > ul')
  _guiList.insertBefore(_about, _guiList.firstElementChild)

  // close controls if it overflows the screen
  if( _guiList.clientHeight+100 > window.innerHeight ){
    gui.close()
  }

  _about.onclick = function(e){
    console.log(e.target.tagName)
    if( e.target.tagName !== "LI" ) return
    this.remove()
  }

}

// remove controls if info = 0
if( URLparam('info') == '0' ){
  document.querySelector('.dg.ac').style.display = 'none'
}

