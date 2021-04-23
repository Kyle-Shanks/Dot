import DotAudioNode from '../DotAudioNode.js'
import GainEnvelope from '../components/GainEnvelope.js'
import Oscillator from '../sources/Oscillator.js'
import { getNoteFreq } from '../../util/util.js'

class Synth extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Synth'
        this.osc = new Oscillator(this.AC)
        this.gainEnv = new GainEnvelope(this.AC)

        this.currentNote = null
        this.params = {
            waveform: this.osc.getParams().type,
            detune: this.osc.getParams().detune,
            gainAttack: this.gainEnv.getParams().attack,
            gainDecay: this.gainEnv.getParams().decay,
            gainSustain: this.gainEnv.getParams().sustain,
            gainRelease: this.gainEnv.getParams().release,
            gainAmount: this.gainEnv.getParams().modifier,
        }

        // Initialize
        this.osc.connect(this.gainEnv)
        this.osc.start()
    }

    noteOn = (note) => {
        this.currentNote = note
        this.osc.setFreq(getNoteFreq(note))
        this.gainEnv.triggerAttack()
    }

    noteOff = () => {
        this.currentNote = null
        this.gainEnv.triggerRelease()
    }

    noteStop = () => {
        this.currentNote = null
        this.gainEnv.triggerStop()
    }

    // Getters
    getOutputs = () => [this.gainEnv]

    getCurrentNode = () => this.currentNote
    getWaveform = () => this.params.waveform
    getDetune = () => this.params.detune
    getAttack = () => this.params.gainAttack
    getDecay = () => this.params.gainDecay
    getSustain = () => this.params.gainSustain
    getRelease = () => this.params.gainRelease
    getGainAmount = () => this.params.gainAmount

    // Setters
    setWaveform = (val) => {
        this.osc.setType(val)
        this.params.waveform = val
    }
    setDetune = (val, time) => this.osc.setDetune(val, time)
    setAttack = (val) => {
        this.gainEnv.setAttack(val)
        this.params.gainAttack = val
    }
    setDecay = (val) => {
        this.gainEnv.setDecay(val)
        this.params.gainDecay = val
    }
    setSustain = (val) => {
        this.gainEnv.setSustain(val)
        this.params.gainSustain = val
    }
    setRelease = (val) => {
        this.gainEnv.setRelease(val)
        this.params.gainRelease = val
    }
    setGainAmount = (val) => {
        this.gainEnv.setModifier(val)
        this.params.gainAmount = val
    }
}

export default Synth
