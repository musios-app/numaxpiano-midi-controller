// ----------------------------------------------------------
// Configuration: Edit these values to match your environment

// Insert your MIDI device name here
// This was developed with a Studiologic Numa X Piano 73
const midiDeviceName = "XPIANO73"
const midiChannel = 1

// Name to use within GP (e.g. "Lower Keys")
// Number is internal and just needs to be unique
const gpDeviceName = "NumaXPiano"
const gpDeviceNumber = 1

// Name to use in the Rig Manager
const gpRigName = "Numa X Piano as Controller"

// ----------------------------------------------------------



// Note: Joystick X is Pitch Control which is NOT a CC
const numaCcToControlName = {
    0: "Bank Select MSB",
    1: "Modulation (Stick 2 X)",
    2: "Joystick X (Stick 1 X)",
    3: "Assignable",
    4: "Foot Controller (MSB)",
    // 5-6 - N/A
    7: "Master Volume",
    9: "Split On/Off",
    // 10 - N/A
    11: "Expression Pedal",

    // 12-15 - see Instrument / Audio Panel below

    16: "Zone 1 Sound Banks",
    17: "Zone 2 Sound Banks",
    18: "Zone 3 Sound Banks",
    19: "Zone 4 Sound Banks",

    20: "Zone 1 Sounds",
    21: "Zone 2 Sounds",
    22: "Zone 3 Sounds",
    23: "Zone 4 Sounds",

    // 24-27 - see Master Delay Controls below
    // 28-31 - see Master Reverb Controls below

    32: "Program Bank LSB",

    // 33-36 - see Instrument / Audio Panel below
    // 37-39 - N/A

    40: "Zoom Zone 1 - Encoder 1",
    41: "Zoom Zone 1 - Encoder 2",
    42: "Zoom Zone 1 - Encoder 3",
    43: "Zoom Zone 1 - Encoder 4",

    44: "Zoom Zone 2 - Encoder 1",
    45: "Zoom Zone 2 - Encoder 2",
    46: "Zoom Zone 2 - Encoder 3",
    47: "Zoom Zone 2 - Encoder 4",

    48: "Zoom Zone 3 - Encoder 1",
    49: "Zoom Zone 3 - Encoder 2",
    50: "Zoom Zone 3 - Encoder 3",
    51: "Zoom Zone 3 - Encoder 4",

    52: "Zoom Zone 4 - Encoder 1",
    53: "Zoom Zone 4 - Encoder 2",
    54: "Zoom Zone 4 - Encoder 3",
    55: "Zoom Zone 4 - Encoder 4",

    56: "Delay Type",
    // 57-59: see below
    60: "Reverb Type",
    // 61-63: see below

    64: "Sustain (Pedal 1)",
    // 65 - N/A
    66: "Sostenuto",
    67: "Soft Pedal",

    // 68-87: see FXA Controls below

    // 88-99 - N/A

    // 100-119: see FXB Controls below

    120: "All Sound Off",
    121: "Reset All Controllers",
    122: "Local Control On/Off",
    123: "All Notes Off",

    // 124-127 - N/A

    // ------------------------
    // Instrument / Audio Panel
    // ------------------------

    // These controls send the same MIDI CC number across all 4 zones

    33: "Zone1_Rotate",
    34: "Zone2_Rotate",
    35: "Zone3_Rotate",
    36: "Zone4_Rotate",

    12: "Zone1_Press",        // value 1=active, 2=inactive
    13: "Zone2_Press",
    14: "Zone3_Press",
    15: "Zone4_Press",


    // ------------------------
    // FXA Controls
    // ------------------------

    // Sends different contols depending upon which of the 4 zones is enabled
    68: "Zone1_FXA_Rotate",         // zone 1  - values 0 - 127
    73: "Zone2_FXA_Rotate",         // zone 2  - values 0 - 127
    78: "Zone3_FXA_Rotate",         // zone 3  - values 0 - 127
    83: "Zone4_FXA_Rotate",         // zone 4  - values 0 - 127

    69: "Zone1_FXA_Press",          // zone 1  - values 0 or 64
    74: "Zone2_FXA_Press",          // zone 2  - values 0 or 64
    79: "Zone3_FXA_Press",          // zone 3  - values 0 or 64
    84: "Zone4_FXA_Press",          // zone 4  - values 0 or 48

    // Press the param button to switch between the 3 parameters
    // Note: this press does not generate any MIDI
    70: "Zone1_FXA_Param1_Rotate",       // zone 1  - values 0 - 127
    75: "Zone2_FXA_Param1_Rotate",       // zone 2  - values 0 - 127
    80: "Zone3_FXA_Param1_Rotate",       // zone 3  - values 0 - 127
    85: "Zone4_FXA_Param1_Rotate",       // zone 4  - values 0 - 127

    71: "Zone1_FXA_Param2_Rotate",       // zone 1  - values 0 - 127
    76: "Zone2_FXA_Param2_Rotate",       // zone 2  - values 0 - 127
    81: "Zone3_FXA_Param2_Rotate",       // zone 3  - values 0 - 127
    86: "Zone4_FXA_Param2_Rotate",       // zone 4  - values 0 - 127

    72: "Zone1_FXA_Param3_Rotate",       // zone 1  - values 0 - 127
    77: "Zone2_FXA_Param3_Rotate",       // zone 2  - values 0 - 127
    82: "Zone3_FXA_Param3_Rotate",       // zone 3  - values 0 - 127
    87: "Zone4_FXA_Param3_Rotate",       // zone 4  - values 0 - 127


    // ------------------------
    // FXB Controls
    // ------------------------

    // Sends different contols depending upon which of the 4 zones is enabled
    100: "Zone1_FXB_Rotate",         // zone 1  - values 0 - 127
    105: "Zone2_FXB_Rotate",         // zone 2  - values 0 - 127
    110: "Zone3_FXB_Rotate",         // zone 3  - values 0 - 127
    115: "Zone4_FXB_Rotate",         // zone 4  - values 0 - 127

    101: "Zone1_FXB_Press",          // zone 1  - values 0 or FX B selection
    106: "Zone2_FXB_Press",          // zone 2  - values 0 or FX B selection
    111: "Zone3_FXB_Press",          // zone 3  - values 0 or FX B selection
    116: "Zone4_FXB_Press",          // zone 4  - values 0 or FX B selection

    // Press the param button to switch between the 3 parameters
    // Note: this press does not generate any MIDI
    102: "Zone1_FXB_Param1_Rotate",       // zone 1  - values 0 - 127
    107: "Zone2_FXB_Param1_Rotate",       // zone 2  - values 0 - 127
    112: "Zone3_FXB_Param1_Rotate",       // zone 3  - values 0 - 127
    117: "Zone4_FXB_Param1_Rotate",       // zone 4  - values 0 - 127

    103: "Zone1_FXB_Param2_Rotate",       // zone 1  - values 0 - 127
    108: "Zone2_FXB_Param2_Rotate",       // zone 2  - values 0 - 127
    113: "Zone3_FXB_Param2_Rotate",       // zone 3  - values 0 - 127
    118: "Zone4_FXB_Param2_Rotate",       // zone 4  - values 0 - 127

    104: "Zone1_FXB_Param3_Rotate",       // zone 1  - values 0 - 127
    109: "Zone2_FXB_Param3_Rotate",       // zone 2  - values 0 - 127
    114: "Zone3_FXB_Param3_Rotate",       // zone 3  - values 0 - 127
    119: "Zone4_FXB_Param3_Rotate",       // zone 4  - values 0 - 127


    // ------------------------
    // Master Delay Controls
    // ------------------------

    // Delay_Rotate and Delay_Press send the SAME MIDI CC number
    // When Delay_Press is enabled, operates as a rotate from 0-127
    // - If enabled then send the current value from 0-127
    // - If disabled then send 0
    // Notes:
    // 1. Because rotate and disable can both deliver 0, it doesn't have clear enable/disable state
    // 2. Rotation while disabled updates the internal value (but sends 1)

    24: "Zone1_Delay_Rotate",      // zone 1  - values 0 - 127  (enabled) always 0 when disabled
    25: "Zone2_Delay_Rotate",      // zone 2  - values 0 - 127  (enabled) always 0 when disabled
    26: "Zone3_Delay_Rotate",      // zone 3  - values 0 - 127  (enabled) always 0 when disabled
    27: "Zone4_Delay_Rotate",      // zone 4  - values 0 - 127  (enabled) always 0 when disabled

    // P1, P2, P3 send the same MIDI CC number for any zone
    // Press the param button to switch between the 3 parameters
    // Note: press does not generate any MIDI

    57: "Delay_Param1_Rotate",     // zones 1-4  - values 0 - 127
    58: "Delay_Param2_Rotate",     // zones 1-4  - values 0 - 127
    59: "Delay_Param3_Rotate",     // zones 1-4  - values 0 - 127


    // ------------------------
    // Master Delay Controls
    // ------------------------

    // Same behaviour for Reverb_Rotate/Press as for Delay_Rotate/Press

    28: "Zone1_Reverb_Rotate",      // zone 1  - values 0 - 127  (enabled) always 0 when disabled
    29: "Zone2_Reverb_Rotate",      // zone 2  - values 0 - 127  (enabled) always 0 when disabled
    30: "Zone3_Reverb_Rotate",      // zone 3  - values 0 - 127  (enabled) always 0 when disabled
    31: "Zone4_Reverb_Rotate",      // zone 4  - values 0 - 127  (enabled) always 0 when disabled

    // P1, P2, P3 send the same MIDI CC number for any zone
    // Press the param button to switch between the 3 parameters
    // Note: press does not generate any MIDI

    61: "Reverb_Param1_Rotate",     // zones 1-4  - values 0 - 127
    62: "Reverb_Param2_Rotate",     // zones 1-4  - values 0 - 127
    63: "Reverb_Param3_Rotate",     // zones 1-4  - values 0 - 127
}




// Build the Rig Setup XML from the bottom up

let uid = 50
let CONTROL_XML = ""
let RIG_ITEMS_XML = ""

Object.keys(numaCcToControlName).forEach(cc => {
    CONTROL_XML += `
        <CONTROL uid="${uid}" data="${numaCcToControlName[cc]}"/>
    `

    RIG_ITEMS_XML += `
        <RIG_ITEM 
            type="2"
            nameUid="${uid}"
            midiDevice="${midiDeviceName}"
            midiMessage="${midiDeviceName} : Controller ${cc}, Channel ${midiChannel}"
            midiData="${cc * 256 + 176 /* MIDI message xBO = 176 */ }"    
            controlMode="0" 
            respondsToMidiClock="0" 
            rigItemPolarityOption="0"
            rigItemRechannelizeValue="0"/>
    `

    uid++
})


const RIG_ITEM_XML = `
    <RIG_ITEM 
        type="1" 
        nameUid="${gpDeviceNumber}" 
        midiDevice="${midiDeviceName}" 
        midiMessage="" 
        midiData="0"
        controlMode="0" 
        respondsToMidiClock="0" 
        rigItemPolarityOption="0"
        rigItemRechannelizeValue="0"
    />
`



const RIG_SETUP_XML = `
    <?xml version="1.0" encoding="UTF-8"?>

    <!-- Gig Performance Rig Manager config for Numa X Piano -->
    <RIG_SETUP rigmanagerversion="2.0" currentRig="0">

        <DEVICE uid="${gpDeviceNumber}" data="${gpDeviceName}"/>

        ${CONTROL_XML}

        <RIG name="${gpRigName}">

            <DEVICE>
                ${RIG_ITEM_XML}
            </DEVICE>

            <CONTROL>
                ${RIG_ITEMS_XML}
            </CONTROL>

            <MIDIOUTLIST>
                <MIDIOUT in="${midiDeviceName}" out=""/>
            </MIDIOUTLIST>

        </RIG>
    </RIG_SETUP>
`

const FULL_XML =
`    <RIG_SETUP rigmanagerversion="2.0" currentRig="1">
        <DEVICE uid="${gpDeviceNumber}" data="${gpDeviceName}"/>

        ${CONTROL_XML}
    
        <RIG name="${gpRigName}">
            <DEVICE>
                ${RIG_ITEM_XML}
            </DEVICE>

            <CONTROL>
                ${RIG_ITEMS_XML}
            </CONTROL>

            <MIDIOUTLIST>
                <MIDIOUT in="${midiDeviceName}" out=""/>
            </MIDIOUTLIST>
        </RIG>
    </RIG_SETUP>
`

const doc = xmlbuilder2.create(RIG_SETUP_XML)
const xml = doc.end({ prettyPrint: true })

console.log("\n\n")
console.log(xml)
console.log("\n\n")
