'use strict';

// =============================================================================
// главное меню
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoGlobalUI = function () {
    function FrondevoGlobalUI() {
        _classCallCheck(this, FrondevoGlobalUI);

        // топ меню
        this.topNav = $('nav.h-menu-dd').eq(0);

        // плавная прокрутка страницы по якорям из меню
        this.selctorButtonReadMore = $(".h-menu-dd__link");

        // Popup Portfolio
        this.buttonShowPopupPortfolio = $('.portfolio__project-btn');
        this.IdPopupPortfolio = '#popup-portfolio';
        // this.selctorButtonShowProject  = $(".portfolio__project-btn");
        // this.popup1Selector  = $('#popups-1');

        this.selectorPortfolioSlider = $('.portfolio__slider');
        this.idPortfolioSliderPager = '#portfolio__slider-pager';

        this._eventHandlersInit();
    }

    _createClass(FrondevoGlobalUI, [{
        key: '_initModules',
        value: function _initModules() {
            //let topNav = new FrondevoTopNav(this.topNav);

            //Popup Project --------------------------------------------------
            this.popupProfilePortfolio = new FrondevoPopup({
                popupSelector: this.IdPopupPortfolio
                //overlayStatus: true
                //positionType   : 'relative'
            });

            // Slider Popup Portfolio
            // $('.portfolio__slider').bxSlider({
            //     nextText: '',
            //     prevText: '',
            //     pagerCustom: '#portfolio__slider-pager'
            // });

            // this.slider = $('.portfolio__slider').bxSlider({
            //     // pagerCustom: this.idPortfolioSliderPager,
            //     // slideMargin: 10
            // });
            //this.selectorPortfolioSlider.bxSlider();
        }

        // плавная прокрутка для меню

    }, {
        key: '_animateScroling',
        value: function _animateScroling(clickButton) {
            console.log("Serhii _animateScroling");
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();

            //забираем идентификатор бока с атрибута href
            var id = $(clickButton).attr('href');

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            var top = $(id).offset().top;

            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({ scrollTop: top }, 1500);
        }
    }, {
        key: '_showProject',
        value: function _showProject(clickButton) {
            console.log("Serhii showProject");
            var ProjectID = $(clickButton).attr('data-project-id');
            console.log("Serhii ProjectID = " + ProjectID);
        }

        //------------------------------------------------------------------------------
        // Popup Portfolio
        //------------------------------------------------------------------------------

    }, {
        key: '_showPopupPortfolio',
        value: function _showPopupPortfolio() {
            this.popupProfilePortfolio.showPopup();
            console.log("Serhii _showPopupOrder");

            this.slider = $('.portfolio__slider').bxSlider({
                pagerCustom: this.idPortfolioSliderPager,
                slideMargin: 10
            });
        }
    }, {
        key: '_hidePopupPortfolio',
        value: function _hidePopupPortfolio(click) {
            console.log("Serhii _hidePopupOrder");
            // скрываем попап если клие был вне попапа
            var div = $(this.IdPopupPortfolio); // тут указываем ID элемента


            if (div.is(click)) {
                console.log("Serhii click - " + $(click));
                this.popupProfilePortfolio.closePopup();

                // удаляем слайдер после закрітия попапа
                //this.slider.destroySlider();
            }

            // todo не понятно почему не заработал отработанній кусок кода
            // if (!div.is(click) // если клик был не по нашему блоку
            //     && div.has(click).length === 0) { // и не по его дочерним элементам
            //     this.popupProfilePortfolio.closePopup();
            //     console.log("Serhii closePopup");
            // }
        }
    }, {
        key: '_closeMenu',
        value: function _closeMenu(clickEvent) {
            console.log("serhii _closeMenu");
            $('.h-menu-dd__mob-btn-check').trigger('click');
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });

            this.selctorButtonReadMore.on('click', function (event) {
                return _this._animateScroling(event.target);
            });
            //this.selctorButtonShowProject.on('click',(event) => this._showProject(event.target));

            this.buttonShowPopupPortfolio.on('click', function () {
                return _this._showPopupPortfolio();
            });
            $(document).on('click', function (event) {
                return _this._hidePopupPortfolio(event.target);
            }); // скрываем попап при клике вне попапа

            $('.h-menu-dd__item').on('click', function (event) {
                return _this._closeMenu(event.target);
            });
        }
    }]);

    return FrondevoGlobalUI;
}();

var globalUI = new FrondevoGlobalUI();