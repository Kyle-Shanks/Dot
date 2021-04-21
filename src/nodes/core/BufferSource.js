import DotAudioNode from '../DotAudioNode.js'

class BufferSource extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'BufferSource'
        this.bufferSource = this.AC.createBufferSource()

        this.params = {
            buffer: this.bufferSource.buffer,
            loop: this.bufferSource.loop,
            detune: this.bufferSource.detune,
            playbackRate: this.bufferSource.playbackRate,
        }
    }

    start = () => this.bufferSource.start()
    stop = () => this.bufferSource.stop()

    // Getters
    getInputs = () => [this.bufferSource]
    getOutputs = () => [this.bufferSource]

    getBuffer = () => this.params.buffer
    getLoop = () => this.params.loop
    getDetune = () => this.params.detune.value
    getPlaybackRate = () => this.params.playbackRate.value

    // Setters
    setBuffer = val => {
        this.bufferSource.buffer = val
        this.params.buffer = val
    }
    setLoop = val => {
        this.bufferSource.loop = val
        this.params.loop = val
    }
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)
    setPlaybackRate = (val, time) => this._timeUpdate(this.params.playbackRate, val, time)
}

export default BufferSource
