'use strict';

// =============================================================================
// ui на странице каталога
// dependencies:
//  - jQuery
//  - jQuery UI                                 - ползуонк для цен в фильтрах
//  - modules/forms/jquery.select.js            - кастомный селект для сортировки
//  - modules/forms/app_price-slider.js         - полузнок для цен в фильтрах
//  - utils/app_check-is-visible-elements.js    - ajax подгрузка при скролинге вниз
//  - utils/app_debounce.js                     - ajax подгрузка при скролинге вниз
//  - utils/app_send-ajax.js                    - ajax на странице
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoCataloglUI = function () {
    function FrondevoCataloglUI() {
        _classCallCheck(this, FrondevoCataloglUI);

        // элементы взаимодействия
        // - action panels
        // - sorting
        this.selectSort = $('#catalog__sort-select');

        // - filters
        this.buttonToggleFilters = $('.catalog__show-filters');
        this.arrFilterButtonText = $('[data-filter-button-toggle-text]');

        // - product list
        this.productsList = $('#catalog__pruduct-list');
        this.globalCatalogLayout = $('.catalog__products-list-layout-row');

        // url откуда запрашиваем обновление списка товаров
        // формы и атрибуты, которые необходимо отправить для обновления списка товаров
        this.urlGetProducts = this.productsList.attr('data-get-items-url');
        this.arrFormsWhatNeedForGetCatalogItems = ['#catalog__sort-forms, [data-filters-forms]'];
        this.arrAttrWhatNeedForGetCatalogItems = [{ selector: '#catalog__pruduct-list', attrName: 'data-list-page' }, { selector: '#catalog__pruduct-list', attrName: 'data-section-type' }, { selector: '#catalog__pruduct-list', attrName: 'data-section-value' }, { selector: '#catalog__pruduct-list', attrName: 'data-label-flag' }, { selector: '#catalog__pruduct-list', attrName: 'data-get-new-page' }];
        this.attrNameGetNewPage = 'data-get-new-page';

        // preloader
        this.elWherePrelaoderAppend = $('body'); // куда добавить preloader
        this.preloaderHTML = '<div class="overlay_preloader" id="overlay-preloader"><div class="preloader"></div></div>';
        this.preloaderSelector = '#overlay-preloader';

        // filter panel
        this.subfiltersButtons = $('.catalog__filters-section-title');
        this.filterForm = $('[data-filters-forms]');
        this.filterSelected = $('.catalog__filters-selected');
        this.filterSelectedList = $('[data-filters-selected-list]');
        this.filterReset = $('[data-filters-reset]');
        this.sliderBox = $('[data-price-slider]').parent();
        this.filterMobSend = $('[data-filters-mob-send]');
        this.filterTitle = '.catalog__filters-section-title';
        this.filterSliderResetBtn = '[data-price-slider-reset]';

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoCataloglUI, [{
        key: '_initModules',
        value: function _initModules() {

            this.selectSort.customSelect();
            this._addPreloader();

            this.visibleOfProductList = new FrondeovoCheckIsVisibleElement(this.productsList);
            this.ajaxGetProductItems = new FrondevoSendAJAX({
                serverScriptUrl: this.urlGetProducts
            });

            this.priceSlider = new FrondevoPriceSlider(this.sliderBox.find('[data-price-slider]'), this.sliderBox.find('[data-price-slider-min-indicator]'), this.sliderBox.find('[data-price-slider-max-indicator]'), this.sliderBox.find('[data-price-slider-min-input]'), this.sliderBox.find('[data-price-slider-max-input]'));
        }
    }, {
        key: '_toggleFiltersPanel',
        value: function _toggleFiltersPanel(clickedEl) {
            if ($(clickedEl).attr('data-filters') == 'show') {
                this.globalCatalogLayout.attr('data-filters-visibiliy', 'true');
                $(clickedEl).attr('data-filters', 'hide');
                this._changeFilterButtonText();
            } else {
                this.globalCatalogLayout.attr('data-filters-visibiliy', 'false');
                $(clickedEl).attr('data-filters', 'show');
                this._changeFilterButtonText();
            }
        }
    }, {
        key: '_toggleSubfilters',
        value: function _toggleSubfilters(button) {
            $(button).parent().toggleClass('catalog__filters-section_open');
        }
    }, {
        key: 'filterChange',
        value: function filterChange(eventT) {

            // сброс параметра data-get-new-page при смене фильтра
            this._changeParameterGetNewPage('false');

            this._filterBuildSelected();

            if (window.innerWidth > 1000) this._getCatalogItems('full clean before insert', eventT);
        }
    }, {
        key: '_filterBuildSelected',
        value: function _filterBuildSelected() {

            this.filterSelectedList.empty();

            this._filterBuildSelectedFromCheckBox();

            this._filterBuildSelectedFromPriceSlider();

            if ($(this.filterSelectedList).html() == '') this.filterSelected.removeClass('opened');else this.filterSelected.addClass('opened');
        }
    }, {
        key: '_filterBuildSelectedFromCheckBox',
        value: function _filterBuildSelectedFromCheckBox() {
            var _this = this;

            this.filterForm.find('input[type="checkbox"]:checked').each(function () {
                var o = $('[data-filters-selected-checkbox]').eq(0).clone();

                o.find('[data-filters-selected-name]').text($(this).next().text());
                o.find('[data-filters-selected-label]').attr("for", $(this).attr("id"));

                $(_this.filterSelectedList).append(o);
            });
        }
    }, {
        key: '_filterBuildSelectedFromPriceSlider',
        value: function _filterBuildSelectedFromPriceSlider() {
            var MinPrice = this.filterForm.find('[data-price-slider-min-input]').val(),
                MaxPrice = this.filterForm.find('[data-price-slider-max-input]').val(),
                StartMinPrice = this.filterForm.find('[data-price-slider]').attr("data-curmin"),
                StartMaxPrice = this.filterForm.find('[data-price-slider]').attr("data-curmax");

            if (MinPrice != StartMinPrice || MaxPrice != StartMaxPrice) {
                var o = $('[data-filters-selected-price]').eq(0).clone();

                o.find('[data-filters-selected-price-slider-min]').text(MinPrice);
                o.find('[data-filters-selected-price-slider-max]').text(MaxPrice);

                $(this.filterSelectedList).append(o);
            }
        }
    }, {
        key: '_filterReset',
        value: function _filterReset() {

            // сброс параметра data-get-new-page при смене фильтра
            this._changeParameterGetNewPage('false');

            this.filterForm.find('input').removeAttr('checked');
            this.filterSelected.removeClass('opened');
            this.priceSlider.reset('not refresh');

            if (window.innerWidth > 1000) this._getCatalogItems('full clean before insert', 'reset');
        }
    }, {
        key: '_changeFilterButtonText',
        value: function _changeFilterButtonText() {

            // изменяем текст в кнопке с учетом того, что для мобильной версии тексты отличаются
            this.arrFilterButtonText.each(function () {
                var currentEl = $(this),
                    curentText = currentEl.text(),
                    toggleText = currentEl.attr('data-filter-button-toggle-text');

                currentEl.text(toggleText).attr('data-filter-button-toggle-text', curentText);
            });
        }
    }, {
        key: '_getDataWhatCanBeSendForGetCatalogItems',
        value: function _getDataWhatCanBeSendForGetCatalogItems(typeOfFilterRefresh) {

            var formData = '';

            // собираем данные по формам
            this.arrFormsWhatNeedForGetCatalogItems.forEach(function (itemFormSelector) {
                formData += $(itemFormSelector).serialize();
            });

            // собирем данные по атрибутам
            this.arrAttrWhatNeedForGetCatalogItems.forEach(function (item) {
                formData += '&' + item.attrName + '=' + $(item.selector).attr(item.attrName); // передаваемое значение параметра = имени атрибута
            });

            // добавляем информацию по фильтрам
            if (typeOfFilterRefresh) formData += this._getDataWhatCanBeSendForGetCatalogItemsAddFilterData(typeOfFilterRefresh);

            return formData;
        }
    }, {
        key: '_getDataWhatCanBeSendForGetCatalogItemsAddFilterData',
        value: function _getDataWhatCanBeSendForGetCatalogItemsAddFilterData(typeOfFilterRefresh) {
            var formData = '';
            if (typeOfFilterRefresh == 'reset' || typeOfFilterRefresh == 'mobile') {
                formData += '&changeFilter=all';
            } else {
                // получаем id секции фильтров, которую не нужно обновлять
                var o = $(typeOfFilterRefresh).parents('.catalog__filters-section'),
                    id = o.attr("id");
                formData += '&changeFilter=' + id;
            }

            return formData;
        }
    }, {
        key: '_getCatalogItems',
        value: function _getCatalogItems(typeOfInsertNewItems, typeOfFilterRefresh) {
            var _this2 = this;

            this._showPreloader();

            var sendingData = this._getDataWhatCanBeSendForGetCatalogItems(typeOfFilterRefresh);

            this.ajaxGetProductItems.sendData(sendingData).then(function (responseJSON) {

                _this2._showNewCatalogItems(responseJSON.htmlCode, typeOfInsertNewItems);
                _this2._setNewCurrentPage(responseJSON.page);

                // фильтры
                if (responseJSON.filters) {
                    _this2._setNewFilters(responseJSON.filters);
                }
                // количество найденных товаров
                if (responseJSON.kol) {
                    $('[data-catalog-goods-kol]').text(responseJSON.kol);
                }
            }, function (error) {
                console.error('Не удалось загрузить данные!', error);
                this._hidePreloader();
            });
        }
    }, {
        key: '_setNewFilters',
        value: function _setNewFilters(filters) {

            // filters
            for (var i = 0; i < filters.length; i++) {
                var secId = filters[i].name;
                $("#" + secId).html(filters[i].content);
            }
            // reinit PriceSlider
            this.sliderBox = $('[data-price-slider]').parent();
            this.priceSlider = new FrondevoPriceSlider(this.sliderBox.find('[data-price-slider]'), this.sliderBox.find('[data-price-slider-min-indicator]'), this.sliderBox.find('[data-price-slider-max-indicator]'), this.sliderBox.find('[data-price-slider-min-input]'), this.sliderBox.find('[data-price-slider-max-input]'));

            this._filterBuildSelected();
        }
    }, {
        key: '_addPreloader',
        value: function _addPreloader() {
            this.elWherePrelaoderAppend.append(this.preloaderHTML);
            this.preloader = $(this.preloaderSelector);
        }
    }, {
        key: '_showPreloader',
        value: function _showPreloader() {
            this.preloader.addClass('show');
        }
    }, {
        key: '_hidePreloader',
        value: function _hidePreloader() {
            this.preloader.removeClass('show');
        }
    }, {
        key: '_showNewCatalogItems',
        value: function _showNewCatalogItems(htmlCodeForItems, typeOfInsertNewItems) {
            var _this3 = this;

            if (typeOfInsertNewItems == 'full clean before insert') {
                this.productsList.empty();
            }

            this.productsList.append(htmlCodeForItems);
            setTimeout(function () {
                return _this3._hidePreloader();
            }, 400); // искуственная задержка, чтобы было видно прелоадер на демо
        }
    }, {
        key: '_setNewCurrentPage',
        value: function _setNewCurrentPage(newPageVal) {
            this.productsList.attr('data-list-page', newPageVal);
        }

        // если атрибут false - сигнал серверу что нужно оталать первую страницу для текущих настройек (сотировка/фильры/вид каталога)
        // а true - отдать следующию страницу для текущих настроеек

    }, {
        key: '_changeParameterGetNewPage',
        value: function _changeParameterGetNewPage(newValue) {
            this.productsList.attr(this.attrNameGetNewPage, newValue);
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this4 = this;

            window.addEventListener('scroll', function () {
                return checkMoreCatalogItems(_this4.visibleOfProductList, _this4.productsList);
            });
            this.buttonToggleFilters.on('click', function (event) {
                return _this4._toggleFiltersPanel(event.currentTarget);
            });

            this.selectSort.on('change', function () {
                return _this4._changeParameterGetNewPage('false');
            });
            this.selectSort.on('change', function () {
                return _this4._getCatalogItems('full clean before insert');
            });

            $(document).on('click', this.filterTitle, function (event) {
                _this4._toggleSubfilters(event.currentTarget);
            });

            this.filterForm.on('change', function (event) {
                _this4.filterChange(event.target);
            });

            this.filterReset.on('click', function () {
                _this4._filterReset();
            });

            this.filterMobSend.on('click', function () {
                _this4._getCatalogItems('full clean before insert', 'mobile');
                _this4._hideFilters(_this4.buttonToggleFilters);
            });

            $(document).on('click', this.filterSliderResetBtn, function (event) {
                _this4.priceSlider.reset();
                $(event.currentTarget).parent().remove();
            });
        }
    }]);

    return FrondevoCataloglUI;
}();

var catalogUI = new FrondevoCataloglUI();

// запрашиваем новые данные с паузой
// чтобы избежать множетвенных ненужных загрузок по onscroll
var checkMoreCatalogItems = debounce(function (param1, param2) {
    // todo надо разобраться как эту утилиту перенести в методы
    // если доскролили до низу списка продуктов и есть что подгружать
    if (param1.checkIsVisibleBottom() && param2.attr('data-list-page') != 'none') {

        catalogUI._getCatalogItems();
        catalogUI._changeParameterGetNewPage('true');
    } // todo хорошо бы разобраться и удалять приязанное событие, если уже нечего подгружать
}, 250);