import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    offset: 1,
    start: false,
}

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

    start = () => this.source.start()
    stop = () => this.source.stop()

    // - Getters -
    getOffset = () => this.params.offset

    // - Setters -
    setOffset = (val, time) => this._timeUpdate(this.params.offset, val, time)
}

export default ConstantSource
