import DotAudioNode from 'nodes/core/DotAudioNode'

/**
 * A node used to split a stereo audio signal into its left and right components.
 * Wrapper class for the native ChannelSplitter audio node.
 * For more information, refer to the web audio api documentation.
 * (https://developer.mozilla.org/en-US/docs/Web/API/ChannelSplitterNode)
 *
 * @example
 * // Reverse the stereo image of a buffer
 * const buffer = new Dot.BufferSource(AC, { buffer: stereoBuffer })
 * const splitter = new Dot.ChannelSplitter(AC)
 * const merger = new Dot.ChannelMerger(AC)
 *
 * // Connect
 * buffer.connect(splitter)
 *
 * // Reverse signal
 * splitter.connect(merger, 0, 1) // Connect L to R
 * splitter.connect(merger, 1, 0) // Connect R to L
 *
 * // Output
 * merger.connect(AC.destination)
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
