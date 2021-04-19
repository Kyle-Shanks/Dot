class Node {
    constructor(AC) {
        this.AC = AC
        this.name = 'Node'
    }

    // Getters
    getParams = () => this.params

    // Util Methods
    connect = (destination) => {
        // Default audio nodes
        if (!destination.hasOwnProperty('getInputs')) {
            this.getOutputs().forEach(output => output.connect(destination))
            return
        }

        // Custom Nodes
        const inputs = destination.getInputs()
        inputs.forEach((input) => {
            this.getOutputs().forEach(output => output.connect(input))
        })
    }

    disconnect = (destination) => {
        // Default audio nodes
        if (!destination.hasOwnProperty('getInputs')) {
            this.getOutputs().forEach(output => output.disconnect(destination))
            return
        }

        // Custom Nodes
        const inputs = destination.getInputs()
        inputs.forEach((input) => {
            this.getOutputs().forEach(output => output.disconnect(input))
        })
    }

    // Private Methods
    _timeUpdate = (param, val, time = 0) => {
        time
            ? param.setTargetAtTime(val, this.AC.currentTime, time)
            : param.setValueAtTime(val, this.AC.currentTime)
    }

    _wetDryUpdate = (val, dryParam, wetParam) => {
        if (val < 0.5) {
            dryParam.setValueAtTime(1, this.AC.currentTime)
            wetParam.setValueAtTime(val * 2, this.AC.currentTime)
        } else {
            dryParam.setValueAtTime(1 - ((val - 0.5) * 2), this.AC.currentTime)
            wetParam.setValueAtTime(1, this.AC.currentTime)
        }
    }
}

export default Node
