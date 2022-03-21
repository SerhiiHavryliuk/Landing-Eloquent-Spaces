'use strict';

// =============================================================================
// Модуль корзина (добавление товара в корзину, стр. корзина)
// Modules cart js
// dependencies:
//  - jQuery (jquery.com)
//  - modules/app_popup.js
//  - utils/app_send-ajax.js
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoCart = function () {
    function FrondevoCart(parameters) {
        _classCallCheck(this, FrondevoCart);

        // popups
        this.popupCartSel = parameters.popupCartSel;
        this.popupCartEl = parameters.popupCartEl;
        this.popupCartDataUrlAtribute = parameters.popupCartDataUrlAtribute;
        this.popupCartDataCartLoadUrlAtribute = parameters.popupCartDataCartLoadUrlAtribute;

        // header cart
        this.headerCartEl = parameters.headerCartEl;
        this.cartQuantity = parameters.cartQuantity;
        this.cartEmptyClass = parameters.cartEmptyClass;

        // cart
        this.cartItemsListClass = parameters.cartItemsListClass;
        this.cartItemClass = parameters.cartItemClass;
        this.dataCartTotalSelectorAttr = parameters.dataCartTotalSelectorAttr;
        this.dataProdIdAttributeSelectot = parameters.dataProdIdAttributeSelectot;
        this.dataProdIdAttributeDataName = parameters.dataProdIdAttributeDataName;
        this.dataProdNumSelectot = parameters.dataProdNumSelectot;

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoCart, [{
        key: 'addToCart',
        value: function addToCart(clikedButtonAddToCart) {

            var currentItemSelector = $(clikedButtonAddToCart).parent(),
                quantityCurrentItem = $(clikedButtonAddToCart).parent().parent().find('option:selected').val();

            // ajax
            var dataCurrentItem = "action='add'&id=" + currentItemSelector.data(this.dataProdIdAttributeDataName) + "&num=" + quantityCurrentItem;

            this.showCart(dataCurrentItem);
        }
    }, {
        key: 'showCart',
        value: function showCart(dataCurrentItem) {
            var _this = this;

            if (!this.headerCartEl.hasClass(this.cartEmptyClass)) {
                this.ajaxCartLoad.sendData(dataCurrentItem).then(function (responseJSON) {
                    if (responseJSON.success == true) {
                        _this.popupCartEl.find(_this.cartItemsListClass).eq(0).empty().append(responseJSON.content);
                        _this.dataCartTotalSelectorAttr.replaceWith(responseJSON.total);
                        _this.popupCart.showPopup();
                    }
                }, function (error) {
                    console.error('Не удалось получить ответ от сервера!', error);
                });
            }
        }
    }, {
        key: 'closeCart',
        value: function closeCart(clickedEl) {
            this.popupCart.closePopup();
        }
    }, {
        key: 'changeQuantityInCart',
        value: function changeQuantityInCart(clickedEl, buttonType) {
            var _this2 = this;

            var inputCartItemCountNumSelector = $(clickedEl).parents(this.dataProdIdAttributeSelectot).eq(0),
                idCurrentItem = inputCartItemCountNumSelector.data(this.dataProdIdAttributeDataName),
                quantityCurrentItem = inputCartItemCountNumSelector.find(this.dataProdNumSelectot);

            // если кликали по минусу - уменьшаем, если по плюсу - увеличиваем
            if (buttonType == 'minus') {
                if (quantityCurrentItem.val() <= 1) return;
                quantityCurrentItem.val(parseInt(quantityCurrentItem.val()) - 1);
            } else {
                quantityCurrentItem.val(parseInt(quantityCurrentItem.val()) + 1);
            }

            // ajax
            var data = "action='edit'&id=" + idCurrentItem + "&num=" + quantityCurrentItem.val();
            this.ajaxChangeInCart.sendData(data).then(function (responseJSON) {
                if (responseJSON.success == true) {
                    _this2.dataCartTotalSelectorAttr.replaceWith(responseJSON.total);
                    _this2.headerCartEl.text(responseJSON.quantityInCart);
                }
            }, function (error) {
                console.error('Не удалось получить ответ от сервера!', error);
            });
        }
    }, {
        key: 'delInCart',
        value: function delInCart(clickedEl) {
            var _this3 = this;

            var inputCartItemCountNumSelector = $(clickedEl).parents(this.dataProdIdAttributeSelectot).eq(0),
                idCurrentItem = inputCartItemCountNumSelector.data(this.dataProdIdAttributeDataName);

            // ajax
            var data = "action='delete'&id=" + idCurrentItem;
            this.ajaxChangeInCart.sendData(data).then(function (responseJSON) {
                if (responseJSON.success == true) {
                    _this3.dataCartTotalSelectorAttr.replaceWith(responseJSON.total);
                    _this3.cartQuantity.text(responseJSON.quantityInCart);

                    // особые действия если удалали все товары
                    if ($(_this3.cartItemClass).length == 0) {
                        _this3.popupCart.closePopup();
                        _this3.headerCartEl.text('').addClass(_this3.cartEmptyClass);
                    }
                }
            }, function (error) {
                console.error('Не удалось получить ответ от сервера!', error);
            });

            inputCartItemCountNumSelector.remove();
        }
    }, {
        key: '_initModules',
        value: function _initModules() {

            // popups cart
            this.popupCart = new FrondevoPopup({
                popupSelector: this.popupCartSel,
                overlayStatus: false
            });

            // ajax
            this.ajaxChangeInCart = new FrondevoSendAJAX({
                serverScriptUrl: this.popupCartEl.data(this.popupCartDataUrlAtribute),
                sendMethod: 'get',
                dataType: 'json'
            });

            this.ajaxCartLoad = new FrondevoSendAJAX({
                serverScriptUrl: this.popupCartEl.data(this.popupCartDataCartLoadUrlAtribute),
                sendMethod: 'get',
                dataType: 'json'
            });
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {}
    }]);

    return FrondevoCart;
}();

//let cart = new FrondevoCart();