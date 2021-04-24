import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import WaveShaper from '../core/WaveShaper.js'

const createDistCurve = (gain = 0) => {
    const sampleNum = 44100
    const curve = new Float32Array(sampleNum)

    return curve.map((_, i) => {
        const x = i * 2 / sampleNum - 1
        return (3 + gain) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + gain * Math.abs(x))
    })
}

class Distortion extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Distortion'
        this.dryGain = new Gain(this.AC)
        this.waveShaper = new WaveShaper(this.AC)
        this.wetGain = new Gain(this.AC)

        this.distortion = 0
        this.params = {
            amount: this.wetGain.getParams().gain,
        }

        // Initialize
        this.waveShaper.setCurve(createDistCurve())
        this.waveShaper.setOversample('none')
        this.waveShaper.connect(this.wetGain)

        this.setDistortion(0)
        this.setAmount(0)
    }

    // - Getters -
    getInputs = () => [this.dryGain, this.waveShaper]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.params.amount.value
    getDistortion = () => this.distortion

    // - Setters -
    setAmount = (val, time) => {
        this._fadeUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }
    setDistortion = (val) => {
        this.waveShaper.setCurve(createDistCurve(val))
        this.distortion = val
    }
}

export default Distortion
