import DotAudioNode from 'nodes/DotAudioNode'
import { GainEnvelope, Oscillator } from 'nodes'
import { getNoteFrequency } from 'src/util/util'

const defaultProps = {
    waveform: 'sine',
    frequency: 440,
    detune: 0,
    gainAttack: 0,
    gainDecay: 0,
    gainSustain: 1,
    gainRelease: 0,
    gainAmount: 0.75,
}

// Simple Oscillator connected to a GainEnvelope
class Synth extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Synth'
        this.osc = new Oscillator(this.AC, { start: true })
        this.gainEnv = new GainEnvelope(this.AC)

        this.currentNote = null
        this.params = {
            frequency: this.osc.getParams().frequency,
            detune: this.osc.getParams().detune,
            gain: this.gainEnv.getParams().gain,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setWaveform(initProps.waveform)
        this.setFrequency(initProps.frequency)
        this.setDetune(initProps.detune)
        this.setGainAttack(initProps.gainAttack)
        this.setGainDecay(initProps.gainDecay)
        this.setGainSustain(initProps.gainSustain)
        this.setGainRelease(initProps.gainRelease)
        this.setGainAmount(initProps.gainAmount)

        // Connections
        this.osc.connect(this.gainEnv)
    }

    // --- Public Methods ---
    // - Getters -
    getOutputs = () => [this.gainEnv]

    getCurrentNote = () => this.currentNote
    // Oscillator
    getWaveform = () => this.osc.getType()
    getFrequency = () => this.params.frequency.value
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
    setFrequency = (val, time) => this.osc.setFrequency(val, time)
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
        this.osc.setFrequency(getNoteFrequency(note))
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
