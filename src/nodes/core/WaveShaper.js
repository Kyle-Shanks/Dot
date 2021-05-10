import DotAudioNode from 'nodes/DotAudioNode'
import { OVERSAMPLE } from 'src/util/util'

const defaultProps = {
    curve: null,
    oversample: 'none',
}

/**
 * A Node used to adjust the shape of the incoming signal based on a waveshaping curve.
 * Wrapper class for the native WaveShaper audio node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Float32Array} opts.curve - Initial curve of the node
 * @param {String} opts.oversample - Initial oversample setting of the node
 * @params
 * pan - Pan value (-1 for full left pan, 1 for full right pan)
 * @returns {Pan} Pan Node
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
     * Get the current curve
     * @returns {Float32Array} Waveshaping Curve
     */
    getCurve = () => this.waveShaper.curve

    /**
     * Get the current oversample value
     * @returns {String} Oversample value
     */
    getOversample = () => this.waveShaper.oversample

    // - Setters -
    /**
     * Set the node's waveshaping curve
     * @param {Float32Array} val - Waveshaping curve
     * @returns
     */
    setCurve = (val) => this.waveShaper.curve = val

    /**
     * Set the node's oversample setting
     * @param {String} val - Oversample setting
     * @returns
     */
    setOversample = (val) => {
        if (OVERSAMPLE.includes(val)) this.waveShaper.oversample = val
    }
}

export default WaveShaper
