'use strict';

// =============================================================================
// popups
// dependencies:
//  - jQuery

// methods:
//  - showPopup/closePopup - показать/скрыть попап
//  - destroyPopup  - удалить popups
//  - appendContent  - добавить контент в содержимо окна
//  - clearContent  - очистить контент окна

// генерируемые события:
// - popups:show / popups:hide - показано/скрыто окно (генеируется по окончанию анимаций)

// parameters:
//  - popupSelector - селектор окна
//  - overlayStatus - нужен ли оверлей: true / false (по умолчанию false)
//  - positionType - позиониование по центру экрана или относительное: center / relative (по умолчанию center)
//  - closeAnimationType - обычное (реверсивное) закрытие или кастомное: default / custom (по умолчанию default)
//  - tempPopupFlag - создаем ли врменное окно: true / false (по умолчанию false)
//  - elWhereAppendTempPopup - элемент куда вставлять временное окно. по умолчанию - body
//  - tempPopupClassName - доп класс для кастомизации попапа (не обязателен)
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoPopup = function () {
    function FrondevoPopup(parameters) {
        _classCallCheck(this, FrondevoPopup);

        // parameters
        this.popup = $(parameters.popupSelector);
        this.overlayStatus = parameters.overlayStatus || false; // true or false
        this.positionType = parameters.positionType || 'center'; // center or ralative
        this.closeAnimationType = parameters.closeAnimationType || 'default';

        // если попап временный попао
        this.tempPopupFlag = parameters.tempPopup || false;
        this.elWhereAppendTempPopup = parameters.elWhereAppendNewPopup || 'body';
        this.tempPopupClassName = parameters.tempPopupClassName;
        this.tempPopupHTML = '<div class="F-popups ' + this.tempPopupClassName + '" id="F-popups-temp"><div class="F-popup__window"><div class="F-popup__close"></div><div class="F-popup__content"></div></div></div>';

        // popups controls
        this.overlayHTML = '<div id="F-popups-overlay"></div>';
        this.popupBackgroundClassName = 'F-popups';
        this.popupButtonCloseClassName = 'F-popup__close';

        this.popupWindow = this.popup.find('.F-popup__window').eq(0);
        this.popupContentWrap = this.popup.find('.F-popup__content').eq(0);
        this.popupRelativeClassName = 'F-popup_relative';
        this.popupClaseAnimationClassName = 'F-popup__window_close-animation';

        this.htmlEl = $('html');
        this.bodyEl = $('body');
        this.popupOverlaySelector = '#F-popups-overlay';

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoPopup, [{
        key: 'showPopup',
        value: function showPopup() {
            var _this = this;

            this.popup.addClass('open');

            if (this.overlayStatus) {
                if ($(this.popupOverlaySelector).length == 0) this._createOverlay(); // на случай если какое-то окно удалили ,а вместе с ним и overlay
                $(this.popupOverlaySelector).addClass('show ');
                this.htmlEl.addClass('F-popup__window-no-scroll');
            }

            // для реализации анимации окна, необходима задержка после display:block для общего контейнера popups
            setTimeout(function () {
                return _this._showPopupWindow();
            }, 1);
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {

            if (this.closeAnimationType == 'default') {
                this.popupWindow.removeClass('open');
            } else if (this.closeAnimationType == 'custom') {
                this.popupWindow.addClass(this.popupClaseAnimationClassName);
            }
        }
    }, {
        key: 'destroyPopup',
        value: function destroyPopup() {
            this.popup.remove();
            $(this.popupOverlaySelector).remove();
        }
    }, {
        key: 'appendContent',
        value: function appendContent(content) {
            this.popupContentWrap.append(content);
        }
    }, {
        key: 'clearContent',
        value: function clearContent() {
            this.popupContentWrap.empty();
        }

        // окно показываем отдельно т.к. чтобы заработала CSS анимация
        // неоходима задержа после смены св-ва дисплей для общего контейнера
        // для изменения стилей показа самого окна

    }, {
        key: '_showPopupWindow',
        value: function _showPopupWindow() {
            this.popupWindow.addClass('open');
        }

        // закрыаем окно так же частями, чтобы иметь возможность показать анимацию // todo процесс закрытия окна немного запутан. Нужен рефакторинг

    }, {
        key: '_closePopupBackground',
        value: function _closePopupBackground() {
            this.popup.removeClass('open');

            if (this.overlayStatus) {
                $(this.popupOverlaySelector).removeClass('show ');
                this.htmlEl.removeClass('F-popup__window-no-scroll');
            }

            if (this.popup.attr('id') == 'F-popups-temp') this.destroyPopup(); // если временное окно - удаляем его
        }
    }, {
        key: '_toDoActionAfterAnimation',
        value: function _toDoActionAfterAnimation() {

            // если окно показываем, просто тригеррим событие
            if (this.popupWindow.hasClass('open') && !this.popupWindow.hasClass(this.popupClaseAnimationClassName)) {
                // при кастомном закрытиии в данный момент у окна все еще будет присутсвовать класс open
                this._firedIfShowPopup();
                return; // выходим из метода чтобы не применить общие действия для закрытия окна
            } else if (this.popupWindow.hasClass(this.popupClaseAnimationClassName)) {
                // если кастомная анимация для скрытия
                // по завершению анимации удаляем класс отвечающий за анимацию и за "окрытость" окна
                this.popupWindow.removeClass(this.popupClaseAnimationClassName).removeClass('open');
            }

            // для скрытия окна в конце скрываем подложку и тритегрим событие
            this._closePopupBackground();
            this._firedIfHidePopup();
        }
    }, {
        key: '_checkIsClickOnBackground',
        value: function _checkIsClickOnBackground(clickedElement) {

            if (clickedElement.classList.contains(this.popupBackgroundClassName) || clickedElement.classList.contains(this.popupButtonCloseClassName)) {
                this.closePopup();
            }
        }
    }, {
        key: '_firedIfShowPopup',
        value: function _firedIfShowPopup() {
            var event = $.Event('popups:show');
            this.popup.trigger(event);
            return this;
        }
    }, {
        key: '_firedIfHidePopup',
        value: function _firedIfHidePopup() {
            var event = $.Event('popups:hide');
            this.popup.trigger(event);
            return this;
        }
    }, {
        key: '_createOverlay',
        value: function _createOverlay() {
            this.bodyEl.append(this.overlayHTML);
        }
    }, {
        key: '_checkKeyUp',
        value: function _checkKeyUp(event) {
            var keyCode = event.keyCode;
            // по esc закрываем попап
            if (keyCode == 27) {
                this.closePopup();
            }
        }
    }, {
        key: '_createTempPopup',
        value: function _createTempPopup() {
            // т.к. окно создается динамически, составляющие элементы определяем заново
            this.popup = $(this.tempPopupHTML).appendTo(this.elWhereAppendTempPopup);
            this.popupWindow = this.popup.find('.F-popup__window').eq(0);
            this.popupContentWrap = this.popup.find('.F-popup__content').eq(0);
            return this.popup;
        }
    }, {
        key: '_initModules',
        value: function _initModules() {
            if (this.overlayStatus && $(this.popupOverlaySelector).length == 0) {
                this._createOverlay();
            }

            if (this.tempPopupFlag == true) {
                this._createTempPopup();
            }

            if (this.positionType == 'relative') {
                this.popup.addClass(this.popupRelativeClassName);
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            this.popup.on('click', function (event) {
                return _this2._checkIsClickOnBackground(event.target);
            });
            this.bodyEl.on('keyup', function (event) {
                return _this2._checkKeyUp(event);
            });
            this.popupWindow.on('transitionend', function () {
                return _this2._toDoActionAfterAnimation();
            });
        }
    }]);

    return FrondevoPopup;
}();