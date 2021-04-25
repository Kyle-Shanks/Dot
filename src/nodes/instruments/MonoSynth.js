import FilterEnvelope from '../components/FilterEnvelope.js'
import Synth from './Synth.js'

// Simple Oscillator connected to a GainEnvelope and a FilterEnvelope
class MonoSynth extends Synth {
    constructor(AC) {
        super(AC)
        this.name = 'MonoSynth'
        this.filterEnv = new FilterEnvelope(this.AC)

        this.params = {
            ...this.params,
            filterFrequency: this.filterEnv.getParams().frequency,
            filterQ: this.filterEnv.getParams().q,
            filterDetune: this.filterEnv.getParams().detune,
            filterGain: this.filterEnv.getParams().gain,
        }

        // Initialize
        this.gainEnv.connect(this.filterEnv)
    }

    // - Getters -
    getOutputs = () => [this.filterEnv]

    // Filter
    getFilterFreq = () => this.filterEnv.getFreq()
    getFilterDetune = () => this.filterEnv.getFreq()
    getFilterQ = () => this.filterEnv.getFreq()
    getFilterGain = () => this.filterEnv.getFreq()
    getFilterType = () => this.filterEnv.getType()
    // Filter Envelope
    getFilterAttack = () => this.filterEnv.getAttack()
    getFilterDecay = () => this.filterEnv.getDecay()
    getFilterSustain = () => this.filterEnv.getSustain()
    getFilterRelease = () => this.filterEnv.getRelease()
    getFilterAmount = () => this.filterEnv.getModifier()

    // - Setters -
    // Filter
    setFilterFreq = (val, time) => this.filterEnv.setFreq(val, time)
    setFilterDetune = (val, time) => this.filterEnv.setDetune(val, time)
    setFilterQ = (val, time) => this.filterEnv.setQ(val, time)
    setFilterGain = (val, time) => this.filterEnv.setGain(val, time)
    setFilterType = (val) => this.filterEnv.getType(val)
    // Filter Envelope
    setFilterAttack = (val) => this.filterEnv.setAttack(val)
    setFilterDecay = (val) => this.filterEnv.setDecay(val)
    setFilterSustain = (val) => this.filterEnv.setSustain(val)
    setFilterRelease = (val) => this.filterEnv.setRelease(val)
    setFilterAmount = (val) => this.filterEnv.setModifier(val)

    // - Note Methods -
    noteOn = (note) => {
        this._noteOn(note)
        this.filterEnv.triggerAttack()
    }
    noteOff = () => {
        this._noteOff()
        this.filterEnv.triggerRelease()
    }
    noteStop = () => {
        this.noteStop()
        this.filterEnv.triggerStop()
    }
}

export default MonoSynth
