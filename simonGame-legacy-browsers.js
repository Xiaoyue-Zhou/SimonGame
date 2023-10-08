/****************** 
 * Simongame Test *
 ******************/


// store info about the experiment session:
let expName = 'simonGame';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
    'perm_number': '',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from generateSeqMat_Grammar
const nWord = 7;
const nTrial = 13;
const nPrac = 3;
const nEle = nWord * 3;

const dist_letter2center = 0.15;

// set group index: 0/1
const groupIdx = Math.floor(Math.random() * 2);

// specify legal words: in order T, I, N, O
const gram_legal = [[0, 1, 2], [0, 3, 2], [2, 1, 0], [2, 3, 0]];
const gram_illegal = [[1, 2, 3], [3, 2, 1], [1, 0, 3], [3, 0, 1]];
let currGram;
if (groupIdx == 0){
    currGram = gram_legal;
}else{
    currGram = gram_illegal;
}

// set seqMat
const seqMat = [];
for (let iTrial = 0; iTrial < nTrial; iTrial++) {
  let toneSeqCollector = [];
  let wordSeq = [];
  
  for (let iWord = 0; iWord < nWord; iWord++) {
    var choose_from = [0, 1, 2, 3];
    var curr_idx;
    
    if (iWord === 0) {
      curr_idx = choose_from[Math.floor(Math.random() * choose_from.length)];
      console.log(curr_idx)
      console.log(choose_from)
    } else {
      choose_from.splice(util.index(choose_from, curr_idx), 1);
      curr_idx = choose_from[Math.floor(Math.random() * choose_from.length)];
    }
    
    wordSeq.push(curr_idx);
  }
  
  for (let iWord = 0; iWord < nWord; iWord++) {
    var word_id = wordSeq[iWord];
    toneSeqCollector = toneSeqCollector.concat(currGram[word_id]);
  }
  
  seqMat.push(toneSeqCollector);
}

// set practice mat
for (let iPrac = 0; iPrac < nPrac; iPrac++) {
  let curr_list = [];
  
  for (let iEle = 0; iEle < nEle; iEle++) {
    var choose_from = [0, 1, 2, 3];
    var curr_idx;
    
    if (iEle === 0) {
      curr_idx = choose_from[Math.floor(Math.random() * choose_from.length)];
    } else {
      choose_from.splice(util.index(choose_from, curr_idx), 1);
      curr_idx = choose_from[Math.floor(Math.random() * choose_from.length)];
    }
    
    curr_list.push(curr_idx);
  }
  
  seqMat[iPrac] = curr_list;
}


// set perm_idx

function permutations(arr, size) {
  const results = [];

  function permute(arr, size, current = []) {
    if (current.length === size) {
      results.push([...current]);
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (!current.includes(arr[i])) {
          current.push(arr[i]);
          permute(arr, size, current);
          current.pop();
        }
      }
    }
  }

  permute(arr, size);
  return results;
}

// var text_perm_idx = parseInt(expInfo['perm_number']) - 1; // parseInt -> int?
var text_perm_idx = Math.floor(Math.random() * 24);
console.log(text_perm_idx)

// set mapping rules
let text_origin = ['T', 'I', 'N', 'O'];
let text_list_all = permutations(text_origin, 4);
let text_list = Array.from(text_list_all[text_perm_idx]);

// decide participants' group and mapping index
var idx_to_pic = ['up.jpg','right.jpg','down.jpg','left.jpg'];
var idx_to_key = ['up','right','down','left'];
var idx_to_voice = text_list.map(Letter => Letter + '.wav');

console.log(idx_to_pic)
console.log(idx_to_key)
console.log(idx_to_voice)
console.log(groupIdx)
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(informationRoutineBegin());
flowScheduler.add(informationRoutineEachFrame());
flowScheduler.add(informationRoutineEnd());
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());
flowScheduler.add(demographicRoutineBegin());
flowScheduler.add(demographicRoutineEachFrame());
flowScheduler.add(demographicRoutineEnd());
flowScheduler.add(welcomePageRoutineBegin());
flowScheduler.add(welcomePageRoutineEachFrame());
flowScheduler.add(welcomePageRoutineEnd());
flowScheduler.add(welcomePage2RoutineBegin());
flowScheduler.add(welcomePage2RoutineEachFrame());
flowScheduler.add(welcomePage2RoutineEnd());
const blockLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blockLoopBegin(blockLoopScheduler));
flowScheduler.add(blockLoopScheduler);
flowScheduler.add(blockLoopEnd);
flowScheduler.add(endPageRoutineBegin());
flowScheduler.add(endPageRoutineEachFrame());
flowScheduler.add(endPageRoutineEnd());
flowScheduler.add(debriefingRoutineBegin());
flowScheduler.add(debriefingRoutineEachFrame());
flowScheduler.add(debriefingRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // libraries:
    {'surveyLibrary': true},
    // resources:
    {'name': 'default.png', 'path': 'https://pavlovia.org/assets/default/default.png'},
    {'name': 'survey_consent.json', 'path': 'survey_consent.json'},
    {'name': 'survey_information.json', 'path': 'survey_information.json'},
    {'name': 'instruction1.jpg', 'path': 'instruction1.jpg'},
    {'name': 'instruction2.jpg', 'path': 'instruction2.jpg'},
    {'name': 'survey_debriefing.json', 'path': 'survey_debriefing.json'},
    {'name': 'survey_demographic.json', 'path': 'survey_demographic.json'},
    {'name': 'I.wav', 'path': 'I.wav'},
    {'name': 'N.wav', 'path': 'N.wav'},
    {'name': 'O.wav', 'path': 'O.wav'},
    {'name': 'T.wav', 'path': 'T.wav'},
    {'name': 'Beep.wav', 'path': 'Beep.wav'},
    {'name': 'left.jpg', 'path': 'left.jpg'},
    {'name': 'origin.jpg', 'path': 'origin.jpg'},
    {'name': 'right.jpg', 'path': 'right.jpg'},
    {'name': 'up.jpg', 'path': 'up.jpg'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.1.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);


  return Scheduler.Event.NEXT;
}


var welcomePageClock;
var img_instruction;
var keyStart;
var welcomePage2Clock;
var keyStart_2;
var img_instruction_2;
var trialNumberClock;
var msgTrialNum;
var prepareSeqClock;
var blankClock;
var picBlank;
var letter_up;
var letter_right;
var letter_down;
var letter_left;
var prepare_stimClock;
var blankBetweenStim_2;
var msgPlaying_2;
var ISI_before_stim;
var letter_up_2;
var letter_right_3;
var letter_down_2;
var letter_left_2;
var stimPresentationClock;
var picStim;
var msgPlaying;
var snd_voice;
var letter_up_3;
var letter_right_2;
var letter_down_3;
var letter_left_3;
var keyResponseClock;
var picFiller;
var subjResp;
var msgYourTurn;
var letter_up_4;
var letter_right_4;
var letter_down_4;
var letter_left_4;
var before_effectClock;
var picFiller_2;
var msgYourTurn_3;
var ISI_before_effect;
var letter_up_5;
var letter_right_5;
var letter_down_5;
var letter_left_5;
var keyPressEffectClock;
var picPressedKey;
var msgYourTurn_2;
var snd_beep_effect;
var letter_up_6;
var letter_right_6;
var letter_down_6;
var letter_left_6;
var add_numEleClock;
var feedbackClock;
var msgFeedback_2;
var feedback_and_restClock;
var msg_rest;
var msg_end_rest;
var key_end_rest;
var endPageClock;
var msgEnd;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "welcomePage"
  welcomePageClock = new util.Clock();
  // Run 'Begin Experiment' code from generateSeqMat_Grammar
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    quitPsychoJS('Mobile device detected. Goodbye!', false)
  }
  
  
  img_instruction = new visual.ImageStim({
    win : psychoJS.window,
    name : 'img_instruction', units : undefined, 
    image : 'instruction1.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  keyStart = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "welcomePage2"
  welcomePage2Clock = new util.Clock();
  keyStart_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  img_instruction_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'img_instruction_2', units : undefined, 
    image : 'instruction2.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  // Initialize components for Routine "trialNumber"
  trialNumberClock = new util.Clock();
  msgTrialNum = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgTrialNum',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "prepareSeq"
  prepareSeqClock = new util.Clock();
  // Initialize components for Routine "blank"
  blankClock = new util.Clock();
  picBlank = new visual.ImageStim({
    win : psychoJS.window,
    name : 'picBlank', units : undefined, 
    image : 'origin.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  letter_up = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_up',
    text: text_list[0],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, dist_letter2center], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  letter_right = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_right',
    text: text_list[1],
    font: 'Open Sans',
    units: undefined, 
    pos: [dist_letter2center, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  letter_down = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_down',
    text: text_list[2],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, ((- 1) * dist_letter2center)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  letter_left = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_left',
    text: text_list[3],
    font: 'Open Sans',
    units: undefined, 
    pos: [((- 1) * dist_letter2center), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  // Initialize components for Routine "prepare_stim"
  prepare_stimClock = new util.Clock();
  blankBetweenStim_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'blankBetweenStim_2', units : undefined, 
    image : 'origin.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  msgPlaying_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgPlaying_2',
    text: 'Playing...',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  ISI_before_stim = new core.MinimalStim({
    name: "ISI_before_stim", 
    win: psychoJS.window,
    autoDraw: false, 
    autoLog: true, 
  });
  letter_up_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_up_2',
    text: text_list[0],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, dist_letter2center], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  letter_right_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_right_3',
    text: text_list[1],
    font: 'Open Sans',
    units: undefined, 
    pos: [dist_letter2center, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  letter_down_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_down_2',
    text: text_list[2],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, ((- 1) * dist_letter2center)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  letter_left_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_left_2',
    text: text_list[3],
    font: 'Open Sans',
    units: undefined, 
    pos: [((- 1) * dist_letter2center), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "stimPresentation"
  stimPresentationClock = new util.Clock();
  picStim = new visual.ImageStim({
    win : psychoJS.window,
    name : 'picStim', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  msgPlaying = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgPlaying',
    text: 'Playing...',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  snd_voice = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: 0.2,
    });
  snd_voice.setVolume(1.0);
  letter_up_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_up_3',
    text: text_list[0],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, dist_letter2center], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  letter_right_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_right_2',
    text: text_list[1],
    font: 'Open Sans',
    units: undefined, 
    pos: [dist_letter2center, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  letter_down_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_down_3',
    text: text_list[2],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, ((- 1) * dist_letter2center)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  letter_left_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_left_3',
    text: text_list[3],
    font: 'Open Sans',
    units: undefined, 
    pos: [((- 1) * dist_letter2center), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "keyResponse"
  keyResponseClock = new util.Clock();
  picFiller = new visual.ImageStim({
    win : psychoJS.window,
    name : 'picFiller', units : undefined, 
    image : 'origin.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  subjResp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  msgYourTurn = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgYourTurn',
    text: 'Your turn',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  letter_up_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_up_4',
    text: text_list[0],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, dist_letter2center], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  letter_right_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_right_4',
    text: text_list[1],
    font: 'Open Sans',
    units: undefined, 
    pos: [dist_letter2center, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  letter_down_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_down_4',
    text: text_list[2],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, ((- 1) * dist_letter2center)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  letter_left_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_left_4',
    text: text_list[3],
    font: 'Open Sans',
    units: undefined, 
    pos: [((- 1) * dist_letter2center), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "before_effect"
  before_effectClock = new util.Clock();
  picFiller_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'picFiller_2', units : undefined, 
    image : 'origin.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  msgYourTurn_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgYourTurn_3',
    text: 'Your turn',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  ISI_before_effect = new core.MinimalStim({
    name: "ISI_before_effect", 
    win: psychoJS.window,
    autoDraw: false, 
    autoLog: true, 
  });
  letter_up_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_up_5',
    text: text_list[0],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, dist_letter2center], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  letter_right_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_right_5',
    text: text_list[1],
    font: 'Open Sans',
    units: undefined, 
    pos: [dist_letter2center, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  letter_down_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_down_5',
    text: text_list[2],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, ((- 1) * dist_letter2center)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  letter_left_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_left_5',
    text: text_list[3],
    font: 'Open Sans',
    units: undefined, 
    pos: [((- 1) * dist_letter2center), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "keyPressEffect"
  keyPressEffectClock = new util.Clock();
  picPressedKey = new visual.ImageStim({
    win : psychoJS.window,
    name : 'picPressedKey', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.5, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  msgYourTurn_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgYourTurn_2',
    text: 'Your turn',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  snd_beep_effect = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: 0.2,
    });
  snd_beep_effect.setVolume(1.0);
  letter_up_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_up_6',
    text: text_list[0],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, dist_letter2center], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  letter_right_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_right_6',
    text: text_list[1],
    font: 'Open Sans',
    units: undefined, 
    pos: [dist_letter2center, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  letter_down_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_down_6',
    text: text_list[2],
    font: 'Open Sans',
    units: undefined, 
    pos: [0, ((- 1) * dist_letter2center)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  letter_left_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'letter_left_6',
    text: text_list[3],
    font: 'Open Sans',
    units: undefined, 
    pos: [((- 1) * dist_letter2center), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "add_numEle"
  add_numEleClock = new util.Clock();
  // Initialize components for Routine "feedback"
  feedbackClock = new util.Clock();
  msgFeedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgFeedback_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "feedback_and_rest"
  feedback_and_restClock = new util.Clock();
  msg_rest = new visual.TextStim({
    win: psychoJS.window,
    name: 'msg_rest',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  msg_end_rest = new visual.TextStim({
    win: psychoJS.window,
    name: 'msg_end_rest',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  key_end_rest = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "endPage"
  endPageClock = new util.Clock();
  msgEnd = new visual.TextStim({
    win: psychoJS.window,
    name: 'msgEnd',
    text: 'Experiment ends.\n \nThank you for your participation!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var information;
var informationClock;
function informationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'information' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    //--- Starting Routine 'information' ---
    information = new visual.Survey({
        win: psychoJS.window,
        name: 'information',
        model: 'survey_information.json',
    });
    informationClock = new util.Clock();
    information.setAutoDraw(true);
    information.status = PsychoJS.Status.STARTED;
    information.isFinished = false;
    information.tStart = t;  // (not accounting for frame time here)
    information.frameNStart = frameN;  // exact frame index
    return Scheduler.Event.NEXT;
  }
}


function informationRoutineEachFrame() {
  return async function () {
    t = informationClock.getTime();
    frameN = frameN + 1;  // number of completed frames (so 0 is the first frame)
    // if information is completed, move on
    if (information.isFinished) {
      information.setAutoDraw(false);
      information.status = PsychoJS.Status.FINISHED;
      // survey routines are not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      return Scheduler.Event.NEXT;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    return Scheduler.Event.FLIP_REPEAT;
  }
}


function informationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'information' ---
    // get data from information
    const informationResponse =  information.getResponse();
    for (const question in informationResponse) {
      psychoJS.experiment.addData(`information.${question}`, informationResponse[question]);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var consent;
var consentClock;
function consentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'consent' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    //--- Starting Routine 'consent' ---
    consent = new visual.Survey({
        win: psychoJS.window,
        name: 'consent',
        model: 'survey_consent.json',
    });
    consentClock = new util.Clock();
    consent.setAutoDraw(true);
    consent.status = PsychoJS.Status.STARTED;
    consent.isFinished = false;
    consent.tStart = t;  // (not accounting for frame time here)
    consent.frameNStart = frameN;  // exact frame index
    return Scheduler.Event.NEXT;
  }
}


function consentRoutineEachFrame() {
  return async function () {
    t = consentClock.getTime();
    frameN = frameN + 1;  // number of completed frames (so 0 is the first frame)
    // if consent is completed, move on
    if (consent.isFinished) {
      consent.setAutoDraw(false);
      consent.status = PsychoJS.Status.FINISHED;
      // survey routines are not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      return Scheduler.Event.NEXT;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    return Scheduler.Event.FLIP_REPEAT;
  }
}


function consentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'consent' ---
    // get data from consent
    const consentResponse =  consent.getResponse();
    for (const question in consentResponse) {
      psychoJS.experiment.addData(`consent.${question}`, consentResponse[question]);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var demographic;
var demographicClock;
function demographicRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'demographic' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    //--- Starting Routine 'demographic' ---
    demographic = new visual.Survey({
        win: psychoJS.window,
        name: 'demographic',
        model: 'survey_demographic.json',
    });
    demographicClock = new util.Clock();
    demographic.setAutoDraw(true);
    demographic.status = PsychoJS.Status.STARTED;
    demographic.isFinished = false;
    demographic.tStart = t;  // (not accounting for frame time here)
    demographic.frameNStart = frameN;  // exact frame index
    return Scheduler.Event.NEXT;
  }
}


function demographicRoutineEachFrame() {
  return async function () {
    t = demographicClock.getTime();
    frameN = frameN + 1;  // number of completed frames (so 0 is the first frame)
    // if demographic is completed, move on
    if (demographic.isFinished) {
      demographic.setAutoDraw(false);
      demographic.status = PsychoJS.Status.FINISHED;
      // survey routines are not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      return Scheduler.Event.NEXT;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    return Scheduler.Event.FLIP_REPEAT;
  }
}


function demographicRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'demographic' ---
    // get data from demographic
    const demographicResponse =  demographic.getResponse();
    for (const question in demographicResponse) {
      psychoJS.experiment.addData(`demographic.${question}`, demographicResponse[question]);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _keyStart_allKeys;
var welcomePageComponents;
function welcomePageRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcomePage' ---
    t = 0;
    welcomePageClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    document.body.style.cursor='none';
    keyStart.keys = undefined;
    keyStart.rt = undefined;
    _keyStart_allKeys = [];
    // keep track of which components have finished
    welcomePageComponents = [];
    welcomePageComponents.push(img_instruction);
    welcomePageComponents.push(keyStart);
    
    welcomePageComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function welcomePageRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcomePage' ---
    // get current time
    t = welcomePageClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *img_instruction* updates
    if (t >= 0.0 && img_instruction.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      img_instruction.tStart = t;  // (not accounting for frame time here)
      img_instruction.frameNStart = frameN;  // exact frame index
      
      img_instruction.setAutoDraw(true);
    }

    
    // *keyStart* updates
    if (t >= 0.0 && keyStart.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      keyStart.tStart = t;  // (not accounting for frame time here)
      keyStart.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { keyStart.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { keyStart.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { keyStart.clearEvents(); });
    }

    if (keyStart.status === PsychoJS.Status.STARTED) {
      let theseKeys = keyStart.getKeys({keyList: ['space'], waitRelease: false});
      _keyStart_allKeys = _keyStart_allKeys.concat(theseKeys);
      if (_keyStart_allKeys.length > 0) {
        keyStart.keys = _keyStart_allKeys[_keyStart_allKeys.length - 1].name;  // just the last key pressed
        keyStart.rt = _keyStart_allKeys[_keyStart_allKeys.length - 1].rt;
        keyStart.duration = _keyStart_allKeys[_keyStart_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    welcomePageComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function welcomePageRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcomePage' ---
    welcomePageComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from generateSeqMat_Grammar
    psychoJS.experiment.addData('seqMat',seqMat);
    psychoJS.experiment.addData('groupIdx',groupIdx);
    psychoJS.experiment.addData('text_perm_idx',text_perm_idx);
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(keyStart.corr, level);
    }
    psychoJS.experiment.addData('keyStart.keys', keyStart.keys);
    if (typeof keyStart.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('keyStart.rt', keyStart.rt);
        psychoJS.experiment.addData('keyStart.duration', keyStart.duration);
        routineTimer.reset();
        }
    
    keyStart.stop();
    // the Routine "welcomePage" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _keyStart_2_allKeys;
var welcomePage2Components;
function welcomePage2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcomePage2' ---
    t = 0;
    welcomePage2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    keyStart_2.keys = undefined;
    keyStart_2.rt = undefined;
    _keyStart_2_allKeys = [];
    // keep track of which components have finished
    welcomePage2Components = [];
    welcomePage2Components.push(keyStart_2);
    welcomePage2Components.push(img_instruction_2);
    
    welcomePage2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function welcomePage2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcomePage2' ---
    // get current time
    t = welcomePage2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *keyStart_2* updates
    if (t >= 0.0 && keyStart_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      keyStart_2.tStart = t;  // (not accounting for frame time here)
      keyStart_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { keyStart_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { keyStart_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { keyStart_2.clearEvents(); });
    }

    if (keyStart_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = keyStart_2.getKeys({keyList: ['space'], waitRelease: false});
      _keyStart_2_allKeys = _keyStart_2_allKeys.concat(theseKeys);
      if (_keyStart_2_allKeys.length > 0) {
        keyStart_2.keys = _keyStart_2_allKeys[_keyStart_2_allKeys.length - 1].name;  // just the last key pressed
        keyStart_2.rt = _keyStart_2_allKeys[_keyStart_2_allKeys.length - 1].rt;
        keyStart_2.duration = _keyStart_2_allKeys[_keyStart_2_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *img_instruction_2* updates
    if (t >= 0.0 && img_instruction_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      img_instruction_2.tStart = t;  // (not accounting for frame time here)
      img_instruction_2.frameNStart = frameN;  // exact frame index
      
      img_instruction_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    welcomePage2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function welcomePage2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcomePage2' ---
    welcomePage2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(keyStart_2.corr, level);
    }
    psychoJS.experiment.addData('keyStart_2.keys', keyStart_2.keys);
    if (typeof keyStart_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('keyStart_2.rt', keyStart_2.rt);
        psychoJS.experiment.addData('keyStart_2.duration', keyStart_2.duration);
        routineTimer.reset();
        }
    
    keyStart_2.stop();
    // the Routine "welcomePage2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var block;
function blockLoopBegin(blockLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    block = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nTrial, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'block'
    });
    psychoJS.experiment.addLoop(block); // add the loop to the experiment
    currentLoop = block;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    block.forEach(function() {
      snapshot = block.getSnapshot();
    
      blockLoopScheduler.add(importConditions(snapshot));
      blockLoopScheduler.add(trialNumberRoutineBegin(snapshot));
      blockLoopScheduler.add(trialNumberRoutineEachFrame());
      blockLoopScheduler.add(trialNumberRoutineEnd(snapshot));
      blockLoopScheduler.add(prepareSeqRoutineBegin(snapshot));
      blockLoopScheduler.add(prepareSeqRoutineEachFrame());
      blockLoopScheduler.add(prepareSeqRoutineEnd(snapshot));
      const aTry_thisTimeLoopScheduler = new Scheduler(psychoJS);
      blockLoopScheduler.add(aTry_thisTimeLoopBegin(aTry_thisTimeLoopScheduler, snapshot));
      blockLoopScheduler.add(aTry_thisTimeLoopScheduler);
      blockLoopScheduler.add(aTry_thisTimeLoopEnd);
      blockLoopScheduler.add(feedbackRoutineBegin(snapshot));
      blockLoopScheduler.add(feedbackRoutineEachFrame());
      blockLoopScheduler.add(feedbackRoutineEnd(snapshot));
      blockLoopScheduler.add(feedback_and_restRoutineBegin(snapshot));
      blockLoopScheduler.add(feedback_and_restRoutineEachFrame());
      blockLoopScheduler.add(feedback_and_restRoutineEnd(snapshot));
      blockLoopScheduler.add(blockLoopEndIteration(blockLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var aTry_thisTime;
function aTry_thisTimeLoopBegin(aTry_thisTimeLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    aTry_thisTime = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nEle, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'aTry_thisTime'
    });
    psychoJS.experiment.addLoop(aTry_thisTime); // add the loop to the experiment
    currentLoop = aTry_thisTime;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    aTry_thisTime.forEach(function() {
      snapshot = aTry_thisTime.getSnapshot();
    
      aTry_thisTimeLoopScheduler.add(importConditions(snapshot));
      aTry_thisTimeLoopScheduler.add(blankRoutineBegin(snapshot));
      aTry_thisTimeLoopScheduler.add(blankRoutineEachFrame());
      aTry_thisTimeLoopScheduler.add(blankRoutineEnd(snapshot));
      const aTry_stimLoopScheduler = new Scheduler(psychoJS);
      aTry_thisTimeLoopScheduler.add(aTry_stimLoopBegin(aTry_stimLoopScheduler, snapshot));
      aTry_thisTimeLoopScheduler.add(aTry_stimLoopScheduler);
      aTry_thisTimeLoopScheduler.add(aTry_stimLoopEnd);
      const aTry_respLoopScheduler = new Scheduler(psychoJS);
      aTry_thisTimeLoopScheduler.add(aTry_respLoopBegin(aTry_respLoopScheduler, snapshot));
      aTry_thisTimeLoopScheduler.add(aTry_respLoopScheduler);
      aTry_thisTimeLoopScheduler.add(aTry_respLoopEnd);
      aTry_thisTimeLoopScheduler.add(add_numEleRoutineBegin(snapshot));
      aTry_thisTimeLoopScheduler.add(add_numEleRoutineEachFrame());
      aTry_thisTimeLoopScheduler.add(add_numEleRoutineEnd(snapshot));
      aTry_thisTimeLoopScheduler.add(aTry_thisTimeLoopEndIteration(aTry_thisTimeLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var aTry_stim;
function aTry_stimLoopBegin(aTry_stimLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    aTry_stim = new TrialHandler({
      psychoJS: psychoJS,
      nReps: numEle, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'aTry_stim'
    });
    psychoJS.experiment.addLoop(aTry_stim); // add the loop to the experiment
    currentLoop = aTry_stim;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    aTry_stim.forEach(function() {
      snapshot = aTry_stim.getSnapshot();
    
      aTry_stimLoopScheduler.add(importConditions(snapshot));
      aTry_stimLoopScheduler.add(prepare_stimRoutineBegin(snapshot));
      aTry_stimLoopScheduler.add(prepare_stimRoutineEachFrame());
      aTry_stimLoopScheduler.add(prepare_stimRoutineEnd(snapshot));
      aTry_stimLoopScheduler.add(stimPresentationRoutineBegin(snapshot));
      aTry_stimLoopScheduler.add(stimPresentationRoutineEachFrame());
      aTry_stimLoopScheduler.add(stimPresentationRoutineEnd(snapshot));
      aTry_stimLoopScheduler.add(aTry_stimLoopEndIteration(aTry_stimLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function aTry_stimLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(aTry_stim);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function aTry_stimLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var aTry_resp;
function aTry_respLoopBegin(aTry_respLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    aTry_resp = new TrialHandler({
      psychoJS: psychoJS,
      nReps: numEle, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'aTry_resp'
    });
    psychoJS.experiment.addLoop(aTry_resp); // add the loop to the experiment
    currentLoop = aTry_resp;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    aTry_resp.forEach(function() {
      snapshot = aTry_resp.getSnapshot();
    
      aTry_respLoopScheduler.add(importConditions(snapshot));
      aTry_respLoopScheduler.add(keyResponseRoutineBegin(snapshot));
      aTry_respLoopScheduler.add(keyResponseRoutineEachFrame());
      aTry_respLoopScheduler.add(keyResponseRoutineEnd(snapshot));
      aTry_respLoopScheduler.add(before_effectRoutineBegin(snapshot));
      aTry_respLoopScheduler.add(before_effectRoutineEachFrame());
      aTry_respLoopScheduler.add(before_effectRoutineEnd(snapshot));
      aTry_respLoopScheduler.add(keyPressEffectRoutineBegin(snapshot));
      aTry_respLoopScheduler.add(keyPressEffectRoutineEachFrame());
      aTry_respLoopScheduler.add(keyPressEffectRoutineEnd(snapshot));
      aTry_respLoopScheduler.add(aTry_respLoopEndIteration(aTry_respLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function aTry_respLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(aTry_resp);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function aTry_respLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function aTry_thisTimeLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(aTry_thisTime);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function aTry_thisTimeLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function blockLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(block);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blockLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trialNo;
var msg_thisTrialNum;
var trialNumberComponents;
function trialNumberRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trialNumber' ---
    t = 0;
    trialNumberClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.600000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from currSeqAll
    trialNo = (block.thisRepN + 1);
    if ((trialNo <= 3)) {
        msg_thisTrialNum = ("Practice No." + trialNo.toString());
    } else {
        if ((trialNo > 3)) {
            msg_thisTrialNum = ("Trial No." + (trialNo - 3).toString());
        }
    }
    
    msgTrialNum.setText(msg_thisTrialNum);
    // keep track of which components have finished
    trialNumberComponents = [];
    trialNumberComponents.push(msgTrialNum);
    
    trialNumberComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function trialNumberRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trialNumber' ---
    // get current time
    t = trialNumberClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *msgTrialNum* updates
    if (t >= 0.8 && msgTrialNum.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgTrialNum.tStart = t;  // (not accounting for frame time here)
      msgTrialNum.frameNStart = frameN;  // exact frame index
      
      msgTrialNum.setAutoDraw(true);
    }

    frameRemains = 0.8 + 0.8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msgTrialNum.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msgTrialNum.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    trialNumberComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trialNumberRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trialNumber' ---
    trialNumberComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var currSeqAll;
var numEle;
var break_to_next_trial;
var prepareSeqComponents;
function prepareSeqRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'prepareSeq' ---
    t = 0;
    prepareSeqClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from codePrepareSeq
    console.log(seqMat)
    currSeqAll = seqMat[block.thisRepN];
    numEle = 1;
    break_to_next_trial = 0;
    
    // keep track of which components have finished
    prepareSeqComponents = [];
    
    prepareSeqComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function prepareSeqRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'prepareSeq' ---
    // get current time
    t = prepareSeqClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    prepareSeqComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function prepareSeqRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'prepareSeq' ---
    prepareSeqComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "prepareSeq" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var blankComponents;
function blankRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'blank' ---
    t = 0;
    blankClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.800000);
    // update component parameters for each repeat
    // keep track of which components have finished
    blankComponents = [];
    blankComponents.push(picBlank);
    blankComponents.push(letter_up);
    blankComponents.push(letter_right);
    blankComponents.push(letter_down);
    blankComponents.push(letter_left);
    
    blankComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function blankRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'blank' ---
    // get current time
    t = blankClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *picBlank* updates
    if (t >= 0.0 && picBlank.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      picBlank.tStart = t;  // (not accounting for frame time here)
      picBlank.frameNStart = frameN;  // exact frame index
      
      picBlank.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (picBlank.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      picBlank.setAutoDraw(false);
    }
    
    // *letter_up* updates
    if (t >= 0.0 && letter_up.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_up.tStart = t;  // (not accounting for frame time here)
      letter_up.frameNStart = frameN;  // exact frame index
      
      letter_up.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_up.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_up.setAutoDraw(false);
    }
    
    // *letter_right* updates
    if (t >= 0.0 && letter_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_right.tStart = t;  // (not accounting for frame time here)
      letter_right.frameNStart = frameN;  // exact frame index
      
      letter_right.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_right.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_right.setAutoDraw(false);
    }
    
    // *letter_down* updates
    if (t >= 0.0 && letter_down.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_down.tStart = t;  // (not accounting for frame time here)
      letter_down.frameNStart = frameN;  // exact frame index
      
      letter_down.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_down.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_down.setAutoDraw(false);
    }
    
    // *letter_left* updates
    if (t >= 0.0 && letter_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_left.tStart = t;  // (not accounting for frame time here)
      letter_left.frameNStart = frameN;  // exact frame index
      
      letter_left.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_left.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    blankComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function blankRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'blank' ---
    blankComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var currIdx_origin;
var currPic;
var currVoice;
var prepare_stimComponents;
function prepare_stimRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'prepare_stim' ---
    t = 0;
    prepare_stimClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.400000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from genStim
    // get current idx list from currSeqAll
    currIdx_origin = currSeqAll[aTry_stim.thisRepN];
    
    // convert to new seq idx
    let intend_letter = text_origin[currIdx_origin];
    let currIdx = util.index(text_list, intend_letter);
    
    currPic = idx_to_pic[currIdx];
    currVoice = idx_to_voice[currIdx];
    
    // keep track of which components have finished
    prepare_stimComponents = [];
    prepare_stimComponents.push(blankBetweenStim_2);
    prepare_stimComponents.push(msgPlaying_2);
    prepare_stimComponents.push(ISI_before_stim);
    prepare_stimComponents.push(letter_up_2);
    prepare_stimComponents.push(letter_right_3);
    prepare_stimComponents.push(letter_down_2);
    prepare_stimComponents.push(letter_left_2);
    
    prepare_stimComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function prepare_stimRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'prepare_stim' ---
    // get current time
    t = prepare_stimClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *blankBetweenStim_2* updates
    if (t >= 0 && blankBetweenStim_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blankBetweenStim_2.tStart = t;  // (not accounting for frame time here)
      blankBetweenStim_2.frameNStart = frameN;  // exact frame index
      
      blankBetweenStim_2.setAutoDraw(true);
    }

    frameRemains = 0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (blankBetweenStim_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      blankBetweenStim_2.setAutoDraw(false);
    }
    
    // *msgPlaying_2* updates
    if (t >= 0.0 && msgPlaying_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgPlaying_2.tStart = t;  // (not accounting for frame time here)
      msgPlaying_2.frameNStart = frameN;  // exact frame index
      
      msgPlaying_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msgPlaying_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msgPlaying_2.setAutoDraw(false);
    }
    
    // *letter_up_2* updates
    if (t >= 0.0 && letter_up_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_up_2.tStart = t;  // (not accounting for frame time here)
      letter_up_2.frameNStart = frameN;  // exact frame index
      
      letter_up_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_up_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_up_2.setAutoDraw(false);
    }
    
    // *letter_right_3* updates
    if (t >= 0.0 && letter_right_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_right_3.tStart = t;  // (not accounting for frame time here)
      letter_right_3.frameNStart = frameN;  // exact frame index
      
      letter_right_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_right_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_right_3.setAutoDraw(false);
    }
    
    // *letter_down_2* updates
    if (t >= 0.0 && letter_down_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_down_2.tStart = t;  // (not accounting for frame time here)
      letter_down_2.frameNStart = frameN;  // exact frame index
      
      letter_down_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_down_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_down_2.setAutoDraw(false);
    }
    
    // *letter_left_2* updates
    if (t >= 0.0 && letter_left_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_left_2.tStart = t;  // (not accounting for frame time here)
      letter_left_2.frameNStart = frameN;  // exact frame index
      
      letter_left_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_left_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_left_2.setAutoDraw(false);
    }
    if (t >= 0.0 && ISI_before_stim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ISI_before_stim.tStart = t;  // (not accounting for frame time here)
      ISI_before_stim.frameNStart = frameN;  // exact frame index
      
      ISI.status = PsychoJS.Status.STARTED;
      // Updating other components during *ISI_before_stim*
      console.log('register and start downloading resources specified by component picStim');
      await psychoJS.serverManager.prepareResources(currPic);
      picStim.status = PsychoJS.Status.STARTED;
      picStim.setImage(currPic)
      snd_voice.setSound(currVoice, secs=0.2)
      // Component updates done
    }
    frameRemains = 0.0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (ISI_before_stim.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (psychoJS.serverManager.getResourceStatus(currPic) === core.ServerManager.ResourceStatus.DOWNLOADED) {
        console.log('finished downloading resources specified by component ISI_before_stim');
      } else {
        console.log('resource specified in ISI_before_stim took longer than expected to download');
        await waitForResources(resources = currPic)
      }
      ISI.status = PsychoJS.Status.FINISHED;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    prepare_stimComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function prepare_stimRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'prepare_stim' ---
    prepare_stimComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var stimPresentationComponents;
function stimPresentationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'stimPresentation' ---
    t = 0;
    stimPresentationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.200000);
    // update component parameters for each repeat
    snd_voice.secs=0.2;
    snd_voice.setVolume(1.0);
    // keep track of which components have finished
    stimPresentationComponents = [];
    stimPresentationComponents.push(picStim);
    stimPresentationComponents.push(msgPlaying);
    stimPresentationComponents.push(snd_voice);
    stimPresentationComponents.push(letter_up_3);
    stimPresentationComponents.push(letter_right_2);
    stimPresentationComponents.push(letter_down_3);
    stimPresentationComponents.push(letter_left_3);
    
    stimPresentationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function stimPresentationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'stimPresentation' ---
    // get current time
    t = stimPresentationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *picStim* updates
    if (t >= 0.0 && picStim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      picStim.tStart = t;  // (not accounting for frame time here)
      picStim.frameNStart = frameN;  // exact frame index
      
      picStim.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (picStim.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      picStim.setAutoDraw(false);
    }
    
    // *msgPlaying* updates
    if (t >= 0.0 && msgPlaying.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgPlaying.tStart = t;  // (not accounting for frame time here)
      msgPlaying.frameNStart = frameN;  // exact frame index
      
      msgPlaying.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msgPlaying.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msgPlaying.setAutoDraw(false);
    }
    // start/stop snd_voice
    if (t >= 0 && snd_voice.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      snd_voice.tStart = t;  // (not accounting for frame time here)
      snd_voice.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ snd_voice.play(); });  // screen flip
      snd_voice.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (snd_voice.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= snd_voice.tStart + 0.5) {
        snd_voice.stop();  // stop the sound (if longer than duration)
        snd_voice.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *letter_up_3* updates
    if (t >= 0.0 && letter_up_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_up_3.tStart = t;  // (not accounting for frame time here)
      letter_up_3.frameNStart = frameN;  // exact frame index
      
      letter_up_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_up_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_up_3.setAutoDraw(false);
    }
    
    // *letter_right_2* updates
    if (t >= 0.0 && letter_right_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_right_2.tStart = t;  // (not accounting for frame time here)
      letter_right_2.frameNStart = frameN;  // exact frame index
      
      letter_right_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_right_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_right_2.setAutoDraw(false);
    }
    
    // *letter_down_3* updates
    if (t >= 0.0 && letter_down_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_down_3.tStart = t;  // (not accounting for frame time here)
      letter_down_3.frameNStart = frameN;  // exact frame index
      
      letter_down_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_down_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_down_3.setAutoDraw(false);
    }
    
    // *letter_left_3* updates
    if (t >= 0.0 && letter_left_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_left_3.tStart = t;  // (not accounting for frame time here)
      letter_left_3.frameNStart = frameN;  // exact frame index
      
      letter_left_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_left_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_left_3.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    stimPresentationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function stimPresentationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'stimPresentation' ---
    stimPresentationComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    snd_voice.stop();  // ensure sound has stopped at end of routine
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var currCorIdx_origin;
var currCorIdx;
var currCorPress;
var _subjResp_allKeys;
var keyResponseComponents;
function keyResponseRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'keyResponse' ---
    t = 0;
    keyResponseClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code
    currCorIdx_origin = currSeqAll[aTry_resp.thisRepN];
    currCorIdx = util.index(text_list, text_origin[currCorIdx_origin]);
    currCorPress = idx_to_key[currCorIdx];
    
    subjResp.keys = undefined;
    subjResp.rt = undefined;
    _subjResp_allKeys = [];
    // keep track of which components have finished
    keyResponseComponents = [];
    keyResponseComponents.push(picFiller);
    keyResponseComponents.push(subjResp);
    keyResponseComponents.push(msgYourTurn);
    keyResponseComponents.push(letter_up_4);
    keyResponseComponents.push(letter_right_4);
    keyResponseComponents.push(letter_down_4);
    keyResponseComponents.push(letter_left_4);
    
    keyResponseComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function keyResponseRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'keyResponse' ---
    // get current time
    t = keyResponseClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *picFiller* updates
    if (t >= 0.0 && picFiller.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      picFiller.tStart = t;  // (not accounting for frame time here)
      picFiller.frameNStart = frameN;  // exact frame index
      
      picFiller.setAutoDraw(true);
    }

    
    // *subjResp* updates
    if (t >= 0.0 && subjResp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      subjResp.tStart = t;  // (not accounting for frame time here)
      subjResp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { subjResp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { subjResp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { subjResp.clearEvents(); });
    }

    if (subjResp.status === PsychoJS.Status.STARTED) {
      let theseKeys = subjResp.getKeys({keyList: ['right', 'left', 'up', 'down'], waitRelease: false});
      _subjResp_allKeys = _subjResp_allKeys.concat(theseKeys);
      if (_subjResp_allKeys.length > 0) {
        subjResp.keys = _subjResp_allKeys[_subjResp_allKeys.length - 1].name;  // just the last key pressed
        subjResp.rt = _subjResp_allKeys[_subjResp_allKeys.length - 1].rt;
        subjResp.duration = _subjResp_allKeys[_subjResp_allKeys.length - 1].duration;
        // was this correct?
        if (subjResp.keys == currCorPress) {
            subjResp.corr = 1;
        } else {
            subjResp.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *msgYourTurn* updates
    if (t >= 0.0 && msgYourTurn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgYourTurn.tStart = t;  // (not accounting for frame time here)
      msgYourTurn.frameNStart = frameN;  // exact frame index
      
      msgYourTurn.setAutoDraw(true);
    }

    
    // *letter_up_4* updates
    if (t >= 0.0 && letter_up_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_up_4.tStart = t;  // (not accounting for frame time here)
      letter_up_4.frameNStart = frameN;  // exact frame index
      
      letter_up_4.setAutoDraw(true);
    }

    
    // *letter_right_4* updates
    if (t >= 0.0 && letter_right_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_right_4.tStart = t;  // (not accounting for frame time here)
      letter_right_4.frameNStart = frameN;  // exact frame index
      
      letter_right_4.setAutoDraw(true);
    }

    
    // *letter_down_4* updates
    if (t >= 0.0 && letter_down_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_down_4.tStart = t;  // (not accounting for frame time here)
      letter_down_4.frameNStart = frameN;  // exact frame index
      
      letter_down_4.setAutoDraw(true);
    }

    
    // *letter_left_4* updates
    if (t >= 0.0 && letter_left_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_left_4.tStart = t;  // (not accounting for frame time here)
      letter_left_4.frameNStart = frameN;  // exact frame index
      
      letter_left_4.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    keyResponseComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function keyResponseRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'keyResponse' ---
    keyResponseComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // was no response the correct answer?!
    if (subjResp.keys === undefined) {
      if (['None','none',undefined].includes(currCorPress)) {
         subjResp.corr = 1;  // correct non-response
      } else {
         subjResp.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(subjResp.corr, level);
    }
    psychoJS.experiment.addData('subjResp.keys', subjResp.keys);
    psychoJS.experiment.addData('subjResp.corr', subjResp.corr);
    if (typeof subjResp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('subjResp.rt', subjResp.rt);
        psychoJS.experiment.addData('subjResp.duration', subjResp.duration);
        routineTimer.reset();
        }
    
    subjResp.stop();
    // the Routine "keyResponse" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var idxCurrPressed;
var picCurrPressedKey;
var voiceCurrPressedKey;
var before_effectComponents;
function before_effectRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'before_effect' ---
    t = 0;
    before_effectClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.100000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_5
    idxCurrPressed = util.index(idx_to_key, subjResp.keys);
    picCurrPressedKey = idx_to_pic[idxCurrPressed];
    voiceCurrPressedKey = idx_to_voice[idxCurrPressed];
    
    // keep track of which components have finished
    before_effectComponents = [];
    before_effectComponents.push(picFiller_2);
    before_effectComponents.push(msgYourTurn_3);
    before_effectComponents.push(ISI_before_effect);
    before_effectComponents.push(letter_up_5);
    before_effectComponents.push(letter_right_5);
    before_effectComponents.push(letter_down_5);
    before_effectComponents.push(letter_left_5);
    
    before_effectComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function before_effectRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'before_effect' ---
    // get current time
    t = before_effectClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *picFiller_2* updates
    if (t >= 0 && picFiller_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      picFiller_2.tStart = t;  // (not accounting for frame time here)
      picFiller_2.frameNStart = frameN;  // exact frame index
      
      picFiller_2.setAutoDraw(true);
    }

    frameRemains = 0 + 0.1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (picFiller_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      picFiller_2.setAutoDraw(false);
    }
    
    // *msgYourTurn_3* updates
    if (t >= 0.0 && msgYourTurn_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgYourTurn_3.tStart = t;  // (not accounting for frame time here)
      msgYourTurn_3.frameNStart = frameN;  // exact frame index
      
      msgYourTurn_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msgYourTurn_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msgYourTurn_3.setAutoDraw(false);
    }
    
    // *letter_up_5* updates
    if (t >= 0.0 && letter_up_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_up_5.tStart = t;  // (not accounting for frame time here)
      letter_up_5.frameNStart = frameN;  // exact frame index
      
      letter_up_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_up_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_up_5.setAutoDraw(false);
    }
    
    // *letter_right_5* updates
    if (t >= 0.0 && letter_right_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_right_5.tStart = t;  // (not accounting for frame time here)
      letter_right_5.frameNStart = frameN;  // exact frame index
      
      letter_right_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_right_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_right_5.setAutoDraw(false);
    }
    
    // *letter_down_5* updates
    if (t >= 0.0 && letter_down_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_down_5.tStart = t;  // (not accounting for frame time here)
      letter_down_5.frameNStart = frameN;  // exact frame index
      
      letter_down_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_down_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_down_5.setAutoDraw(false);
    }
    
    // *letter_left_5* updates
    if (t >= 0.0 && letter_left_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_left_5.tStart = t;  // (not accounting for frame time here)
      letter_left_5.frameNStart = frameN;  // exact frame index
      
      letter_left_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_left_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_left_5.setAutoDraw(false);
    }
    if (t >= 0.0 && ISI_before_effect.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ISI_before_effect.tStart = t;  // (not accounting for frame time here)
      ISI_before_effect.frameNStart = frameN;  // exact frame index
      
      ISI.status = PsychoJS.Status.STARTED;
      // Updating other components during *ISI_before_effect*
      console.log('register and start downloading resources specified by component picPressedKey');
      await psychoJS.serverManager.prepareResources(picCurrPressedKey);
      picPressedKey.status = PsychoJS.Status.STARTED;
      picPressedKey.setImage(picCurrPressedKey)
      snd_beep_effect.setSound(voiceCurrPressedKey, secs=0.2)
      // Component updates done
    }
    frameRemains = 0.0 + 0.1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (ISI_before_effect.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (psychoJS.serverManager.getResourceStatus(picCurrPressedKey) === core.ServerManager.ResourceStatus.DOWNLOADED) {
        console.log('finished downloading resources specified by component ISI_before_effect');
      } else {
        console.log('resource specified in ISI_before_effect took longer than expected to download');
        await waitForResources(resources = picCurrPressedKey)
      }
      ISI.status = PsychoJS.Status.FINISHED;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    before_effectComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function before_effectRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'before_effect' ---
    before_effectComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from code_5
    if ((subjResp.corr === 0)) {
        break_to_next_trial = 1;
        aTry_resp.finished = true;
    }
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var keyPressEffectComponents;
function keyPressEffectRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'keyPressEffect' ---
    t = 0;
    keyPressEffectClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.200000);
    // update component parameters for each repeat
    snd_beep_effect.secs=0.2;
    snd_beep_effect.setVolume(1.0);
    // keep track of which components have finished
    keyPressEffectComponents = [];
    keyPressEffectComponents.push(picPressedKey);
    keyPressEffectComponents.push(msgYourTurn_2);
    keyPressEffectComponents.push(snd_beep_effect);
    keyPressEffectComponents.push(letter_up_6);
    keyPressEffectComponents.push(letter_right_6);
    keyPressEffectComponents.push(letter_down_6);
    keyPressEffectComponents.push(letter_left_6);
    
    keyPressEffectComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function keyPressEffectRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'keyPressEffect' ---
    // get current time
    t = keyPressEffectClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *picPressedKey* updates
    if (t >= 0.0 && picPressedKey.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      picPressedKey.tStart = t;  // (not accounting for frame time here)
      picPressedKey.frameNStart = frameN;  // exact frame index
      
      picPressedKey.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (picPressedKey.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      picPressedKey.setAutoDraw(false);
    }
    
    // *msgYourTurn_2* updates
    if (t >= 0 && msgYourTurn_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgYourTurn_2.tStart = t;  // (not accounting for frame time here)
      msgYourTurn_2.frameNStart = frameN;  // exact frame index
      
      msgYourTurn_2.setAutoDraw(true);
    }

    frameRemains = 0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msgYourTurn_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msgYourTurn_2.setAutoDraw(false);
    }
    // start/stop snd_beep_effect
    if (t >= 0.0 && snd_beep_effect.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      snd_beep_effect.tStart = t;  // (not accounting for frame time here)
      snd_beep_effect.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ snd_beep_effect.play(); });  // screen flip
      snd_beep_effect.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (snd_beep_effect.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= snd_beep_effect.tStart + 0.5) {
        snd_beep_effect.stop();  // stop the sound (if longer than duration)
        snd_beep_effect.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *letter_up_6* updates
    if (t >= 0.0 && letter_up_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_up_6.tStart = t;  // (not accounting for frame time here)
      letter_up_6.frameNStart = frameN;  // exact frame index
      
      letter_up_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_up_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_up_6.setAutoDraw(false);
    }
    
    // *letter_right_6* updates
    if (t >= 0.0 && letter_right_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_right_6.tStart = t;  // (not accounting for frame time here)
      letter_right_6.frameNStart = frameN;  // exact frame index
      
      letter_right_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_right_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_right_6.setAutoDraw(false);
    }
    
    // *letter_down_6* updates
    if (t >= 0.0 && letter_down_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_down_6.tStart = t;  // (not accounting for frame time here)
      letter_down_6.frameNStart = frameN;  // exact frame index
      
      letter_down_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_down_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_down_6.setAutoDraw(false);
    }
    
    // *letter_left_6* updates
    if (t >= 0.0 && letter_left_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      letter_left_6.tStart = t;  // (not accounting for frame time here)
      letter_left_6.frameNStart = frameN;  // exact frame index
      
      letter_left_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (letter_left_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      letter_left_6.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    keyPressEffectComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function keyPressEffectRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'keyPressEffect' ---
    keyPressEffectComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    snd_beep_effect.stop();  // ensure sound has stopped at end of routine
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var add_numEleComponents;
function add_numEleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'add_numEle' ---
    t = 0;
    add_numEleClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from numElePlus1
    numEle += 1;
    if ((break_to_next_trial === 1)) {
        aTry_thisTime.finished = true;
    }
    
    // keep track of which components have finished
    add_numEleComponents = [];
    
    add_numEleComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function add_numEleRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'add_numEle' ---
    // get current time
    t = add_numEleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    add_numEleComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function add_numEleRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'add_numEle' ---
    add_numEleComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "add_numEle" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var msg_feedback;
var color_feedback;
var feedbackComponents;
function feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback' ---
    t = 0;
    feedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.750000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_4
    if ((break_to_next_trial === 1)) {
        msg_feedback = "Error!";
        color_feedback = [1, 0, 0];
    } else {
        msg_feedback = "Well Done!";
        color_feedback = [0, 1, 0];
    }
    
    msgFeedback_2.setColor(new util.Color(color_feedback));
    msgFeedback_2.setText(msg_feedback);
    // keep track of which components have finished
    feedbackComponents = [];
    feedbackComponents.push(msgFeedback_2);
    
    feedbackComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feedbackRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'feedback' ---
    // get current time
    t = feedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *msgFeedback_2* updates
    if (t >= 0.0 && msgFeedback_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgFeedback_2.tStart = t;  // (not accounting for frame time here)
      msgFeedback_2.frameNStart = frameN;  // exact frame index
      
      msgFeedback_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.75 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msgFeedback_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msgFeedback_2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feedbackComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedbackRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback' ---
    feedbackComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var next_trial_msg;
var next_trial_color;
var _key_end_rest_allKeys;
var feedback_and_restComponents;
function feedback_and_restRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback_and_rest' ---
    t = 0;
    feedback_and_restClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_3
    if ((trialNo === nTrial)) {
        continueRoutine = false;
    }
    if ((trialNo === 3)) {
        next_trial_msg = "You have now finished the practice trials and are ready to start the formal experiment! Press space when you are ready to begin.";
        next_trial_color = [1, 0, 0];
    } else {
        next_trial_msg = "Please press space to start next trial.";
        next_trial_color = [1, 1, 1];
    }
    
    msg_end_rest.setColor(new util.Color(next_trial_color));
    msg_end_rest.setText(next_trial_msg);
    key_end_rest.keys = undefined;
    key_end_rest.rt = undefined;
    _key_end_rest_allKeys = [];
    // keep track of which components have finished
    feedback_and_restComponents = [];
    feedback_and_restComponents.push(msg_rest);
    feedback_and_restComponents.push(msg_end_rest);
    feedback_and_restComponents.push(key_end_rest);
    
    feedback_and_restComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feedback_and_restRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'feedback_and_rest' ---
    // get current time
    t = feedback_and_restClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *msg_rest* updates
    if (t >= 0 && msg_rest.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msg_rest.tStart = t;  // (not accounting for frame time here)
      msg_rest.frameNStart = frameN;  // exact frame index
      
      msg_rest.setAutoDraw(true);
    }

    frameRemains = 0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msg_rest.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msg_rest.setAutoDraw(false);
    }
    
    if (msg_rest.status === PsychoJS.Status.STARTED){ // only update if being drawn
      msg_rest.setText((("Please rest for at least " + (11 - util.round(t)).toString()) + " more seconds."), false);
    }
    
    // *msg_end_rest* updates
    if (t >= 10.0 && msg_end_rest.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msg_end_rest.tStart = t;  // (not accounting for frame time here)
      msg_end_rest.frameNStart = frameN;  // exact frame index
      
      msg_end_rest.setAutoDraw(true);
    }

    
    // *key_end_rest* updates
    if (t >= 10.0 && key_end_rest.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_end_rest.tStart = t;  // (not accounting for frame time here)
      key_end_rest.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_end_rest.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_end_rest.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_end_rest.clearEvents(); });
    }

    if (key_end_rest.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_end_rest.getKeys({keyList: ['space'], waitRelease: false});
      _key_end_rest_allKeys = _key_end_rest_allKeys.concat(theseKeys);
      if (_key_end_rest_allKeys.length > 0) {
        key_end_rest.keys = _key_end_rest_allKeys[_key_end_rest_allKeys.length - 1].name;  // just the last key pressed
        key_end_rest.rt = _key_end_rest_allKeys[_key_end_rest_allKeys.length - 1].rt;
        key_end_rest.duration = _key_end_rest_allKeys[_key_end_rest_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feedback_and_restComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedback_and_restRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback_and_rest' ---
    feedback_and_restComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_end_rest.corr, level);
    }
    psychoJS.experiment.addData('key_end_rest.keys', key_end_rest.keys);
    if (typeof key_end_rest.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_end_rest.rt', key_end_rest.rt);
        psychoJS.experiment.addData('key_end_rest.duration', key_end_rest.duration);
        routineTimer.reset();
        }
    
    key_end_rest.stop();
    // the Routine "feedback_and_rest" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var endPageComponents;
function endPageRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'endPage' ---
    t = 0;
    endPageClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(3.000000);
    // update component parameters for each repeat
    document.body.style.cursor='auto';
    // keep track of which components have finished
    endPageComponents = [];
    endPageComponents.push(msgEnd);
    
    endPageComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function endPageRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'endPage' ---
    // get current time
    t = endPageClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *msgEnd* updates
    if (t >= 0.0 && msgEnd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      msgEnd.tStart = t;  // (not accounting for frame time here)
      msgEnd.frameNStart = frameN;  // exact frame index
      
      msgEnd.setAutoDraw(true);
    }

    frameRemains = 0.0 + 3.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (msgEnd.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      msgEnd.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    endPageComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function endPageRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'endPage' ---
    endPageComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var debriefing;
var debriefingClock;
function debriefingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'debriefing' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    //--- Starting Routine 'debriefing' ---
    debriefing = new visual.Survey({
        win: psychoJS.window,
        name: 'debriefing',
        model: 'survey_debriefing.json',
    });
    debriefingClock = new util.Clock();
    debriefing.setAutoDraw(true);
    debriefing.status = PsychoJS.Status.STARTED;
    debriefing.isFinished = false;
    debriefing.tStart = t;  // (not accounting for frame time here)
    debriefing.frameNStart = frameN;  // exact frame index
    return Scheduler.Event.NEXT;
  }
}


function debriefingRoutineEachFrame() {
  return async function () {
    t = debriefingClock.getTime();
    frameN = frameN + 1;  // number of completed frames (so 0 is the first frame)
    // if debriefing is completed, move on
    if (debriefing.isFinished) {
      debriefing.setAutoDraw(false);
      debriefing.status = PsychoJS.Status.FINISHED;
      // survey routines are not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      return Scheduler.Event.NEXT;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    return Scheduler.Event.FLIP_REPEAT;
  }
}


function debriefingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'debriefing' ---
    // get data from debriefing
    const debriefingResponse =  debriefing.getResponse();
    for (const question in debriefingResponse) {
      psychoJS.experiment.addData(`debriefing.${question}`, debriefingResponse[question]);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
