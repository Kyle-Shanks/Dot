import DotAudioNode from 'nodes/DotAudioNode'
import ConstantSource from 'nodes/sources/ConstantSource'

const defaultProps = {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
    modifier: 1,
}

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

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setAttack(initProps.attack)
        this.setDecay(initProps.decay)
        this.setSustain(initProps.sustain)
        this.setRelease(initProps.release)
        this.setModifier(initProps.modifier)

        this.source.setOffset(0)
    }

    // --- Public Methods ---
    // - Getters -
    getOutputs = () => [this.source]

    getAttack = () => this.attack
    getDecay = () => this.decay
    getSustain = () => this.sustain
    getRelease = () => this.release
    getModifier = () => this.modifier

    // - Setters -
    setAttack = (val) => this.attack = val
    setDecay = (val) => this.decay = val
    setSustain = (val) => this.sustain = val
    setRelease = (val) => this.release = val
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
    triggerRelease = () => {
        this._clearTimeouts()
        this.source.setOffset(0, this.release) // Release
    }
    triggerStop = () => {
        this._clearTimeouts()
        this.source.setOffset(0)
    }

    // --- Private Methods ---
    _clearTimeouts = () => this.timeoutIds.forEach((id) => clearTimeout(id))
}

export default Envelope
