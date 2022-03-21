'use strict';

// =============================================================================
// scroll to top of the web application
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoScrollToTop = function () {
    function FrondevoScrollToTop() {
        var elWhereAppendScrollButton = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

        var _this = this;

        var topOffsetWhenShowButtonPx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var scrollSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 800;

        _classCallCheck(this, FrondevoScrollToTop);

        // settings
        this.urlToHTMLTemplate = 'js-views/ui/_scroll-to-top.html';
        this.elWhereAppendScrollButton = elWhereAppendScrollButton;
        this.topOffsetWhenShowButton = topOffsetWhenShowButtonPx;
        this.scrollSpeed = scrollSpeed;

        // button init
        this._getHTMLTemplateButtonScrollToTop(this.urlToHTMLTemplate).then(function (responseHTMLTemplateString) {

            _this.buttonScrollToTop = _this._createButtonScrollToTop(responseHTMLTemplateString);
            _this._eventHandlersInit();
        }, function (error) {
            console.error('Не удалось загрузить шаблон!', error);
        });
    }

    _createClass(FrondevoScrollToTop, [{
        key: 'showButton',
        value: function showButton() {

            this.buttonScrollToTop.fadeIn();
        }
    }, {
        key: 'hideButton',
        value: function hideButton() {

            this.buttonScrollToTop.fadeOut();
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {

            $('html, body').animate({ scrollTop: 0 }, this.scrollSpeed);
        }
    }, {
        key: '_getHTMLTemplateButtonScrollToTop',
        value: function _getHTMLTemplateButtonScrollToTop(urlToHTMLTemplate) {

            var promise = $.Deferred();

            $.ajax({
                'type': 'get',
                'dataType': 'html',
                'url': urlToHTMLTemplate
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }, {
        key: '_createButtonScrollToTop',
        value: function _createButtonScrollToTop(htmlTemplateString) {

            return $(htmlTemplateString).appendTo(this.elWhereAppendScrollButton);
        }
    }, {
        key: '_checkOffsetFromTop',
        value: function _checkOffsetFromTop() {

            var offsetFromTopPx = $(window).scrollTop();

            if (offsetFromTopPx > this.topOffsetWhenShowButton) {
                this.showButton();
            } else {
                this.hideButton();
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            window.addEventListener('scroll', function () {
                return _this2._checkOffsetFromTop();
            });
            this.buttonScrollToTop.on('click', function () {
                return _this2.scrollToTop();
            });
        }
    }]);

    return FrondevoScrollToTop;
}();