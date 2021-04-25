const disconnectAll = (arr) => arr.forEach(mod => mod.disconnect())

const fmAlgorithms = [
    // A > B > C > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        b.connect(c.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return 'A > B > C > D => Out'
    },

    // [A + B] > C > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(c.getParams().frequency)
        b.connect(c.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[A + B] > C > D => Out'
    },

    // [A > B + C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        b.connect(d.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[A > B + C] > D => Out'
    },

    // [[A > B] + [A > C]] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        a.connect(c.getParams().frequency)
        b.connect(d.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[[A > B] + [A > C]] > D => Out'
    },

    // [A > B > C] + [A > B > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        b.connect(c.getParams().frequency)
        b.connect(d.getParams().frequency)
        c.connect(out)
        d.connect(out)

        return '[A > B > C] + [A > B > D] => Out'
    },

    // [A > B > C] + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        b.connect(c.getParams().frequency)
        c.connect(out)
        d.connect(out)

        return '[A > B > C] + D => Out'
    },

    // [A + B + C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(d.getParams().frequency)
        b.connect(d.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[A + B + C] > D => Out'
    },

    // [A > B] + [C > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        b.connect(out)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[A > B] + [C > D] => Out'
    },

    // [A > B] + [A > C] + [A > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        a.connect(c.getParams().frequency)
        a.connect(d.getParams().frequency)
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > B] + [A > C] + [A > D] => Out'
    },

    // [A > B] + C + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParams().frequency)
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > B] + C + D => Out'
    },

    // A + B + C + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(out)
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return 'A + B + C + D => Out'
    },
]

export default fmAlgorithms
