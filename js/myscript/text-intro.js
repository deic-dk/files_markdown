//Used to store any setTimeout to clear them on exit
const timeOuts = [];
let randomString;

function createCustomNextButton() {
  const myNextButton = document.createElement('div');
  myNextButton.innerHTML = 'Next <svg class="icn"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-rarr"></use></svg>';
  myNextButton.classList.add('introjs-button');
  myNextButton.classList.add('introjs-nextbutton');
  return myNextButton;
}

function createReplayButton() {
  const myNextButton = document.createElement('div');
  myNextButton.innerHTML = 'Replay ';
  myNextButton.classList.add('introjs-button');
  myNextButton.classList.add('introjs-replaybutton');
  myNextButton.classList.add('isDisabled');
  return myNextButton;
}

function addOptOut() {
  const optOutDiv = document.createElement('div');
  optOutDiv.id = 'opt-out-div';
  optOutDiv.classList.add('pretty');
  optOutDiv.classList.add('p-default');
  optOutDiv.classList.add('p-curve');
  optOutDiv.classList.add('p-thick');
  const optOutInput = document.createElement('input');
  optOutInput.id = 'opt-out-input';
  optOutInput.type = 'checkbox';

  const optOutInnerDiv = document.createElement('div');
  optOutInnerDiv.classList.add('state');
  optOutInnerDiv.classList.add('p-primary-o');

  const optOutLabel = document.createElement('label');
  optOutLabel.setAttribute('for', 'opt-out-input');
  optOutLabel.innerText = 'Don\'t show me this tutorial again';
  optOutDiv.appendChild(optOutInput);
  optOutInnerDiv.appendChild(optOutLabel);
  optOutDiv.appendChild(optOutInnerDiv);
  document.querySelector('div.introjs-tooltipReferenceLayer > div').appendChild(optOutDiv);
  if (localStorage.getItem("tutorialLaunched") === 'true') {
    document.querySelector('#opt-out-div > div > label').click();
  }
}

function importInk(editor, ink, inkMobile, lastOneDuration) {
  const mq = window.matchMedia("(max-device-width : 480px)");
  if (inkMobile && mq.matches) {
    editor.editor.eastereggs.inkImporter(editor.editor, inkMobile, 20, lastOneDuration);
  } else {
    editor.editor.eastereggs.inkImporter(editor.editor, ink, 20, lastOneDuration);
  }
}

function writeGestures(editor, editorSvg, ink, inkMobile, lastOneDuration) {
  if (document.querySelector('.introjs-replaybutton')) {
    document.querySelector('.introjs-tooltipbuttons').removeChild(document.querySelector('.introjs-replaybutton'));
  }
  editor.editor.clear();
  editorSvg.style.backgroundImage = 'none';
  const replayButton = createReplayButton();
  document.querySelector('.introjs-tooltipbuttons').insertBefore(replayButton, document.querySelector('.introjs-nextbutton'));
  document.querySelector('.introjs-nextbutton').classList.add('isDisabled');
  replayButton.addEventListener('click', function () {
    editor.editor.clear();
    document.querySelector('.introjs-nextbutton').classList.add('isDisabled');
    document.querySelector('.introjs-replaybutton').classList.add('isDisabled');
    timeOuts.push(setTimeout(function () {
      importInk(editor, ink, inkMobile, lastOneDuration);
    }, 500));
  });
  timeOuts.push(setTimeout(function () {
    editorSvg.style.backgroundImage = 'linear-gradient(to right,#f5f6f7 1px,transparent 1px),linear-gradient(to bottom,#f5f6f7 1px,transparent 1px)';
    importInk(editor, ink, inkMobile, lastOneDuration);
  }, 500));
}

function introjsEditor(enteredEditor) {
  const editorSvg = document.querySelector('#editor.ms-editor>svg[data-layer=BACKGROUND]');
  const editor = document.querySelector('#editor.ms-editor');
  //document.querySelector('.introjs-helperLayer').style.backgroundColor = '#fff';
  document.querySelector('.introjs-helperLayer').style.backgroundColor = 'transparent';
  document.querySelector('.introjs-nextbutton').style.display = 'inline-block';
  switch (enteredEditor) {
    case 0:
      writeGestures(editor, editorSvg, SIMPLE_TEXT, SIMPLE_TEXT_MOBILE, 1000);
      break;
    case 2:
      writeGestures(editor, editorSvg, ERASE_LETTER, null, 1000);
      break;
    case 3:
      writeGestures(editor, editorSvg, ERASE_WORD, null, 1000);
      break;
    case 4:
      writeGestures(editor, editorSvg, BREAK_WORD, BREAK_WORD_MOBILE, 1000);
      break;
    case 5:
      writeGestures(editor, editorSvg, BREAK_LINE, null, 1000);
      break;
    case 6:
      writeGestures(editor, editorSvg, JOIN_WORD, null, 1000);
      break;
    case 7:
      writeGestures(editor, editorSvg, JOIN_LINE, null, 1000);
      break;
    default:
      editorSvg.style.display = 'none';
      document.querySelector('.introjs-nextbutton').classList.remove('isDisabled');
      timeOuts.push(setTimeout(function () {
        editorSvg.style.display = 'initial';
      }, 300));
  }
}

function introjsSmartGuide(intro, enteredSmartGuide) {
  //document.querySelector('.introjs-helperLayer').style.backgroundColor = 'rgba(255,255,255,.9)';
  document.querySelector('.introjs-helperLayer').style.backgroundColor = 'transparent';
  document.querySelector('.introjs-nextbutton').style.display = 'inline-block';
  if (enteredSmartGuide === 1) {
    // We hide the next button and place our next button to assign click
    document.querySelector('.introjs-nextbutton').style.display = 'none';
    const customNext = createCustomNextButton();
    document.querySelector('.introjs-tooltipbuttons').appendChild(customNext);
    customNext.addEventListener('click', function () {
      document.getElementById(`word-0${randomString}`).click();
      intro.nextStep();
      document.querySelector('.introjs-tooltipbuttons').removeChild(customNext);
    });
  }
}

function introjsCandidates(intro) {
  document.querySelector('.introjs-nextbutton').style.display = 'none';
  const customNext = createCustomNextButton();
  document.querySelector('.introjs-tooltipbuttons').appendChild(customNext);
  customNext.addEventListener('click', function () {
    document.getElementById(`candidates${randomString}`).childNodes[1].style.backgroundColor = '#E0E0E0';
    timeOuts.push(setTimeout(function () {
      document.getElementById(`candidates${randomString}`).childNodes[1].style.backgroundColor = '#F5F5F5';
    }, 100));
    timeOuts.push(setTimeout(function () {
      document.getElementById(`candidates${randomString}`).childNodes[1].click();
      intro.nextStep();
      document.querySelector('.introjs-tooltipbuttons').removeChild(customNext);
    }, 200));
  });
}

function introjsEllipsis(intro) {
  document.querySelector('.introjs-nextbutton').style.display = 'none';
  const customNext = createCustomNextButton();
  document.querySelector('.introjs-tooltipbuttons').appendChild(customNext);
  customNext.addEventListener('click', function () {
    document.getElementById(`ellipsis${randomString}`).click();
    intro.nextStep();
    document.querySelector('.introjs-tooltipbuttons').removeChild(customNext);
  });
}

function introjsMoreMenu(intro) {
  document.querySelector('.introjs-nextbutton').style.display = 'none';
  const customNext = createCustomNextButton();
  document.querySelector('.introjs-tooltipbuttons').appendChild(customNext);
  customNext.addEventListener('click', function () {
    document.getElementById(`convert${randomString}`).style.backgroundColor = '#E0E0E0';
    timeOuts.push(setTimeout(function () {
      document.getElementById(`convert${randomString}`).style.backgroundColor = '#F5F5F5';
    }, 100));
    timeOuts.push(setTimeout(function () {
      document.getElementById(`convert${randomString}`).removeAttribute('style');
      document.getElementById(`convert${randomString}`).click();
      intro.nextStep();
      document.querySelector('.introjs-tooltipbuttons').removeChild(customNext);
    }, 200));
  });
}

function hideHelp() {
  document.querySelector('#help-div').style.display = 'none';
  document.querySelector('#help-overlay').style.opacity = '0';
  document.querySelector('#help-overlay').style.visibility = 'hidden';
}

function changeToDefaultLanguage() {
  const editorElement = document.querySelector('#editor.ms-editor');

  const configuration = editorElement.editor.configuration;
  if (configuration.recognitionParams.v4.lang !== 'en_US') {
    configuration.recognitionParams.v4.lang = 'en_US';
    editorElement.editor.configuration = configuration;
    document.getElementById('language').value = 'en_US';
  }
}

function startIntro(rootElement) {
  changeToDefaultLanguage();
  hideHelp();
  
  $('.ui-widget-overlay').hide();
  $('#editor.ace_editor').hide();
  if($('#preview_wrapper:visible').length){
    $('#preview_wrapper').hide();
    $('#preview_wrapper').attr('reshow', 'true');
  }

  document.addEventListener('drawEnded', () => {
    if (document.querySelector('.introjs-nextbutton')) {
      document.querySelector('.introjs-nextbutton').classList.remove('isDisabled');
    }
    if (document.querySelector('.introjs-replaybutton')) {
      document.querySelector('.introjs-replaybutton').classList.remove('isDisabled');
    }
  });

  document.querySelector('#editor.ms-editor').editor.clear();
  const intro = introJs(rootElement);
  randomString = document.querySelector('#editor.ms-editor').editor.smartGuide.randomString;
  intro.setOptions(
    {
      steps: [
        {
          intro: "<h3>Welcome to the guided tour</h3> During this tutorial, you will learn how to use the MyScript text editor. You just have to click on the next button when you're ready to go!",
          tooltipClass: 'main-tooltip'
        },
        {
          element: document.querySelector('#language'),
          intro: "<h3>Languages</h3> The Interactive Ink SDK currently supports 65 languages. Select your language before writing to get the correct recognition. For this tutorial, we will use English.",
          tooltipClass: 'main-tooltip'
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Handwriting</h3> This area is the editor. For the purpose of the tutorial, we will write something for you.",
          tooltipClass: 'handwriting-tooltip',
        },
        {
          element: document.querySelector('#smartguide' + randomString),
          intro: "<h3>Smart guide</h3> The smart guide shows you the recognized text in real time and can help you in several ways."
        },
        {
          element: document.querySelector('#smartguide' + randomString),
          intro: "<h3>Change a word</h3> The first thing you can do using the smart guide is to change a word by clicking on it. We will click on the first one."
        },
        {
          element: document.querySelector('#candidates' + randomString),
          intro: "<h3>Change a word</h3> After the click, you can use the suggested words in the list to change the original recognition. We will click on <b>Hello</b>.",
        },
        {
          element: document.querySelector('#smartguide' + randomString),
          intro: "<h3>Change a word</h3> The smart guide is now updated and the recognition change saved for this word."
        },
        {
          element: document.querySelector('#ellipsis' + randomString),
          intro: "<h3>Actions menu</h3> You can convert, copy or delete your text using the actions menu on the right."
        },
        {
          element: document.querySelector('#more-menu' + randomString),
          intro: "<h3>Convert</h3> We'll convert the handwritten text into typeset using the <b>Convert</b> button."
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Gestures</h3> The editor allows you to use various gestures in order to modify your text.",
          tooltipClass: 'main-tooltip'
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Erase</h3> You can easily erase letters by scratching them out thoroughly.",
          tooltipClass: 'handwriting-tooltip',
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Erase</h3> You can also erase one word or several words.",
          tooltipClass: 'handwriting-tooltip',
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Break</h3> You can break a word using a straight line going down. Start from above the characters and end well below the baseline.",
          tooltipClass: 'handwriting-tooltip',
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Break</h3> To break a line, use the same gesture between words.",
          tooltipClass: 'handwriting-tooltip',
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Join</h3> You can join two words using a straight line going up. Start well below the baseline and end above the characters.",
          tooltipClass: 'handwriting-tooltip',
        },
        {
          element: document.querySelector('#editor.ms-editor'),
          intro: "<h3>Join</h3> To join two lines, use the same gesture at the end of a line.",
          tooltipClass: 'handwriting-tooltip',
        },
        {
          intro: "<h3>The end</h3> Have fun! Click on the <img src=\"../../../apps/files_markdown/img/myscript/info.svg\"/> at the top right of the page to get more information or to relaunch the tutorial!",
          tooltipClass: 'main-tooltip'
        }
      ],
      'keyboardNavigation': false,
      'disableInteraction': true,
      'showProgress': true,
      'exitOnOverlayClick': false,
      'showStepNumbers': false,
      'showBullets': false,
      'skipLabel': 'Exit',
      'nextLabel': 'Next <svg class="icn"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-rarr"></use></svg>'
    });

  intro.start();
  addOptOut();

  let enteredSmartGuide = 0;
  let enteredEditor = 0;


  intro.onafterchange(function (targetElement) {
    if (document.querySelector('#opt-out-div')) {
      document.querySelector('#opt-out-div').remove();
    }
    if (targetElement.id === 'editor') {
      introjsEditor(enteredEditor);
      enteredEditor++;
    } else if (targetElement.id === `smartguide${randomString}`) {
      introjsSmartGuide(intro, enteredSmartGuide);
      enteredSmartGuide++;
    } else if (targetElement.id === `candidates${randomString}`) {
      introjsCandidates(intro);
    }
    else if (targetElement.id === `ellipsis${randomString}`) {
      introjsEllipsis(intro);
    } else if (targetElement.id === `more-menu${randomString}`) {
      introjsMoreMenu(intro);
    }
    if (this._currentStep === this._introItems.length - 1) {
      document.querySelector('#editor.ms-editor').editor.clear();
      document.querySelector('.introjs-replaybutton').style.display = 'none';
      document.querySelector('.introjs-nextbutton').style.display = 'none';
      addOptOut();
    }
  });

  intro.onbeforeexit(function () {
    if (document.querySelector('#opt-out-input') && document.querySelector('#opt-out-input').checked === true) {
      localStorage.setItem("tutorialLaunched", 'true');
    } else if (document.querySelector('#opt-out-input') && document.querySelector('#opt-out-input').checked === false) {
      localStorage.removeItem("tutorialLaunched");
    }
  });

  intro.onexit(function () {
    window.scrollTo(0, 0);
    for (const timeOutToClear of timeOuts) {
      clearTimeout(timeOutToClear);
    }
    $('.ui-widget-overlay').show();
    $('#editor.ace_editor').show();
    if($('#preview_wrapper[reshow=true]').length){
    	$('#preview_wrapper').removeAttr('reshow')
      $('#preview_wrapper').show();
    }
  });
}