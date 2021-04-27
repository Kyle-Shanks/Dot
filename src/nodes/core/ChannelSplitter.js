import DotAudioNode from 'nodes/DotAudioNode'

const defaultProps = {}

class ChannelSplitter extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'ChannelSplitter'
        this.channelSplitter = this.AC.createChannelSplitter(2)

        this.params = {}
    }

    // - Getters -
    getInputs = () => [this.channelSplitter]
    getOutputs = () => [this.channelSplitter]
}

export default ChannelSplitter
