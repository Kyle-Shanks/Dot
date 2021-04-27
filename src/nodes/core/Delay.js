import DotAudioNode from 'nodes/DotAudioNode'

const defaultProps = {
    delayTime: 0,
}

class Delay extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Delay'
        this.delay = this.AC.createDelay()

        this.params = {
            delayTime: this.delay.delayTime,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setDelayTime(initProps.delayTime)
    }

    // - Getters -
    getInputs = () => [this.delay]
    getOutputs = () => [this.delay]

    getDelayTime = () => this.params.delayTime.value

    // - Setters -
    setDelayTime = (val, time) => this._timeUpdate(this.params.delayTime, val, time)
}

export default Delay
