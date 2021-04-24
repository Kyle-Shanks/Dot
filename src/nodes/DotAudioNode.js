class DotAudioNode {
    constructor(AC) {
        this.AC = AC
        this.name = 'Node'
    }

    // --- Public Methods ---
    // - Getters -
    getName = () => this.name
    getParams = () => this.params

    // - Util Methods -
    // Connect and disconnect shells to allow child nodes to add validation
    connect = (destination, outputNum, inputNum) => this._connect(destination, outputNum, inputNum)
    disconnect = (destination, outputNum, inputNum) => this._disconnect(destination, outputNum, inputNum)

    // --- Private Methods ---
    _connect = (destination, outputNum = 0, inputNum = 0) => {
        if (Array.isArray(destination)) {
            destination.forEach(dest => this.connect(dest))
        } else if (destination instanceof DotAudioNode) {
            if (!destination.hasOwnProperty('getInputs')) {
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
    }
    _disconnect = (destination, outputNum = 0, inputNum = 0) => {
        if (Array.isArray(destination)) {
            destination.forEach(dest => this.disconnect(dest))
        } else if (destination instanceof DotAudioNode) {
            if (!destination.hasOwnProperty('getInputs')) {
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
    _timeUpdate = (param, val, time = 0) => {
        time
            ? param.setTargetAtTime(val, this.AC.currentTime, time)
            : param.setValueAtTime(val, this.AC.currentTime)
    }
    _fadeUpdate = (aParam, bParam, val, time = 0) => {
        this._timeUpdate(aParam, 1 - val, time)
        this._timeUpdate(bParam, val, time)
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
