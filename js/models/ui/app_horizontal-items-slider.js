'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoDemoHorizontalItemsSlider = function () {
    function FrondevoDemoHorizontalItemsSlider() {
        _classCallCheck(this, FrondevoDemoHorizontalItemsSlider);

        this.horizontalSlider = $('.horizontal-items-slider__carousel');

        this._initModules();
    }

    _createClass(FrondevoDemoHorizontalItemsSlider, [{
        key: '_initModules',
        value: function _initModules() {
            if (document.documentElement.clientWidth > 1000) {
                var horizontalSliderSlideWidth = this.horizontalSlider.find('li').eq(0).width();
                this.slider = this.horizontalSlider.bxSlider({
                    pager: false,
                    controls: true,
                    slideMargin: 40,
                    minSlides: 2,
                    maxSlides: 4,
                    slideWidth: horizontalSliderSlideWidth
                });
            } else {
                var _horizontalSliderSlideWidth = this.horizontalSlider.find('li').eq(0).width();
                this.slider = this.horizontalSlider.bxSlider({
                    pager: true,
                    controls: false,
                    slideMargin: 0,
                    minSlides: 2,
                    maxSlides: 2,
                    slideWidth: _horizontalSliderSlideWidth
                });
            }
        }
    }]);

    return FrondevoDemoHorizontalItemsSlider;
}();

var demo = new FrondevoDemoHorizontalItemsSlider();