import DotAudioNode from '../DotAudioNode.js'

class ChannelMerger extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'ChannelMerger'
        this.channelMerger = this.AC.createChannelMerger(2)

        this.params = {}
    }

    // - Getters -
    getInputs = () => [this.channelMerger]
    getOutputs = () => [this.channelMerger]
}

export default ChannelMerger
