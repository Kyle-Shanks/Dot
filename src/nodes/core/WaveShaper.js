import DotAudioNode from 'nodes/core/DotAudioNode'
import { OVERSAMPLE } from 'src/util/constants'

const defaultProps = {
    curve: null,
    oversample: 'none',
}

/**
 * A Node used to adjust the shape of the incoming signal based on a waveshaping curve.
 * Wrapper class for the native WaveShaper audio node.
 *
 * For more information, refer to the web audio api documentation.
 * (https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Float32Array} opts.curve - Float32 array describing the distortion curve to apply to the signal  (default: null)
 * @param {String} opts.oversample - The level of up-sampling that is applied before the wave shaping takes effect (default: 'none')
 * @returns {WaveShaper} WaveShaper Node
 */
class WaveShaper extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'WaveShaper'
        this.waveShaper = this.AC.createWaveShaper()

        this.params = {}
        this.inputs = [this.waveShaper]
        this.outputs = [this.waveShaper]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setCurve(initProps.curve)
        this.setOversample(initProps.oversample)
    }

    // - Getters -
    /**
     * Get the current curve.
     * @returns {Float32Array} Waveshaping Curve
     */
    getCurve = () => this.waveShaper.curve

    /**
     * Get the current oversample value.
     * @returns {String} Oversample value
     */
    getOversample = () => this.waveShaper.oversample

    // - Setters -
    /**
     * Set the node's waveshaping curve.
     * @param {Float32Array} val - Waveshaping curve
     */
    setCurve = (val) => this.waveShaper.curve = val

    /**
     * Set the node's oversample setting.
     * @param {String} val - Oversample setting
     */
    setOversample = (val) => {
        if (OVERSAMPLE.includes(val)) this.waveShaper.oversample = val
    }
}

export default WaveShaper
