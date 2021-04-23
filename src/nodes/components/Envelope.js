import DotAudioNode from '../DotAudioNode.js'
import Source from '../sources/Source.js'

class Envelope extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Envelope'
        this.source = new Source(this.AC)

        this.timeoutIds = []
        this.params = {
            attack: 0,
            decay: 0,
            sustain: 1,
            release: 0,
            modifier: 1,
        }

        // Initialize
        this.source.setOffset(0)
        this.source.start()
    }

    connect = (destination) => {
        if (!destination instanceof AudioParam) {
            console.error('Envelopes must be connected to an AudioParam')
            return
        }

        this._connect(destination)
    }

    clearTimeouts = () => this.timeoutIds.forEach((id) => clearTimeout(id))

    triggerAttack = () => {
        this.clearTimeouts()
        const sustainVal = this.params.sustain * this.params.modifier

        if (this.params.attack) {
            this.source.setOffset(0) // Reset to 0
            this.source.setOffset(this.params.modifier, this.params.attack) // Attack

            const timeoutId = setTimeout(() => {
                this.source.setOffset(sustainVal, this.params.decay) // Decay
            }, (this.params.attack * 1000))

            this.timeoutIds.push(timeoutId)
        } else if (this.params.decay) {
            this.source.setOffset(this.params.modifier) // Reset to max
            this.source.setOffset(sustainVal, this.params.decay) // Decay
        } else if (this.params.sustain) {
            this.source.setOffset(sustainVal)
        }
    }

    triggerRelease = () => {
        this.clearTimeouts()
        this.source.setOffset(0, this.params.release) // Release
    }

    triggerStop = () => {
        this.clearTimeouts()
        this.source.setOffset(0)
    }

    // Getters
    getOutputs = () => [this.source]

    getAttack = () => this.params.attack
    getDecay = () => this.params.decay
    getSustain = () => this.params.sustain
    getRelease = () => this.params.release
    getModifier = () => this.params.modifier

    // Setters
    setAttack = (val) => this.params.attack = val
    setDecay = (val) => this.params.decay = val
    setSustain = (val) => this.params.sustain = val
    setRelease = (val) => this.params.release = val
    setModifier = (val) => this.params.modifier = val
}

export default Envelope
