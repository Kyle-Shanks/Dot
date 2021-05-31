# Dot
Dot is a simple web audio library for creating synthesizers and other real-time audio synthesis projects.

# Installation
Install using npm
```bash
npm install dot-audio
```

Install using yarn:
```bash
yarn add dot-audio
```

Importing Dot in a project:
```js
import * as Dot from 'dot-audio'
```

Importing specific nodes/classes:
```js
import { MonoSynth, Keyboard } from 'dot-audio'
```

# Overview
Dot includes a collection of nodes, classes, and utility functions to make creating audio projects as easy as possible, while still remaining lightweight and flexible.

A general overview of what is available:
- Wrappers for most native web audio api nodes (gain, filter, delay, etc.)
- ADSR envelope nodes (general-purpose envelope, gain envelope, filter envelope)
- Effect nodes (chorus, distortion, reverb, etc.)
- Source nodes for signal generation and modulation (oscillator, lfo, noise generator, etc.)
- Custom instruments for general use (MonoSynth, PolySynth, FMSynth, etc.)
- Pre-built keyboard input class (more input classes will be added in the future)

More extensive documentation is available on the [docs site](https://dot-docs.netlify.app/).

# Basic Usage

Basic Example:
```js
import * as Dot from 'dot-audio'

// Audio context of your choosing
const AC = new AudioContext()

// Props to create a square wave pluck sound
const pluckProps = {
    waveform: 'square',
    filterFrequency: 0, // Filter frequency value
    filterAmount: 1000, // Filter envelope amount
    filterDecay: 0.4, // Filter envelope decay time
    filterSustain: 0, // Filter envelope sustain value
}
// Create polyphonic synth with pluck props
const synth = new Dot.PolySynth(AC, pluckProps)

// Connect synth to destination and play Cm7 chord
synth.connect(AC.destination)
synth.noteOn(['C4', 'D#4', 'G4', 'A#4'])
```

Node-Chaining Example:
```js
import * as Dot from 'dot-audio'

// Audio context
const AC = new AudioContext()

// Create polyphonic synth
const synth = new Dot.PolySynth(
    AC,
    {
        waveform: 'square',
        filterFrequency: 0,
        filterAmount: 1000,
        filterDecay: 0.4,
        filterSustain: 0,
    }
)

// Create chorus and reverb effects for a nice lush sound
const chorus = new Dot.Chorus(AC, { amount: 0.4 })
const reverb = new Dot.Reverb(AC, { amount: 0.25 })

// Create a limiter to tame the output
const limiter = new Dot.Limiter(AC)

// Connect all nodes together and play Cm7 chord
Dot.chain(synth, chorus, reverb, limiter, AC.destination)
synth.noteOn(['C4', 'D#4', 'G4', 'A#4'])
```

Keyboard Example:
```js
import * as Dot from 'dot-audio'

const AC = new AudioContext()

// Nodes
const synth = new Dot.PolySynth(
    AC,
    {
        waveform: 'square',
        filterFrequency: 0,
        filterAmount: 1000,
        filterDecay: 0.4,
        filterSustain: 0,
        filterRelease: 0.1,
    }
)
const chorus = new Dot.Chorus(AC, { amount: 0.4 })
const reverb = new Dot.Reverb(AC, { amount: 0.25 })
const limiter = new Dot.Limiter(AC)

// Connect
Dot.chain(synth, chorus, reverb, limiter, AC.destination)

// Keyboard setup
const keyboard = new Dot.Keyboard({
    onPress: (noteInfo) => {
        // Start context when the user tries to play a note
        if (AC.state === 'suspended') AC.resume()

        synth.noteOn(noteInfo.fullNote)
    },
    onRelease: (noteInfo) => {
        synth.noteOff(noteInfo.fullNote)
    },
})

// Start keyboard listeners
keyboard.on()
```

**NOTE:** Browsers will not play audio by default without some form of interaction from the user (i.e. a click or key press). The above example also demonstrates a method to resume the audio context when the user attempts to play a note.

# Nodes
All nodes are created using the following syntax:
```js
const node = new Dot.NodeName(AC, props)
```

All DotAudioNodes have access to a `::connect` and `::disconnect` methods to connect to other DotAudioNodes or native audio nodes.

**Warning:** Native audio nodes will not be able to connect to DotAudioNodes directly, but may be connected to params via the `::getParam` and `::getParams` methods.

## Core Nodes
Dot includes the following core nodes:
- ChannelMerger
- ChannelSplitter
- Compressor
- Convolver
- Delay
- Filter
- Gain
- StereoPanner
- WaveShaper

## Instruments
Instruments are pre-built general purpose sound sources for easy use in a project. All instruments have methods to set their primary properties and `::noteOn`, `::noteOff`, and `::noteStop` methods to play notes that are passed in and trigger the instrument's envelope(s). (FMSynth is the only exception due to the algorithms having different carriers. The `::triggerAttack` and `::triggerRelease` methods can be used to trigger the envelope in that case)

Dot includes the following instruments:
- Synth - Oscillator connected to a gain envelope
- MonoSynth - Oscillator connected to a gain envelope and filter envelope
- PolySynth - An 8 voice polyphonic synth built using MonoSynths
- SimpleFMSynth - One modulator and one carrier connected to a gain envelope
- FMSynth - Uses 4 modulators that are connected via different built-in algorithms, then connected to a gain envelope

## Effects
There are many effect nodes, each with their own methods to control their properties.

Dot includes the following effects:
- Chorus
- Distortion
- EQ2
- Flanger
- FeedbackDelay
- PingPongDelay
- Reverb

# Docs
More extensive documentation on the general API for all nodes, instruments, effects, and more is available on the [docs site](https://dot-docs.netlify.app/).
