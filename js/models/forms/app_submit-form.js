'use strict';

// =============================================================================
// обработка отправки форм
// dependencies:
//  - jQuery (jquery.com)
//  - lib/polyfiller.js (https://afarkas.github.io/webshim/demos/index.html#introduction)
//  - modules/forms/app_submit-forms.js

// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoModelsSubmitForm = function () {
    function FrondevoModelsSubmitForm() {
        _classCallCheck(this, FrondevoModelsSubmitForm);

        // общие компоненты
        this.selectorFormRow = '.layout-forms-row';
        this.formInvalidRowClass = 'form-row-invalid';
        this.formValidRowClass = 'form-row-valid';
        this.formErrorWrapClass = 'form-error-message-wrap';
        this.formErrorWrapSelector = '.' + this.formErrorWrapClass;
        this.formErrorMessageClass = 'form-error-message';
        this.formErrorMessageSelector = '.' + this.formErrorMessageClass;

        // список демо форм
        this.formDemoAjaxError = '#html5-validate-forms';
        this.formDemoGoToUrl = '#ajax-form-goToUrl';
        this.formDemoPopupMessage = '#ajax-form-popups-message';

        this.selectorPopupMessage = '#popups-message';

        this._eventHandlersInit();
    }

    _createClass(FrondevoModelsSubmitForm, [{
        key: '_initModules',
        value: function _initModules() {

            // простая валидация обязательных полей на стороне клиента
            webshim.setOptions('forms', {
                replaceValidationUI: true,
                customDatalist: 'true'
            });
            //webshim.polyfill('forms'); - это не нужно, т.к. в этом примере ниже идет еще одна иницалзация


            // // Расширенный контроль на HTML5 валидацией
            // // more information https://afarkas.github.io/webshim/demos/demos/forms.html#introduction  (iVal options)
            webshim.setOptions('forms', {
                //instant validation options
                iVal: {
                    'sel': this.formDemoAjaxError,
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

            var formAJAXServerError = new FrondevoAJAXSubmitForm({
                formSelector: this.formDemoAjaxError,
                formRowSelector: this.selectorFormRow,
                invalidRowClassName: this.formInvalidRowClass,
                validRowClassName: this.formValidRowClass,
                errorWrapSelector: this.formErrorWrapSelector,
                errorMessageSelector: this.formErrorMessageSelector
            });

            // форма goToUrl
            var formAJAXGoToUrl = new FrondevoAJAXSubmitForm({
                formSelector: this.formDemoGoToUrl,
                typeAJAXSucces: 'goToUrl'
            });

            // форма попап
            this.formAJAXPopupMessage = new FrondevoAJAXSubmitForm({
                formSelector: this.formDemoPopupMessage
            });
            this.popupMessage = new FrondevoPopup({
                popupSelector: this.selectorPopupMessage,
                overlayStatus: true
            });
        }
    }, {
        key: '_showPopupMessage',
        value: function _showPopupMessage() {
            var json = this.formAJAXPopupMessage.getJSONServerAsnswer(),
                message = json.message,
                param = json.someParam;
            $(this.selectorPopupMessage).find('.F-popup__content').text(message + 'param'); // todo как будет готов соотвестующий метод, изменить это на внутренний метод попапа appendContent
            this.popupMessage.showPopup();
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });
            $(this.formDemoPopupMessage).on('ajax-submit:success', function () {
                return _this._showPopupMessage();
            });
        }
    }]);

    return FrondevoModelsSubmitForm;
}();

var demo = new FrondevoModelsSubmitForm();