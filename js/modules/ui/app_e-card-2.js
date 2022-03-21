'use strict';

// =============================================================================
// slider for small item card
// dependencies:
//  - jQuery
//  - jquery.bxslider.js
// todo:
//   - глючит слайдер после ресайза окна
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSmallItemCard = function () {
    function FrondevoSmallItemCard(classNameForEcard, classNameForSlider) {
        _classCallCheck(this, FrondevoSmallItemCard);

        this.ecardClassName = classNameForEcard;
        this.ecard = $(this.ecardClassName);
        this.classNameWrapForSlider = classNameForSlider;
        this.ecardSliderClassName = 'bx-viewport';

        this._initSlider();
        this._eventHandlersInit();
    }

    _createClass(FrondevoSmallItemCard, [{
        key: '_initSlider',
        value: function _initSlider(hoverElement) {

            $(this.classNameWrapForSlider).each(function () {

                // была ли ранее проинициализрована галерея на элементе
                // и если изображеий больше чем 1
                if (!$(this).parent().hasClass(this.ecardSliderClassName) && $(this).find('img').length > 1) {
                    $(this).bxSlider({ pager: false, preloadImages: 'all' });
                    $('.e-card-2__pic_load').removeClass('e-card-2__pic_load');
                }
            });
        }
    }, {
        key: '_showControls',
        value: function _showControls(ecard) {
            $(ecard).addClass('e-card-2_show-controls'); // todo подумать как усбрать зависимость от классов
        }
    }, {
        key: '_hideControls',
        value: function _hideControls(ecard) {
            $(ecard).removeClass('e-card-2_show-controls');
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            this.ecard.on('mouseenter', function (event) {
                return _this._showControls(event.currentTarget);
            });
            this.ecard.on('mouseleave', function (event) {
                return _this._hideControls(event.currentTarget);
            });
        }
    }]);

    return FrondevoSmallItemCard;
}();