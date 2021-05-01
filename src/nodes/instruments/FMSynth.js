import DotAudioNode from 'nodes/DotAudioNode'
import GainEnvelope from 'nodes/components/GainEnvelope'
import Limiter from 'nodes/dynamics/Limiter'
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
            modAFrequency: this.modA.getParams().frequency,
            modADetune: this.modA.getParams().detune,
            modAGain: this.modA.getParams().gain,
            modBFrequency: this.modB.getParams().frequency,
            modBDetune: this.modB.getParams().detune,
            modBGain: this.modB.getParams().gain,
            modCFrequency: this.modC.getParams().frequency,
            modCDetune: this.modC.getParams().detune,
            modCGain: this.modC.getParams().gain,
            modDFrequency: this.modD.getParams().frequency,
            modDDetune: this.modD.getParams().detune,
            modDGain: this.modD.getParams().gain,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

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
    }

    // - Getters -
    getOutputs = () => [this.gainEnv]

    // Algorithm
    getAlgorithm = () => this.algorithm
    // ModA
    getModAFrequency = () => this.params.modAFrequency.value
    getModADetune = () => this.params.modADetune.value
    getModAGain = () => this.params.modAGain.value
    // ModB
    getModBFrequency = () => this.params.modBFrequency.value
    getModBDetune = () => this.params.modBDetune.value
    getModBGain = () => this.params.modBGain.value
    // ModC
    getModCFrequency = () => this.params.modCFrequency.value
    getModCDetune = () => this.params.modCDetune.value
    getModCGain = () => this.params.modCGain.value
    // ModD
    getModDFrequency = () => this.params.modDFrequency.value
    getModDDetune = () => this.params.modDDetune.value
    getModDGain = () => this.params.modDGain.value
    // Gain Envelope
    getGainAttack = () => this.gainEnv.getAttack()
    getGainDecay = () => this.gainEnv.getDecay()
    getGainSustain = () => this.gainEnv.getSustain()
    getGainRelease = () => this.gainEnv.getRelease()
    getGainAmount = () => this.gainEnv.getModifier()

    // - Setters -
    // Algorithm
    setAlgorithm = (idx) => {
        this.algorithm = fmAlgorithms[idx](this.modA, this.modB, this.modC, this.modD, this.limiter)
    }
    // ModA
    setModAFrequency = (val, time) => this.modA.setFrequency(val, time)
    setModADetune = (val, time) => this.modA.setDetune(val, time)
    setModAGain = (val, time) => this.modA.setGain(val, time)
    // ModB
    setModBFrequency = (val, time) => this.modB.setFrequency(val, time)
    setModBDetune = (val, time) => this.modB.setDetune(val, time)
    setModBGain = (val, time) => this.modB.setGain(val, time)
    // ModC
    setModCFrequency = (val, time) => this.modC.setFrequency(val, time)
    setModCDetune = (val, time) => this.modC.setDetune(val, time)
    setModCGain = (val, time) => this.modC.setGain(val, time)
    // ModD
    setModDFrequency = (val, time) => this.modD.setFrequency(val, time)
    setModDDetune = (val, time) => this.modD.setDetune(val, time)
    setModDGain = (val, time) => this.modD.setGain(val, time)
    // Gain Envelope
    setGainAttack = (val) => this.gainEnv.setAttack(val)
    setGainDecay = (val) => this.gainEnv.setDecay(val)
    setGainSustain = (val) => this.gainEnv.setSustain(val)
    setGainRelease = (val) => this.gainEnv.setRelease(val)
    setGainAmount = (val) => this.gainEnv.setModifier(val)

    // - Trigger Methods -
    triggerAttack = () => this.gainEnv.triggerAttack()
    triggerRelease = () => this.gainEnv.triggerRelease()
    triggerStop = () => this.gainEnv.triggerStop()
}

export default FMSynth
