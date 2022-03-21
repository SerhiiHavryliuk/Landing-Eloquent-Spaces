/**
 * Created by Serhii on 10.11.2016.
 */
'use strict';

// =============================================================================
// форма регистрации Sign Up
// 
// dependencies:
//  - jQuery
// - lib/polyfiller.js
// - lib/shims/
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSignUp = function () {
    function FrondevoSignUp() {
        _classCallCheck(this, FrondevoSignUp);

        this.formRegSelector = '#form-sign-up';
        this.selectorFormRow = '.layout-forms-row';
        this.formInvalidRowClass = 'form-row-invalid';
        this.formValidRowClass = 'form-row-valid';
        this.formErrorWrapClass = 'form-error-message-wrap';
        this.formErrorWrapSelector = '.' + this.formErrorWrapClass;
        this.formErrorMessageClass = 'form-error-message';
        this.formErrorMessageSelector = '.' + this.formErrorMessageClass;

        this._eventHandlersInit();
    }

    _createClass(FrondevoSignUp, [{
        key: '_initModules',
        value: function _initModules() {

            // Так как на странице содержатся две формы то инициализация валидации плагина webshim производится один раз файле app_sign-in.js.
            // Если форма регистации одна на странице и нужна валидация то нужно раскомментировать код который находитя под этим текстом
            // Расширенный контроль на HTML5 валидацией
            // more information https://afarkas.github.io/webshim/demos/demos/forms.html#introduction  (iVal options)

            // webshim.setOptions('forms', {
            //     lazyCustomMessages: true,
            //     //instant validation options
            //     iVal: {
            //         'sel'                   : this.formRegSelector,
            //         'recheckDelay'          : 400,
            //         'events'                : 'focusout change',
            //         'errorBoxClass'         : this.formErrorWrapClass,
            //         'errorBoxWrapper'       : 'div',
            //         'errorMessageWrapper'   : 'p',
            //         'errorMessageClass'     : this.formErrorMessageClass,
            //         'errorWrapperClass'     : this.formInvalidRowClass,
            //         'successWrapperClass'   : this.formValidRowClass,
            //         'fx'                    : 'slide',
            //         handleBubble: 'hide' // hide error bubble
            //     }
            // });
            // webshim.polyfill('forms');

            this.formSignUp = new FrondevoAJAXSubmitForm({
                formSelector: this.formRegSelector,
                formRowSelector: this.selectorFormRow,
                invalidRowClassName: this.formInvalidRowClass,
                validRowClassName: this.formValidRowClass,
                errorWrapSelector: this.formErrorWrapSelector,
                errorMessageSelector: this.formErrorMessageSelector
            });
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });
        }
    }]);

    return FrondevoSignUp;
}();

var signup = new FrondevoSignUp();