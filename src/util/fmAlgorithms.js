const disconnectAll = (arr) => arr.forEach(mod => mod.disconnect())

const fmAlgorithms = [
    // - Standard Algorithms -
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

    // - Feedback Algorithms -
    // [A > A] > B > C > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(b.getParams().frequency)
        b.connect(c.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[A > A] > B > C > D => Out'
    },

    // [[A > A] + B] > C > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(c.getParams().frequency)
        b.connect(c.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[[A > A] + B] > C > D => Out'
    },

    // [[A > A] + B > C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(d.getParams().frequency)
        b.connect(c.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[[A > A] + B > C] > D => Out'
    },

    // [[A > A] > B + C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(b.getParams().frequency)
        b.connect(d.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[[A > A] > B + C] > D => Out'
    },

    // [A > A] > B + [C > C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(b.getParams().frequency)
        b.connect(out)
        c.connect(c.getParams().frequency)
        c.connect(d.getParams().frequency)
        d.connect(out)

        return '[A > A] > B + [C > C] > D => Out'
    },

    // [A > A > B] + [A > A > C] + [A > A > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(b.getParams().frequency)
        a.connect(c.getParams().frequency)
        a.connect(d.getParams().frequency)
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > A > B] + [A > A > C] + [A > A > D] => Out'
    },

    // [A > A > B] + C + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(b.getParams().frequency)
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > A > B] + C + D => Out'
    },

    // [A > A] + B + C + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(a.getParams().frequency)
        a.connect(out)
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > A] + B + C + D => Out'
    },
]

export default fmAlgorithms
