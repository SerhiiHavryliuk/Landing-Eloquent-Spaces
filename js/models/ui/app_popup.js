'use strict';

// =============================================================================
// работа с попапами
// dependencies:
//  - jQuery (jquery.com)
//  - modules/ui/app_popup.js
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoPopupModels = function () {
    function FrondevoPopupModels() {
        _classCallCheck(this, FrondevoPopupModels);

        //список демо окон
        this.popup1Selector = $('#popups-1');
        this.popup2Selector = $('#popups-2');
        this.popup3Selector = $('#popups-3');
        this.popup4Selector = $('#popups-4');

        //список демо кнопок
        this.button1 = $('#button-1');
        this.clear1 = $('#clear-content');
        this.append1 = $('#append-content');
        this.destroy1 = $('#destroy-1');
        this.button2 = $('#button-2');
        this.button3 = $('#button-3');
        this.button4 = $('#button-4');
        this.button5 = $('#button-5');
        this.button6 = $('#button-6');

        this._eventHandlersInit();
    }

    _createClass(FrondevoPopupModels, [{
        key: '_initModules',
        value: function _initModules() {

            // простой попап, который лежит в хтмл, покажется по центру экрана
            this.popup1 = new FrondevoPopup({
                popupSelector: this.popup1Selector,
                overlayStatus: true
            });

            this.popup2 = new FrondevoPopup({
                popupSelector: this.popup2Selector,
                positionType: 'relative'
            });

            this.popup3 = new FrondevoPopup({
                popupSelector: this.popup3Selector,
                overlayStatus: true
            });

            this.popup4 = new FrondevoPopup({
                popupSelector: this.popup4Selector,
                overlayStatus: true,
                closeAnimationType: 'custom'
            });
        }
    }, {
        key: '_showPopup1',
        value: function _showPopup1() {
            this.popup1.showPopup();
        }
    }, {
        key: '_clearPopup1',
        value: function _clearPopup1() {
            this.popup1.clearContent();
        }
    }, {
        key: '_appendContentPopup1',
        value: function _appendContentPopup1() {
            var content = 'Some new statice content';
            this.popup1.appendContent(content);
        }
    }, {
        key: '_destroyPopup1',
        value: function _destroyPopup1() {
            this.popup1 = this.popup1.destroyPopup();
        }
    }, {
        key: '_showPopup2',
        value: function _showPopup2() {
            this.popup2.showPopup();
        }
    }, {
        key: '_showPopup3',
        value: function _showPopup3() {
            this.popup3.showPopup();
        }
    }, {
        key: '_showPopup4',
        value: function _showPopup4() {
            this.popup4.showPopup();
        }
    }, {
        key: '_createPopup5',
        value: function _createPopup5(clickedEl) {
            // получаем html код окна
            var popupHTML = '<div class="F-popups" id="popups-5"><div class="F-popup__window"><div class="F-popup__close"></div><div class="F-popup__content">Some content</div></div></div>';

            // вставляем в необходимое место в дом
            $(clickedEl).after(popupHTML);

            // инициализируем окно
            this.popup5 = new FrondevoPopup({
                popupSelector: '#popups-5',
                overlayStatus: true
            });

            this.popup5.showPopup();
        }
    }, {
        key: '_showTempPopup',
        value: function _showTempPopup(clickedEl) {

            // создаем временное окно
            // popupClassName - добавляем свой класс, если нужно как-то особо закастомить временное окно
            this.popup6 = new FrondevoPopup({
                tempPopup: true,
                tempPopupClassName: 'testClassname',
                elWhereAppendNewPopup: $(clickedEl).parent(),
                overlayStatus: true
            });

            // вставляем контент и показываем
            var someContentForPopup = 'Какой-то контент для окна, например пришедший с сервера в JSON';
            this.popup6.appendContent(someContentForPopup);
            this.popup6.showPopup();
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });
            this.button1.on('click', function () {
                return _this._showPopup1();
            });
            this.clear1.on('click', function () {
                return _this._clearPopup1();
            });
            this.append1.on('click', function () {
                return _this._appendContentPopup1();
            });
            this.destroy1.on('click', function () {
                return _this._destroyPopup1();
            });
            this.button2.on('click', function () {
                return _this._showPopup2();
            });
            this.button3.on('click', function () {
                return _this._showPopup3();
            });
            this.button4.on('click', function () {
                return _this._showPopup4();
            });
            this.button5.on('click', function (event) {
                return _this._createPopup5(event.currentTarget);
            });
            this.button6.on('click', function (event) {
                return _this._showTempPopup(event.currentTarget);
            });
        }
    }]);

    return FrondevoPopupModels;
}();

var demo = new FrondevoPopupModels();