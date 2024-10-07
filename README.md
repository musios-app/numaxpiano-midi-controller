# NUMA X Piano as MIDI Controller

Two objectives:

1. Document how NUMA X Piano works as a MIDI controller
2. Get it working smoothly in Gig Performer

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


## MIDI Specification for NUMA X Piano in MIDI Controller Mode


