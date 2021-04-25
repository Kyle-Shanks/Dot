import DotAudioNode from '../DotAudioNode.js'
import GainEnvelope from '../components/GainEnvelope.js'
import Oscillator from '../sources/Oscillator.js'
import { getNoteFreq } from '../../util/util.js'

// Simple Oscillator connected to a GainEnvelope node
class Synth extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Synth'
        this.osc = new Oscillator(this.AC)
        this.gainEnv = new GainEnvelope(this.AC)

        this.currentNote = null
        this.params = {
            frequency: this.osc.getParams().frequency,
            detune: this.osc.getParams().detune,
            gain: this.gainEnv.getParams().gain,
        }

        // Initialize
        this.osc.connect(this.gainEnv)
        this.osc.start()
    }

    // --- Public Methods ---
    // - Getters -
    getOutputs = () => [this.gainEnv]

    getCurrentNote = () => this.currentNote
    // Oscillator
    getWaveform = () => this.osc.getType()
    getFreq = () => this.params.frequency.value
    getDetune = () => this.params.detune.value
    // Gain Envelope
    getGainAttack = () => this.gainEnv.getAttack()
    getGainDecay = () => this.gainEnv.getDecay()
    getGainSustain = () => this.gainEnv.getSustain()
    getGainRelease = () => this.gainEnv.getRelease()
    getGainAmount = () => this.gainEnv.getModifier()

    // - Setters -
    // Oscillator
    setWaveform = (val) => this.osc.setType(val)
    setFreq = (val, time) => this.osc.setFreq(val, time)
    setDetune = (val, time) => this.osc.setDetune(val, time)
    // Gain Envelope
    setGainAttack = (val) => this.gainEnv.setAttack(val)
    setGainDecay = (val) => this.gainEnv.setDecay(val)
    setGainSustain = (val) => this.gainEnv.setSustain(val)
    setGainRelease = (val) => this.gainEnv.setRelease(val)
    setGainAmount = (val) => this.gainEnv.setModifier(val)

    // - Note Methods -
    noteOn = (note) => this._noteOn(note)
    noteOff = () => this._noteOff()
    noteStop = () => this._noteStop()

    // --- Private Methods ---
    _noteOn = (note) => {
        if (!note) {
            console.error('Note must be provided to play')
            return
        }

        this.currentNote = note
        this.osc.setFreq(getNoteFreq(note))
        this.gainEnv.triggerAttack()
    }
    _noteOff = () => {
        this.currentNote = null
        this.gainEnv.triggerRelease()
    }
    _noteStop = () => {
        this.currentNote = null
        this.gainEnv.triggerStop()
    }
}

export default Synth
