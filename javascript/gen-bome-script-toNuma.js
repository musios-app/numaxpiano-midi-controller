import {
  ccZoneRotate,
  ccZonePress,
  ccFXAPress,
  ccFXARotate,
  ccFXAParam,
  ccFXBPress,
  ccFXBRotate,
  ccFXBParam,
  ccDelayRotate,
  ccDelayParam,
  ccReverbRotate,
  ccReverbParam
} from "./numaMidiMapping.js"


function single(label, retVar, arr, nextLabel) {

    return `
Label "${label}"

oo=0
  ${arr.map(cc => `if mn==${cc} then oo=1`).join("\n  ")}
if oo==0 then Goto "${nextLabel}"

Perform "Return CC", mc, mn, ${retVar}
Goto "End"

`    
}


function group(label, retVar, arr, nextLabel) {

    return `
Label "${label}"

oo=0
  ${arr.map(cc => `if mn==${cc} then oo=1`).join("\n  ")}
if oo==0 then Goto "${nextLabel}"

${arr.map(cc => `Perform "Return CC", mc, ${cc}, ${retVar}`).join("\n")}

goto "End"

`    
}


const valueMap = `
// Zone A-D Press values
// - From NumaX is 1 = On/Enable and 2 = Off/Disable
// - From proxy is 0 = Mute Off and 127 = Mute On
if mv>63 then mw=2
else mw=1

// FXA Press values
if mv>63 then mx=64
else mx=0

// FXB Press values
if mv>63 then my=8
else my=0

`

const passThru = `
Label "Pass-Thru"
Perform "Return CC", mc, mn, mv
`

const end = `
Label "End"
`

const bome = 
    valueMap
    + single("Zone Rotate", "mv", ccZoneRotate, "Zone Press")
    + single("Zone Press", "mw", ccZonePress, "FXA Rotate")

    + group("FXA Rotate", "mv", ccFXARotate, "FXA Press")
    + group("FXA Press", "mx", ccFXAPress, "FXA Param")
    + group("FXA Param", "mv", ccFXAParam, "FXB Rotate")

    + group("FXB Rotate", "mv", ccFXBRotate, "FXB Press")
    + group("FXB Press", "my", ccFXBPress, "FXB Param")
    + group("FXB Param", "mv", ccFXBParam, "Delay Rotate")

    + group("Delay Rotate", "mv", ccDelayRotate, "Delay Param")
    + group("Delay Param", "mv", ccDelayParam, "Reverb Rotate")

    + group("Reverb Rotate", "mv", ccReverbRotate, "Reverb Param")
    + group("Reverb Param", "mv", ccReverbParam, "Pass-Thru")

    + passThru
    + end

console.log(bome)
