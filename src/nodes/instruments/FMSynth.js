import DotAudioNode from 'nodes/core/DotAudioNode'
import GainEnvelope from 'nodes/components/GainEnvelope'
import Limiter from 'nodes/effects/Limiter'
import Osc from 'nodes/instruments/Osc'
import fmAlgorithms from 'src/util/fmAlgorithms'

// NOTE: FMSynth can't have the normal noteOn and noteOff methods bc the oscillator that
// is outputing the tone that the user wants to hear will change depending on the algorithm.
// For now, there are the trigger methods for the gain envelope
// In the future, a better system for detecting which synth should be updated could be added

const defaultProps = {
    algorithm: 0,
    modAFrequency: 440,
    modADetune: 0,
    modAGain: 440,
    modBFrequency: 440,
    modBDetune: 0,
    modBGain: 440,
    modCFrequency: 440,
    modCDetune: 0,
    modCGain: 440,
    modDFrequency: 440,
    modDDetune: 0,
    modDGain: 440,
    gainAttack: 0,
    gainDecay: 0,
    gainSustain: 1,
    gainRelease: 0,
    gainAmount: 0.75,
}

/**
 * A 4-osc frequency modulation synthesizer.
 * Built using 4 Osc nodes acting as modulators that are linked together using different algorithms.
 * The output is passed into a Limiter and then connected to a GainEnvelope node.
 *
 * @example
 * const fmSynth = new Dot.FMSynth(AC, { algorithm: 5 })
 *
 * fmSynth.getAlgorithm() // [A > B > C] + D => Out
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.algorithm - The index of the algorithm (default: 0)
 * @param {Number} opts.modAFrequency - The frequency of the modulator A (default: 440)
 * @param {Number} opts.modADetune - The detune of the modulator A (default: 0)
 * @param {Number} opts.modAGain - The gain of the modulator A (default: 440)
 * @param {Number} opts.modBFrequency - The frequency of the modulator B (default: 440)
 * @param {Number} opts.modBDetune - The detune of the modulator B (default: 0)
 * @param {Number} opts.modBGain - The gain of the modulator B (default: 440)
 * @param {Number} opts.modCFrequency - The frequency of the modulator C (default: 440)
 * @param {Number} opts.modCDetune - The detune of the modulator C (default: 0)
 * @param {Number} opts.modCGain - The gain of the modulator C (default: 440)
 * @param {Number} opts.modDFrequency - The frequency of the modulator D (default: 440)
 * @param {Number} opts.modDDetune - The detune of the modulator D (default: 0)
 * @param {Number} opts.modDGain - The gain of the modulator D (default: 440)
 * @param {Number} opts.gainAttack - The attack time of the gain envelope (default: 0)
 * @param {Number} opts.gainDecay - The decay time of the gain envelope (default: 0)
 * @param {Number} opts.gainSustain - The sustain value of the gain envelope (default: 1)
 * @param {Number} opts.gainRelease - The release time of the gain envelope (default: 0)
 * @param {Number} opts.gainAmount - The gain modifier of the gain envelope (default: 0.75)
 * @params
 * modAFrequency - The frequency of modulator A
 * modADetune - The detune value of modulator A
 * modAGain - The gain value of modulator A
 * modBFrequency - The frequency of modulator B
 * modBDetune - The detune value of modulator B
 * modBGain - The gain value of modulator B
 * modCFrequency - The frequency of modulator C
 * modCDetune - The detune value of modulator C
 * modCGain - The gain value of modulator C
 * modDFrequency - The frequency of modulator D
 * modDDetune - The detune value of modulator D
 * modDGain - The gain value of modulator D
 * @returns {FMSynth} FMSynth Node
 */
class FMSynth extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'FMSynth'
        this.modA = new Osc(this.AC)
        this.modB = new Osc(this.AC)
        this.modC = new Osc(this.AC)
        this.modD = new Osc(this.AC)
        this.limiter = new Limiter(this.AC)
        this.gainEnv = new GainEnvelope(this.AC)

        this.algorithm = null
        this.params = {
            modAFrequency: this.modA.getParam('frequency'),
            modADetune: this.modA.getParam('detune'),
            modAGain: this.modA.getParam('gain'),
            modBFrequency: this.modB.getParam('frequency'),
            modBDetune: this.modB.getParam('detune'),
            modBGain: this.modB.getParam('gain'),
            modCFrequency: this.modC.getParam('frequency'),
            modCDetune: this.modC.getParam('detune'),
            modCGain: this.modC.getParam('gain'),
            modDFrequency: this.modD.getParam('frequency'),
            modDDetune: this.modD.getParam('detune'),
            modDGain: this.modD.getParam('gain'),
        }
        this.inputs = null
        this.outputs = [this.gainEnv]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAlgorithm(initProps.algorithm)
        this.setModAFrequency(initProps.modAFrequency)
        this.setModADetune(initProps.modADetune)
        this.setModAGain(initProps.modAGain)
        this.setModBFrequency(initProps.modBFrequency)
        this.setModBDetune(initProps.modBDetune)
        this.setModBGain(initProps.modBGain)
        this.setModCFrequency(initProps.modCFrequency)
        this.setModCDetune(initProps.modCDetune)
        this.setModCGain(initProps.modCGain)
        this.setModDFrequency(initProps.modDFrequency)
        this.setModDDetune(initProps.modDDetune)
        this.setModDGain(initProps.modDGain)
        this.setGainAttack(initProps.gainAttack)
        this.setGainDecay(initProps.gainDecay)
        this.setGainSustain(initProps.gainSustain)
        this.setGainRelease(initProps.gainRelease)
        this.setGainAmount(initProps.gainAmount)

        // Connections
        this.limiter.connect(this.gainEnv)

        return this
    }

    // - Getters -
    // Algorithm
    /**
     * Get an diagram for the current algorithm.
     * @returns {String} Algorithm info string
     */
    getAlgorithm = () => this.algorithm

    // ModA
    /**
     * Get the frequency of modulator A.
     * @returns {Number} Frequency value
     */
    getModAFrequency = () => this.params.modAFrequency.value

    /**
     * Get the detune of modulator A.
     * @returns {Number} Detune value
     */
    getModADetune = () => this.params.modADetune.value

    /**
     * Get the gain of modulator A.
     * @returns {Number} Gain value
     */
    getModAGain = () => this.params.modAGain.value

    // ModB
    /**
     * Get the frequency of modulator B.
     * @returns {Number} Frequency value
     */
    getModBFrequency = () => this.params.modBFrequency.value

    /**
     * Get the detune of modulator B.
     * @returns {Number} Detune value
     */
    getModBDetune = () => this.params.modBDetune.value

    /**
     * Get the gain of modulator B.
     * @returns {Number} Gain value
     */
    getModBGain = () => this.params.modBGain.value

    // ModC
    /**
     * Get the frequency of modulator C.
     * @returns {Number} Frequency value
     */
    getModCFrequency = () => this.params.modCFrequency.value

    /**
     * Get the detune of modulator C.
     * @returns {Number} Detune value
     */
    getModCDetune = () => this.params.modCDetune.value

    /**
     * Get the gain of modulator C.
     * @returns {Number} Gain value
     */
    getModCGain = () => this.params.modCGain.value

    // ModD
    /**
     * Get the frequency of modulator D.
     * @returns {Number} Frequency value
     */
    getModDFrequency = () => this.params.modDFrequency.value

    /**
     * Get the detune of modulator D.
     * @returns {Number} Detune value
     */
    getModDDetune = () => this.params.modDDetune.value

    /**
     * Get the gain of modulator D.
     * @returns {Number} Gain value
     */
    getModDGain = () => this.params.modDGain.value

    // Gain Envelope
    /**
     * Get the attack time of the gain envelope.
     * @returns {Number} Attack time
     */
    getGainAttack = () => this.gainEnv.getAttack()

    /**
     * Get the decay time of the gain envelope.
     * @returns {Number} Decay time
     */
    getGainDecay = () => this.gainEnv.getDecay()

    /**
     * Get the sustain value of the gain envelope.
     * @returns {Number} Sustain value
     */
    getGainSustain = () => this.gainEnv.getSustain()

    /**
     * Get the release time of the gain envelope.
     * @returns {Number} Release time
     */
    getGainRelease = () => this.gainEnv.getRelease()

    /**
     * Get the gain modifier of the gain envelope.
     * @returns {Number} Modifier amount
     */
    getGainAmount = () => this.gainEnv.getModifier()

    // - Setters -
    // Algorithm
    /**
     * Set the algorithm and reconnect the modulators.
     * @param {Number} idx - Algorithm index
     * @returns {String} Algorithm diagram string
     */
    setAlgorithm = (idx) => {
        if (!fmAlgorithms[idx]) return console.error('Invalid algorithm index')
        this.algorithm = fmAlgorithms[idx](this.modA, this.modB, this.modC, this.modD, this.limiter)
        return this.algorithm
    }

    // ModA
    /**
     * Set the frequency of modulator A.
     * Calls the setFrequency method on modulator (Osc).
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModAFrequency = (val, time) => this.modA.setFrequency(val, time)

    /**
     * Set the detune of modulator A.
     * Calls the setDetune method on modulator (Osc).
     * @param {Number} val - Detune value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModADetune = (val, time) => this.modA.setDetune(val, time)

    /**
     * Set the gain of modulator A.
     * Calls the setGain method on modulator (Osc).
     * @param {Number} val - Gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModAGain = (val, time) => this.modA.setGain(val, time)

    // ModB
    /**
     * Set the frequency of modulator B.
     * Calls the setFrequency method on modulator (Osc).
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModBFrequency = (val, time) => this.modB.setFrequency(val, time)

    /**
     * Set the detune of modulator B.
     * Calls the setDetune method on modulator (Osc).
     * @param {Number} val - Detune value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModBDetune = (val, time) => this.modB.setDetune(val, time)

    /**
     * Set the gain of modulator B.
     * Calls the setGain method on modulator (Osc).
     * @param {Number} val - Gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModBGain = (val, time) => this.modB.setGain(val, time)

    // ModC
    /**
     * Set the frequency of modulator C.
     * Calls the setFrequency method on modulator (Osc).
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModCFrequency = (val, time) => this.modC.setFrequency(val, time)

    /**
     * Set the detune of modulator C.
     * Calls the setDetune method on modulator (Osc).
     * @param {Number} val - Detune value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModCDetune = (val, time) => this.modC.setDetune(val, time)

    /**
     * Set the gain of modulator C.
     * Calls the setGain method on modulator (Osc).
     * @param {Number} val - Gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModCGain = (val, time) => this.modC.setGain(val, time)

    // ModD
    /**
     * Set the frequency of modulator D.
     * Calls the setFrequency method on modulator (Osc).
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModDFrequency = (val, time) => this.modD.setFrequency(val, time)

    /**
     * Set the detune of modulator D.
     * Calls the setDetune method on modulator (Osc).
     * @param {Number} val - Detune value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModDDetune = (val, time) => this.modD.setDetune(val, time)

    /**
     * Set the gain of modulator D.
     * Calls the setGain method on modulator (Osc).
     * @param {Number} val - Gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setModDGain = (val, time) => this.modD.setGain(val, time)

    // Gain Envelope
    /**
     * Set the attack time of the gain envelope.
     * Calls the setAttack method on the gain envelope.
     * @param {Number} val - Attack time
     */
    setGainAttack = (val) => this.gainEnv.setAttack(val)

    /**
     * Set the decay time of the gain envelope.
     * Calls the setDecay method on the gain envelope.
     * @param {Number} val - Decay time
     */
    setGainDecay = (val) => this.gainEnv.setDecay(val)

    /**
     * Set the sustain value of the gain envelope.
     * Calls the setSustain method on the gain envelope.
     * @param {Number} val - Sustain value
     */
    setGainSustain = (val) => this.gainEnv.setSustain(val)

    /**
     * Set the release time of the gain envelope.
     * Calls the setRelease method on the gain envelope.
     * @param {Number} val - Release time
     */
    setGainRelease = (val) => this.gainEnv.setRelease(val)

    /**
     * Set the gain modifier of the gain envelope.
     * Calls the setModifier method on the gain envelope.
     * @param {Number} val - Modifier amount
     */
    setGainAmount = (val) => this.gainEnv.setModifier(val)

    // - Trigger Methods -
    /**
     * Trigger the attack of the gain envelope.
     * Calls the triggerAttack method on the GainEnvelope.
     */
    triggerAttack = () => this.gainEnv.triggerAttack()

    /**
     * Trigger the release of the gain envelope.
     * Calls the triggerRelease method on the GainEnvelope.
     */
    triggerRelease = () => this.gainEnv.triggerRelease()

    /**
     * Trigger a stop on the gain envelope.
     * Calls the triggerStop method on the GainEnvelope.
     */
    triggerStop = () => this.gainEnv.triggerStop()
}

export default FMSynth
