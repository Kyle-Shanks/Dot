import { parseKey } from 'src/util/util'

const defaultProps = {
    octave: 4,
    velocity: 127,
    onPress: () => {},
    onRelease: () => {},
}

class Keyboard {
    constructor(opts = {}) {
        this.name = 'Keyboard'

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.octave = initProps.octave
        this.velocity = initProps.octave
        this.onPress = initProps.onPress
        this.onRelease = initProps.onRelease
    }

    // --- Public Methods ---
    on = () => {
        window.addEventListener('keydown', this._keydown)
        window.addEventListener('keyup', this._keyup)
    }
    off = () => {
        window.removeEventListener('keydown', this._keydown)
        window.removeEventListener('keyup', this._keyup)
    }

    // --- Private Methods ---
    // Event handling methods
    _keydown = (e) => {
        if (e.repeat) return

        // Additional commands
        switch (e.key) {
            case 'z': return this._octaveDown()
            case 'x': return this._octaveUp()
            case 'c': return this._velocityDown()
            case 'v': return this._velocityUp()
        }

        const note = parseKey(e.key, this.octave)
        if (note) this.onPress(note)
    }
    _keyup = (e) => {
        const note = parseKey(e.key, this.octave)
        if (note) this.onRelease(note)
    }

    // Octave methods
    _octaveDown = () => {
        if (this.octave > 1) this.octave--
    }
    _octaveUp = () => {
        if (this.octave < 7) this.octave++
    }

    // Velocity methods
    _velocityDown = () => {}
    _velocityUp = () => {}
}

export default Keyboard
