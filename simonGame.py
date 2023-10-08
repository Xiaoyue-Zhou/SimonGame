#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2023.1.3),
    on 九月 04, 2023, at 14:35
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
prefs.hardware['audioLib'] = 'ptb'
prefs.hardware['audioLatencyMode'] = '3'
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.tools import environmenttools
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from generateSeqMat_Grammar
import numpy as np
import itertools

nWord = 7
nTrial = 13
nPrac = 3
nEle = nWord * 3


dist_letter2center = 0.15

### specify legal words: in order T, I, N, O
gramL1 = [[0, 1, 2], [0, 3, 2], [2, 1, 0], [2, 3, 0]]

### set seqMat
seqMat = []
currGram = gramL1
for iTrial in range(nTrial):
    toneSeqCollector = []
    wordSeq = np.random.randint(low=0, high=4, size=nWord)
    for iWord in range(nWord):
        word_id = wordSeq[iWord]
        toneSeqCollector = toneSeqCollector + currGram[word_id]
    seqMat.append(toneSeqCollector)
# set practice mat
for iPrac in range(nPrac):
    seqMat[iPrac] = list(np.random.randint(low=0, high=4, size=nEle))
    

# groupIdx = np.random.randint(low=0, high=2)
groupIdx = 0

if groupIdx == 1:
    idx_to_pic = ['right.jpg','up.jpg','left.jpg','down.jpg']
    idx_to_key = ['right','up','left','down']
    idx_to_voice = ['N.wav', 'T.wav', 'I.wav', 'O.wav']



# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2023.1.3'
expName = 'simonGame'  # from the Builder filename that created this script
expInfo = {
    'participant': f"{randint(0, 999999):06.0f}",
    'session': '001',
    'perm_number': '1',
}
# --- Show participant info dialog --
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='D:\\Guenevere\\UCL\\Alpha lab\\SimonGame_NTIO\\simonGame.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# --- Setup the Window ---
win = visual.Window(
    size=[1920, 1080], fullscr=True, screen=0, 
    winType='pyglet', allowStencil=False,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    backgroundImage='', backgroundFit='none',
    blendMode='avg', useFBO=True, 
    units='height')
win.mouseVisible = False
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# --- Initialize components for Routine "welcomePage" ---
# Run 'Begin Experiment' code from generateSeqMat_Grammar
text_perm_idx = perm_number - 1

### set mapping rules 
text_origin = ['T', 'I', 'N', 'O']
text_list_all = list(itertools.permutations(text_origin, 4))
text_list = list(text_list_all[text_perm_idx])

# decide participants' group and mapping index
idx_to_pic = ['up.jpg','right.jpg','down.jpg','left.jpg']
idx_to_key = ['up','right','down','left']
idx_to_voice = [Letter + '.wav' for Letter in text_list]

img_instruction = visual.ImageStim(
    win=win,
    name='img_instruction', 
    image='Instruction.jpg', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.5,1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
keyStart = keyboard.Keyboard()

# --- Initialize components for Routine "trialNumber" ---
msgTrialNum = visual.TextStim(win=win, name='msgTrialNum',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);

# --- Initialize components for Routine "prepareSeq" ---

# --- Initialize components for Routine "blank" ---
picBlank = visual.ImageStim(
    win=win,
    name='picBlank', 
    image='origin.jpg', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.5,1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=0.0)
letter_up = visual.TextStim(win=win, name='letter_up',
    text=text_list[0],
    font='Open Sans',
    pos=(0, dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
letter_right = visual.TextStim(win=win, name='letter_right',
    text=text_list[1],
    font='Open Sans',
    pos=(dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
letter_down = visual.TextStim(win=win, name='letter_down',
    text=text_list[2],
    font='Open Sans',
    pos=(0, -1*dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);
letter_left = visual.TextStim(win=win, name='letter_left',
    text=text_list[3],
    font='Open Sans',
    pos=(-1*dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);

# --- Initialize components for Routine "prepare_stim" ---
blankBetweenStim_2 = visual.ImageStim(
    win=win,
    name='blankBetweenStim_2', 
    image='origin.jpg', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.5,1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
msgPlaying_2 = visual.TextStim(win=win, name='msgPlaying_2',
    text='Playing...',
    font='Open Sans',
    pos=(0, 0.4), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
ISI_before_stim = clock.StaticPeriod(win=win, screenHz=expInfo['frameRate'], name='ISI_before_stim')
letter_up_2 = visual.TextStim(win=win, name='letter_up_2',
    text=text_list[0],
    font='Open Sans',
    pos=(0, dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
letter_right_3 = visual.TextStim(win=win, name='letter_right_3',
    text=text_list[1],
    font='Open Sans',
    pos=(dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
letter_down_2 = visual.TextStim(win=win, name='letter_down_2',
    text=text_list[2],
    font='Open Sans',
    pos=(0, -1*dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);
letter_left_2 = visual.TextStim(win=win, name='letter_left_2',
    text=text_list[3],
    font='Open Sans',
    pos=(-1*dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-7.0);

# --- Initialize components for Routine "stimPresentation" ---
picStim = visual.ImageStim(
    win=win,
    name='picStim', 
    image='default.png', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.5,1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=0.0)
msgPlaying = visual.TextStim(win=win, name='msgPlaying',
    text='Playing...',
    font='Open Sans',
    pos=(0, 0.4), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
snd_voice = sound.Sound('A', secs=0.2, stereo=True, hamming=True,
    name='snd_voice')
snd_voice.setVolume(1.0)
letter_up_3 = visual.TextStim(win=win, name='letter_up_3',
    text=text_list[0],
    font='Open Sans',
    pos=(0, dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);
letter_right_2 = visual.TextStim(win=win, name='letter_right_2',
    text=text_list[1],
    font='Open Sans',
    pos=(dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
letter_down_3 = visual.TextStim(win=win, name='letter_down_3',
    text=text_list[2],
    font='Open Sans',
    pos=(0, -1*dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
letter_left_3 = visual.TextStim(win=win, name='letter_left_3',
    text=text_list[3],
    font='Open Sans',
    pos=(-1*dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);

# --- Initialize components for Routine "keyResponse" ---
picFiller = visual.ImageStim(
    win=win,
    name='picFiller', 
    image='origin.jpg', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.5,1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
subjResp = keyboard.Keyboard()
msgYourTurn = visual.TextStim(win=win, name='msgYourTurn',
    text='Your turn',
    font='Open Sans',
    pos=(0, 0.4), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);
letter_up_4 = visual.TextStim(win=win, name='letter_up_4',
    text=text_list[0],
    font='Open Sans',
    pos=(0, dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
letter_right_4 = visual.TextStim(win=win, name='letter_right_4',
    text=text_list[1],
    font='Open Sans',
    pos=(dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
letter_down_4 = visual.TextStim(win=win, name='letter_down_4',
    text=text_list[2],
    font='Open Sans',
    pos=(0, -1*dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);
letter_left_4 = visual.TextStim(win=win, name='letter_left_4',
    text=text_list[3],
    font='Open Sans',
    pos=(-1*dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-7.0);

# --- Initialize components for Routine "before_effect" ---
picFiller_2 = visual.ImageStim(
    win=win,
    name='picFiller_2', 
    image='origin.jpg', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.5,1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
msgYourTurn_3 = visual.TextStim(win=win, name='msgYourTurn_3',
    text='Your turn',
    font='Open Sans',
    pos=(0, 0.4), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
ISI_before_effect = clock.StaticPeriod(win=win, screenHz=expInfo['frameRate'], name='ISI_before_effect')
letter_up_5 = visual.TextStim(win=win, name='letter_up_5',
    text=text_list[0],
    font='Open Sans',
    pos=(0, dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
letter_right_5 = visual.TextStim(win=win, name='letter_right_5',
    text=text_list[1],
    font='Open Sans',
    pos=(dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
letter_down_5 = visual.TextStim(win=win, name='letter_down_5',
    text=text_list[2],
    font='Open Sans',
    pos=(0, -1*dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);
letter_left_5 = visual.TextStim(win=win, name='letter_left_5',
    text=text_list[3],
    font='Open Sans',
    pos=(-1*dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-7.0);

# --- Initialize components for Routine "keyPressEffect" ---
picPressedKey = visual.ImageStim(
    win=win,
    name='picPressedKey', 
    image='default.png', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.5,1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=0.0)
msgYourTurn_2 = visual.TextStim(win=win, name='msgYourTurn_2',
    text='Your turn',
    font='Open Sans',
    pos=(0, 0.4), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
snd_beep_effect = sound.Sound('A', secs=0.2, stereo=True, hamming=True,
    name='snd_beep_effect')
snd_beep_effect.setVolume(1.0)
letter_up_6 = visual.TextStim(win=win, name='letter_up_6',
    text=text_list[0],
    font='Open Sans',
    pos=(0, dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);
letter_right_6 = visual.TextStim(win=win, name='letter_right_6',
    text=text_list[1],
    font='Open Sans',
    pos=(dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
letter_down_6 = visual.TextStim(win=win, name='letter_down_6',
    text=text_list[2],
    font='Open Sans',
    pos=(0, -1*dist_letter2center), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
letter_left_6 = visual.TextStim(win=win, name='letter_left_6',
    text=text_list[3],
    font='Open Sans',
    pos=(-1*dist_letter2center,0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);

# --- Initialize components for Routine "add_numEle" ---

# --- Initialize components for Routine "feedback" ---
msgFeedback_2 = visual.TextStim(win=win, name='msgFeedback_2',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);

# --- Initialize components for Routine "feedback_and_rest" ---
msg_rest = visual.TextStim(win=win, name='msg_rest',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
msg_end_rest = visual.TextStim(win=win, name='msg_end_rest',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
key_end_rest = keyboard.Keyboard()

# --- Initialize components for Routine "endPage" ---
msgEnd = visual.TextStim(win=win, name='msgEnd',
    text='Experiment ends.\n \nThank you for your participation!',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "welcomePage" ---
continueRoutine = True
# update component parameters for each repeat
keyStart.keys = []
keyStart.rt = []
_keyStart_allKeys = []
# keep track of which components have finished
welcomePageComponents = [img_instruction, keyStart]
for thisComponent in welcomePageComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "welcomePage" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *img_instruction* updates
    
    # if img_instruction is starting this frame...
    if img_instruction.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        img_instruction.frameNStart = frameN  # exact frame index
        img_instruction.tStart = t  # local t and not account for scr refresh
        img_instruction.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(img_instruction, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'img_instruction.started')
        # update status
        img_instruction.status = STARTED
        img_instruction.setAutoDraw(True)
    
    # if img_instruction is active this frame...
    if img_instruction.status == STARTED:
        # update params
        pass
    
    # *keyStart* updates
    waitOnFlip = False
    
    # if keyStart is starting this frame...
    if keyStart.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        keyStart.frameNStart = frameN  # exact frame index
        keyStart.tStart = t  # local t and not account for scr refresh
        keyStart.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(keyStart, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'keyStart.started')
        # update status
        keyStart.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(keyStart.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(keyStart.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if keyStart.status == STARTED and not waitOnFlip:
        theseKeys = keyStart.getKeys(keyList=['space'], waitRelease=False)
        _keyStart_allKeys.extend(theseKeys)
        if len(_keyStart_allKeys):
            keyStart.keys = _keyStart_allKeys[-1].name  # just the last key pressed
            keyStart.rt = _keyStart_allKeys[-1].rt
            keyStart.duration = _keyStart_allKeys[-1].duration
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in welcomePageComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "welcomePage" ---
for thisComponent in welcomePageComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# Run 'End Routine' code from generateSeqMat_Grammar
thisExp.addData('seqMat',seqMat)
thisExp.addData('groupIdx',groupIdx)
thisExp.addData('idx_to_key', idx_to_key)
# check responses
if keyStart.keys in ['', [], None]:  # No response was made
    keyStart.keys = None
thisExp.addData('keyStart.keys',keyStart.keys)
if keyStart.keys != None:  # we had a response
    thisExp.addData('keyStart.rt', keyStart.rt)
    thisExp.addData('keyStart.duration', keyStart.duration)
thisExp.nextEntry()
# the Routine "welcomePage" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
block = data.TrialHandler(nReps=nTrial, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=[None],
    seed=None, name='block')
thisExp.addLoop(block)  # add the loop to the experiment
thisBlock = block.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
if thisBlock != None:
    for paramName in thisBlock:
        exec('{} = thisBlock[paramName]'.format(paramName))

for thisBlock in block:
    currentLoop = block
    # abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
    if thisBlock != None:
        for paramName in thisBlock:
            exec('{} = thisBlock[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "trialNumber" ---
    continueRoutine = True
    # update component parameters for each repeat
    # Run 'Begin Routine' code from currSeqAll
    trialNo = block.thisRepN + 1
    
    if trialNo <= 3:
        msg_thisTrialNum = 'Practice No.' + str(trialNo)
    elif trialNo > 3:
        msg_thisTrialNum = 'Trial No.' + str(trialNo-3)
    msgTrialNum.setText(msg_thisTrialNum)
    # keep track of which components have finished
    trialNumberComponents = [msgTrialNum]
    for thisComponent in trialNumberComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "trialNumber" ---
    routineForceEnded = not continueRoutine
    while continueRoutine and routineTimer.getTime() < 1.6:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *msgTrialNum* updates
        
        # if msgTrialNum is starting this frame...
        if msgTrialNum.status == NOT_STARTED and tThisFlip >= 0.8-frameTolerance:
            # keep track of start time/frame for later
            msgTrialNum.frameNStart = frameN  # exact frame index
            msgTrialNum.tStart = t  # local t and not account for scr refresh
            msgTrialNum.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(msgTrialNum, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'msgTrialNum.started')
            # update status
            msgTrialNum.status = STARTED
            msgTrialNum.setAutoDraw(True)
        
        # if msgTrialNum is active this frame...
        if msgTrialNum.status == STARTED:
            # update params
            pass
        
        # if msgTrialNum is stopping this frame...
        if msgTrialNum.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > msgTrialNum.tStartRefresh + 0.8-frameTolerance:
                # keep track of stop time/frame for later
                msgTrialNum.tStop = t  # not accounting for scr refresh
                msgTrialNum.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'msgTrialNum.stopped')
                # update status
                msgTrialNum.status = FINISHED
                msgTrialNum.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
            if eyetracker:
                eyetracker.setConnectionState(False)
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in trialNumberComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "trialNumber" ---
    for thisComponent in trialNumberComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
    if routineForceEnded:
        routineTimer.reset()
    else:
        routineTimer.addTime(-1.600000)
    
    # --- Prepare to start Routine "prepareSeq" ---
    continueRoutine = True
    # update component parameters for each repeat
    # Run 'Begin Routine' code from codePrepareSeq
    currSeqAll = seqMat[block.thisRepN]
    numEle = 1
    break_to_next_trial = 0
    # keep track of which components have finished
    prepareSeqComponents = []
    for thisComponent in prepareSeqComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "prepareSeq" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
            if eyetracker:
                eyetracker.setConnectionState(False)
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in prepareSeqComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "prepareSeq" ---
    for thisComponent in prepareSeqComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # the Routine "prepareSeq" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    aTry_thisTime = data.TrialHandler(nReps=nEle, method='random', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='aTry_thisTime')
    thisExp.addLoop(aTry_thisTime)  # add the loop to the experiment
    thisATry_thisTime = aTry_thisTime.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisATry_thisTime.rgb)
    if thisATry_thisTime != None:
        for paramName in thisATry_thisTime:
            exec('{} = thisATry_thisTime[paramName]'.format(paramName))
    
    for thisATry_thisTime in aTry_thisTime:
        currentLoop = aTry_thisTime
        # abbreviate parameter names if possible (e.g. rgb = thisATry_thisTime.rgb)
        if thisATry_thisTime != None:
            for paramName in thisATry_thisTime:
                exec('{} = thisATry_thisTime[paramName]'.format(paramName))
        
        # --- Prepare to start Routine "blank" ---
        continueRoutine = True
        # update component parameters for each repeat
        # keep track of which components have finished
        blankComponents = [picBlank, letter_up, letter_right, letter_down, letter_left]
        for thisComponent in blankComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "blank" ---
        routineForceEnded = not continueRoutine
        while continueRoutine and routineTimer.getTime() < 0.8:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *picBlank* updates
            
            # if picBlank is starting this frame...
            if picBlank.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                picBlank.frameNStart = frameN  # exact frame index
                picBlank.tStart = t  # local t and not account for scr refresh
                picBlank.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(picBlank, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'picBlank.started')
                # update status
                picBlank.status = STARTED
                picBlank.setAutoDraw(True)
            
            # if picBlank is active this frame...
            if picBlank.status == STARTED:
                # update params
                pass
            
            # if picBlank is stopping this frame...
            if picBlank.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > picBlank.tStartRefresh + 0.8-frameTolerance:
                    # keep track of stop time/frame for later
                    picBlank.tStop = t  # not accounting for scr refresh
                    picBlank.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'picBlank.stopped')
                    # update status
                    picBlank.status = FINISHED
                    picBlank.setAutoDraw(False)
            
            # *letter_up* updates
            
            # if letter_up is starting this frame...
            if letter_up.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                letter_up.frameNStart = frameN  # exact frame index
                letter_up.tStart = t  # local t and not account for scr refresh
                letter_up.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(letter_up, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'letter_up.started')
                # update status
                letter_up.status = STARTED
                letter_up.setAutoDraw(True)
            
            # if letter_up is active this frame...
            if letter_up.status == STARTED:
                # update params
                pass
            
            # if letter_up is stopping this frame...
            if letter_up.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > letter_up.tStartRefresh + 0.8-frameTolerance:
                    # keep track of stop time/frame for later
                    letter_up.tStop = t  # not accounting for scr refresh
                    letter_up.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_up.stopped')
                    # update status
                    letter_up.status = FINISHED
                    letter_up.setAutoDraw(False)
            
            # *letter_right* updates
            
            # if letter_right is starting this frame...
            if letter_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                letter_right.frameNStart = frameN  # exact frame index
                letter_right.tStart = t  # local t and not account for scr refresh
                letter_right.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(letter_right, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'letter_right.started')
                # update status
                letter_right.status = STARTED
                letter_right.setAutoDraw(True)
            
            # if letter_right is active this frame...
            if letter_right.status == STARTED:
                # update params
                pass
            
            # if letter_right is stopping this frame...
            if letter_right.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > letter_right.tStartRefresh + 0.8-frameTolerance:
                    # keep track of stop time/frame for later
                    letter_right.tStop = t  # not accounting for scr refresh
                    letter_right.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_right.stopped')
                    # update status
                    letter_right.status = FINISHED
                    letter_right.setAutoDraw(False)
            
            # *letter_down* updates
            
            # if letter_down is starting this frame...
            if letter_down.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                letter_down.frameNStart = frameN  # exact frame index
                letter_down.tStart = t  # local t and not account for scr refresh
                letter_down.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(letter_down, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'letter_down.started')
                # update status
                letter_down.status = STARTED
                letter_down.setAutoDraw(True)
            
            # if letter_down is active this frame...
            if letter_down.status == STARTED:
                # update params
                pass
            
            # if letter_down is stopping this frame...
            if letter_down.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > letter_down.tStartRefresh + 0.8-frameTolerance:
                    # keep track of stop time/frame for later
                    letter_down.tStop = t  # not accounting for scr refresh
                    letter_down.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_down.stopped')
                    # update status
                    letter_down.status = FINISHED
                    letter_down.setAutoDraw(False)
            
            # *letter_left* updates
            
            # if letter_left is starting this frame...
            if letter_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                letter_left.frameNStart = frameN  # exact frame index
                letter_left.tStart = t  # local t and not account for scr refresh
                letter_left.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(letter_left, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'letter_left.started')
                # update status
                letter_left.status = STARTED
                letter_left.setAutoDraw(True)
            
            # if letter_left is active this frame...
            if letter_left.status == STARTED:
                # update params
                pass
            
            # if letter_left is stopping this frame...
            if letter_left.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > letter_left.tStartRefresh + 0.8-frameTolerance:
                    # keep track of stop time/frame for later
                    letter_left.tStop = t  # not accounting for scr refresh
                    letter_left.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_left.stopped')
                    # update status
                    letter_left.status = FINISHED
                    letter_left.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
                if eyetracker:
                    eyetracker.setConnectionState(False)
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in blankComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "blank" ---
        for thisComponent in blankComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
        if routineForceEnded:
            routineTimer.reset()
        else:
            routineTimer.addTime(-0.800000)
        
        # set up handler to look after randomisation of conditions etc
        aTry_stim = data.TrialHandler(nReps=numEle, method='sequential', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='aTry_stim')
        thisExp.addLoop(aTry_stim)  # add the loop to the experiment
        thisATry_stim = aTry_stim.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisATry_stim.rgb)
        if thisATry_stim != None:
            for paramName in thisATry_stim:
                exec('{} = thisATry_stim[paramName]'.format(paramName))
        
        for thisATry_stim in aTry_stim:
            currentLoop = aTry_stim
            # abbreviate parameter names if possible (e.g. rgb = thisATry_stim.rgb)
            if thisATry_stim != None:
                for paramName in thisATry_stim:
                    exec('{} = thisATry_stim[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "prepare_stim" ---
            continueRoutine = True
            # update component parameters for each repeat
            # Run 'Begin Routine' code from genStim
            # get current idx list from currSeqAll
            currIdx_origin = currSeqAll[aTry_stim.thisRepN]
            
            # convert to new seq idx
            intend_letter = text_origin[currIdx_origin]
            currIdx = text_list.index(intend_letter)
            
            currPic = idx_to_pic[currIdx]
            currVoice = idx_to_voice[currIdx]
            # keep track of which components have finished
            prepare_stimComponents = [blankBetweenStim_2, msgPlaying_2, ISI_before_stim, letter_up_2, letter_right_3, letter_down_2, letter_left_2]
            for thisComponent in prepare_stimComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "prepare_stim" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 0.4:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *blankBetweenStim_2* updates
                
                # if blankBetweenStim_2 is starting this frame...
                if blankBetweenStim_2.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    blankBetweenStim_2.frameNStart = frameN  # exact frame index
                    blankBetweenStim_2.tStart = t  # local t and not account for scr refresh
                    blankBetweenStim_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(blankBetweenStim_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'blankBetweenStim_2.started')
                    # update status
                    blankBetweenStim_2.status = STARTED
                    blankBetweenStim_2.setAutoDraw(True)
                
                # if blankBetweenStim_2 is active this frame...
                if blankBetweenStim_2.status == STARTED:
                    # update params
                    pass
                
                # if blankBetweenStim_2 is stopping this frame...
                if blankBetweenStim_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > blankBetweenStim_2.tStartRefresh + 0.4-frameTolerance:
                        # keep track of stop time/frame for later
                        blankBetweenStim_2.tStop = t  # not accounting for scr refresh
                        blankBetweenStim_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'blankBetweenStim_2.stopped')
                        # update status
                        blankBetweenStim_2.status = FINISHED
                        blankBetweenStim_2.setAutoDraw(False)
                
                # *msgPlaying_2* updates
                
                # if msgPlaying_2 is starting this frame...
                if msgPlaying_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    msgPlaying_2.frameNStart = frameN  # exact frame index
                    msgPlaying_2.tStart = t  # local t and not account for scr refresh
                    msgPlaying_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(msgPlaying_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'msgPlaying_2.started')
                    # update status
                    msgPlaying_2.status = STARTED
                    msgPlaying_2.setAutoDraw(True)
                
                # if msgPlaying_2 is active this frame...
                if msgPlaying_2.status == STARTED:
                    # update params
                    pass
                
                # if msgPlaying_2 is stopping this frame...
                if msgPlaying_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > msgPlaying_2.tStartRefresh + 0.4-frameTolerance:
                        # keep track of stop time/frame for later
                        msgPlaying_2.tStop = t  # not accounting for scr refresh
                        msgPlaying_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'msgPlaying_2.stopped')
                        # update status
                        msgPlaying_2.status = FINISHED
                        msgPlaying_2.setAutoDraw(False)
                
                # *letter_up_2* updates
                
                # if letter_up_2 is starting this frame...
                if letter_up_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_up_2.frameNStart = frameN  # exact frame index
                    letter_up_2.tStart = t  # local t and not account for scr refresh
                    letter_up_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_up_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_up_2.started')
                    # update status
                    letter_up_2.status = STARTED
                    letter_up_2.setAutoDraw(True)
                
                # if letter_up_2 is active this frame...
                if letter_up_2.status == STARTED:
                    # update params
                    pass
                
                # if letter_up_2 is stopping this frame...
                if letter_up_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_up_2.tStartRefresh + 0.4-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_up_2.tStop = t  # not accounting for scr refresh
                        letter_up_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_up_2.stopped')
                        # update status
                        letter_up_2.status = FINISHED
                        letter_up_2.setAutoDraw(False)
                
                # *letter_right_3* updates
                
                # if letter_right_3 is starting this frame...
                if letter_right_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_right_3.frameNStart = frameN  # exact frame index
                    letter_right_3.tStart = t  # local t and not account for scr refresh
                    letter_right_3.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_right_3, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_right_3.started')
                    # update status
                    letter_right_3.status = STARTED
                    letter_right_3.setAutoDraw(True)
                
                # if letter_right_3 is active this frame...
                if letter_right_3.status == STARTED:
                    # update params
                    pass
                
                # if letter_right_3 is stopping this frame...
                if letter_right_3.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_right_3.tStartRefresh + 0.4-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_right_3.tStop = t  # not accounting for scr refresh
                        letter_right_3.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_right_3.stopped')
                        # update status
                        letter_right_3.status = FINISHED
                        letter_right_3.setAutoDraw(False)
                
                # *letter_down_2* updates
                
                # if letter_down_2 is starting this frame...
                if letter_down_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_down_2.frameNStart = frameN  # exact frame index
                    letter_down_2.tStart = t  # local t and not account for scr refresh
                    letter_down_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_down_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_down_2.started')
                    # update status
                    letter_down_2.status = STARTED
                    letter_down_2.setAutoDraw(True)
                
                # if letter_down_2 is active this frame...
                if letter_down_2.status == STARTED:
                    # update params
                    pass
                
                # if letter_down_2 is stopping this frame...
                if letter_down_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_down_2.tStartRefresh + 0.4-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_down_2.tStop = t  # not accounting for scr refresh
                        letter_down_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_down_2.stopped')
                        # update status
                        letter_down_2.status = FINISHED
                        letter_down_2.setAutoDraw(False)
                
                # *letter_left_2* updates
                
                # if letter_left_2 is starting this frame...
                if letter_left_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_left_2.frameNStart = frameN  # exact frame index
                    letter_left_2.tStart = t  # local t and not account for scr refresh
                    letter_left_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_left_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_left_2.started')
                    # update status
                    letter_left_2.status = STARTED
                    letter_left_2.setAutoDraw(True)
                
                # if letter_left_2 is active this frame...
                if letter_left_2.status == STARTED:
                    # update params
                    pass
                
                # if letter_left_2 is stopping this frame...
                if letter_left_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_left_2.tStartRefresh + 0.4-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_left_2.tStop = t  # not accounting for scr refresh
                        letter_left_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_left_2.stopped')
                        # update status
                        letter_left_2.status = FINISHED
                        letter_left_2.setAutoDraw(False)
                # *ISI_before_stim* period
                
                # if ISI_before_stim is starting this frame...
                if ISI_before_stim.status == NOT_STARTED and t >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    ISI_before_stim.frameNStart = frameN  # exact frame index
                    ISI_before_stim.tStart = t  # local t and not account for scr refresh
                    ISI_before_stim.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(ISI_before_stim, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.addData('ISI_before_stim.started', t)
                    # update status
                    ISI_before_stim.status = STARTED
                    ISI_before_stim.start(0.4)
                elif ISI_before_stim.status == STARTED:  # one frame should pass before updating params and completing
                    # Updating other components during *ISI_before_stim*
                    picStim.setImage(currPic)
                    snd_voice.setSound(currVoice, secs=0.2)
                    # Component updates done
                    ISI_before_stim.complete()  # finish the static period
                    ISI_before_stim.tStop = ISI_before_stim.tStart + 0.4  # record stop time
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in prepare_stimComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "prepare_stim" ---
            for thisComponent in prepare_stimComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-0.400000)
            
            # --- Prepare to start Routine "stimPresentation" ---
            continueRoutine = True
            # update component parameters for each repeat
            snd_voice.setSound(currVoice, secs=0.2, hamming=True)
            snd_voice.setVolume(1.0, log=False)
            # keep track of which components have finished
            stimPresentationComponents = [picStim, msgPlaying, snd_voice, letter_up_3, letter_right_2, letter_down_3, letter_left_3]
            for thisComponent in stimPresentationComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "stimPresentation" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 0.2:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *picStim* updates
                
                # if picStim is starting this frame...
                if picStim.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    picStim.frameNStart = frameN  # exact frame index
                    picStim.tStart = t  # local t and not account for scr refresh
                    picStim.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(picStim, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'picStim.started')
                    # update status
                    picStim.status = STARTED
                    picStim.setAutoDraw(True)
                
                # if picStim is active this frame...
                if picStim.status == STARTED:
                    # update params
                    pass
                
                # if picStim is stopping this frame...
                if picStim.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > picStim.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        picStim.tStop = t  # not accounting for scr refresh
                        picStim.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'picStim.stopped')
                        # update status
                        picStim.status = FINISHED
                        picStim.setAutoDraw(False)
                
                # *msgPlaying* updates
                
                # if msgPlaying is starting this frame...
                if msgPlaying.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    msgPlaying.frameNStart = frameN  # exact frame index
                    msgPlaying.tStart = t  # local t and not account for scr refresh
                    msgPlaying.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(msgPlaying, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'msgPlaying.started')
                    # update status
                    msgPlaying.status = STARTED
                    msgPlaying.setAutoDraw(True)
                
                # if msgPlaying is active this frame...
                if msgPlaying.status == STARTED:
                    # update params
                    pass
                
                # if msgPlaying is stopping this frame...
                if msgPlaying.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > msgPlaying.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        msgPlaying.tStop = t  # not accounting for scr refresh
                        msgPlaying.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'msgPlaying.stopped')
                        # update status
                        msgPlaying.status = FINISHED
                        msgPlaying.setAutoDraw(False)
                
                # if snd_voice is starting this frame...
                if snd_voice.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    snd_voice.frameNStart = frameN  # exact frame index
                    snd_voice.tStart = t  # local t and not account for scr refresh
                    snd_voice.tStartRefresh = tThisFlipGlobal  # on global time
                    # add timestamp to datafile
                    thisExp.addData('snd_voice.started', tThisFlipGlobal)
                    # update status
                    snd_voice.status = STARTED
                    snd_voice.play(when=win)  # sync with win flip
                
                # if snd_voice is stopping this frame...
                if snd_voice.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > snd_voice.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        snd_voice.tStop = t  # not accounting for scr refresh
                        snd_voice.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'snd_voice.stopped')
                        # update status
                        snd_voice.status = FINISHED
                        snd_voice.stop()
                # update snd_voice status according to whether it's playing
                if snd_voice.isPlaying:
                    snd_voice.status = STARTED
                elif snd_voice.isFinished:
                    snd_voice.status = FINISHED
                
                # *letter_up_3* updates
                
                # if letter_up_3 is starting this frame...
                if letter_up_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_up_3.frameNStart = frameN  # exact frame index
                    letter_up_3.tStart = t  # local t and not account for scr refresh
                    letter_up_3.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_up_3, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_up_3.started')
                    # update status
                    letter_up_3.status = STARTED
                    letter_up_3.setAutoDraw(True)
                
                # if letter_up_3 is active this frame...
                if letter_up_3.status == STARTED:
                    # update params
                    pass
                
                # if letter_up_3 is stopping this frame...
                if letter_up_3.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_up_3.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_up_3.tStop = t  # not accounting for scr refresh
                        letter_up_3.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_up_3.stopped')
                        # update status
                        letter_up_3.status = FINISHED
                        letter_up_3.setAutoDraw(False)
                
                # *letter_right_2* updates
                
                # if letter_right_2 is starting this frame...
                if letter_right_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_right_2.frameNStart = frameN  # exact frame index
                    letter_right_2.tStart = t  # local t and not account for scr refresh
                    letter_right_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_right_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_right_2.started')
                    # update status
                    letter_right_2.status = STARTED
                    letter_right_2.setAutoDraw(True)
                
                # if letter_right_2 is active this frame...
                if letter_right_2.status == STARTED:
                    # update params
                    pass
                
                # if letter_right_2 is stopping this frame...
                if letter_right_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_right_2.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_right_2.tStop = t  # not accounting for scr refresh
                        letter_right_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_right_2.stopped')
                        # update status
                        letter_right_2.status = FINISHED
                        letter_right_2.setAutoDraw(False)
                
                # *letter_down_3* updates
                
                # if letter_down_3 is starting this frame...
                if letter_down_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_down_3.frameNStart = frameN  # exact frame index
                    letter_down_3.tStart = t  # local t and not account for scr refresh
                    letter_down_3.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_down_3, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_down_3.started')
                    # update status
                    letter_down_3.status = STARTED
                    letter_down_3.setAutoDraw(True)
                
                # if letter_down_3 is active this frame...
                if letter_down_3.status == STARTED:
                    # update params
                    pass
                
                # if letter_down_3 is stopping this frame...
                if letter_down_3.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_down_3.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_down_3.tStop = t  # not accounting for scr refresh
                        letter_down_3.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_down_3.stopped')
                        # update status
                        letter_down_3.status = FINISHED
                        letter_down_3.setAutoDraw(False)
                
                # *letter_left_3* updates
                
                # if letter_left_3 is starting this frame...
                if letter_left_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_left_3.frameNStart = frameN  # exact frame index
                    letter_left_3.tStart = t  # local t and not account for scr refresh
                    letter_left_3.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_left_3, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_left_3.started')
                    # update status
                    letter_left_3.status = STARTED
                    letter_left_3.setAutoDraw(True)
                
                # if letter_left_3 is active this frame...
                if letter_left_3.status == STARTED:
                    # update params
                    pass
                
                # if letter_left_3 is stopping this frame...
                if letter_left_3.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_left_3.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_left_3.tStop = t  # not accounting for scr refresh
                        letter_left_3.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_left_3.stopped')
                        # update status
                        letter_left_3.status = FINISHED
                        letter_left_3.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in stimPresentationComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "stimPresentation" ---
            for thisComponent in stimPresentationComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            snd_voice.stop()  # ensure sound has stopped at end of routine
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-0.200000)
            thisExp.nextEntry()
            
        # completed numEle repeats of 'aTry_stim'
        
        
        # set up handler to look after randomisation of conditions etc
        aTry_resp = data.TrialHandler(nReps=numEle, method='sequential', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='aTry_resp')
        thisExp.addLoop(aTry_resp)  # add the loop to the experiment
        thisATry_resp = aTry_resp.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisATry_resp.rgb)
        if thisATry_resp != None:
            for paramName in thisATry_resp:
                exec('{} = thisATry_resp[paramName]'.format(paramName))
        
        for thisATry_resp in aTry_resp:
            currentLoop = aTry_resp
            # abbreviate parameter names if possible (e.g. rgb = thisATry_resp.rgb)
            if thisATry_resp != None:
                for paramName in thisATry_resp:
                    exec('{} = thisATry_resp[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "keyResponse" ---
            continueRoutine = True
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code
            currCorIdx_origin = currSeqAll[aTry_resp.thisRepN]
            currCorIdx = text_list.index(text_origin[currCorIdx_origin])
            currCorPress = idx_to_key[currCorIdx]
            subjResp.keys = []
            subjResp.rt = []
            _subjResp_allKeys = []
            # keep track of which components have finished
            keyResponseComponents = [picFiller, subjResp, msgYourTurn, letter_up_4, letter_right_4, letter_down_4, letter_left_4]
            for thisComponent in keyResponseComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "keyResponse" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *picFiller* updates
                
                # if picFiller is starting this frame...
                if picFiller.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    picFiller.frameNStart = frameN  # exact frame index
                    picFiller.tStart = t  # local t and not account for scr refresh
                    picFiller.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(picFiller, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'picFiller.started')
                    # update status
                    picFiller.status = STARTED
                    picFiller.setAutoDraw(True)
                
                # if picFiller is active this frame...
                if picFiller.status == STARTED:
                    # update params
                    pass
                
                # *subjResp* updates
                waitOnFlip = False
                
                # if subjResp is starting this frame...
                if subjResp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    subjResp.frameNStart = frameN  # exact frame index
                    subjResp.tStart = t  # local t and not account for scr refresh
                    subjResp.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(subjResp, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'subjResp.started')
                    # update status
                    subjResp.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(subjResp.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(subjResp.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if subjResp.status == STARTED and not waitOnFlip:
                    theseKeys = subjResp.getKeys(keyList=['right','left','up','down'], waitRelease=False)
                    _subjResp_allKeys.extend(theseKeys)
                    if len(_subjResp_allKeys):
                        subjResp.keys = _subjResp_allKeys[-1].name  # just the last key pressed
                        subjResp.rt = _subjResp_allKeys[-1].rt
                        subjResp.duration = _subjResp_allKeys[-1].duration
                        # was this correct?
                        if (subjResp.keys == str(currCorPress)) or (subjResp.keys == currCorPress):
                            subjResp.corr = 1
                        else:
                            subjResp.corr = 0
                        # a response ends the routine
                        continueRoutine = False
                
                # *msgYourTurn* updates
                
                # if msgYourTurn is starting this frame...
                if msgYourTurn.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    msgYourTurn.frameNStart = frameN  # exact frame index
                    msgYourTurn.tStart = t  # local t and not account for scr refresh
                    msgYourTurn.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(msgYourTurn, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'msgYourTurn.started')
                    # update status
                    msgYourTurn.status = STARTED
                    msgYourTurn.setAutoDraw(True)
                
                # if msgYourTurn is active this frame...
                if msgYourTurn.status == STARTED:
                    # update params
                    pass
                
                # *letter_up_4* updates
                
                # if letter_up_4 is starting this frame...
                if letter_up_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_up_4.frameNStart = frameN  # exact frame index
                    letter_up_4.tStart = t  # local t and not account for scr refresh
                    letter_up_4.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_up_4, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_up_4.started')
                    # update status
                    letter_up_4.status = STARTED
                    letter_up_4.setAutoDraw(True)
                
                # if letter_up_4 is active this frame...
                if letter_up_4.status == STARTED:
                    # update params
                    pass
                
                # *letter_right_4* updates
                
                # if letter_right_4 is starting this frame...
                if letter_right_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_right_4.frameNStart = frameN  # exact frame index
                    letter_right_4.tStart = t  # local t and not account for scr refresh
                    letter_right_4.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_right_4, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_right_4.started')
                    # update status
                    letter_right_4.status = STARTED
                    letter_right_4.setAutoDraw(True)
                
                # if letter_right_4 is active this frame...
                if letter_right_4.status == STARTED:
                    # update params
                    pass
                
                # *letter_down_4* updates
                
                # if letter_down_4 is starting this frame...
                if letter_down_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_down_4.frameNStart = frameN  # exact frame index
                    letter_down_4.tStart = t  # local t and not account for scr refresh
                    letter_down_4.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_down_4, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_down_4.started')
                    # update status
                    letter_down_4.status = STARTED
                    letter_down_4.setAutoDraw(True)
                
                # if letter_down_4 is active this frame...
                if letter_down_4.status == STARTED:
                    # update params
                    pass
                
                # *letter_left_4* updates
                
                # if letter_left_4 is starting this frame...
                if letter_left_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_left_4.frameNStart = frameN  # exact frame index
                    letter_left_4.tStart = t  # local t and not account for scr refresh
                    letter_left_4.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_left_4, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_left_4.started')
                    # update status
                    letter_left_4.status = STARTED
                    letter_left_4.setAutoDraw(True)
                
                # if letter_left_4 is active this frame...
                if letter_left_4.status == STARTED:
                    # update params
                    pass
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in keyResponseComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "keyResponse" ---
            for thisComponent in keyResponseComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # check responses
            if subjResp.keys in ['', [], None]:  # No response was made
                subjResp.keys = None
                # was no response the correct answer?!
                if str(currCorPress).lower() == 'none':
                   subjResp.corr = 1;  # correct non-response
                else:
                   subjResp.corr = 0;  # failed to respond (incorrectly)
            # store data for aTry_resp (TrialHandler)
            aTry_resp.addData('subjResp.keys',subjResp.keys)
            aTry_resp.addData('subjResp.corr', subjResp.corr)
            if subjResp.keys != None:  # we had a response
                aTry_resp.addData('subjResp.rt', subjResp.rt)
                aTry_resp.addData('subjResp.duration', subjResp.duration)
            # the Routine "keyResponse" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            
            # --- Prepare to start Routine "before_effect" ---
            continueRoutine = True
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code_5
            idxCurrPressed = idx_to_key.index(subjResp.keys)
            picCurrPressedKey = idx_to_pic[idxCurrPressed]
            voiceCurrPressedKey = idx_to_voice[idxCurrPressed]
            # keep track of which components have finished
            before_effectComponents = [picFiller_2, msgYourTurn_3, ISI_before_effect, letter_up_5, letter_right_5, letter_down_5, letter_left_5]
            for thisComponent in before_effectComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "before_effect" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 0.1:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *picFiller_2* updates
                
                # if picFiller_2 is starting this frame...
                if picFiller_2.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    picFiller_2.frameNStart = frameN  # exact frame index
                    picFiller_2.tStart = t  # local t and not account for scr refresh
                    picFiller_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(picFiller_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'picFiller_2.started')
                    # update status
                    picFiller_2.status = STARTED
                    picFiller_2.setAutoDraw(True)
                
                # if picFiller_2 is active this frame...
                if picFiller_2.status == STARTED:
                    # update params
                    pass
                
                # if picFiller_2 is stopping this frame...
                if picFiller_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > picFiller_2.tStartRefresh + 0.1-frameTolerance:
                        # keep track of stop time/frame for later
                        picFiller_2.tStop = t  # not accounting for scr refresh
                        picFiller_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'picFiller_2.stopped')
                        # update status
                        picFiller_2.status = FINISHED
                        picFiller_2.setAutoDraw(False)
                
                # *msgYourTurn_3* updates
                
                # if msgYourTurn_3 is starting this frame...
                if msgYourTurn_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    msgYourTurn_3.frameNStart = frameN  # exact frame index
                    msgYourTurn_3.tStart = t  # local t and not account for scr refresh
                    msgYourTurn_3.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(msgYourTurn_3, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'msgYourTurn_3.started')
                    # update status
                    msgYourTurn_3.status = STARTED
                    msgYourTurn_3.setAutoDraw(True)
                
                # if msgYourTurn_3 is active this frame...
                if msgYourTurn_3.status == STARTED:
                    # update params
                    pass
                
                # if msgYourTurn_3 is stopping this frame...
                if msgYourTurn_3.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > msgYourTurn_3.tStartRefresh + 0.1-frameTolerance:
                        # keep track of stop time/frame for later
                        msgYourTurn_3.tStop = t  # not accounting for scr refresh
                        msgYourTurn_3.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'msgYourTurn_3.stopped')
                        # update status
                        msgYourTurn_3.status = FINISHED
                        msgYourTurn_3.setAutoDraw(False)
                
                # *letter_up_5* updates
                
                # if letter_up_5 is starting this frame...
                if letter_up_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_up_5.frameNStart = frameN  # exact frame index
                    letter_up_5.tStart = t  # local t and not account for scr refresh
                    letter_up_5.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_up_5, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_up_5.started')
                    # update status
                    letter_up_5.status = STARTED
                    letter_up_5.setAutoDraw(True)
                
                # if letter_up_5 is active this frame...
                if letter_up_5.status == STARTED:
                    # update params
                    pass
                
                # if letter_up_5 is stopping this frame...
                if letter_up_5.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_up_5.tStartRefresh + 0.1-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_up_5.tStop = t  # not accounting for scr refresh
                        letter_up_5.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_up_5.stopped')
                        # update status
                        letter_up_5.status = FINISHED
                        letter_up_5.setAutoDraw(False)
                
                # *letter_right_5* updates
                
                # if letter_right_5 is starting this frame...
                if letter_right_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_right_5.frameNStart = frameN  # exact frame index
                    letter_right_5.tStart = t  # local t and not account for scr refresh
                    letter_right_5.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_right_5, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_right_5.started')
                    # update status
                    letter_right_5.status = STARTED
                    letter_right_5.setAutoDraw(True)
                
                # if letter_right_5 is active this frame...
                if letter_right_5.status == STARTED:
                    # update params
                    pass
                
                # if letter_right_5 is stopping this frame...
                if letter_right_5.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_right_5.tStartRefresh + 0.1-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_right_5.tStop = t  # not accounting for scr refresh
                        letter_right_5.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_right_5.stopped')
                        # update status
                        letter_right_5.status = FINISHED
                        letter_right_5.setAutoDraw(False)
                
                # *letter_down_5* updates
                
                # if letter_down_5 is starting this frame...
                if letter_down_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_down_5.frameNStart = frameN  # exact frame index
                    letter_down_5.tStart = t  # local t and not account for scr refresh
                    letter_down_5.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_down_5, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_down_5.started')
                    # update status
                    letter_down_5.status = STARTED
                    letter_down_5.setAutoDraw(True)
                
                # if letter_down_5 is active this frame...
                if letter_down_5.status == STARTED:
                    # update params
                    pass
                
                # if letter_down_5 is stopping this frame...
                if letter_down_5.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_down_5.tStartRefresh + 0.1-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_down_5.tStop = t  # not accounting for scr refresh
                        letter_down_5.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_down_5.stopped')
                        # update status
                        letter_down_5.status = FINISHED
                        letter_down_5.setAutoDraw(False)
                
                # *letter_left_5* updates
                
                # if letter_left_5 is starting this frame...
                if letter_left_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_left_5.frameNStart = frameN  # exact frame index
                    letter_left_5.tStart = t  # local t and not account for scr refresh
                    letter_left_5.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_left_5, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_left_5.started')
                    # update status
                    letter_left_5.status = STARTED
                    letter_left_5.setAutoDraw(True)
                
                # if letter_left_5 is active this frame...
                if letter_left_5.status == STARTED:
                    # update params
                    pass
                
                # if letter_left_5 is stopping this frame...
                if letter_left_5.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_left_5.tStartRefresh + 0.1-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_left_5.tStop = t  # not accounting for scr refresh
                        letter_left_5.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_left_5.stopped')
                        # update status
                        letter_left_5.status = FINISHED
                        letter_left_5.setAutoDraw(False)
                # *ISI_before_effect* period
                
                # if ISI_before_effect is starting this frame...
                if ISI_before_effect.status == NOT_STARTED and t >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    ISI_before_effect.frameNStart = frameN  # exact frame index
                    ISI_before_effect.tStart = t  # local t and not account for scr refresh
                    ISI_before_effect.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(ISI_before_effect, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.addData('ISI_before_effect.started', t)
                    # update status
                    ISI_before_effect.status = STARTED
                    ISI_before_effect.start(0.1)
                elif ISI_before_effect.status == STARTED:  # one frame should pass before updating params and completing
                    # Updating other components during *ISI_before_effect*
                    picPressedKey.setImage(picCurrPressedKey)
                    snd_beep_effect.setSound(voiceCurrPressedKey, secs=0.2)
                    # Component updates done
                    ISI_before_effect.complete()  # finish the static period
                    ISI_before_effect.tStop = ISI_before_effect.tStart + 0.1  # record stop time
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in before_effectComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "before_effect" ---
            for thisComponent in before_effectComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # Run 'End Routine' code from code_5
            if subjResp.corr == 0:
                break_to_next_trial = 1
                aTry_resp.finished = True
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-0.100000)
            
            # --- Prepare to start Routine "keyPressEffect" ---
            continueRoutine = True
            # update component parameters for each repeat
            snd_beep_effect.setSound(voiceCurrPressedKey, secs=0.2, hamming=True)
            snd_beep_effect.setVolume(1.0, log=False)
            # keep track of which components have finished
            keyPressEffectComponents = [picPressedKey, msgYourTurn_2, snd_beep_effect, letter_up_6, letter_right_6, letter_down_6, letter_left_6]
            for thisComponent in keyPressEffectComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "keyPressEffect" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 0.2:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *picPressedKey* updates
                
                # if picPressedKey is starting this frame...
                if picPressedKey.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    picPressedKey.frameNStart = frameN  # exact frame index
                    picPressedKey.tStart = t  # local t and not account for scr refresh
                    picPressedKey.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(picPressedKey, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'picPressedKey.started')
                    # update status
                    picPressedKey.status = STARTED
                    picPressedKey.setAutoDraw(True)
                
                # if picPressedKey is active this frame...
                if picPressedKey.status == STARTED:
                    # update params
                    pass
                
                # if picPressedKey is stopping this frame...
                if picPressedKey.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > picPressedKey.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        picPressedKey.tStop = t  # not accounting for scr refresh
                        picPressedKey.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'picPressedKey.stopped')
                        # update status
                        picPressedKey.status = FINISHED
                        picPressedKey.setAutoDraw(False)
                
                # *msgYourTurn_2* updates
                
                # if msgYourTurn_2 is starting this frame...
                if msgYourTurn_2.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    msgYourTurn_2.frameNStart = frameN  # exact frame index
                    msgYourTurn_2.tStart = t  # local t and not account for scr refresh
                    msgYourTurn_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(msgYourTurn_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'msgYourTurn_2.started')
                    # update status
                    msgYourTurn_2.status = STARTED
                    msgYourTurn_2.setAutoDraw(True)
                
                # if msgYourTurn_2 is active this frame...
                if msgYourTurn_2.status == STARTED:
                    # update params
                    pass
                
                # if msgYourTurn_2 is stopping this frame...
                if msgYourTurn_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > msgYourTurn_2.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        msgYourTurn_2.tStop = t  # not accounting for scr refresh
                        msgYourTurn_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'msgYourTurn_2.stopped')
                        # update status
                        msgYourTurn_2.status = FINISHED
                        msgYourTurn_2.setAutoDraw(False)
                
                # if snd_beep_effect is starting this frame...
                if snd_beep_effect.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    snd_beep_effect.frameNStart = frameN  # exact frame index
                    snd_beep_effect.tStart = t  # local t and not account for scr refresh
                    snd_beep_effect.tStartRefresh = tThisFlipGlobal  # on global time
                    # add timestamp to datafile
                    thisExp.addData('snd_beep_effect.started', tThisFlipGlobal)
                    # update status
                    snd_beep_effect.status = STARTED
                    snd_beep_effect.play(when=win)  # sync with win flip
                
                # if snd_beep_effect is stopping this frame...
                if snd_beep_effect.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > snd_beep_effect.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        snd_beep_effect.tStop = t  # not accounting for scr refresh
                        snd_beep_effect.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'snd_beep_effect.stopped')
                        # update status
                        snd_beep_effect.status = FINISHED
                        snd_beep_effect.stop()
                # update snd_beep_effect status according to whether it's playing
                if snd_beep_effect.isPlaying:
                    snd_beep_effect.status = STARTED
                elif snd_beep_effect.isFinished:
                    snd_beep_effect.status = FINISHED
                
                # *letter_up_6* updates
                
                # if letter_up_6 is starting this frame...
                if letter_up_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_up_6.frameNStart = frameN  # exact frame index
                    letter_up_6.tStart = t  # local t and not account for scr refresh
                    letter_up_6.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_up_6, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_up_6.started')
                    # update status
                    letter_up_6.status = STARTED
                    letter_up_6.setAutoDraw(True)
                
                # if letter_up_6 is active this frame...
                if letter_up_6.status == STARTED:
                    # update params
                    pass
                
                # if letter_up_6 is stopping this frame...
                if letter_up_6.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_up_6.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_up_6.tStop = t  # not accounting for scr refresh
                        letter_up_6.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_up_6.stopped')
                        # update status
                        letter_up_6.status = FINISHED
                        letter_up_6.setAutoDraw(False)
                
                # *letter_right_6* updates
                
                # if letter_right_6 is starting this frame...
                if letter_right_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_right_6.frameNStart = frameN  # exact frame index
                    letter_right_6.tStart = t  # local t and not account for scr refresh
                    letter_right_6.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_right_6, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_right_6.started')
                    # update status
                    letter_right_6.status = STARTED
                    letter_right_6.setAutoDraw(True)
                
                # if letter_right_6 is active this frame...
                if letter_right_6.status == STARTED:
                    # update params
                    pass
                
                # if letter_right_6 is stopping this frame...
                if letter_right_6.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_right_6.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_right_6.tStop = t  # not accounting for scr refresh
                        letter_right_6.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_right_6.stopped')
                        # update status
                        letter_right_6.status = FINISHED
                        letter_right_6.setAutoDraw(False)
                
                # *letter_down_6* updates
                
                # if letter_down_6 is starting this frame...
                if letter_down_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_down_6.frameNStart = frameN  # exact frame index
                    letter_down_6.tStart = t  # local t and not account for scr refresh
                    letter_down_6.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_down_6, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_down_6.started')
                    # update status
                    letter_down_6.status = STARTED
                    letter_down_6.setAutoDraw(True)
                
                # if letter_down_6 is active this frame...
                if letter_down_6.status == STARTED:
                    # update params
                    pass
                
                # if letter_down_6 is stopping this frame...
                if letter_down_6.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_down_6.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_down_6.tStop = t  # not accounting for scr refresh
                        letter_down_6.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_down_6.stopped')
                        # update status
                        letter_down_6.status = FINISHED
                        letter_down_6.setAutoDraw(False)
                
                # *letter_left_6* updates
                
                # if letter_left_6 is starting this frame...
                if letter_left_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    letter_left_6.frameNStart = frameN  # exact frame index
                    letter_left_6.tStart = t  # local t and not account for scr refresh
                    letter_left_6.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(letter_left_6, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'letter_left_6.started')
                    # update status
                    letter_left_6.status = STARTED
                    letter_left_6.setAutoDraw(True)
                
                # if letter_left_6 is active this frame...
                if letter_left_6.status == STARTED:
                    # update params
                    pass
                
                # if letter_left_6 is stopping this frame...
                if letter_left_6.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > letter_left_6.tStartRefresh + 0.2-frameTolerance:
                        # keep track of stop time/frame for later
                        letter_left_6.tStop = t  # not accounting for scr refresh
                        letter_left_6.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'letter_left_6.stopped')
                        # update status
                        letter_left_6.status = FINISHED
                        letter_left_6.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in keyPressEffectComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "keyPressEffect" ---
            for thisComponent in keyPressEffectComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            snd_beep_effect.stop()  # ensure sound has stopped at end of routine
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-0.200000)
            thisExp.nextEntry()
            
        # completed numEle repeats of 'aTry_resp'
        
        
        # --- Prepare to start Routine "add_numEle" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from numElePlus1
        numEle += 1
        if break_to_next_trial == 1:
            aTry_thisTime.finished = True; 
        # keep track of which components have finished
        add_numEleComponents = []
        for thisComponent in add_numEleComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "add_numEle" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
                if eyetracker:
                    eyetracker.setConnectionState(False)
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in add_numEleComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "add_numEle" ---
        for thisComponent in add_numEleComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "add_numEle" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
    # completed nEle repeats of 'aTry_thisTime'
    
    
    # --- Prepare to start Routine "feedback" ---
    continueRoutine = True
    # update component parameters for each repeat
    # Run 'Begin Routine' code from code_4
    if break_to_next_trial == 1:
        msg_feedback = 'Error!'
        color_feedback = [1,0,0]
    else:
        msg_feedback = 'Well Done!'
        color_feedback = [0,1,0]
    msgFeedback_2.setColor(color_feedback, colorSpace='rgb')
    msgFeedback_2.setText(msg_feedback)
    # keep track of which components have finished
    feedbackComponents = [msgFeedback_2]
    for thisComponent in feedbackComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "feedback" ---
    routineForceEnded = not continueRoutine
    while continueRoutine and routineTimer.getTime() < 0.75:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *msgFeedback_2* updates
        
        # if msgFeedback_2 is starting this frame...
        if msgFeedback_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            msgFeedback_2.frameNStart = frameN  # exact frame index
            msgFeedback_2.tStart = t  # local t and not account for scr refresh
            msgFeedback_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(msgFeedback_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'msgFeedback_2.started')
            # update status
            msgFeedback_2.status = STARTED
            msgFeedback_2.setAutoDraw(True)
        
        # if msgFeedback_2 is active this frame...
        if msgFeedback_2.status == STARTED:
            # update params
            pass
        
        # if msgFeedback_2 is stopping this frame...
        if msgFeedback_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > msgFeedback_2.tStartRefresh + 0.75-frameTolerance:
                # keep track of stop time/frame for later
                msgFeedback_2.tStop = t  # not accounting for scr refresh
                msgFeedback_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'msgFeedback_2.stopped')
                # update status
                msgFeedback_2.status = FINISHED
                msgFeedback_2.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
            if eyetracker:
                eyetracker.setConnectionState(False)
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in feedbackComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "feedback" ---
    for thisComponent in feedbackComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
    if routineForceEnded:
        routineTimer.reset()
    else:
        routineTimer.addTime(-0.750000)
    
    # --- Prepare to start Routine "feedback_and_rest" ---
    continueRoutine = True
    # update component parameters for each repeat
    # Run 'Begin Routine' code from code_3
    if trialNo == nTrial:
        continueRoutine=False
    
    if trialNo == 3:
        next_trial_msg = 'Please press space to start formal experiment when you feel ready.'
        next_trial_color = [1, 0, 0]
    else:
        next_trial_msg = 'Please press space to start next trial.'
        next_trial_color = [1, 1, 1]
    msg_end_rest.setColor(next_trial_color, colorSpace='rgb')
    msg_end_rest.setText(next_trial_msg)
    key_end_rest.keys = []
    key_end_rest.rt = []
    _key_end_rest_allKeys = []
    # keep track of which components have finished
    feedback_and_restComponents = [msg_rest, msg_end_rest, key_end_rest]
    for thisComponent in feedback_and_restComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "feedback_and_rest" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *msg_rest* updates
        
        # if msg_rest is starting this frame...
        if msg_rest.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            msg_rest.frameNStart = frameN  # exact frame index
            msg_rest.tStart = t  # local t and not account for scr refresh
            msg_rest.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(msg_rest, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'msg_rest.started')
            # update status
            msg_rest.status = STARTED
            msg_rest.setAutoDraw(True)
        
        # if msg_rest is active this frame...
        if msg_rest.status == STARTED:
            # update params
            msg_rest.setText('Please rest for at least ' + str(11 - round(t)) + ' more seconds.', log=False)
        
        # if msg_rest is stopping this frame...
        if msg_rest.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > msg_rest.tStartRefresh + 10-frameTolerance:
                # keep track of stop time/frame for later
                msg_rest.tStop = t  # not accounting for scr refresh
                msg_rest.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'msg_rest.stopped')
                # update status
                msg_rest.status = FINISHED
                msg_rest.setAutoDraw(False)
        
        # *msg_end_rest* updates
        
        # if msg_end_rest is starting this frame...
        if msg_end_rest.status == NOT_STARTED and tThisFlip >= 10.-frameTolerance:
            # keep track of start time/frame for later
            msg_end_rest.frameNStart = frameN  # exact frame index
            msg_end_rest.tStart = t  # local t and not account for scr refresh
            msg_end_rest.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(msg_end_rest, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'msg_end_rest.started')
            # update status
            msg_end_rest.status = STARTED
            msg_end_rest.setAutoDraw(True)
        
        # if msg_end_rest is active this frame...
        if msg_end_rest.status == STARTED:
            # update params
            pass
        
        # *key_end_rest* updates
        waitOnFlip = False
        
        # if key_end_rest is starting this frame...
        if key_end_rest.status == NOT_STARTED and tThisFlip >= 10.-frameTolerance:
            # keep track of start time/frame for later
            key_end_rest.frameNStart = frameN  # exact frame index
            key_end_rest.tStart = t  # local t and not account for scr refresh
            key_end_rest.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(key_end_rest, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'key_end_rest.started')
            # update status
            key_end_rest.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(key_end_rest.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(key_end_rest.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if key_end_rest.status == STARTED and not waitOnFlip:
            theseKeys = key_end_rest.getKeys(keyList=['space'], waitRelease=False)
            _key_end_rest_allKeys.extend(theseKeys)
            if len(_key_end_rest_allKeys):
                key_end_rest.keys = _key_end_rest_allKeys[-1].name  # just the last key pressed
                key_end_rest.rt = _key_end_rest_allKeys[-1].rt
                key_end_rest.duration = _key_end_rest_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
            if eyetracker:
                eyetracker.setConnectionState(False)
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in feedback_and_restComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "feedback_and_rest" ---
    for thisComponent in feedback_and_restComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if key_end_rest.keys in ['', [], None]:  # No response was made
        key_end_rest.keys = None
    block.addData('key_end_rest.keys',key_end_rest.keys)
    if key_end_rest.keys != None:  # we had a response
        block.addData('key_end_rest.rt', key_end_rest.rt)
        block.addData('key_end_rest.duration', key_end_rest.duration)
    # the Routine "feedback_and_rest" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
# completed nTrial repeats of 'block'


# --- Prepare to start Routine "endPage" ---
continueRoutine = True
# update component parameters for each repeat
# keep track of which components have finished
endPageComponents = [msgEnd]
for thisComponent in endPageComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "endPage" ---
routineForceEnded = not continueRoutine
while continueRoutine and routineTimer.getTime() < 3.0:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *msgEnd* updates
    
    # if msgEnd is starting this frame...
    if msgEnd.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        msgEnd.frameNStart = frameN  # exact frame index
        msgEnd.tStart = t  # local t and not account for scr refresh
        msgEnd.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(msgEnd, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'msgEnd.started')
        # update status
        msgEnd.status = STARTED
        msgEnd.setAutoDraw(True)
    
    # if msgEnd is active this frame...
    if msgEnd.status == STARTED:
        # update params
        pass
    
    # if msgEnd is stopping this frame...
    if msgEnd.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > msgEnd.tStartRefresh + 3.0-frameTolerance:
            # keep track of stop time/frame for later
            msgEnd.tStop = t  # not accounting for scr refresh
            msgEnd.frameNStop = frameN  # exact frame index
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'msgEnd.stopped')
            # update status
            msgEnd.status = FINISHED
            msgEnd.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in endPageComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "endPage" ---
for thisComponent in endPageComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
if routineForceEnded:
    routineTimer.reset()
else:
    routineTimer.addTime(-3.000000)

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
