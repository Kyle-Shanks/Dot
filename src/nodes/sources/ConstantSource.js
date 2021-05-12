import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    offset: 1,
    start: false,
}

/**
 * A source node that outputs a constant signal that can be adjusted.
 * Wrapper class for the native ConstantSource audio node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {AudioBuffer} opts.offset - Initial offset value
 * @param {Boolean} opts.start - Property to autostart the source node
 * @params
 * offset - The offset of the output from the source node
 * @returns {ConstantSource} ConstantSource Node
 */
class ConstantSource extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'ConstantSource'
        this.source = this.AC.createConstantSource()

        this.params = {
            offset: this.source.offset,
        }
        this.inputs = null
        this.outputs = [this.source]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setOffset(initProps.offset)

        if (initProps.start) this.start()
    }

    /**
     * Starts output from the source node
     * @returns
     */
    start = () => this.source.start()

    /**
     * Stops output from the source node
     * @returns
     */
    stop = () => this.source.stop()

    // - Getters -
    /**
     * Get the current offset value of the source node
     * @returns {Number} Offset value
     */
    getOffset = () => this.params.offset

    // - Setters -
    /**
     * Set the offset value of the source node
     * Uses timeUpdate method to allow for changes over time
     * @param {Number} val - offset value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setOffset = (val, time) => this._timeUpdate(this.params.offset, val, time)
}

export default ConstantSource
