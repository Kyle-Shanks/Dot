import DotAudioNode from 'nodes/DotAudioNode'
import Gain from 'nodes/core/Gain'
import WaveShaper from 'nodes/core/WaveShaper'
import Oscillator from 'nodes/sources/Oscillator'

const defaultProps = {
    gain: 1,
    start: false,
}

class SignalGenerator extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'SignalGenerator'
        this.osc = new Oscillator(this.AC)
        this.gain = new Gain(this.AC)
        this.waveshaper = new WaveShaper(this.AC, { curve: new Float32Array(44100).fill(1) })

        this.params = {
            gain: this.gain.getParams().gain,
        }

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setGain(initProps.gain)

        // Connections
        this.osc.connect(this.waveshaper)
        this.waveshaper.connect(this.gain)
        if (initProps.start) this.start()
    }

    start = () => this.osc.start()
    stop = () => this.osc.stop()

    // - Getters -
    getOutputs = () => [this.gain]

    getGain = () => this.params.gain.value

    // - Setters -
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default SignalGenerator
