import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    buffer: null,
    loop: false,
    detune: 0,
    playbackRate: 1.0,
    start: false,
}

/**
 * A source node that outputs signal based on a provided audio buffer.
 * Wrapper class for the native BufferSource audio node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {AudioBuffer} opts.buffer - Initial buffer value
 * @param {Boolean} opts.loop - Initial loop value
 * @param {Number} opts.detune - Initial detune value for the source node
 * @param {Number} opts.playbackRate - Initial playback rate value
 * @param {Boolean} opts.start - Property to autostart the source node
 * @params
 * detune - Detune value of the audio
 * playbackRate - The speed that the audio is played back at
 * @returns {BufferSource} BufferSource Node
 */
class BufferSource extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'BufferSource'
        this.bufferSource = this.AC.createBufferSource()

        this.params = {
            detune: this.bufferSource.detune,
            playbackRate: this.bufferSource.playbackRate,
        }
        this.inputs = [this.bufferSource]
        this.outputs = [this.bufferSource]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setBuffer(initProps.buffer)
        this.setLoop(initProps.loop)
        this.setDetune(initProps.detune)
        this.setPlaybackRate(initProps.playbackRate)

        if (initProps.start) this.start()
    }

    /**
     * Starts output from the source node
     * @returns
     */
    start = () => this.bufferSource.start()

    /**
     * Stops output from the source node
     * @returns
     */
    stop = () => this.bufferSource.stop()

    // - Getters -
    /**
     * Get the current buffer of the source node
     * @returns {AudioBuffer} Audio buffer
     */
    getBuffer = () => this.bufferSource.buffer

    /**
     * Get the current loop setting
     * @returns {Boolean} Loop value
     */
    getLoop = () => this.bufferSource.loop

    /**
     * Get the current detune value
     * @returns {Number} Detune value
     */
    getDetune = () => this.params.detune.value

    /**
     * Get the current playback rate
     * @returns {Number} Playback rate
     */
    getPlaybackRate = () => this.params.playbackRate.value

    // - Setters -
    /**
     * Set the buffer of the source node
     * @param {AudioBuffer} val - Audio buffer
     * @returns
     */
    setBuffer = (val) => this.bufferSource.buffer = val

    /**
     * Set the loop value of the source node
     * @param {Boolean} val - Loop value
     * @returns
     */
    setLoop = (val) => this.bufferSource.loop = val

    /**
     * Set the detune value of the source node
     * Uses timeUpdate method to allow for changes over time
     * @param {Number} val - detune value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)

    /**
     * Set the playback rate of the source node
     * Uses timeUpdate method to allow for changes over time
     * @param {Number} val - playback rate
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setPlaybackRate = (val, time) => this._timeUpdate(this.params.playbackRate, val, time)
}

export default BufferSource
