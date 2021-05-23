import DotAudioNode from 'nodes/core/DotAudioNode'
import Synth from 'nodes/instruments/Synth'
import Osc from 'nodes/instruments/Osc'

const defaultProps = {
    modulatorFrequency: 440,
    modulatorDetune: 0,
    modulatorDepth: 440,
    carrierFrequency: 440,
    carrierDetune: 0,
    gainAttack: 0,
    gainDecay: 0,
    gainSustain: 1,
    gainRelease: 0,
    gainAmount: 0.75,
}

/**
 * A simple implementation of an FM Synth.
 * Consists of one modulator (Osc) connected to the frequency param of a carrier (Synth).
 *
 * @example
 * const simpleFm = new Dot.SimpleFMSynth(AC)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.modulatorFrequency - Frequency of the modulator's oscillator (default: 440)
 * @param {Number} opts.modulatorDetune - Detune of the modulator's oscillator (default: 0)
 * @param {Number} opts.modulatorDepth - Gain of the modulator's gain node (default: 440)
 * @param {Number} opts.carrierFrequency - Frequency of the carrier's oscillator (default: 440)
 * @param {Number} opts.carrierDetune - Detune of the carrier's oscillator (default: 0)
 * @param {Number} opts.gainAttack - Attack time of the carrier's gain envelope (default: 0)
 * @param {Number} opts.gainDecay - Decay time of the carrier's gain envelope (default: 0)
 * @param {Number} opts.gainSustain - Sustain value of the carrier's gain envelope (default: 1)
 * @param {Number} opts.gainRelease - Release time of the carrier's gain envelope (default: 0)
 * @param {Number} opts.gainAmount - Modifier of the carrier's gain envelope (default: 0.75)
 * @params
 * modulatorFrequency - Frequency param of the modulator's oscillator
 * modulatorDetune - Detune param of the modulator's oscillator
 * modulatorDepth - Gain param of the modulator's gain node
 * carrierFrequency - Frequency param of the carrier's oscillator
 * carrierDetune - Detune param of the carrier's oscillator
 * carrierGain - Gain param of the carrier's gain node
 * @returns {SimpleFMSynth} SimpleFMSynth Node
 */
class SimpleFMSynth extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'SimpleFMSynth'
        this.modulator = new Osc(this.AC)
        this.carrier = new Synth(this.AC)

        this.params = {
            modulatorFrequency: this.modulator.getParams().frequency,
            modulatorDetune: this.modulator.getParams().detune,
            modulatorDepth: this.modulator.getParams().gain,
            carrierFrequency: this.carrier.getParams().frequency,
            carrierDetune: this.carrier.getParams().detune,
            carrierGain: this.carrier.getParams().gain,
        }
        this.input = null
        this.outputs = [this.carrier]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setModulatorFrequency(initProps.modulatorFrequency)
        this.setModulatorDetune(initProps.modulatorDetune)
        this.setModulatorDepth(initProps.modulatorDepth)
        this.setCarrierFrequency(initProps.carrierFrequency)
        this.setCarrierDetune(initProps.carrierDetune)
        this.setGainAttack(initProps.gainAttack)
        this.setGainDecay(initProps.gainDecay)
        this.setGainSustain(initProps.gainSustain)
        this.setGainRelease(initProps.gainRelease)
        this.setGainAmount(initProps.gainAmount)

        // Connections
        this.modulator.connect(this.params.carrierFrequency)
    }

    // - Getters -
    //Modulator
    /**
     * Get the current frequency of the modulator.
     * @returns {Number} Modulator frequency
     */
    getModulatorFrequency = () => this.params.modulatorFrequency.value

    /**
     * Get the current detune value of the modulator.
     * @returns {Number} Modulator detune
     */
    getModulatorDetune = () => this.params.modulatorDetune.value

    /**
     * Get the current depth of the modulator.
     * @returns {Number} Modulator depth
     */
    getModulatorDepth = () => this.params.modulatorDepth.value

    // Carrier
    /**
     * Get the current frequency of the carrier.
     * @returns {Number} Carrier frequency
     */
    getCarrierFrequency = () => this.params.carrierFrequency.value

    /**
     * Get the current detune value of the carrier.
     * @returns {Number} Carrier detune
     */
    getCarrierDetune = () => this.params.carrierDetune.value

    // Gain Envelope
    /**
     * Get the attack time of the carrier's gain envelope.
     * Calls the getGainAttack method on the carrier.
     * @returns {Number} Carrier gain envelope attack time
     */
    getGainAttack = () => this.carrier.getGainAttack()

    /**
     * Get the decay time of the carrier's gain envelope.
     * Calls the getGainDecay method on the carrier.
     * @returns {Number} Carrier gain envelope decay time
     */
    getGainDecay = () => this.carrier.getGainDecay()

    /**
     * Get the sustain value of the carrier's gain envelope.
     * Calls the getGainSustain method on the carrier.
     * @returns {Number} Carrier gain envelope sustain value
     */
    getGainSustain = () => this.carrier.getGainSustain()

    /**
     * Get the release time of the carrier's gain envelope.
     * Calls the getGainRelease method on the carrier.
     * @returns {Number} Carrier gain envelope release time
     */
    getGainRelease = () => this.carrier.getGainRelease()

    /**
     * Get the modifier amount of the carrier's gain envelope.
     * Calls the getGainAmount method on the carrier.
     * @returns {Number} Carrier gain envelope amount
     */
    getGainAmount = () => this.carrier.getGainAmount()

    // - Setters -
    // Modulator
    /**
     * Set the frequency of the modulator.
     * Calls the setFrequency method on the modulator.
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModulatorFrequency = (val, time) => this.modulator.setFrequency(val, time)

    /**
     * Set the detune value of the modulator.
     * Calls the setDetune method on the modulator.
     * @param {Number} val - Detune
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModulatorDetune = (val, time) => this.modulator.setDetune(val, time)

    /**
     * Set the depth of the modulator.
     * Calls the setGain method on the modulator.
     * @param {Number} val - Depth
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModulatorDepth = (val, time) => this.modulator.setGain(val, time)

    // Carrier
    /**
     * Set the frequency of the carrier.
     * Calls the setFrequency method on the carrier.
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setCarrierFrequency = (val, time) => this.carrier.setFrequency(val, time)

    /**
     * Set the detune value of the carrier.
     * Calls the setDetune method on the carrier.
     * @param {Number} val - Detune
     * @param {Number} [time] - update time in seconds (optional)
     */
    setCarrierDetune = (val, time) => this.carrier.setDetune(val, time)

    // Gain Envelope
    /**
     * Set the attack time of the carrier's gain envelope.
     * Calls the setGainAttack method on the carrier.
     * @param {Number} val - Attack time
     */
    setGainAttack = (val) => this.carrier.setGainAttack(val)

    /**
     * Set the decay time of the carrier's gain envelope.
     * Calls the setGainDecay method on the carrier.
     * @param {Number} val - Decay time
     */
    setGainDecay = (val) => this.carrier.setGainDecay(val)

    /**
     * Set the sustain value of the carrier's gain envelope.
     * Calls the setGainSustain method on the carrier.
     * @param {Number} val - Sustain value
     */
    setGainSustain = (val) => this.carrier.setGainSustain(val)

    /**
     * Set the release time of the carrier's gain envelope.
     * Calls the setGainRelease method on the carrier.
     * @param {Number} val - Release time
     */
    setGainRelease = (val) => this.carrier.setGainRelease(val)

    /**
     * Set the modifier amount of the carrier's gain envelope.
     * Calls the setGainAmount method on the carrier.
     * @param {Number} val - Modifier value
     */
    setGainAmount = (val) => this.carrier.setGainAmount(val)

    // - Note Methods -
    /**
     * Plays the note given.
     * Calls the noteOn method on the carrier.
     * @param {String} note - Note to be played
     */
    noteOn = (note) => this.carrier.noteOn(note)

    /**
     * Releases the note given if it matches the current note.
     * If a note is not given, it will release any current note being played.
     * Calls noteOff on the carrier.
     * @param {String} [note] - Note to be released (optional)
     */
    noteOff = (note) => this.carrier.noteOff(note)

    /**
     * Stops any note currently being played.
     * Calls noteStop on the carrier.
     */
    noteStop = () => this.carrier.noteStop()
}

export default SimpleFMSynth
