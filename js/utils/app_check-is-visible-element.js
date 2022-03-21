'use strict';

// =============================================================================
// видимость элемента
// варианты проверок:
// - видна ли верхняя граница элемента
// - видна ли нижняя граница элемента
// - виден ли элемент полностью
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondeovoCheckIsVisibleElement = function () {
    function FrondeovoCheckIsVisibleElement(checkedElement) {
        _classCallCheck(this, FrondeovoCheckIsVisibleElement);

        this.checkedElement = checkedElement;
    }

    _createClass(FrondeovoCheckIsVisibleElement, [{
        key: 'checkIsVisibleTop',
        value: function checkIsVisibleTop() {
            this._calculateCoordinates();
            return this.elTop >= this.docViewTop && this.elTop <= this.docViewBottom;
        }
    }, {
        key: 'checkIsVisibleBottom',
        value: function checkIsVisibleBottom() {
            this._calculateCoordinates();
            return this.elBottom <= this.docViewBottom;
        }
    }, {
        key: 'checkIsVisibleFull',
        value: function checkIsVisibleFull() {
            this._calculateCoordinates();
            return this.elBottom <= this.docViewBottom && this.elTop >= this.docViewTop;
        }
    }, {
        key: '_calculateCoordinates',
        value: function _calculateCoordinates() {
            this.docViewTop = $(window).scrollTop();
            this.docViewBottom = this.docViewTop + $(window).height();
            this.elTop = this.checkedElement.offset().top;
            this.elBottom = this.elTop + this.checkedElement.height();
        }
    }]);

    return FrondeovoCheckIsVisibleElement;
}();