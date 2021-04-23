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

        this.params = {
            amount: 0,
            buffer: this.convolver.getParams().buffer,
            normalize: this.convolver.getParams().normalize,
        }

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

    getAmount = () => this.params.amount
    getBuffer = () => this.params.buffer
    getNormalize = () => this.params.normalize

    // Setters
    setAmount = (val, time) => {
        this.params.amount = val
        this._dryWetUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }
    setBuffer = (val) => {
        this.convolver.setBuffer(val)
        this.params.buffer = val
    }
    setNormalize = (val) => {
        this.convolver.setNormalize(val)
        this.params.normalize = val
    }
}

export default Reverb
