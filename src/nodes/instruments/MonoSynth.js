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

/**
 * General-purpose monophonic synth node.
 * Consists of an Oscillator connected to a GainEnvelope and a FilterEnvelope.
 *
 * @extends Synth
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.filterFrequency - Frequency of the filter envelope's filter
 * @param {Number} opts.filterQ - Q value of the filter envelope's filter
 * @param {Number} opts.filterDetune - Detune value of the filter envelope's filter
 * @param {Number} opts.filterGain - Gain of the filter envelope's filter
 * @param {Number} opts.filterType - Type of the filter envelope's filter
 * @param {Number} opts.filterAttack - Attack time of the filter envelope
 * @param {Number} opts.filterDecay - Decay time of the filter envelope
 * @param {Number} opts.filterSustain - Sustain value of the filter envelope
 * @param {Number} opts.filterRelease - Release time of the filter envelope
 * @param {Number} opts.filterAmount - Modifier value of the filter envelope
 * @params
 * filterFrequency - Frequency of the filter envelope's filter
 * filterQ - Q value of the filter envelope's filter
 * filterDetune - Detune value of the filter envelope's filter
 * filterGain - Gain value of the filter envelope's filter
 * @returns {MonoSynth} MonoSynth Node
 */
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
        this.inputs = null
        this.outputs = [this.filterEnv]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

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
    // Filter
    /**
     * Get the frequency of the filter envelope's filter.
     * Calls getFrequency on the filter envelope.
     * @returns {Number} Filter envelope frequency
     */
    getFilterFrequency = () => this.filterEnv.getFrequency()

    /**
     * Get the detune value of the filter envelope's filter.
     * Calls getDetune on the filter envelope.
     * @returns {Number} Filter envelope detune
     */
    getFilterDetune = () => this.filterEnv.getDetune()

    /**
     * Get the Q value of the filter envelope's filter.
     * Calls getQ on the filter envelope.
     * @returns {Number} Filter envelope q value
     */
    getFilterQ = () => this.filterEnv.getQ()

    /**
     * Get the gain of the filter envelope's filter.
     * Calls getGain on the filter envelope.
     * @returns {Number} Filter envelope gain
     */
    getFilterGain = () => this.filterEnv.getGain()

    /**
     * Get the filter type of the filter envelope's filter.
     * Calls getType on the filter envelope.
     * @returns {String} Filter envelope type
     */
    getFilterType = () => this.filterEnv.getType()

    // Filter Envelope
    /**
     * Get the attack time of the filter envelope.
     * Calls getAttack on the filter envelope.
     * @returns {String} Filter envelope attack time
     */
    getFilterAttack = () => this.filterEnv.getAttack()

    /**
     * Get the decay time of the filter envelope.
     * Calls getDecay on the filter envelope.
     * @returns {String} Filter envelope decay time
     */
    getFilterDecay = () => this.filterEnv.getDecay()

    /**
     * Get the sustain value of the filter envelope.
     * Calls getSustain on the filter envelope.
     * @returns {String} Filter envelope sustain value
     */
    getFilterSustain = () => this.filterEnv.getSustain()

    /**
     * Get the release time of the filter envelope.
     * Calls getRelease on the filter envelope.
     * @returns {String} Filter envelope release time
     */
    getFilterRelease = () => this.filterEnv.getRelease()

    /**
     * Get the modifier amount of the filter envelope.
     * Calls getModifier on the filter envelope.
     * @returns {String} Filter envelope amount
     */
    getFilterAmount = () => this.filterEnv.getModifier()

    // - Setters -
    // Filter
    /**
     * Set the frequency of the filter envelope's filter.
     * Calls the setFrequency method on the filter envelope.
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterFrequency = (val, time) => this.filterEnv.setFrequency(val, time)

    /**
     * Set the detune value of the filter envelope's filter.
     * Calls the setDetune method on the filter envelope.
     * @param {Number} val - Detune
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterDetune = (val, time) => this.filterEnv.setDetune(val, time)

    /**
     * Set the q value of the filter envelope's filter.
     * Calls the setQ method on the filter envelope.
     * @param {Number} val - Q
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterQ = (val, time) => this.filterEnv.setQ(val, time)

    /**
     * Set the gain of the filter envelope's filter.
     * Calls the setGain method on the filter envelope.
     * @param {Number} val - Gain
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterGain = (val, time) => this.filterEnv.setGain(val, time)

    /**
     * Set the type of the filter envelope's filter.
     * Calls the setType method on the filter envelope.
     * @param {String} val - Filter type
     */
    setFilterType = (val) => this.filterEnv.setType(val)

    // Filter Envelope
    /**
     * Set the attack time of the filter envelope.
     * Calls the setAttack method on the filter envelope.
     * @param {Number} val - Attack time
     */
    setFilterAttack = (val) => this.filterEnv.setAttack(val)

    /**
     * Set the decay time of the filter envelope.
     * Calls the setDecay method on the filter envelope.
     * @param {Number} val - Decay time
     */
    setFilterDecay = (val) => this.filterEnv.setDecay(val)

    /**
     * Set the sustain value of the filter envelope.
     * Calls the setSustain method on the filter envelope.
     * @param {Number} val - Sustain value
     */
    setFilterSustain = (val) => this.filterEnv.setSustain(val)

    /**
     * Set the release time of the filter envelope.
     * Calls the setRelease method on the filter envelope.
     * @param {Number} val - Release time
     */
    setFilterRelease = (val) => this.filterEnv.setRelease(val)

    /**
     * Set the modifier value of the filter envelope.
     * Calls the setModifier method on the filter envelope.
     * @param {Number} val - Filter amount
     */
    setFilterAmount = (val) => this.filterEnv.setModifier(val)

    // - Note Methods -
    /**
     * Plays the note given.
     * Calls the Synth::noteOn and triggerAttack on the filter envelope.
     * @param {String} note - Note to be played
     */
    noteOn = (note) => {
        this._noteOn(note)
        this.filterEnv.triggerAttack()
    }

    /**
     * Releases the note given if it matches the current note.
     * If a note is not given, it will release any current note being played.
     * Calls the Synth::noteOff and triggerRelease on the filter envelope.
     * @param {String} [note] - Note to be released (optional)
     */
    noteOff = (note) => {
        // Do not release if the note if different from the current note
        if (note && note !== this.currentNote) return

        this._noteOff(note)
        this.filterEnv.triggerRelease()
    }

    /**
     * Stops any note currently being played.
     * Calls the Synth::noteStop and triggerStop on the filter envelope.
     */
    noteStop = () => {
        this._noteStop()
        this.filterEnv.triggerStop()
    }
}

export default MonoSynth
