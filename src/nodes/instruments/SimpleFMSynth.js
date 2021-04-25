import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import Oscillator from '../sources/Oscillator.js'
import Synth from './Synth.js'

class SimpleFMSynth extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'SimpleFMSynth'
        this.modulator = new Oscillator(this.AC)
        this.modulatorGain = new Gain(this.AC)
        this.carrier = new Synth(this.AC)

        this.params = {
            modulatorFrequency: this.modulator.getParams().frequency,
            modulatorDetune: this.modulator.getParams().detune,
            modulatorDepth: this.modulatorGain.getParams().gain,
            carrierFrequency: this.carrier.getParams().frequency,
            carrierDetune: this.carrier.getParams().detune,
            carrierGain: this.carrier.getParams().gain,
        }

        // Initialize
        this.modulator.connect(this.modulatorGain)
        this.modulatorGain.connect(this.params.carrierFrequency)
        this.modulator.start()
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
    setModulatorDepth = (val, time) => this.modulatorGain.setGain(val, time)
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
    noteOff = () => this.carrier.noteOff()
    noteStop = () => this.carrier.noteStop()
}

export default SimpleFMSynth
