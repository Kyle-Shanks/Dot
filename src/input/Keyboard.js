import { parseKey } from 'src/util/util'

const defaultProps = {
    octave: 4,
    velocity: 127,
    onPress: () => {},
    onRelease: () => {},
}

/**
 * A general-purpose Keyboard input class to give users a piano-like interface to interact with projects.
 *
 * Uses A-; keys to play notes. The Z and X keys change the octave
 *
 * @example
 * // Create context and PolySynth
 * const AC = new AudioContext()
 * const polySynth = new Dot.PolySynth(AC, { gainDecay: 0.4, gainSustain: 0 })
 * polySynth.connect(AC.destination)
 *
 * // Setup Keyboard
 * const keyboard = new Dot.Keyboard({
 *     onPress: (noteInfo) => {
 *         // Start context when the user tries to play a note
 *         if (AC.state === 'suspended') AC.resume()
 *
 *         synth.noteOn(noteInfo.fullNote)
 *     },
 *     onRelease: (noteInfo) => {
 *         synth.noteOff(noteInfo.fullNote)
 *     },
 * })
 *
 * // Start keyboard listeners
 * keyboard.on()
 *
 * @param {Object} opts - Initialization options
 * @param {Number} opts.octave - Octave setting for the keyboard (default: 4)
 * @param {Number} opts.velocity - Velocity setting for the keyboard (default: 127)
 * @param {Number} opts.onPress - Callback to be called on key press (default: noOp)
 * @param {Number} opts.onRelease - Callback to be called on key release (default: noOp)
 * @returns {Keyboard} Keyboard Input Class
 */
class Keyboard {
    constructor(opts = {}) {
        this.name = 'Keyboard'

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.octave = initProps.octave
        this.velocity = initProps.octave
        this.onPress = initProps.onPress
        this.onRelease = initProps.onRelease

        return this
    }

    // --- Public Methods ---
    /**
     * Start event listening for the keyboard.
     */
    on = () => {
        window.addEventListener('keydown', this._keydown)
        window.addEventListener('keyup', this._keyup)
    }

    /**
     * Stop event listening for the keyboard.
     */
    off = () => {
        window.removeEventListener('keydown', this._keydown)
        window.removeEventListener('keyup', this._keyup)
    }

    // - Getters -
    /**
     * Get the current octave
     * @returns {Number} Octave
     */
    getOctave = () => this.octave

    /**
     * Get the current velocity
     * @returns {Number} Velocity value
     */
    getVelocity = () => this.velocity

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
        if (note) this.onPress(note, e)
    }
    _keyup = (e) => {
        const note = parseKey(e.key, this.octave)
        if (note) this.onRelease(note, e)
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
