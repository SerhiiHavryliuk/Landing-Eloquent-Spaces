'use strict';

// =============================================================================
// ajax submit for
// params:
// - formSelector - форма, с которой взаимодействуем
// - из нее читается куда (action) и как (method) отправлять запрос
// - formRowSelector - слектор строки поля. Ипользуется для показа/скрытия ошибок
// - invalid/valid RowClassName - подсветка строки с ошибкой/ с корректно заполненными данными
// - errorMessageSelector - где именно лежит текст с ошибкой
// - errorWrapSelector - контейнер с текстом ошибки (блок с текстом ошибки - его составляющая)
// - dataType - тип передачи данных (по умолчанию json)
//  - typeAJAXSuccess - тип дейсвтия если все ок: showMessage , goToUrl
//  - typeAJAXMessage - тип показа сообщения: popups, htmlTag  (актуально только для typeAJAXSuccess = showMessage)

// JSON ответы от сервера:
// - status - все ли ок (должно возвращаться всегда): ok, error
// - invalidInputName - имя поля с ошибкой, если поле не прошл серверную валидацию
// - message - текст сообщения (для ошибки иил успеха - неважно)
// - goToUrl - полный урл, для случаев если при успехе нужно куда-то перейти или обновить страницу

// dependencies:
//  - jQuery
//  - utils/app_send-ajax.js
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoAJAXSubmitForm = function () {
    function FrondevoAJAXSubmitForm(params) {
        _classCallCheck(this, FrondevoAJAXSubmitForm);

        this.formSelector = params.formSelector;
        this.formRowSelector = params.selectorFormRow;
        this.invalidRowClassName = params.invalidRowClassName;
        this.validRowClassName = params.validRowClassName;
        this.errorMessageSelector = params.errorMessageSelector;
        this.errorWrapSelector = params.errorWrapSelector;

        this.form = $(this.formSelector);
        this.formType = this.form.attr('method') || 'get';
        this.scriptUrl = this.form.attr('action');
        this.dataType = params.ajaxDataType || 'json';
        this.sendingData = '';
        this.serverAnswer = '';

        this.typeAJAXSucces = params.typeAJAXSucces || 'showMessage';
        this.typeAJAXMessage = params.typeAJAXMessage || 'popup';

        this._eventHandlersInit();
    }

    _createClass(FrondevoAJAXSubmitForm, [{
        key: '_sendData',
        value: function _sendData() {
            this.ajaxSendData = new FrondevoSendAJAX({
                serverScriptUrl: this.scriptUrl,
                sendMethod: this.formType,
                dataType: this.dataType

            });
        }
    }, {
        key: '_serverValidateForm',
        value: function _serverValidateForm() {
            var _this = this;

            event.preventDefault();
            this.sendingData = this.form.serialize();
            this._sendData();

            this.ajaxSendData.sendData(this.sendingData).then(function (responseJSON) {

                // if(responseJSON.status.toUpperCase() == 'ERROR') {
                //     this._showError( responseJSON.invalidInputName, responseJSON.message );
                // } else if ( responseJSON.status.toUpperCase() == 'OK' &&
                //     this.typeAJAXSucces == 'goToUrl'){
                //     this._goToUrlAfterSuccessSend( responseJSON.goToUrl );
                // } else {
                //     this.serverAnswer = responseJSON;
                //     this._firedSendSuccess();
                // }

                //Serhii  изменил условие, сделал так как на км
                if (responseJSON.status.toUpperCase() == 'ERROR') {
                    _this._showError(responseJSON.invalidInputName, responseJSON.message);
                } else if (responseJSON.goToUrl) {
                    _this._goToUrlAfterSuccessSend(responseJSON.goToUrl);
                } else {
                    _this.serverAnswer = responseJSON.message;
                    _this._firedSendSuccess();
                }
            }, function (error) {
                console.error('Не удалось отправить данные формы!', error);
            });
        }
    }, {
        key: '_showError',
        value: function _showError(invalidInputName, message) {
            var invalidField = this.form.find('[name="' + invalidInputName + '"]'),
                invalidFormRow = invalidField.parents(this.formRowSelector).eq(0),
                errorMessageWrap = invalidFormRow.find(this.errorWrapSelector).eq(0),
                errorMessageTextEl = errorMessageWrap.find(this.errorMessageSelector).eq(0);

            errorMessageTextEl.text(message);

            // вручную изменяем классы для строки с ошибочным полем: не понял как через webshim сгенерировать ошибку в ручную
            invalidFormRow.removeClass(this.validRowClassName).addClass(this.invalidRowClassName);
            errorMessageWrap.show();
        }
    }, {
        key: '_goToUrlAfterSuccessSend',
        value: function _goToUrlAfterSuccessSend(url) {
            window.location = url;
        }
    }, {
        key: '_firedSendSuccess',
        value: function _firedSendSuccess() {
            var event = $.Event('ajax-submit:success');
            this.form.trigger(event);
        }

        // возвращает полный ответ от сервера

    }, {
        key: 'getJSONServerAsnswer',
        value: function getJSONServerAsnswer() {
            return this.serverAnswer;
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            $(this.formSelector).on('submit', function () {
                return _this2._serverValidateForm();
            });
        }
    }]);

    return FrondevoAJAXSubmitForm;
}();