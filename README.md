---
layout: default
title: Mapper MIDI for Numa X Piano  Controller
description: Better way to use a Numa X Piano as a MIDI controller
gitrepo: https://github.com/musios-app/numaxpiano-midi-controller
tags: studiologic midi-controller numa-x-piano
icon: images/numa-x-icon.jpg
image: /projects/numaxpiano-midi-controller/images/og-numax-midi-controller-mapper.svg
---


<style>
    table th, table td {
        padding-left: 16px;
        padding-right: 16px;
    }

    .numa-cc-map tr {
        vertical-align: top;
    }
    .numa-cc-map td {
        text-align: center;
        border-top: solid 1px #d0d0d0;
    }
    .numa-cc-map td:first-child, .numa-cc-map td:nth-child(2) {
        text-align: left;
    }
    .numa-cc-map td:first-child:empty {
        border-top: none;
    }

    .numa-cc-map th:nth-child(3), .numa-cc-map th:nth-child(5), .numa-cc-map th:nth-child(7), .numa-cc-map th:nth-child(8),
    .numa-cc-map td:nth-child(3), .numa-cc-map td:nth-child(5), .numa-cc-map td:nth-child(7), .numa-cc-map td:nth-child(8)
     {
        border-right: solid 1px grey;
    }

    .numa-cc-map .badge-pill {
        font-size: 16px;
    }
</style>



# Numa X Piano with MIDI Controller Map


<div class="alert alert-danger" role="alert" style="font-size: 130%">
    WORK IN PROGRESS - I JUST NEED TIME 🕑
    <br/>
    THE ALGORITHM IS IMPLEMENTED AND DOCUMENTED BELOW
    <br/>
    THE IMPLEMENTATION IN BOME IS FUNCTIONAL BUT NOT PUBLISHED HERE YET
    <br/>
    THE IMPLEMENTATION IN NODE.JS IS FUNCTIONAL BUT NOT PUBLISHED HERE YET
    <br/>
    THIS PAGE IS A BIT OF A MESS!!
</div>


What Numa X Piano does in MIDI Controller mode:

* Many of the knobs send different CC numbers depending upon the zone selected (1-4) and/or the parameter number selected (1-3)
* Changing the zone, muting an instrument and other action will cause unexpected jumps in the knob value
* Causes headaches

The MIDI mapper on this page works on the principle that live performance needs predictable behaviour with tight synchronisation to the host's performance software. I use Gig Performance and expect it would apply to other tools.  The solution...

1. Numa X operating as a MIDI Controller
2. Mapping software between the piano and the performance tool that makes it look like each knob/button/action corresponds to a single MIDI CC number
3. The performance software and Numa X remain synchronised even with changes in songs and patches
4. It should work reliably and with minimal thought and attention when performing!

[If there's a computer issue I can quickly switch over to Numa's built-in sounds which are OK.]

Point 2 is the key. In controller mode, the Numa X knobs / buttons send different CC numbers depending upon the current Zone selection and the choice parameter select for FX A, FX B, delay and reverb.


## Basic Rig

<div class="image-wrapper row justify-content-center">
    <a href="images/basic-rig.webp" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="images/basic-rig.webp" class="img-fluid" alt="Basic rig equipment"/>
    </a>
    <figcaption class="figure-caption text-center">Fig 1: Basic Rig</figcaption>
</div>

The basic rig used for development and testing:

* Studiologic Numa X Piano 73 (73  keys) as a MIDI controller
* Sustain and expression pedals
* Mac running MacOS Sequoia 15.2 (Mac Mini M4 with 24gb memory, 2TB SSD)
* Gig Performer 5.x as the Performance Tool (variety of plugin instruments and effects)
* Studiologic Numa X Piano 73 (73  keys) also used as the USB audio device for output



## Enable MIDI Controller Mode

The "Local Control" settings puts the Numa X Piano into a MIDI Controller Mode. 
(There are other settings but they are not needed for the simplest setup.)

1. Click the gear button (⚙️) to open Numa's Global Settings
2. Turn "Local Control" to "OFF"

<div class="image-wrapper row justify-content-center w-25 ">
    <a href="images/numax-settings/Global Settings 1 of 5.jpeg" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="images/numax-settings/Global Settings 1 of 5.jpeg" class="img-fluid" alt="Global Setting for Local Control"/>
    </a>
    <figcaption class="figure-caption text-center">Fig 2: Global Setting for Local Control</figcaption>
</div>


## MIDI Controllers (knobs)

Most of the buttons and knobs on the control surface trigger MIDI events. I focussed on 2 of the 5 panels (short explanation below).


<div class="image-wrapper row justify-content-center">
    <a href="images/NUMA X 73 as MIDI Controller.svg" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="images/NUMA X 73 as MIDI Controller.svg" class="img-fluid" alt="Basic rig design"/>
    </a>
    <figcaption class="figure-caption text-center">Fig 3: MIDI Controller knobs and buttons</figcaption>
</div>


**Instrument Knobs**

These 4 knobs noramlly control the 4 layers of the current Program. They each have press and rotate capability. The press control is for enable / disable of each (i.e. mute / unmute). The rotate control normally sets the volume of each zone.

Note 1: for reasons that will become clear, these 4 knobs don't need mapping. It's useful to keep them in as a comparison for what we want to achieve from all the knobs.

Note 2: The Select / Zoom buttons below do not generate MIDI but we'll see below that they affect the MIDI generated by other controls.


**Effects Knobs (top 4)**

There a 8 knobs (2 rows of 4 knobs) that normally control the audio effects for the current Program and are labelled FX A, FX-B, Delay and Reverb.  Each has press and rotate capability but each sends different MIDI according to the current Zone with focus (4 zones means 4 different MIDI CC for each press and rotate control).

Note: the press to enable/disable Delay and Reverb has different MIDI CC behavior. Detail below.

For the "What I need" setup, we want a **single** MIDI CC number for both press and rotate on these 4 knobs effectively ignoring the Zone.

**Effects Parameters Knobs (bottom 4)**

For each of FX A, FX-B, Delay and Reverb there is a  parameter knob. Pressing these knobs does NOT send a MIDI CC value but instead changes the state of the knob on the Numa X to control the next of 3 parameters.

Rotating these 4 knobs send a MIDI CC. The CC number is different for each of the 4 Zones when selected AND different for each parameter. That's 12 different MIDI CC numbers - I want one.

**Assignable knob**

Rotating this knob sends MIDI CC but also changes the USB audio volume. These 2 controls can't be distinguished so I choose not to use the Assignable knob to avoid volume issues.


**Main dial and Sound Bank / Favourites**

These controls send MIDI message like Program Change (PC). Because of the risk of side effects, I don't use them for MIDI control.

**Other Controls**

We don't need to do anything with these because they are not affected by the state of the Numa X. I list them for completeness and because they need to be tested to ensure the mapper passes them through and doesn't break anything.

1. The piano keybed: note on/off, channel pressure
2. The modulation and XY controller (dedicated CC numbers)
3. The pedal and expression controllers (if connected)
4. MIDI IN


## The Problem

So I'm playing a song with a mix of rock organ and piano. I'm using plugins in Gig Performer to provide those sounds. I have the Zone 1 knob rotation controlling the volume of the organ and the Zone 1 press for mute/unmute.  It's the same for the piano except it's Zone 2. I have expression pedal and sustain pedal for drive and sustain.  

All is good as I play the organ.

But I'm also using FX A knob to control effects through Gig Performer. When Zone 1 is selected the Numa sends FX A rotation as MIDI CC 68 (x44).  I switch from organ to piano by pressing Zone 1 (to mute) and Zone 2 (to unmute).  Now, FX A rotation is sent as MIDI CC 73 (x49).  

Worse, it has a different value which causes my effects to go crazy.

Worse, when I switch songs or patches on the computer it sends a MIDI CC to 68 but that doesn't affevct 73, 78 or 83 which are CC numbers for Zone 2, 3 and 4.

Worse, if I use any of the FX parameter knob there are 12 different CC values which can all be different.

## The Solution - The MIDI Mapper

I've implemented the MIDI Mapper for Numa X Piano a few ways. The algorithm is the same for all.

1. **Node.js / Javascript**: Functional but had latency issues that affected the notes (but didn't matter for the controllers)
2. **[Bome MIDI Translator Pro](https://www.bome.com/products/miditranslator)**: paid software which a free trial. This is what I am using at time of writing
3. **MIDI Mapping in Gig Performer**: I could map messages coming from the keyboard to GP but the mapping of return messages was complex and messy. (I might try again another day.)



| # | Requirement | What the mapper does | Detail |
|-----------------|-----------------|-----------------|-----------------|
| 1    | The performance software will not need to deal with the Zones and Parameter variation. | Map all MIDI variations from a knob press or rotation to a single MIDI CC | I use the MIDI CC for Zone 1 & param 1 for consistency |
| 2    | Changes to a knob's value (press or rotate) will be updated for all zone & parameter variation of that same knob  | A change to press or rotation on a knob will be instantly be passed back for all Zone and Parameter variations of that same knob | - |
| 3    | MIDI CC from the performance software to the Numa must affect all variations   | A MIDI CC must be mapped to all zone and parameter variations at the same time   | - |


<div class="image-wrapper row justify-content-center">
    <a href="images/logical-architecture.svg" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="images/logical-architecture.svg" class="img-fluid" alt="Logical / Software Design"/>
    </a>
    <figcaption class="figure-caption text-center">Fig 4: Logical Design</figcaption>
</div>



## (my) MIDI Specification for NUMA X Piano in MIDI Controller Mode

This is not the official [Numa X MIDI specification](https://www.studiologic-music.com/support/numaxpiano/Numa_X_Piano_MIDI_implementation_chart.pdf).  We're interested in the subset of the Control Channel
in the section on "CC table Common Channel" starting from page 4 (it's not obviuos). 
The first 5 columns in the table below match the CC numbers from the 
[Numa X MIDI specification](https://www.studiologic-music.com/support/numaxpiano/Numa_X_Piano_MIDI_implementation_chart.pdf).


<table class="numa-cc-map" style="margin: 8px; border: solid 1px grey;">
    <thead>
        <tr>
            <th>Group</th>
            <th>Controller</th>
            <th>Action</th>
            <th>CC Number (Group)</th>
            <th>CC Value</th>
            <th>CC Number (Single)</th>
            <th>CC Value Map</th>
            <th>Note</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Assignable</td>
            <td>Assignable</td>
            <td>Rotate</td>
            <td>3</td>
            <td>0 - 127</td>
            <td>pass</td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>(a)</td>
        </tr>
        <!-- Instrument Knobs -->
        <tr>
            <td>Instrument Knobs</td>
            <td>Zone 1</td>
            <td>Rotate</td>
            <td>33</td>
            <td>0 - 127</td>
            <td>pass</td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Zone 2</td>
            <td>Rotate</td>
            <td>34</td>
            <td>0 - 127</td>
            <td>pass</td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Zone 3</td>
            <td>Rotate</td>
            <td>35</td>
            <td>0 - 127</td>
            <td>pass</td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Zone 4</td>
            <td>Rotate</td>
            <td>36</td>
            <td>0 - 127</td>
            <td>pass</td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Zone 1</td>
            <td>Press</td>
            <td>12</td>
            <td>Off=0 <br/>On=1 <br/> Mute=2</td>
            <td>pass</td>
            <td>On=127 <br/>Off/Mute=0 </td>
            <td>(b, c)</td>
        </tr>
        <tr>
            <td></td>
            <td>Zone 2</td>
            <td>Press</td>
            <td>13</td>
            <td>Off=0 <br/>On=1 <br/> Mute=2</td>
            <td>pass</td>
            <td>On=127 <br/>Off/Mute=0 </td>
            <td>(b, c)</td>
        </tr>
        <tr>
            <td></td>
            <td>Zone 3</td>
            <td>Press</td>
            <td>14</td>
            <td>Off=0 <br/>On=1 <br/> Mute=2</td>
            <td>pass</td>
            <td>On=127 <br/>Off/Mute=0 </td>
            <td>(b, c)</td>
        </tr>
        <tr>
            <td></td>
            <td>Zone 4</td>
            <td>Press</td>
            <td>15</td>
            <td>Off=0 <br/>On=1 <br/> Mute=2</td>
            <td>pass</td>
            <td>On=127 <br/>Off/Mute=0 </td>
            <td>(b, c)</td>
        </tr>
        <!-- FX Knobs (top row) -->
        <tr>
            <td>FX Knobs (top row)</td>
            <td>FX A</td>
            <td>Rotate</td>
            <td><span class="badge badge-pill badge-success">68</span>, 73, 78, 83</td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">68</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>FX B</td>
            <td>Rotate</td>
            <td><span class="badge badge-pill badge-success">100</span>, 105, 110, 115</td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">100</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Delay</td>
            <td>Rotate</td>
            <td><span class="badge badge-pill badge-success">24</span>, 25, 26, 27</td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">24</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Reverb</td>
            <td>Rotate</td>
            <td><span class="badge badge-pill badge-success">28</span>, 29, 30, 31</td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">28</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>FX A</td>
            <td>Press</td>
            <td><span class="badge badge-pill badge-success">69</span>, 74, 79, 84</td>
            <td>On > 0 <br/> Off=0 </td>
            <td><span class="badge badge-pill badge-success">69</span></td>
            <td>On=127<br/>Off=0</td>
            <td>(d)</td>
        </tr>
        <tr>
            <td></td>
            <td>FX B</td>
            <td>Press</td>
            <td><span class="badge badge-pill badge-success">101</span>, 106, 111, 116</td>
            <td>On > 0 <br/> Off=0</td>
            <td><span class="badge badge-pill badge-success">101</span></td>
            <td>On=127<br/>Off=0</td>
            <td>(d)</td>
        </tr>
        <tr>
            <td></td>
            <td>Delay</td>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>(a)</td>
        </tr>
        <tr>
            <td></td>
            <td>Reverb</td>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>(a)</td>
        </tr>
        <!-- FX Knobs (parameter row) -->
        <tr>
            <td>FX Knobs (parameter row)</td>
            <td>FX A Param</td>
            <td>Rotate</td>
            <td>
                <span class="badge badge-pill badge-success">70</span>, 75, 80, 85, <br/>
                71, 76, 81, 86, <br/>
                72, 77, 82, 87
            </td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">70</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>FX B</td>
            <td>Rotate</td>
            <td>
                <span class="badge badge-pill badge-success">102</span>, 107, 112, 117, <br/>
                103, 108, 113, 118, <br/>
                104, 109, 114, 119
            </td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">102</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Delay</td>
            <td>Rotate</td>
            <td><span class="badge badge-pill badge-success">57</span>, 58, 59</td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">57</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Reverb</td>
            <td>Rotate</td>
            <td><span class="badge badge-pill badge-success">61</span>, 62, 63</td>
            <td>0 - 127</td>
            <td><span class="badge badge-pill badge-success">61</span></td>
            <td>pass</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>FX A</td>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>(a)</td>
        </tr>
        <tr>
            <td></td>
            <td>FX B</td>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>(a)</td>
        </tr>
        <tr>
            <td></td>
            <td>Delay</td>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>(a)</td>
        </tr>
        <tr>
            <td></td>
            <td>Reverb</td>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>(a)</td>
        </tr>
    </tbody>
</table>

**Table Notes**

(a) No MIDI CC message for pressing this knob.

(b) Most MIDI on/off values are On=127 (or >= 64) and Off=0 (or <64) but Numa X does On=1 and Off=2. If, however, you are mapping to a mute or bypass contoller in the performance tool then the value needs to be inverted. For CC messages back to the Numa X the CC values must be exactly 2 or 1.

(c) Long press sets the zone to solo (value=2) with the other zones off (value=1). That's 4 MIDI control messages in quick sequence.

(d) TODO - I need to confirm that the interpretation should be Off=0 and On>0 where the value is the current setting for the FX (e.g. FX A Overdrive=49). In MIDI Controller mode we need On=127 and Off=0.



### MIDI Mapping for messages from Numa X

This sequence shows the MIDI messages fired by the Mapper in response to a CC event from Numa X.

1. Receive a MIDI message
2. If it is a CC message in one of the groups from table then
   1. Send forward a CC message as-if the Numa X had Zone 1 selected and Parameter 1 for all effects (first in group by design)
      1. CC channel unchanged
      2. CC number is the first CC number in the group
      3. See below for the CC value (usually unchanged)
   2. For each CC number in the group (except the CC number received) send a CC message back to the Numa X with
      1. CC channel unchanged
      2. CC number from the group (except the CC number received)
      3. CC valie unchanged
3. Otherwise, for all other MIDI messages (including CC numbers not shown in the table) pass them forward without change.

<div class="image-wrapper row justify-content-center">
    <a href="images/sequence-diagram-from-numax.svg" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="images/sequence-diagram-from-numax.svg"/>
    </a>
    <figcaption class="figure-caption text-center">Fig 5: Sequence Diagram for MIDI Messages from Numa X Piano</figcaption>
</div>


## MIDI Mapping for messages from Performance Tool

1. Receive a MIDI message
2. If it is a CC message in one of the groups from table then for every CC number in the group send a CC message to the Numa X with:
   1. CC channel unchanged
   2. CC number from the group
   3. CC valie unchanged
3. Otherwise, for all other MIDI messages (including CC numbers not shown in the table) pass them on without change.

<div class="image-wrapper row justify-content-center">
    <a href="images/sequence-diagram-from-performance-tool.svg" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="images/sequence-diagram-from-performance-tool.svg"/>
    </a>
    <figcaption class="figure-caption text-center">Fig 6: Sequence Diagram for MIDI Messages from the Performance Tool</figcaption>
</div>



### Example for FX B Rotation

Say the player turns the FX B Effects level knob...

<div class="image-wrapper row justify-content-center">
    <a href="images/sequence-diagram-FXB.svg" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="images/sequence-diagram-FXB.svg"/>
    </a>
    <figcaption class="figure-caption text-center">Fig 5: MIDI Messages for FX B rotation</figcaption>
</div>


If the piano has Zone 1 selected, the Numa X will send MIDI CC number 100 (x64). For Zones 2, 3, 4 the MIDI numbers are 105, 110, 115.  We need the mapper to 

1. Receive the MIDI CC as 100, 105, 110 or 115 with its value
2. Send forward that CC value to the performance tool as CC number 100 (x64)
3. And, send back the value as the other 3 CC numbers from 100, 105, 110 and 115 so that the knob has the same value across all Zones (in case the player changes Zone)


## Implementation with BOME MIDI Translator Pro

The [Bome MIDI Translator Pro](https://www.bome.com/products/miditranslator) is a paid product. I am using it because it is built for this kind of MIDI mapping
and performs with low latency.




## Implementation with NodeJS / JavaScript

<div class="alert alert-danger" role="alert">
    NOTE: This implementation is functional but has noticeable latency on pass-through of MIDI messages making playing keys. 
</div>

A rough measurement with MIDI Monitor showed delays around 20msec (unsatisfactory is above 2-5msaec).
It might be possible to interface directly to the Node Task Queue to reduce that latency
A task queue is a mechanism that helps in organizing and executing tasks in a prioritized manner. 
The `process.nextTick()` could prioritize sending of MIDI messages. This matters most of NoteOn/NoteOff messages but maintain




Notes: 
* This is a work in progress. The Studiologic doc is sparse so there may be errors. Please submit comments in [issues page on the Github project](https://github.com/andrewjhunt/numaxpiano-midi-controller).
* The documentation and images is from a NUMA X Piano 73. It is likely that the 88 and 88 HD will be similar but this needs to be confirmed. Unfortunately, I have no idea about the Compact series. Use the issues or submit a pull request if you can help.
* This work was done on a Mac. It shouldn't be that different for Windows or Linux.


## Numa X Docs

All the relevant Numa X documentation that I could find is on the **[Numa X Piano support page](https://www.studiologic-music.com/support/numaxpiano/)** including:

* [User Manual for Numa X Piano](https://www.studiologic-music.com/support/numaxpiano/Numa_X_Piano_Manual_EN.pdf)
* [numaXPiano MIDI Chart](https://www.studiologic-music.com/support/numaxpiano/Numa_X_Piano_MIDI_implementation_chart.pdf)




## Set up NUMA X Piano as MIDI Controller

### Program Zones

Create a Program on the keyboard to use when NUMA X Piano is in MIDI controller mode. 
This is just one example with minimal capability.

* Zone 1: MIDI USB
* Zone 2: Off
* Zone 3: Off
* Zone 4: Off

(Aside: I use program 1 for quick and reliable setup for live gigs. Program 2, 3 etc. are standard sounds just in case there's a computer failure. These are an EP, piano, rock organ, strings and so on.)

<img src="images/numax-settings/MIDI-controller-program.jpg" style="width: 200px" style="width: 200px"/>


### Program settings for Zone 1

Ensure that "Zone Status" is "On" for Zone 1.  All other settings can be modified to your preference.

Keep a record of the CC numbers for Knobs 1-4. The MIDI receiver (e.g. Gig Performer) will need to match these.

Note: we don't need to update settings for Zones 2-4 as they are disabled.

<img src="images/numax-settings/Zone 1 setting 1-4.jpg" style="width: 200px" style="width: 200px"/>
<img src="images/numax-settings/Zone 1 setting 2-4.jpg" style="width: 200px" style="width: 200px"/>

<img src="images/numax-settings/Zone 1 setting 3-4.jpg" style="width: 200px" style="width: 200px"/>
<img src="images/numax-settings/Zone 1 setting 4-4.jpg" style="width: 200px" style="width: 200px"/>


### Save the Program

Click the tick button (✔️) to save the program.


## MIDI Controller Mode


## Zone selections

Finally, ensure that Zone 1 is enabled and that the button below is lit.

<img src="images/numax-settings/Zone selections.jpg" style="width: 200px"/>

## Global Settings

Click the gear button (⚙️) to open the Global Settings. 

Required setting:

* Local Control: OFF (this means that NUMA sends MIDI messages but does not play its internal sounds)

**Your NUMA X Piano should now be acting as a MIDI controller!**

<img src="images/numax-settings/Global Settings 1 of 5.jpeg" style="width: 200px"/>
<img src="images/numax-settings/Global Settings 2 of 5.jpeg" style="width: 200px"/>

<img src="images/numax-settings/Global Settings 3 of 5.jpeg" style="width: 200px"/>
<img src="images/numax-settings/Global Settings 4 of 5.jpeg" style="width: 200px"/>

<img src="images/numax-settings/Global Settings 5 of 5.jpeg" style="width: 200px"/>


## Verifying MIDI Messages

Install a MIDI monitor on your computer to verify that the NUMA X Piano is sending MIDI messages.

For Mac, I use [MIDI Monitor](https://www.snoize.com/MIDIMonitor/). There are many alternatives.

First, verify connectivity by playing some notes on the keyboard. You should see Note On/Off MIDI messages in the monitor. If not, check your cabling and MIDI settings.

Now, turn the Zone 1 knob. You should see CC messages in the monitor. Specifically, the CC number should match the Knob 1 CC setting in the Program settings for Zone 1 (it's CC 22 in the image above).  If not, check that the configuration is completed.



## Long-story-short

Long-story-short, I have found the Studiologic Numa X Piano to be difficult to use 
live as a MIDI controller. 
This project does MIDI mapping of the knobs and buttons so that they function consistently. 
The implementation described uses Bome MIDI Translator Pro for the mapping and Gig Performer 
as the live environment on a Mac. The approach can be adapted to other environments.

With this solution I'm now happy with the Numa X Piano as a MIDI controller, 
the interface of the Numa (knobs, color etc) work really well, I can drive my rig 
from Gig Performer (my preference).  I now have the benefits of the excellent 
Studiologic/Fatah keyboard and the Numa X sounds as a backup in case of computer issues. 

## The Issue

The Numa X Piano has a delightful interface with the colours, modes and all that. 
The keybed is excellent. The build quality is tough. It's sounds a good but not with 
the coverage I need for my gigs. When I bought the Numa X Piano 73 my intent was 
always to use the Numa as a MIDI controller and use the built in sounds as a backup.

But... I found that it is not a good MIDI controller. Most frustrating is that most 
of the knobs behave differently depending upon which Zones is active. The effect is 
that muting / unmuting an instrument changes the CC behaviour of nearly all the knobs!  
For example: when the FXA knob is rotated when Zone 1 is active, the Numa sends MIDI CC 33. 
But if Zone 2 is active, it is MIDI CC 34 (or 35, 36 for Zone 3 and 4 respectively). 

