/**
 * Created by Serhii on 10.10.2016.
 */

'use strict';

// =============================================================================
// Sign Up
//
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSignUp = function () {
    function FrondevoSignUp(parameters) {
        _classCallCheck(this, FrondevoSignUp);

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoSignUp, [{
        key: '_initModules',
        value: function _initModules() {}
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {}
    }]);

    return FrondevoSignUp;
}();
//let text_pages = new FrondevoResponsiveTabsToAccordeonUI();