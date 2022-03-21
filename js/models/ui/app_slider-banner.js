'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Serhii on 21.11.2016.
 */

var FrondevoDemoSliderBanner = function () {
    function FrondevoDemoSliderBanner() {
        _classCallCheck(this, FrondevoDemoSliderBanner);

        this.horizontalSlider = $('.slider-banner');

        this._initModules();
    }

    _createClass(FrondevoDemoSliderBanner, [{
        key: '_initModules',
        value: function _initModules() {
            if (document.documentElement.clientWidth > 1000) {
                this.slider = this.horizontalSlider.bxSlider({
                    pager: false,
                    controls: true
                });
            } else {
                this.slider = this.horizontalSlider.bxSlider({
                    pager: true,
                    controls: false
                });
            }
        }
    }]);

    return FrondevoDemoSliderBanner;
}();

var sliderbanner = new FrondevoDemoSliderBanner();