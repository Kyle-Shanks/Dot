import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import WaveShaper from '../core/WaveShaper.js'
import Oscillator from './Oscillator.js'

class SignalGenerator extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'SignalGenerator'
        this.osc = new Oscillator(this.AC)
        this.gain = new Gain(this.AC)
        this.waveshaper = new WaveShaper(this.AC)

        this.params = {
            gain: this.gain.getParams().gain,
        }

        // Initialize
        this.waveshaper.setCurve(new Float32Array(44100).fill(1))
        this.waveshaper.setOversample('none')

        this.osc.connect(this.waveshaper)
        this.waveshaper.connect(this.gain)
    }

    start = () => this.osc.start()
    stop = () => this.osc.stop()

    // Getters
    getOutputs = () => [this.gain]

    getGain = () => this.params.gain.value

    // Setters
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default SignalGenerator
