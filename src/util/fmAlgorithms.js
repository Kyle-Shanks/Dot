const disconnectAll = (arr) => arr.forEach(mod => mod.disconnect())

// Algorithms for FMSynth
const fmAlgorithms = [
    // - Standard Algorithms -
    // A > B > C > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParam('frequency'))
        b.connect(c.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return 'A > B > C > D => Out'
    },

    // [A + B] > C > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(c.getParam('frequency'))
        b.connect(c.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[A + B] > C > D => Out'
    },

    // [A > B + C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParam('frequency'))
        b.connect(d.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[A > B + C] > D => Out'
    },

    // [[A > B] + [A > C]] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([b.getParam('frequency'), c.getParam('frequency')])
        b.connect(d.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[[A > B] + [A > C]] > D => Out'
    },

    // [A > B > C] + [A > B > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParam('frequency'))
        b.connect([c.getParam('frequency'), d.getParam('frequency')])
        c.connect(out)
        d.connect(out)

        return '[A > B > C] + [A > B > D] => Out'
    },

    // [A > B > C] + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParam('frequency'))
        b.connect(c.getParam('frequency'))
        c.connect(out)
        d.connect(out)

        return '[A > B > C] + D => Out'
    },

    // [A + B + C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(d.getParam('frequency'))
        b.connect(d.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[A + B + C] > D => Out'
    },

    // [A > B] + [C > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParam('frequency'))
        b.connect(out)
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[A > B] + [C > D] => Out'
    },

    // [A > B] + [A > C] + [A > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([b.getParam('frequency'), c.getParam('frequency'), d.getParam('frequency')])
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > B] + [A > C] + [A > D] => Out'
    },

    // [A > B] + C + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect(b.getParam('frequency'))
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

        a.connect([a.getParam('frequency'), b.getParam('frequency')])
        b.connect(c.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[A > A] > B > C > D => Out'
    },

    // [[A > A] + B] > C > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([a.getParam('frequency'), c.getParam('frequency')])
        b.connect(c.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[[A > A] + B] > C > D => Out'
    },

    // [[A > A] + B > C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([a.getParam('frequency'), d.getParam('frequency')])
        b.connect(c.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[[A > A] + B > C] > D => Out'
    },

    // [[A > A] > B + C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([a.getParam('frequency'), b.getParam('frequency')])
        b.connect(d.getParam('frequency'))
        c.connect(d.getParam('frequency'))
        d.connect(out)

        return '[[A > A] > B + C] > D => Out'
    },

    // [A > A] > B + [C > C] > D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([a.getParam('frequency'), b.getParam('frequency')])
        b.connect(out)
        c.connect([c.getParam('frequency'), d.getParam('frequency')])
        d.connect(out)

        return '[A > A] > B + [C > C] > D => Out'
    },

    // [A > A > B] + [A > A > C] + [A > A > D] => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([
            a.getParam('frequency'),
            b.getParam('frequency'),
            c.getParam('frequency'),
            d.getParam('frequency'),
        ])
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > A > B] + [A > A > C] + [A > A > D] => Out'
    },

    // [A > A > B] + C + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([a.getParam('frequency'), b.getParam('frequency')])
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > A > B] + C + D => Out'
    },

    // [A > A] + B + C + D => Out
    (a, b, c, d, out) => {
        disconnectAll([a, b, c, d])

        a.connect([a.getParam('frequency'), out])
        b.connect(out)
        c.connect(out)
        d.connect(out)

        return '[A > A] + B + C + D => Out'
    },
]

export default fmAlgorithms
