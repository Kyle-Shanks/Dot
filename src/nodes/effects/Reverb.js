import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Convolver from 'nodes/core/Convolver'
import reverbBase64 from 'src/util/reverbBase64String'
import { base64ToArrayBuffer } from 'src/util/util'

const defaultProps = {
    amount: 0,
    buffer: null,
    normalize: false,
}

class Reverb extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Reverb'
        this.dryGain = new Gain(this.AC)
        this.convolver = new Convolver(this.AC)
        this.wetGain = new Gain(this.AC)

        this.amount = 0
        this.params = {}
        this.inputs = [this.dryGain, this.convolver]
        this.outputs = [this.dryGain, this.wetGain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setBuffer(initProps.buffer)
        this.setNormalize(initProps.normalize)

        // Load default buffer if none
        if (!this.getBuffer()) {
            this.AC.decodeAudioData(
                base64ToArrayBuffer(reverbBase64),
                buffer => this.setBuffer(buffer),
                e => console.error('Error decoding reverb data: ' + e.err)
            )
        }

        // Connections
        this.convolver.connect(this.wetGain)
    }

    // - Getters -
    getAmount = () => this.amount
    getBuffer = () => this.convolver.getParams().buffer
    getNormalize = () => this.convolver.getParams().normalize

    // - Setters -
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
