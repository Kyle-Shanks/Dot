import DotAudioNode from 'nodes/DotAudioNode'

const defaultProps = {
    offset: 1,
    start: false,
}

class Source extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Source'
        this.source = this.AC.createConstantSource()

        this.params = {
            offset: this.source.offset,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setOffset(initProps.offset)

        if (initProps.start) this.start()
    }

    start = () => this.source.start()
    stop = () => this.source.stop()

    // - Getters -
    getOutputs = () => [this.source]

    getOffset = () => this.params.offset

    // - Setters -
    setOffset = (val, time) => this._timeUpdate(this.params.offset, val, time)
}

export default Source
