'use strict';

// =============================================================================
// horisontal slider for items
// dependencies:
//  - jQuery
//  - jquery.bxslider.js (http://bxslider.com/)
// если число вставленных элементов в конйтейнер больше видимого к-ва, тольок тогда инициализируем слайдер
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoHorizontalItemsSlider = function () {
    function FrondevoHorizontalItemsSlider(parameters) {
        _classCallCheck(this, FrondevoHorizontalItemsSlider);

        this.slider = $(parameters.sliderSelector);
        this.slideMargin = parameters.slideMargin || 0;
        this.minSlides = parameters.minSlides || 1;
        this.slideWidth = parameters.slideWidth;

        this._initModules();
    }

    _createClass(FrondevoHorizontalItemsSlider, [{
        key: '_initModules',
        value: function _initModules() {
            this.slider.bxSlider({
                pager: false,
                slideMargin: this.slideMargin,
                minSlides: this.minSlides,
                slideWidth: this.slideWidth
            });
        }
    }]);

    return FrondevoHorizontalItemsSlider;
}();