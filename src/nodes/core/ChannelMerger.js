import DotAudioNode from 'nodes/DotAudioNode'

/**
 * A node used to combine two audio signals into one.
 * Wrapper class for the native ChannelMerger audio node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @returns {ChannelMerger} ChannelMerger Node
 */
class ChannelMerger extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'ChannelMerger'
        this.channelMerger = this.AC.createChannelMerger(2)

        this.params = {}
        this.inputs = [this.channelMerger]
        this.outputs = [this.channelMerger]
    }
}

export default ChannelMerger
