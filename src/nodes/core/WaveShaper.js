import DotAudioNode from '../DotAudioNode.js'
import { OVERSAMPLE } from '../../util/util.js'

class WaveShaper extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'WaveShaper'
        this.waveShaper = this.AC.createWaveShaper()

        this.params = {}
    }

    // Getters
    getInputs = () => [this.waveShaper]
    getOutputs = () => [this.waveShaper]

    getCurve = () => this.waveShaper.curve
    getOversample = () => this.waveShaper.oversample

    // Setters
    setCurve = (val) => this.waveShaper.curve = val
    setOversample = (val) => {
        if (OVERSAMPLE.includes(val)) this.waveShaper.oversample = val
    }
}

export default WaveShaper
