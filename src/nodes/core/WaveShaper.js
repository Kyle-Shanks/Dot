import DotAudioNode from 'nodes/DotAudioNode'
import { OVERSAMPLE } from 'src/util/util'

const defaultProps = {
    curve: null,
    oversample: 'none',
}

class WaveShaper extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'WaveShaper'
        this.waveShaper = this.AC.createWaveShaper()

        this.params = {}

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setCurve(initProps.curve)
        this.setOversample(initProps.oversample)
    }

    // - Getters -
    getInputs = () => [this.waveShaper]
    getOutputs = () => [this.waveShaper]

    getCurve = () => this.waveShaper.curve
    getOversample = () => this.waveShaper.oversample

    // - Setters -
    setCurve = (val) => this.waveShaper.curve = val
    setOversample = (val) => {
        if (OVERSAMPLE.includes(val)) this.waveShaper.oversample = val
    }
}

export default WaveShaper
