import FilterEnvelope from 'nodes/components/FilterEnvelope'
import Synth from 'nodes/instruments/Synth'

const defaultProps = {
    filterFrequency: 2000,
    filterQ: 0,
    filterDetune: 0,
    filterGain: 0,
    filterType: 'lowpass',
    filterAttack: 0,
    filterDecay: 0,
    filterSustain: 1,
    filterRelease: 0,
    filterAmount: 6000,
}

// Simple Oscillator connected to a GainEnvelope and a FilterEnvelope
class MonoSynth extends Synth {
    constructor(AC, opts = {}) {
        super(AC, opts)
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
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setFilterType(initProps.filterType)
        this.setFilterFrequency(initProps.filterFrequency)
        this.setFilterQ(initProps.filterQ)
        this.setFilterDetune(initProps.filterDetune)
        this.setFilterGain(initProps.filterGain)
        this.setFilterAttack(initProps.filterAttack)
        this.setFilterDecay(initProps.filterDecay)
        this.setFilterSustain(initProps.filterSustain)
        this.setFilterRelease(initProps.filterRelease)
        this.setFilterAmount(initProps.filterAmount)

        // Connections
        this.gainEnv.connect(this.filterEnv)
    }

    // - Getters -
    getOutputs = () => [this.filterEnv]

    // Filter
    getFilterFrequency = () => this.filterEnv.getFrequency()
    getFilterDetune = () => this.filterEnv.getDetune()
    getFilterQ = () => this.filterEnv.getQ()
    getFilterGain = () => this.filterEnv.getGain()
    getFilterType = () => this.filterEnv.getType()
    // Filter Envelope
    getFilterAttack = () => this.filterEnv.getAttack()
    getFilterDecay = () => this.filterEnv.getDecay()
    getFilterSustain = () => this.filterEnv.getSustain()
    getFilterRelease = () => this.filterEnv.getRelease()
    getFilterAmount = () => this.filterEnv.getModifier()

    // - Setters -
    // Filter
    setFilterFrequency = (val, time) => this.filterEnv.setFrequency(val, time)
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
    noteOff = (note) => {
        // Do not release if the note if different from the current note
        if (note && note !== this.currentNote) return

        this._noteOff(note)
        this.filterEnv.triggerRelease()
    }
    noteStop = () => {
        this.noteStop()
        this.filterEnv.triggerStop()
    }
}

export default MonoSynth
