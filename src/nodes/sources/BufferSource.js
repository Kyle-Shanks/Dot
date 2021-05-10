import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    buffer: null,
    loop: false,
    detune: 0,
    playbackRate: 1.0,
    start: false,
}

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

    start = () => this.bufferSource.start()
    stop = () => this.bufferSource.stop()

    // - Getters -
    getBuffer = () => this.bufferSource.buffer
    getLoop = () => this.bufferSource.loop
    getDetune = () => this.params.detune.value
    getPlaybackRate = () => this.params.playbackRate.value

    // - Setters -
    setBuffer = (val) => this.bufferSource.buffer = val
    setLoop = (val) => this.bufferSource.loop = val
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)
    setPlaybackRate = (val, time) => this._timeUpdate(this.params.playbackRate, val, time)
}

export default BufferSource
