/**
 * Created by Serhii on 15.11.2016.
 */

'use strict';

// =============================================================================
// Авторизация Sign In default
// 
// dependencies:
//  - jQuery
// - lib/polyfiller.js
// - lib/shims/
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSignInDefault = function () {
    function FrondevoSignInDefault() {
        _classCallCheck(this, FrondevoSignInDefault);

        // общие
        this.selectorFormRow = '.layout-forms-row';
        this.formInvalidRowClass = 'form-row-invalid';
        this.formValidRowClass = 'form-row-valid';
        this.formErrorWrapClass = 'form-error-message-wrap';
        this.formErrorWrapSelector = '.' + this.formErrorWrapClass;
        this.formErrorMessageClass = 'form-error-message';
        this.formErrorMessageSelector = '.' + this.formErrorMessageClass;

        this.formLoginSelector = '#form-sign-in';
        this.formRecoverySelector = '#form-recovery-password';
        this.buttonHideFormRecovery = $('.login__form_pass-button-back');
        this.formCommonSelector = '.form-webshim'; // общий класс для форм

        this.formRecoverMessageClass = 'login__form_pass-message';
        this.formRecoverWrapClassForMessage = $('.login__success-message');
        this.formsGroupSelector = $('.form-sign-in-group');
        this.formsGroupAddClassToShowRecoveryForm = 'sign-in_show-form-recovery';
        this.buttonShowFormForgetPass = $('#show-form-forget-pass');

        this._eventHandlersInit();
    }

    _createClass(FrondevoSignInDefault, [{
        key: '_initModules',
        value: function _initModules() {

            this.formSignIn = new FrondevoSignInModules({
                formRowSelector: this.selectorFormRow,
                invalidRowClassName: this.formInvalidRowClass,
                validRowClassName: this.formValidRowClass,
                errorWrapSelector: this.formErrorWrapSelector,
                errorMessageSelector: this.formErrorMessageSelector,

                formLoginSelector: this.formLoginSelector,
                formRecoverySelector: this.formRecoverySelector,

                formRecoverMessageClass: this.formRecoverMessageClass,
                formRecoverWrapClassForMessage: this.formRecoverWrapClassForMessage,

                formsGroupSelector: this.formsGroupSelector,
                formsGroupAddClassToShowRecoveryForm: this.formsGroupAddClassToShowRecoveryForm
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
            this.buttonHideFormRecovery.on('click', function () {
                return _this.formSignIn.formRecoverySetDefaultView();
            });
        }
    }]);

    return FrondevoSignInDefault;
}();

var signindefault = new FrondevoSignInDefault();