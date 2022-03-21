'use strict';

// =============================================================================
// ползуноу цен в фильтрах каталога
// dependencies:
//  - jQuery
//  - jquery.uislider.js
//
// Example init:
//
//this.priceSlider = new FrondevoPriceSlider(
//    this.sliderBox.find('[data-price-slider]'),
//    this.sliderBox.find('[data-price-slider-min-indicator]'),
//    this.sliderBox.find('[data-price-slider-max-indicator]'),
//    this.sliderBox.find('[data-price-slider-min-input]'),
//    this.sliderBox.find('[data-price-slider-max-input]')
//);
//
// Example Jade:
//
//.price-slider
//    div(data-price-slider data-min="0" data-max="500" data-curmin="15" data-curmax="400")
//    .price-slider__min
//        span(data-price-slider-min-indicator)
//        |грн
//    .price-slider__max
//        span(data-price-slider-max-indicator)
//        |грн
//    input(type="hidden" id="fromprice" name="fromprice" value="" data-price-slider-min-input)
//    input(type="hidden" id="toprice" name="toprice" value="" data-price-slider-max-input)
//
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoPriceSlider = function () {
    function FrondevoPriceSlider(slider, minIndicator, maxIndicator, minInput, maxInput) {
        _classCallCheck(this, FrondevoPriceSlider);

        this.slider = slider;
        this.oMinIndicator = minIndicator;
        this.oMaxIndicator = maxIndicator;
        this.oMinInput = minInput;
        this.oMaxInput = maxInput;

        this.min = parseInt(this.slider.attr('data-min'));
        this.max = parseInt(this.slider.attr('data-max'));
        this.curMin = parseInt(this.slider.attr('data-curmin'));
        this.curMax = parseInt(this.slider.attr('data-curmax'));

        var self = this;
        this._initModules(self);
    }

    _createClass(FrondevoPriceSlider, [{
        key: 'reset',
        value: function reset(cmd) {

            this.oMinIndicator.text(this.curMin);
            this.oMaxIndicator.text(this.curMax);
            this.oMinInput.val(this.curMin);
            this.oMaxInput.val(this.curMax);

            this.slider.slider("option", {
                values: [this.curMin, this.curMax]
            });

            if (cmd != 'not refresh') catalogUI.filterChange(this.oMinIndicator);
        }
    }, {
        key: '_initModules',
        value: function _initModules(self) {

            this.oMinIndicator.text(this.curMin);
            this.oMaxIndicator.text(this.curMax);
            this.oMinInput.val(this.curMin);
            this.oMaxInput.val(this.curMax);

            // Init jquery.uislider.js
            this.slider.slider({
                min: this.min,
                max: this.max,
                values: [this.curMin, this.curMax],
                range: true,
                slide: function slide(event, ui) {
                    self.oMinIndicator.text(ui.values[0].toString());
                    self.oMaxIndicator.text(ui.values[1].toString());
                },
                stop: function stop(event, ui) {
                    self.oMinInput.val(ui.values[0]);
                    self.oMaxInput.val(ui.values[1]);
                    catalogUI.filterChange(event.target);
                }
            });

            //$('[data-price-slider]').draggable();
        }
    }]);

    return FrondevoPriceSlider;
}();