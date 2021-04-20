class DotAudioNode {
    constructor(AC) {
        this.AC = AC
        this.name = 'Node'
    }

    // Getters
    getName = () => this.name
    getParams = () => this.params

    // Util Methods
    connect = (destination, outputNum = 0, inputNum = 0) => {
        if (destination instanceof DotAudioNode) {
            // Custom Node
            if (!destination.hasOwnProperty('getInputs')) {
                console.error('Cannot connect to a node with no inputs')
                return
            }

            const inputs = destination._getInputNodes()
            inputs.forEach((input) => {
                this.getOutputs().forEach(output => output.connect(input, outputNum, inputNum))
            })
        } else if (destination instanceof AudioNode || destination instanceof AudioParam) {
            // Default Audio Node/Param
            this.getOutputs().forEach(output => output.connect(destination, outputNum, inputNum))
        } else {
            console.error('Invalid destination type')
        }
    }

    disconnect = (destination, outputNum = 0, inputNum = 0) => {
        if (destination instanceof DotAudioNode) {
            // Custom Node
            if (!destination.hasOwnProperty('getInputs')) {
                console.error('Cannot disconnect from destination provided')
                return
            }

            const inputs = destination._getInputNodes()
            inputs.forEach((input) => {
                this.getOutputs().forEach(output => output.disconnect(input, outputNum, inputNum))
            })
        } else {
            // Default Audio Node/Param
            this.getOutputs().forEach(output => output.disconnect(destination, outputNum, inputNum))
        }
    }

    // --- Private Methods ---
    // Recursively go down to get the inputs' default audio nodes/params
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

    // Update Methods
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
