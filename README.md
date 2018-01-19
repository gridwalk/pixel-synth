# Pixel Synth

## [Demo](https://pixelsynth.com)

A lofi video synthesizer.

![Pixel Synth](http://pixelsynth.com/img/screen.png)

## Controls

All the controls are in the GUI dropdown.

## MIDI

Plug in a MIDI controller then refresh the page. The code auto connects to the first available MIDI controller. Change the CC selectors to connect the controls to the parameters you want. The ccIdentifier just shows which knob you last turned. It also serves to show if your MIDI device is connected.

## The Code

The interesting bits of this project are [main.js](https://github.com/gridwalk/pixel-synth/blob/master/src/js/app/main.js) and [midi.js](https://github.com/gridwalk/pixel-synth/blob/master/src/js/app/midi.js). This repository is based on [Net Art Starter](https://github.com/gridwalk/net-art-starter). Everything you need to know to build and edit this project are in that repository.

### Thanks

Thanks to [dat.GUI](https://github.com/dataarts/dat.gui) and [WebMidi.js](https://github.com/cotejp/webmidi) for making the hard parts easy.
