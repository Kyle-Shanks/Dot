// - Nodes -
// Components
import Envelope from 'nodes/components/Envelope'
import FilterEnvelope from 'nodes/components/FilterEnvelope'
import GainEnvelope from 'nodes/components/GainEnvelope'
// Core
import ChannelMerger from 'nodes/core/ChannelMerger'
import ChannelSplitter from 'nodes/core/ChannelSplitter'
import Compressor from 'nodes/core/Compressor'
import Convolver from 'nodes/core/Convolver'
import Delay from 'nodes/core/Delay'
import Filter from 'nodes/core/Filter'
import Gain from 'nodes/core/Gain'
import StereoPanner from 'nodes/core/StereoPanner'
import WaveShaper from 'nodes/core/WaveShaper'
// Dynamics
import Limiter from 'nodes/dynamics/Limiter'
// Effects
import Chorus from 'nodes/effects/Chorus'
import Distortion from 'nodes/effects/Distortion'
import EQ2 from 'nodes/effects/EQ2'
import FeedbackDelay from 'nodes/effects/FeedbackDelay'
import Flanger from 'nodes/effects/Flanger'
import PingPongDelay from 'nodes/effects/PingPongDelay'
import Reverb from 'nodes/effects/Reverb'
// Instruments
import FMSynth from 'nodes/instruments/FMSynth'
import MonoSynth from 'nodes/instruments/MonoSynth'
import Osc from 'nodes/instruments/Osc'
import PolySynth from 'nodes/instruments/PolySynth'
import SimpleFMSynth from 'nodes/instruments/SimpleFMSynth'
import Synth from 'nodes/instruments/Synth'
// Sources
import BufferSource from 'nodes/sources/BufferSource'
import ConstantSource from 'nodes/sources/ConstantSource'
import LFO from 'nodes/sources/LFO'
import NoiseGenerator from 'nodes/sources/NoiseGenerator'
import Oscillator from 'nodes/sources/Oscillator'
import SignalGenerator from 'nodes/sources/SignalGenerator'

// - Util -
import { getNoteFrequency } from 'src/util/util'

const Dot = {
    Envelope,
    FilterEnvelope,
    GainEnvelope,
    ChannelMerger,
    ChannelSplitter,
    Compressor,
    Convolver,
    Delay,
    Filter,
    Gain,
    StereoPanner,
    WaveShaper,
    Limiter,
    Chorus,
    Distortion,
    EQ2,
    FeedbackDelay,
    Flanger,
    PingPongDelay,
    Reverb,
    FMSynth,
    MonoSynth,
    Osc,
    PolySynth,
    SimpleFMSynth,
    Synth,
    BufferSource,
    ConstantSource,
    LFO,
    NoiseGenerator,
    Oscillator,
    SignalGenerator,
}

export default Dot

export {
    getNoteFrequency,
}
