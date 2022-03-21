'use strict';

// =============================================================================
// демо custom select
// dependencies:
//  - jQuery
//  - jquery.select.js
// =============================================================================

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoDemoSelectCustom = function FrondevoDemoSelectCustom() {
    _classCallCheck(this, FrondevoDemoSelectCustom);

    this.selectCustom = $('.select-custom');

    this.selectCustom.customSelect();
};

var demo = new FrondevoDemoSelectCustom();