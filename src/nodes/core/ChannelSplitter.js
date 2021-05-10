import DotAudioNode from 'nodes/core/DotAudioNode'

/**
 * A node used to split an audio signal into two.
 * Wrapper class for the native ChannelSplitter audio node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @returns {ChannelSplitter} ChannelSplitter Node
 */
class ChannelSplitter extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'ChannelSplitter'
        this.channelSplitter = this.AC.createChannelSplitter(2)

        this.params = {}
        this.inputs = [this.channelSplitter]
        this.outputs = [this.channelSplitter]
    }
}

export default ChannelSplitter
