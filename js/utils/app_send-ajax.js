'use strict';

// =============================================================================
// ajax отправка данных
// реализация с использованием promise https://learn.javascript.ru/promise
// по дефолту:
//  - method = get
//  - dataType = json
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSendAJAX = function () {
    function FrondevoSendAJAX(parameters) {
        _classCallCheck(this, FrondevoSendAJAX);

        this.serverScriptUrl = parameters.serverScriptUrl;
        this.sendMethod = parameters.sendMethod || 'get';
        this.dataType = parameters.dataType || 'json';
    }

    _createClass(FrondevoSendAJAX, [{
        key: 'sendData',
        value: function sendData(sendingData) {

            var promise = $.Deferred();

            $.ajax({
                'type': this.sendMethod,
                'dataType': this.dataType,
                'url': this.serverScriptUrl,
                'data': sendingData
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }]);

    return FrondevoSendAJAX;
}();