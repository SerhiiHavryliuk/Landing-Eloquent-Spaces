'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoDemoEcard2 = function FrondevoDemoEcard2() {
    _classCallCheck(this, FrondevoDemoEcard2);

    // small item card
    this.ecard2WrapSelector = '.e-card-2';
    this.ecard2SliderWrapSelector = '.ecard-2__slider-layout';

    var smallItemCardSlider = new FrondevoSmallItemCard('.e-card-2', '.ecard-2__slider-layout');
};

var demo = new FrondevoDemoEcard2();