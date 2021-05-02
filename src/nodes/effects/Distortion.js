import DotAudioNode from 'nodes/DotAudioNode'
import Gain from 'nodes/core/Gain'
import WaveShaper from 'nodes/core/WaveShaper'

const defaultProps = {
    amount: 0,
    distortion: 0,
}

const createDistCurve = (gain = 0) => {
    const sampleNum = 44100
    const curve = new Float32Array(sampleNum)

    return curve.map((_, i) => {
        const x = i * 2 / sampleNum - 1
        return (3 + gain) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + gain * Math.abs(x))
    })
}

class Distortion extends DotAudioNode {
    constructor(AC, opts = {}) {
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
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setDistortion(initProps.distortion)

        // Connections
        this.waveShaper.connect(this.wetGain)
    }

    // - Getters -
    getInputs = () => [this.dryGain, this.waveShaper]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.params.amount.value
    getDistortion = () => this.distortion

    // - Setters -
    setAmount = (val, time) => {
        this._linearFadeUpdate(
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
