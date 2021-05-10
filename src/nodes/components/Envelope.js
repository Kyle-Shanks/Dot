import DotAudioNode from 'nodes/core/DotAudioNode'
import ConstantSource from 'nodes/sources/ConstantSource'

const defaultProps = {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
    modifier: 1,
}

/**
 * Constant source envelope that can be connected to AudioParams to modulate over time.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.attack - Initial attack time
 * @param {Number} opts.decay - Initial decay time
 * @param {Number} opts.sustain - Initial sustain value
 * @param {Number} opts.release - Initial release time
 * @param {Number} opts.modifier - Initial modifier value
 * @returns {Envelope} Envelope Node
 */
class Envelope extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Envelope'
        this.source = new ConstantSource(this.AC, { start: true })

        this.timeoutIds = []
        this.attack = 0
        this.decay = 0
        this.sustain = 1
        this.release = 0
        this.modifier = 1

        this.params = {}
        this.inputs = null
        this.outputs = [this.source]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAttack(initProps.attack)
        this.setDecay(initProps.decay)
        this.setSustain(initProps.sustain)
        this.setRelease(initProps.release)
        this.setModifier(initProps.modifier)

        this.source.setOffset(0)
    }

    // --- Public Methods ---
    // - Getters -
    /**
     * Get the attack time of the envelope
     * @returns {Number}
     */
    getAttack = () => this.attack

    /**
     * Get the decay time of the envelope
     * @returns {Number}
     */
    getDecay = () => this.decay

    /**
     * Get the sustain value of the envelope
     * @returns {Number}
     */
    getSustain = () => this.sustain

    /**
     * Get the release time of the envelope
     * @returns {Number}
     */
    getRelease = () => this.release

    /**
     * Get the modifier value of the envelope
     * @returns {Number}
     */
    getModifier = () => this.modifier

    // - Setters -
    /**
     * Get the attack time of the envelope
     * @param {Number} val
     * @returns
     */
    setAttack = (val) => this.attack = val

    /**
     * Get the decay time of the envelope
     * @param {Number} val
     * @returns
     */
    setDecay = (val) => this.decay = val

    /**
     * Get the sustain value of the envelope
     * @param {Number} val
     * @returns
     */
    setSustain = (val) => this.sustain = val

    /**
     * Get the release time of the envelope
     * @param {Number} val
     * @returns
     */
    setRelease = (val) => this.release = val

    /**
     * Get the modifier value of the envelope
     * @param {Number} val
     * @returns
     */
    setModifier = (val) => this.modifier = val

    // - Util Methods -
    connect = (destination) => {
        if (!destination instanceof AudioParam) {
            console.error('Envelopes must be connected to an AudioParam')
            return
        }

        this._connect(destination)
    }

    // - Trigger Methods -
    /**
     * Triggers the attack of the envelope.
     * Will automatically trigger the decay after the attack time.
     */
    triggerAttack = () => {
        this._clearTimeouts()
        const sustainVal = this.sustain * this.modifier

        if (this.attack) {
            this.source.setOffset(0) // Reset to 0
            this.source.setOffset(this.modifier, this.attack) // Attack

            const timeoutId = setTimeout(() => {
                this.source.setOffset(sustainVal, this.decay) // Decay
            }, (this.attack * 1000))

            this.timeoutIds.push(timeoutId)
        } else if (this.decay) {
            this.source.setOffset(this.modifier) // Reset to max
            this.source.setOffset(sustainVal, this.decay) // Decay
        } else if (this.sustain) {
            this.source.setOffset(sustainVal)
        }
    }

    /**
     * Triggers the release of the envelope.
     */
    triggerRelease = () => {
        this._clearTimeouts()
        this.source.setOffset(0, this.release) // Release
    }

    /**
     * Triggers an instant stop of the envelope.
     */
    triggerStop = () => {
        this._clearTimeouts()
        this.source.setOffset(0)
    }

    // --- Private Methods ---
    _clearTimeouts = () => this.timeoutIds.forEach((id) => clearTimeout(id))
}

export default Envelope
