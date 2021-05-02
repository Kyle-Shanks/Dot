import DotAudioNode from 'nodes/DotAudioNode'
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
    getOutputs = () => [this.carrier]

    //Modulator
    getModulatorFrequency = () => this.params.modulatorFrequency.value
    getModulatorDetune = () => this.params.modulatorDetune.value
    getModulatorDepth = () => this.params.modulatorDepth.value
    // Carrier
    getCarrierFrequency = () => this.params.carrierFrequency.value
    getCarrierDetune = () => this.params.carrierDetune.value
    // Gain Envelope
    getGainAttack = () => this.carrier.getGainAttack()
    getGainDecay = () => this.carrier.getGainDecay()
    getGainSustain = () => this.carrier.getGainSustain()
    getGainRelease = () => this.carrier.getGainRelease()
    getGainAmount = () => this.carrier.getGainAmount()

    // - Setters -
    // Modulator
    setModulatorFrequency = (val, time) => this.modulator.setFrequency(val, time)
    setModulatorDetune = (val, time) => this.modulator.setDetune(val, time)
    setModulatorDepth = (val, time) => this.modulator.setGain(val, time)
    // Carrier
    setCarrierFrequency = (val, time) => this.carrier.setFrequency(val, time)
    setCarrierDetune = (val, time) => this.carrier.setDetune(val, time)
    // Gain Envelope
    setGainAttack = (val) => this.carrier.setGainAttack(val)
    setGainDecay = (val) => this.carrier.setGainDecay(val)
    setGainSustain = (val) => this.carrier.setGainSustain(val)
    setGainRelease = (val) => this.carrier.setGainRelease(val)
    setGainAmount = (val) => this.carrier.setGainAmount(val)

    // - Note Methods -
    noteOn = (note) => this.carrier.noteOn(note)
    noteOff = (note) => this.carrier.noteOff(note)
    noteStop = () => this.carrier.noteStop()
}

export default SimpleFMSynth
