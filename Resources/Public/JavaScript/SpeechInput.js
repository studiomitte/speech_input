/**
 * Module: TYPO3/CMS/SpechInput/SpechInput
 */
define(['jquery'], function ($) {
  'use strict';

  try {
    var recognizing = false;
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    SpeechRecognition.continuous = true;
    SpeechRecognition.interimResults = true;
    // SpeechRecognition.lang = 'de-DE'; // fallback to body html attribute > fallback to user agent
    var recognition = new SpeechRecognition();

    var focusElement;
    $('.speech-action').first().on('click', function (e) {
      if (recognizing) {
        recognition.stop();
        recognizing = false;
      } else {
        recognition.start();
        recognizing = true;
      }
      $(this).toggleClass('speech-action--active');
    });

    recognition.onstart = function () {
      recognizing = true;
    };

    recognition.onend = function () {
      recognition.start();
      recognizing = true;
    };

    recognition.onerror = function (event) {
      recognizing = false;
    };


    recognition.onresult = function (event) {
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript;

      // console.log(transcript);
      var targetElement = $(document.activeElement);
      if (
        (targetElement.get(0).tagName === 'INPUT' && $(targetElement).attr('type') === 'text')
        || targetElement.get(0).tagName === 'TEXTAREA'
      ) {
        targetElement.val(transcript);
      }
    }

  } catch (e) {
    console.error(e);
    $('.speech-action').hide();
  }
});


