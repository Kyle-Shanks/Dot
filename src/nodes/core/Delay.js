import DotAudioNode from '../DotAudioNode.js'

class Delay extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Delay'
        this.delay = this.AC.createDelay()

        this.params = {
            delayTime: this.delay.delayTime,
        }
    }

    // - Getters -
    getInputs = () => [this.delay]
    getOutputs = () => [this.delay]

    getDelayTime = () => this.params.delayTime.value

    // - Setters -
    setDelayTime = (val, time) => this._timeUpdate(this.params.delayTime, val, time)
}

export default Delay
