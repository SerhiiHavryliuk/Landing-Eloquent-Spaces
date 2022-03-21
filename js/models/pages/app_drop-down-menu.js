/**
 * Created by Serhii on 09.01.2017.
 */
'use strict';

// =============================================================================
// ыпадающий список
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoDropDownMenu = function () {
    function FrondevoDropDownMenu() {
        _classCallCheck(this, FrondevoDropDownMenu);

        // выпадающий список ---------------------------------
        this.selectorButtonShowDropDownMenu = $('.menu__drop-down-menu-button');
        this.selectorDropDownMenu = $('.menu__drop-down-menu');
        this.classForShowShowDropDownMenu = 'menu__drop-down-menu-show';
        this.classForOpenButtonShowDropDownMenu = 'menu__drop-down-menu-button-open';
        this.selectorBody = $('body');

        this._eventHandlersInit();
    }

    _createClass(FrondevoDropDownMenu, [{
        key: '_showDropDownMenu',
        value: function _showDropDownMenu() {
            this.selectorDropDownMenu.toggleClass(this.classForShowShowDropDownMenu);
            this.selectorButtonShowDropDownMenu.toggleClass(this.classForOpenButtonShowDropDownMenu);
        }

        // скрываем выпадающий список при клике вне выпадающего списока -------------------------------------------------------------------------------

    }, {
        key: '_hideDropDownMenu',
        value: function _hideDropDownMenu(eventTarget) {
            //http://xiper.net/collect/js-plugins/ui/closepopup
            if ($(eventTarget).closest(".menu__drop-down-menu-button").length == 0) {
                this.selectorDropDownMenu.removeClass(this.classForShowShowDropDownMenu); // скрываем списое через удаление класса
                this.selectorButtonShowDropDownMenu.removeClass(this.classForOpenButtonShowDropDownMenu); // меняем картинку в конопке через удаление класса
            }
        }
    }, {
        key: '_initModules',
        value: function _initModules() {}
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });

            // выпадающий список
            this.selectorButtonShowDropDownMenu.on('click', function () {
                return _this._showDropDownMenu();
            });
            this.selectorBody.on('click', function (event) {
                return _this._hideDropDownMenu(event.target);
            }); // скрываем выпадающий список при клике вне выпадающего списока
            this.selectorBody.on('touchstart', function (event) {
                return _this._hideDropDownMenu(event.target);
            }); // for IOS скрываем выпадающий список при клике вне выпадающего списока
        }
    }]);

    return FrondevoDropDownMenu;
}();

var dropDownMenu = new FrondevoDropDownMenu();