/**
 * Created by Serhii on 10.10.2016.
 */

'use strict';

// =============================================================================
// Модуль Авторизации Sign In
//
// dependencies:
//  - jQuery
// - lib/polyfiller.js
// - lib/shims/
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSignInModules = function () {
    function FrondevoSignInModules(parameters) {
        _classCallCheck(this, FrondevoSignInModules);

        // общие компоненты
        this.formRowSelector = parameters.formRowSelector;
        this.invalidRowClassName = parameters.invalidRowClassName;
        this.validRowClassName = parameters.validRowClassName;
        this.errorWrapSelector = parameters.errorWrapSelector;
        this.errorMessageSelector = parameters.errorMessageSelector;

        this.formLoginSelector = parameters.formLoginSelector;
        this.formRecoverySelector = parameters.formRecoverySelector;

        this.popupFormRecoverySelector = parameters.popupFormRecoverySelector;
        this.popupFormRecoverMessageClass = parameters.popupFormRecoverMessageClass;
        this.popupFormRecoverWrapClassForMessage = parameters.popupFormRecoverWrapClassForMessage;

        this.formRecoverMessageClass = parameters.formRecoverMessageClass;
        this.formRecoverWrapClassForMessage = parameters.formRecoverWrapClassForMessage;

        this.formsGroupSelector = parameters.formsGroupSelector;
        this.formsGroupAddClassToShowRecoveryForm = parameters.formsGroupAddClassToShowRecoveryForm;

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoSignInModules, [{
        key: '_initModules',
        value: function _initModules() {

            this.formSignIn = new FrondevoAJAXSubmitForm({
                formSelector: this.formLoginSelector,
                formRowSelector: this.formRowSelector,
                invalidRowClassName: this.invalidRowClassName,
                validRowClassName: this.validRowClassName,
                errorWrapSelector: this.errorWrapSelector,
                errorMessageSelector: this.errorMessageSelector
            });

            this.popupFormForgetPass = new FrondevoPopup({
                popupSelector: this.popupFormRecoverySelector,
                overlayStatus: true,
                overlaySelector: '#overlay'
            });

            this.forRecovery = new FrondevoAJAXSubmitForm({
                formSelector: this.formRecoverySelector,
                invalidRowClassName: this.classNameInvalidFormRow,
                selectorFormRow: this.selectorFormRow,
                selectorErrorMessage: this.selectorErrorMessage
            });

            this.formChangePass = new FrondevoAJAXSubmitForm({
                formSelector: this.selectorFormChangePass,
                invalidRowClassName: this.classNameInvalidFormRow,
                selectorFormRow: this.selectorFormRow,
                selectorErrorMessage: this.selectorErrorMessage
            });

            this.popupMessageForChangePass = new FrondevoPopup({
                popupSelector: this.selectorPopupMessageForChangePass,
                overlayStatus: true
            });
        }
    }, {
        key: 'showFormForgetPass',
        value: function showFormForgetPass() {

            if (this.formRecoverWrapClassForMessage !== undefined) {
                this.formsGroupSelector.addClass(this.formsGroupAddClassToShowRecoveryForm);
            }

            // для попапа
            if (this.popupFormRecoverWrapClassForMessage !== undefined) {
                this.popupFormForgetPass.showPopup();
            }
        }
    }, {
        key: 'hideFormForgetPass',
        value: function hideFormForgetPass() {
            this.popupFormForgetPass.closePopup();
        }
    }, {
        key: 'showMessageAfrerSuccessSendRecoveryForm',
        value: function showMessageAfrerSuccessSendRecoveryForm(event) {

            if (this.formRecoverWrapClassForMessage !== undefined) {
                $(this.formRecoverySelector).addClass(this.formRecoverMessageClass);
                this.formRecoverWrapClassForMessage.text(this.forRecovery.getJSONServerAsnswer());
            }

            // для попапа
            if (this.popupFormRecoverWrapClassForMessage !== undefined) {
                $(this.formRecoverySelector).addClass(this.popupFormRecoverMessageClass);
                this.popupFormRecoverWrapClassForMessage.text(this.forRecovery.getJSONServerAsnswer());
            }
        }
    }, {
        key: 'formRecoverySetDefaultView',
        value: function formRecoverySetDefaultView() {

            if (this.formRecoverWrapClassForMessage !== undefined) {
                $(this.formRecoverySelector).removeClass(this.formRecoverMessageClass);
                this.formsGroupSelector.removeClass(this.formsGroupAddClassToShowRecoveryForm);
            }

            // для попапа
            if (this.popupFormRecoverWrapClassForMessage !== undefined) {
                $(this.formRecoverySelector).removeClass(this.popupFormRecoverMessageClass);
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {}
    }]);

    return FrondevoSignInModules;
}();
// let SignInModules = new FrondevoSignInModules();