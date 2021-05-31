import DotAudioNode from 'nodes/core/DotAudioNode'

/**
 * A node used to combine two audio signals into one.
 * Wrapper class for the native ChannelMerger audio node.
 *
 * For more information, refer to the web audio api documentation.
 * (https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode)
 *
 * @example
 * const osc = new Dot.Osc(AC)
 * const merger = new Dot.ChannelMerger(AC)
 * const leftGain = new Dot.Gain(AC, { gain: 0 })
 * const rightGain = new Dot.Gain(AC, { gain: 0 })
 * const leftLFO = new Dot.LFO(AC, { rate: 0.75, start: true })
 * const rightLFO = new Dot.LFO(AC, { rate: 0.5, start: true })
 *
 * // Connect
 * osc.connect([leftGain, rightGain])
 *
 * // Left signal
 * leftLFO.connect(leftGain.getParam('gain'))
 * leftGain.connect(merger, 0, 0)
 *
 * // Right signal
 * rightLFO.connect(rightGain.getParam('gain'))
 * rightGain.connect(merger, 0, 1)
 *
 * // Output
 * merger.connect(AC.destination)
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

        return this
    }
}

export default ChannelMerger
