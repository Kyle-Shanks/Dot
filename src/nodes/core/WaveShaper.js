import DotAudioNode from '../DotAudioNode.js'
import { OVERSAMPLE } from '../../util/util.js'

class WaveShaper extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'WaveShaper'
        this.waveShaper = this.AC.createWaveShaper()

        this.params = {
            curve: this.waveShaper.curve,
            oversample: this.waveShaper.oversample,
        }
    }

    // Getters
    getInputs = () => [this.waveShaper]
    getOutputs = () => [this.waveShaper]

    getCurve = () => this.params.curve
    getOversample = () => this.params.oversample

    // Setters
    setCurve = (val) => this.waveShaper.curve = val
    setOversample = (val) => {
        if (OVERSAMPLE.includes(val)) this.waveShaper.oversample = val
    }
}

export default WaveShaper
