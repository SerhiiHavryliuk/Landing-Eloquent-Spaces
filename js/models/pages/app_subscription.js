/**
 * Created by Serhii on 09.01.2017.
 */
'use strict';

// =============================================================================
// обработка отправки форм (подписка)
// dependencies:
//  - jQuery (jquery.com)
//  - lib/polyfiller.js (https://afarkas.github.io/webshim/demos/index.html#introduction)
//  - modules/forms/app_submit-forms.js

// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSubscribeSubmitForm = function () {
    function FrondevoSubscribeSubmitForm() {
        _classCallCheck(this, FrondevoSubscribeSubmitForm);

        // общие компоненты для формы
        this.selectorFormRow = '.layout-forms-row';
        this.formInvalidRowClass = 'form-row-invalid';
        this.formValidRowClass = 'form-row-valid';
        this.formErrorWrapClass = 'form-error-message-wrap';
        this.formErrorWrapSelector = '.' + this.formErrorWrapClass;
        this.formErrorMessageClass = 'form-error-message';
        this.formErrorMessageSelector = '.' + this.formErrorMessageClass;

        // форма подписки
        this.idFormSubscribe = 'subscription__form'; // здесь пишем id формы
        this.formSubscribe = '#' + this.idFormSubscribe;
        this.selectorSubscriptionAnswer = $('.subscription__answer');
        this.classForShowSubscriptionAnswer = 'subscription__answer-show';
        this.selectorSubscriptionAjaxAnswer = $('.subscription__ajax-answer');

        this._eventHandlersInit();
    }

    _createClass(FrondevoSubscribeSubmitForm, [{
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
                    'sel': this.formSubscribe,
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

            this.formAjaxSubscribe = new FrondevoAJAXSubmitForm({
                formSelector: this.formSubscribe,
                formRowSelector: this.selectorFormRow,
                invalidRowClassName: this.formInvalidRowClass,
                validRowClassName: this.formValidRowClass,
                errorWrapSelector: this.formErrorWrapSelector,
                errorMessageSelector: this.formErrorMessageSelector
            });
        }
    }, {
        key: '_showMessageAfterSuccessAjaxSubmitSubscriptionForm',
        value: function _showMessageAfterSuccessAjaxSubmitSubscriptionForm() {
            this.selectorSubscriptionAnswer.addClass(this.classForShowSubscriptionAnswer); // показываем сообщение после успешной отправки формы
            this.selectorSubscriptionAjaxAnswer.text(this.formAjaxSubscribe.getJSONServerAsnswer()); // считываем сообщение с json и показываем его
        }
    }, {
        key: '_resetInputAfterSuccessAjaxSubmitSubscriptionForm',
        value: function _resetInputAfterSuccessAjaxSubmitSubscriptionForm() {
            document.getElementById(this.idFormSubscribe).reset(); // очистка формы от сообщений об ошибок
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });

            $(this.formSubscribe).on('ajax-submit:success', function (event) {
                _this._resetInputAfterSuccessAjaxSubmitSubscriptionForm(); // очистка формы от сообщений об ошибок
                _this._showMessageAfterSuccessAjaxSubmitSubscriptionForm(); // показываем сообщение после успешной отправки формы
            });
        }
    }]);

    return FrondevoSubscribeSubmitForm;
}();

var subscribeSubmitForm = new FrondevoSubscribeSubmitForm();