/**
 * Base class for Dot audio nodes.
 *
 * @param {AudioContext} AC - Audio context
 * @returns {DotAudioNode} Audio Node
 */
class DotAudioNode {
    constructor(AC) {
        this.AC = AC
        this.name = 'DotAudioNode'
    }

    // --- Public Methods ---
    /**
     * Get the name of the node
     * @returns {String} Node name
     */
    getName = () => this.name

    /**
     * Get the array of params for the node
     * @returns {Object.<string, AudioParam>} Node params
     */
    getParams = () => this.params

    /**
     * Get an array of the inputs for this node
     * @returns {Array.<DotAudioNode|AudioNode|AudioParam>}
     */
    getInputs = () => this.inputs

    /**
     * Get an array of the outputs for this node
     * @returns {Array.<DotAudioNode|AudioNode>}
     */
    getOutputs = () => this.outputs

    // - Util Methods -
    // Connect and disconnect shells to allow child nodes to add validation
    /**
     * Connect this node to a DotAudioNode, AudioNode, or AudioParam.
     * An array can be passed to connect to multiple destinations.
     * Optionally pass output and input channels.
     *
     * @example
     * const synth = new Dot.Synth(AC)
     * const reverb = new Dot.Reverb(AC)
     *
     * synth.connect(reverb) // Connect
     *
     * @param {DotAudioNode | AudioNode | AudioParam | Array.<DotAudioNode|AudioNode|AudioParam>}
     *      destination - The input/destination to connect to
     * @param {Number} outputNum - Output channel to connect with
     * @param {Number} inputNum - Input channel to connect to
     * @returns {DotAudioNode} this
     */
    connect = (destination, outputNum, inputNum) => this._connect(destination, outputNum, inputNum)

    /**
     * Disconnect this node from one if its connections.
     * If no destination is passed, all connections will be removed.
     * Optionally pass output and input channels.
     *
     * @example
     * const synth = new Dot.Synth(AC)
     * const reverb = new Dot.Reverb(AC)
     *
     * synth.connect(reverb) // Connect
     * synth.disconnect(reverb) // Disconnect
     *
     * @param {AudioParam | AudioNode | DotAudioNode | Array.<DotAudioNode|AudioParam|AudioNode>}
     *      destination - The input/destination to disconnect from
     * @param {Number} outputNum - Output channel to disconnect from
     * @param {Number} inputNum - Input channel to disconnect from
     * @returns {DotAudioNode} this
     */
    disconnect = (destination, outputNum, inputNum) => this._disconnect(destination, outputNum, inputNum)

    // --- Private Methods ---
    _connect = (destination, outputNum = 0, inputNum = 0) => {
        if (Array.isArray(destination)) {
            destination.forEach(dest => this.connect(dest))
        } else if (destination instanceof DotAudioNode) {
            if (!destination.getInputs()) {
                console.error('Cannot connect to a node with no inputs')
                return
            }

            const inputs = destination._getInputNodes()
            inputs.forEach((input) => {
                this.getOutputs().forEach(output => output.connect(input, outputNum, inputNum))
            })
        } else if (destination instanceof AudioNode) {
            this.getOutputs().forEach(output => output.connect(destination, outputNum, inputNum))
        } else if (destination instanceof AudioParam) {
            this.getOutputs().forEach(output => output.connect(destination))
        } else {
            console.error('Invalid destination type')
        }

        return this
    }
    _disconnect = (destination, outputNum = 0, inputNum = 0) => {
        if (Array.isArray(destination)) {
            destination.forEach(dest => this.disconnect(dest))
        } else if (destination instanceof DotAudioNode) {
            if (!destination.getInputs()) {
                console.error('Cannot disconnect from destination provided')
                return
            }

            const inputs = destination._getInputNodes()
            inputs.forEach((input) => {
                this.getOutputs().forEach(output => output.disconnect(input, outputNum, inputNum))
            })
        } else if (destination instanceof AudioNode) {
            this.getOutputs().forEach(output => output.disconnect(destination, outputNum, inputNum))
        } else {
            this.getOutputs().forEach(output => output.disconnect(destination))
        }

        return this
    }

    // Recursively go down to get the default audio nodes/params for all inputs
    _getInputNodes = () => (
        this.getInputs().reduce((nodes, input) => {
            if (input instanceof DotAudioNode) {
                nodes.push(...input._getInputNodes())
            } else {
                nodes.push(input)
            }
            return nodes
        }, [])
    )

    // - Update Methods -
    _update = (param, val) => param.setValueAtTime(val, this.AC.currentTime)
    _timeUpdate = (param, val, time = 0) => {
        time
            ? param.setTargetAtTime(val, this.AC.currentTime, time)
            : param.setValueAtTime(val, this.AC.currentTime)
    }
    _linearFadeUpdate = (aParam, bParam, val, time = 0) => {
        this._timeUpdate(aParam, 1 - val, time)
        this._timeUpdate(bParam, val, time)
    }
    _equalPowerFadeUpdate = (aParam, bParam, val, time = 0) => {
        this._timeUpdate(aParam, Math.cos(val * 0.5 * Math.PI), time)
        this._timeUpdate(bParam, Math.cos((1.0 - val) * 0.5 * Math.PI), time)
    }
    _dryWetUpdate = (dryParam, wetParam, val, time = 0) => {
        if (val < 0.5) {
            this._timeUpdate(dryParam, 1, time)
            this._timeUpdate(wetParam, val * 2, time)
        } else {
            this._timeUpdate(dryParam, 1 - ((val - 0.5) * 2), time)
            this._timeUpdate(wetParam, 1, time)
        }
    }
}

export default DotAudioNode