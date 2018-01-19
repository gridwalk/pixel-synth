// add MIDI to GUI

var midiCCs = []
for (var i = 0; i <= 127; i++) {
  midiCCs[i] = i
}

var Mapping = function(){

  this.inputs = []

  this.ccIdentifier    = 0

  this.backgroundRed   = 1
  this.backgroundGreen = 2
  this.backgroundBlue  = 3

  this.foregroundRed   = 4
  this.foregroundGreen = 5
  this.foregroundBlue  = 6

  this.pulsewidth1     = 7
  this.wavelength1A    = 8
  this.wavelength1B    = 9
  this.threshold1      = 10

  this.pulsewidth2     = 11
  this.wavelength2A    = 12
  this.wavelength2B    = 13
  this.threshold2      = 14

  this.pulsewidth3     = 15
  this.wavelength3A    = 16
  this.wavelength3B    = 17
  this.threshold3      = 18  
  
  this.randomize       = 19

  this.save = function(map){
    localStorage.map = JSON.stringify(map)
  }

  this.load = function(){
    if( !localStorage.map ) return
    var map = JSON.parse(localStorage.map)
    for( var key in map ){
      if( isNaN(map[key]) ) continue
      mapping[key] = map[key]
    }
  }

}

var mapping = new Mapping()
mapping.load()

var midiFolder = gui.addFolder('Midi Map CC')
midiFolder.add(mapping, 'ccIdentifier').listen()

var midiControls = []
midiControls[0] = midiFolder.add(mapping, 'backgroundRed', midiCCs)
midiControls[1] = midiFolder.add(mapping, 'backgroundGreen', midiCCs)
midiControls[2] = midiFolder.add(mapping, 'backgroundBlue', midiCCs)
midiControls[3] = midiFolder.add(mapping, 'foregroundRed', midiCCs)
midiControls[4] = midiFolder.add(mapping, 'foregroundGreen', midiCCs)
midiControls[5] = midiFolder.add(mapping, 'foregroundBlue', midiCCs)
midiControls[6] = midiFolder.add(mapping, 'pulsewidth1', midiCCs)
midiControls[7] = midiFolder.add(mapping, 'wavelength1A', midiCCs)
midiControls[8] = midiFolder.add(mapping, 'wavelength1B', midiCCs)
midiControls[9] = midiFolder.add(mapping, 'threshold1', midiCCs)
midiControls[10] = midiFolder.add(mapping, 'pulsewidth2', midiCCs)
midiControls[11] = midiFolder.add(mapping, 'wavelength2A', midiCCs)
midiControls[12] = midiFolder.add(mapping, 'wavelength2B', midiCCs)
midiControls[13] = midiFolder.add(mapping, 'threshold2', midiCCs)
midiControls[14] = midiFolder.add(mapping, 'pulsewidth3', midiCCs)
midiControls[15] = midiFolder.add(mapping, 'wavelength3A', midiCCs)
midiControls[16] = midiFolder.add(mapping, 'wavelength3B', midiCCs)
midiControls[17] = midiFolder.add(mapping, 'threshold3', midiCCs)
midiControls[18] = midiFolder.add(mapping, 'randomize', midiCCs)

for (var i = midiControls.length - 1; i >= 0; i--) {
  midiControls[i].onChange(function(){
    mapping.save(mapping)
  })
}


function scaleMidiValue(value,min,max) {
  percent = value / 127
  scaled  = percent * (max - min) + min
  return scaled
}


WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err)
    return
  }
  
  input = WebMidi.inputs[0]
  input.addListener('controlchange', "all", function (e) {
    
    var cc    = e.controller.number
    var value = e.value

    // show the user which cc they are turning
    mapping.ccIdentifier = cc

    if( mapping.backgroundRed == cc ){
      synth.background[0] = value
    }

    if( mapping.backgroundGreen == cc ){
      synth.background[1] = value
    }

    if( mapping.backgroundBlue == cc ){
      synth.background[2] = value
    }

    if( mapping.foregroundRed == cc ){
      synth.foreground[0] = value
    }

    if( mapping.foregroundGreen == cc ){
      synth.foreground[1] = value
    }

    if( mapping.foregroundBlue == cc ){
      synth.foreground[2] = value
    }

    if( mapping.pulsewidth1 == cc ){
      synth.waves[0].pulsewidth = scaleMidiValue( value, 0, 2 )
    }

    if( mapping.wavelength1A == cc ){
      synth.waves[0].wavelength1 = scaleMidiValue( value, 1, 100 )
    }

    if( mapping.wavelength1B == cc ){
      synth.waves[0].wavelength2 = scaleMidiValue( value, 1, 100 )
    }

    if( mapping.threshold1 == cc ){
      synth.waves[0].threshold = scaleMidiValue( value, 0, 1.5 )
    }

    if( mapping.pulsewidth2 == cc ){
      synth.waves[1].pulsewidth = scaleMidiValue( value, 0, 2 )
    }

    if( mapping.wavelength2A == cc ){
      synth.waves[1].wavelength1 = scaleMidiValue( value, 1, 100 )
    }

    if( mapping.wavelength2B == cc ){
      synth.waves[1].wavelength2 = scaleMidiValue( value, 1, 100 )
    }

    if( mapping.threshold2 == cc ){
      synth.waves[1].threshold = scaleMidiValue( value, 0, 1.5 )
    }

    if( mapping.pulsewidth3 == cc ){
      synth.waves[2].pulsewidth = scaleMidiValue( value, 0, 2 )
    }

    if( mapping.wavelength3A == cc ){
      synth.waves[2].wavelength1 = scaleMidiValue( value, 1, 100 )
    }

    if( mapping.wavelength3B == cc ){
      synth.waves[2].wavelength2 = scaleMidiValue( value, 1, 100 )
    }

    if( mapping.threshold3 == cc ){
      synth.waves[2].threshold = scaleMidiValue( value, 0, 1.5 )
    }

    if( mapping.randomize == cc ){
      synth.randomize()
    }

  })

})