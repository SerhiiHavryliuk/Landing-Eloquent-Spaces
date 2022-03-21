/**
 * Created by Serhii on 05.01.2017.
 */

'use strict';

// =============================================================================
// 3 вариант на карен милен
//Была проблема с подгрузкой фото через ajax, помогла инициализация слайдера в этом примере http://stackoverflow.com/questions/37641932/wookmark-refresh-filter-when-new-images-are-fetched-via-ajax
// Примеры Wookmark http://plugin.wookmark.com/index.html
// dependencies:
//  - jQuery
// - Wookmark (https://github.com/germanysbestkeptsecret/Wookmark-jQuery)
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoInspiration = function () {
    function FrondevoInspiration() {
        _classCallCheck(this, FrondevoInspiration);

        // this.buttonPreviousRecords              = $('.inspiration__button-previous-records');
        // this.inspiration                        = $('.inspiration');
        // this.urlGetUrlActionForinspiration      = this.inspiration.attr('data-get-url');
        // //this.selectorButtonPreviousRecords      = $('.inspiration__button-previous-records');
        // this.selectorInspirationList            = $('.inspiration__list');
        //
        // //собираем все атрибуты в массив
        // this.arrWhatNeedForGetPreviousRecords   = [
        //     {selector: '.inspiration', attrName: 'data-list-page'}
        // ];
        //
        // // куда добавить preloader
        // this.elWherePrelaoderAppend     = $('body');
        // this.preloaderHTML              = '<div class="overlay_preloader" id="overlay-preloader"><div class="preloader"></div></div>';
        // this.preloaderSelector          = '#overlay-preloader';
        //
        // this.inspirationImg                = $('.inspiration__content-img');
        // this.inspirationFlag               = true;

        // wookmark
        this.container = '.waterfall-list';

        this._eventHandlersInit();
    }

    _createClass(FrondevoInspiration, [{
        key: '_initModules',
        value: function _initModules() {

            // this.getPreviousRecords = new FrondevoGetCatalogItems(
            //     this.urlGetUrlActionForinspiration,
            //     this.inspiration,
            //     this.attrForCurentPage
            // );
            //
            // this._addPreloader();
            this._wookmarkInit(); // initWookmark
        }

        // _getDataWhatCanBeSendForPreviousRecords() {
        //
        //     let formData = '';
        //
        //     // собирем данные по атрибутам
        //     this.arrWhatNeedForGetPreviousRecords.forEach(function ( item) {
        //         formData += '&' + item.attrName + '=' + $( item.selector ).attr( item.attrName ); // передаваемое значение параметра = имени атрибута
        //     });
        //
        //     return formData;
        // }
        //
        //
        //
        // _getPreviousRecords() {
        //
        //     this._showPreloader();
        //
        //     let sendingData = this._getDataWhatCanBeSendForPreviousRecords();
        //
        //     this.getPreviousRecords.getItems( sendingData )
        //         .then(
        //             responseJSON => {
        //
        //                 this._showNewPreviousRecords( responseJSON.htmlCode);
        //                 this._setNewCurrentPage(responseJSON.page);
        //                 if("none" == responseJSON.page) {
        //                     this.buttonPreviousRecords.hide();
        //                 }
        //                 setTimeout(()=> this._wookmarkInit(), 50); // обновляем wookmark после вставки новой записи через какоето время так как в FF картинка залазила на футер
        //
        //
        //             }, function ( error ) {
        //                 console.error( 'Не удалось загрузить данные!', error);
        //                 this._hidePreloader();
        //             });
        //
        // }


        // _showNewPreviousRecords( htmlCodeForItems) {
        //     //this.inspiration.append( htmlCodeForItems ); // Serhii 04.01.17
        //     this.selectorInspirationList.append( htmlCodeForItems );
        //     setTimeout(()=> this._hidePreloader(), 400);
        // }
        //
        // _setNewCurrentPage( newPageVal ) {
        //     this.inspiration.attr('data-list-page', newPageVal);
        // }
        //
        //
        // _addPreloader() {
        //     this.elWherePrelaoderAppend.append( this.preloaderHTML );
        //     this.preloader = $(this.preloaderSelector);
        // }
        //
        // _showPreloader() {
        //     this.preloader.addClass('show');
        // }
        //
        // _hidePreloader() {
        //     this.preloader.removeClass('show');
        // }
        //
        //
        // _showHover(EventTarget){
        //
        //     if(document.documentElement.clientWidth<1024) {
        //
        //         if(this.inspirationFlag == true) {
        //             this.inspirationImg.addClass('.inspiration__content-img-hover');
        //
        //             $(EventTarget).parent().parent().find('.inspiration__img-hover-text')
        //                 .addClass('inspiration__show-hover');
        //             $(EventTarget).parent().parent().parent().find('.inspiration__content-img-title')
        //                 .addClass('inspiration__show-hover');
        //             this.inspirationFlag = false;
        //             return false;
        //             // e.preventDefault();
        //         }
        //
        //         if(this.inspirationFlag == false) {
        //
        //             if('inspiration__img-hover-text inspiration__show-hover' == EventTarget.className) {
        //                 location.href = $(EventTarget).parent().attr("href");
        //             } else {
        //                 location.href = $(EventTarget).parent().parent().attr("href");
        //             }
        //
        //         }
        //
        //     }
        //
        // }

    }, {
        key: '_wookmarkInit',
        value: function _wookmarkInit() {
            this.wookmark = new Wookmark(this.container, {
                offset: 15,
                align: 'left'
            });
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('ready', function () {
                return _this._initModules();
            });
            //
            // this.buttonPreviousRecords.on('click', () => this._getPreviousRecords());
            // this.inspirationImg.on('click', () => this._showHover(event.target));

            // Wookmark
            $(window).on('resize', function () {
                return _this._wookmarkInit();
            }); // update wookmark after window resize
            $(window).on('load', function () {
                return _this._wookmarkInit();
            }); // запускаем wookmark после загрузки всей страницы
        }
    }]);

    return FrondevoInspiration;
}();

var inspiration = new FrondevoInspiration();

// Первый вариант -------------------------------
// window.onload = function () {
//     var wookmark1 = new Wookmark('.waterfall-list', {
//         outerOffset: 0, // Optional, the distance to the containers border
//         align: 'left'
//         //itemWidth: 200 // Optional, the width of a grid item
//     });
// };


// Второй вариант --------------------------------
// есть проблемы с обновлением карточек http://prntscr.com/dsk3l3
// wookmark for news
// $(function() {
//     var $news = $('.waterfall-list');
//     if ( !$news.length ) return;
//
//     wookmark();
//
//     // update wookmark after window resize
//     $( window ).resize(function() {
//         wookmark();
//     });
//
//     function wookmark() {
//         $news.wookmark({
//             offset: 20
//         });
//     }
//
//
//     console.log(44444);
//
// });