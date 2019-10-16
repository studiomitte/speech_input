/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

/**
 * Module: TYPO3/CMS/Recordlist/UrlLinkHandler
 * URL link interaction
 */
define(['jquery'], function ($) {
  'use strict';

  try {
    var recognizing = false;
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    SpeechRecognition.continuous = true;
    SpeechRecognition.interimResults = true;
    SpeechRecognition.lang = 'de-DE';
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

      console.log(transcript);
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


