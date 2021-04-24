import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import Convolver from '../core/Convolver.js'
import reverbBase64 from '../../util/reverbBase64String.js'
import { base64ToArrayBuffer } from '../../util/util.js'

class Reverb extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Reverb'
        this.dryGain = new Gain(this.AC)
        this.convolver = new Convolver(this.AC)
        this.wetGain = new Gain(this.AC)

        this.amount = 0
        this.params = {}

        // Initialize
        this.convolver.connect(this.wetGain)

        this.setAmount(0)
        this.AC.decodeAudioData(
            base64ToArrayBuffer(reverbBase64),
            buffer => this.setBuffer(buffer),
            e => console.error('Error decoding reverb data: ' + e.err)
        )
    }

    // Getters
    getInputs = () => [this.dryGain, this.convolver]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.amount
    getBuffer = () => this.convolver.getParams().buffer
    getNormalize = () => this.convolver.getParams().normalize

    // Setters
    setAmount = (val, time) => {
        this.amount = val
        this._dryWetUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }
    setBuffer = (val) => this.convolver.setBuffer(val)
    setNormalize = (val) => this.convolver.setNormalize(val)
}

export default Reverb
