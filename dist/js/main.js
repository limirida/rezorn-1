"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var leadForm = /*#__PURE__*/function () {
  function leadForm(_ref) {
    var selector = _ref.selector,
        callback = _ref.callback;

    _classCallCheck(this, leadForm);

    this.selector = selector ? selector : '.lead-form';
    this.callback = callback ? callback : function (m) {
      alert(m);
    };
    this.setFormListener();
  }

  _createClass(leadForm, [{
    key: "formListener",
    value: function formListener(e) {
      e.preventDefault();
      sendToTelegram(forms.formToMessage(e.currentTarget));
      forms.sendForm(e.currentTarget);
    }
  }, {
    key: "setFormListener",
    value: function setFormListener() {
      var _this = this;

      Array.from(document.querySelectorAll(this.selector)).forEach(function (form) {
        form.removeEventListener('submit', _this.formListener);
        form.addEventListener('submit', _this.formListener);
      });
    }
  }, {
    key: "showLoader",
    value: function showLoader(form) {
      var loader = document.createElement('div');
      loader.classList.add('lds-dual-ring');
      form.querySelector('button[type=submit]').prepend(loader);
    }
  }, {
    key: "hideLoader",
    value: function hideLoader(form) {
      var ring = form.querySelector('.lds-dual-ring');
      if (ring) ring.remove();
    }
  }, {
    key: "sendForm",
    value: function sendForm(form) {
      var _this2 = this;

      var formData = new FormData(form);
      this.showLoader(form);
      fetch('/php/callback.php', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
      }).then(function (resp) {
        resp.text().then(function (note) {
          _this2.hideLoader(form);

          if (note == 'ok' && form.dataset.sendok) {
            eval(form.dataset.sendok);
          } else if (form.dataset.senderror) {
            eval(form.dataset.senderror);
          } else _this2.callback(note);

          grecaptcha.customReset();
        });
      });
    }
  }, {
    key: "formToMessage",
    value: function formToMessage(form) {
      var formData = new FormData(form);
      var formKeys = formData.keys();
      var message = 'Request from site:\n';

      var _iterator = _createForOfIteratorHelper(formKeys),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;

          if (field !== 'recaptcha_response') {
            message += field + ': ' + formData.get(field) + '\n';
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return message;
    }
  }]);

  return leadForm;
}(); // Singleton


var forms = null;
document.addEventListener('DOMContentLoaded', function () {
  if (!forms) {
    forms = new leadForm({
      callback: function callback(note) {
        if (note == 'ok') {
          modal.open('#modal-thanks-node');
        } else {
          modal.open('#modal-error-node');
        }
      }
    });
  }
});
var lightbox = GLightbox({});
var glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0 // autoplay:3000

}).mount();
var glide = new Glide('.projects-glide', {
  type: 'carousel',
  startAt: 0 // autoplay:3000

}).mount();
var glide = new Glide('.gratitude-glide', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  focusAt: 'center'
}).mount();
var glide = new Glide('.reviews-glide', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  focusAt: 'center'
}).mount(); // glide.go('=2');
// var glide = new Glide('.gratitude__wrap', {
//   type: 'carousel',
//   startAt: 0,
//   // autoplay:3000
// }).mount()
// glide.mount()
///////////////////////////////////////////
//   const glideHealth = new Glide('.glide-health', {
//     //autoplay: 6000,
//     //hoverpause: true,
//     type: 'carousel',
//     perView: 1
// }).mount();
// const singleImage = document.querySelector('.glide-health__single-img');
// const imgText = document.querySelectorAll('.glide-health__text');
// glideHealth.on('move', function() {
//     singleImage.src = imgText[glideHealth.index].dataset.imageFade;
//     singleImage.classList.add('fadeIn', 'animated');
// });
// glideHealth.on('move.after', function() {
//     singleImage.classList.remove('fadeIn', 'animated');
// });

var openText = document.querySelector(".read-more__btn");
var readText = document.querySelector(".read-more");
openText.addEventListener("click", btnClick);

function btnClick() {
  console.log(readText.classList);

  if (readText.classList.contains("hidden")) {
    openText.textContent = "Скрыть текст";
  } else {
    openText.textContent = "Читать далее";
  }

  readText.classList.toggle("hidden");
}

$(document).on('click', '.search-button', function () {
  $(this).parent().parent().toggleClass('active');
});