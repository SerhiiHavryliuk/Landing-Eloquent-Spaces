/**
 * Created by Serhii on 10.11.2016.
 */
'use strict';

// =============================================================================
// Авторизация Sign In
// 
// dependencies:
//  - jQuery
// - lib/polyfiller.js
// - lib/shims/
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSignIn = function () {
    function FrondevoSignIn() {
        _classCallCheck(this, FrondevoSignIn);

        // общие
        this.selectorFormRow = '.layout-forms-row';
        this.formInvalidRowClass = 'form-row-invalid';
        this.formValidRowClass = 'form-row-valid';
        this.formErrorWrapClass = 'form-error-message-wrap';
        this.formErrorWrapSelector = '.' + this.formErrorWrapClass;
        this.formErrorMessageClass = 'form-error-message';
        this.formErrorMessageSelector = '.' + this.formErrorMessageClass;

        this.formLoginSelector = '#form-sign-in_popup';
        this.formRecoverySelector = '#form-forget-pass';
        this.formCommonSelector = '.form-webshim'; // общий класс для двух форм

        this.buttonShowFormForgetPass = $('#show-popups-forget-pass');

        this.popupFormRecoverySelector = '#popups-forget-pass';
        this.popupFormRecoverMessageClass = 'login__form_pass-message';
        this.popupFormRecoverWrapClassForMessage = $('.login__success-message');
        this.buttonHideFormRecovery = $('.login__form_pass-button-back');

        this._eventHandlersInit();
    }

    _createClass(FrondevoSignIn, [{
        key: '_initModules',
        value: function _initModules() {

            // простая валидация обязательных полей на стороне клиента -----------------------------------------------------
            // Так как на странице содержатся две формы (авториз и регистр) то инициализация валидации плагина webshim
            // производится один раз в файле app_sign-in.js с использованием общего класса для двух форм  this.formCommonSelector.
            webshim.setOptions('forms', {
                replaceValidationUI: true,
                customDatalist: 'true'
            });

            // // Расширенный контроль на HTML5 валидацией
            // more information https://afarkas.github.io/webshim/demos/demos/forms.html#introduction  (iVal options)
            webshim.setOptions('forms', {
                //instant validation options
                iVal: {
                    'sel': this.formCommonSelector,
                    'recheckDelay': 400,
                    'events': 'focusout change',
                    'errorBoxClass': this.formErrorWrapClass,
                    'errorBoxWrapper': 'div',
                    'errorMessageWrapper': 'p',
                    'errorMessageClass': this.formErrorMessageClass,
                    'errorWrapperClass': this.formInvalidRowClass,
                    'successWrapperClass': this.formValidRowClass,
                    'fx': 'slide'
                }
            });

            webshim.polyfill('forms');
            //--------------------------------------------------------------------------------------------------------------


            this.formSignIn = new FrondevoSignInModules({
                formRowSelector: this.selectorFormRow,
                invalidRowClassName: this.formInvalidRowClass,
                validRowClassName: this.formValidRowClass,
                errorWrapSelector: this.formErrorWrapSelector,
                errorMessageSelector: this.formErrorMessageSelector,

                formLoginSelector: this.formLoginSelector,
                formRecoverySelector: this.formRecoverySelector,

                popupFormRecoverySelector: this.popupFormRecoverySelector,
                popupFormRecoverMessageClass: this.popupFormRecoverMessageClass,
                popupFormRecoverWrapClassForMessage: this.popupFormRecoverWrapClassForMessage
            });
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });
            this.buttonShowFormForgetPass.on('click', function () {
                return _this.formSignIn.showFormForgetPass();
            });
            $(this.formRecoverySelector).on('ajax-submit:success', function () {
                return _this.formSignIn.showMessageAfrerSuccessSendRecoveryForm();
            });
            $(this.popupFormRecoverySelector).on('popups:hide', function () {
                return _this.formSignIn.formRecoverySetDefaultView();
            });
            this.buttonHideFormRecovery.on('click', function () {
                return _this.formSignIn.hideFormForgetPass();
            });
        }
    }]);

    return FrondevoSignIn;
}();

var signinpopup = new FrondevoSignIn();