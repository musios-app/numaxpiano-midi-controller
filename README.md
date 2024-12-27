---
layout: default
title: Numa X Piano as MIDI Controller
description: Set up a Numa X Piano as a MIDI controller for live performances (and avoid some of it's quirks)
gitrepo: https://github.com/musios-app/numaxpiano-midi-controller
tags: studiologic midi-controller numa-x-piano
image: images/numa-x-icon.jpg
---

# Studiologic Numa X Piano as MIDI Controller

Long-story-short, I find the MIDI controller mode of the Studiologic Numa X Piano to be difficult to use live. This project does MIDI mapping of the knobs and buttons so that they function consistently. The implementation described uses Bome MIDI Translator Pro for the mapping and Gig Performer as the live environment on a Mac. The approach can be adapted to other environments.

## The Issue

The Numa X Piano has a delightful interface with the colours, modes and all that. However, most of the knbos behave differently when different Zones are selected or when adjusting different parameters.  The effect is that muting / unmuting an instrument changes the CC behaviour of nearly all the knobs! 

For example: when the FXA knob is rotated when Zone 1 is active, the Numa sends MIDI CC 33. But if Zone 2 is active, it is MIDI CC 34 (or 35, 36 for Zone 3 and 4 respectively).

It's worst when the performance software (e.g. Gig Performer) is making changes to those settings during a song or on song change. This can lead to unexpected jumps in volume, reverb and other controls.

## The Solution

Introduce a mapping "proxy" between the XXX


Notes: 
* This is a work in progress. The Studiologic doc is sparse so there may be errors. Please submit comments in [issues page on the Github project](https://github.com/andrewjhunt/numaxpiano-midi-controller).
* The documentation and images is from a NUMA X Piano 73. It is likely that the 88 and 88 HD will be similar but this needs to be confirmed. Unfortunately, I have no idea about the Compact series. Use the issues or submit a pull request if you can help.
* This work was done on a Mac. It shouldn't be that different for Windows or Linux.


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



## Surface Controls as a MIDI Controller

Not all the buttons and knobs on the NUMA X Piano are available as MIDI controllers.

<div>
    <img src="images/surface-controls/Surface controls - no MIDI.png"/>
    <div style="font-style: italic">Surface controls that are not available as MIDI controllers</div>
</div>


We now focus on the controllers - buttons and knobs - that are available as MIDI controllers.

<div>
    <img src="images/surface-controls/Surface controls - with MIDI.png"/>
    <div style="font-style: italic">Surface controllers that deliver MIDI messages</div>
</div>


## MIDI Specification for NUMA X Piano in MIDI Controller Mode

This is rough specification for the controllers above that provide MIDI messages (from left to right).


<table>
    <thead>
        <tr>
            <th>Group</th>
            <th>Controller</th>
            <th>Type</th>
            <th>Action</th>
            <th>CC Number</th>
            <th>CC Value</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">Assignable</td>
            <td rowspan="2">Assignable</td>
            <td rowspan="2">Knob</td>
            <td>Rotate</td>
            <td>3</td>
            <td>0 - 127</td>
            <td></td>
        </tr>
        <tr>
            <td>Press</td>
            <td>-</td>
            <td>-</td>
            <td></td>
        </tr>
        <!-- Instrument Knobs -->
        <tr>
            <td rowspan="8">Instrument Knobs</td>
            <td rowspan="2">Zone 1</td>
            <td rowspan="2">Knob</td>
            <td>Rotate</td>
            <td>33</td>
            <td>0 - 127</td>
            <td></td>
        </tr>
        <tr>
            <td>Press</td>
            <td>12</td>
            <td>1 - 2</td>
            <td>[a]</td>
        </tr>
        <tr>
            <td rowspan="2">Zone 2</td>
            <td rowspan="2">Knob</td>
            <td>Rotate</td>
            <td>34</td>
            <td>0 - 127</td>
            <td></td>
        </tr>
        <tr>
            <td>Press</td>
            <td>13</td>
            <td>1 - 2</td>
            <td>[a]</td>
        </tr>
        <tr>
            <td rowspan="2">Zone 3</td>
            <td rowspan="2">Knob</td>
            <td>Rotate</td>
            <td>35</td>
            <td>0 - 127</td>
            <td></td>
        </tr>
        <tr>
            <td>Press</td>
            <td>14</td>
            <td>1 - 2</td>
            <td>[a]</td>
        </tr>
                <tr>
            <td rowspan="2">Zone 4</td>
            <td rowspan="2">Knob</td>
            <td>Rotate</td>
            <td>36</td>
            <td>0 - 127</td>
            <td></td>
        </tr>
        <tr>
            <td>Press</td>
            <td>15</td>
            <td>1 - 2</td>
            <td>[a]</td>
        </tr>
    </tbody>
</table>

Footnotes:

[a] Press toggles between Zone On (value=2) and Off (value=1) (light on and off).

[b] Long press sets the zone to solo (value=2) with the other zones off (value=1). That's 4 MIDI control messages.

