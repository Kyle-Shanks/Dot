import DotAudioNode from 'nodes/core/DotAudioNode'
import BufferSource from 'nodes/sources/BufferSource'
import { NOISE_TYPE } from 'src/util/constants'

const getBuffer = (AC) => {
    const bufferSize = AC.sampleRate * 2
    const buffer = AC.createBuffer(1, bufferSize, AC.sampleRate)
    return buffer
}

const getWhiteNoiseBuffer = (buffer) => {
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1

    return buffer
}

const getBrownNoiseBuffer = (buffer) => {
    const data = buffer.getChannelData(0)

    let lastVal = 0.0
    for (let i = 0; i < data.length; i++) {
        const gainMakeup = 4
        const white = Math.random() * 2 - 1
        data[i] = (lastVal + (0.02 * white)) * gainMakeup / 1.02
        lastVal = data[i] / gainMakeup
    }

    return buffer
}

const getPinkNoiseBuffer = (buffer) => {
    const data = buffer.getChannelData(0)

    let b0, b1, b2, b3, b4, b5, b6
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
    for (let i = 0; i < data.length; i++) {
        const gainMakeup = 0.11
        const white = Math.random() * 2 - 1

        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * gainMakeup
        b6 = white * 0.115926
    }

    return buffer
}

const typeBufferMap = {
    white: getWhiteNoiseBuffer,
    pink: getPinkNoiseBuffer,
    brown: getBrownNoiseBuffer,
}

const defaultProps = {
    type: 'white',
    start: false,
}

/**
 * A source node that outputs three types of noise using a BufferSource node.
 * Can output white, pink, or brown noise.
 *
 * @example
 * const whiteNoise = new Dot.NoiseGenerator(AC, { type: 'white' })
 * const pinkNoise = new Dot.NoiseGenerator(AC, { type: 'pink' })
 * const brownNoise = new Dot.NoiseGenerator(AC, { type: 'brown' })
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {String} opts.type - The type of noise that is output (default: 'white')
 * @param {Boolean} opts.start - Property to autostart the source node (default: false)
 * @returns {NoiseGenerator} NoiseGenerator Node
 */
class NoiseGenerator extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'NoiseGenerator'
        this.bufferSource = new BufferSource(this.AC, { loop: true })

        this.type = 'white'
        this.params = {}
        this.inputs = null
        this.outputs = [this.bufferSource]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setType(initProps.type)

        if (initProps.start) this.start()

        return this
    }

    /**
     * Starts output from the source node
     */
    start = () => this.bufferSource.start()

    /**
     * Stops output from the source node
     */
    stop = () => this.bufferSource.stop()

    // - Getters -
    /**
     * Get the current noise type
     * @returns {String} Noise type
     */
    getType = () => this.type

    // - Setters -
    /**
     * Set the noise type that is output
     * @param {String} val - Noise type (white, pink, brown)
     */
    setType = (val) => {
        if (NOISE_TYPE.includes(val)) {
            this.type = val
            if (this.bufferSource.getBuffer()) {
                typeBufferMap[this.type](this.bufferSource.getBuffer())
            } else {
                const buffer = getBuffer(this.AC)
                this.bufferSource.setBuffer(typeBufferMap[this.type](buffer))
            }
        }
    }
}

export default NoiseGenerator
