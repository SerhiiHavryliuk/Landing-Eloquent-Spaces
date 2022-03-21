/**
 * Created by Serhii on 16.11.2016.
 */

'use strict';

// =============================================================================
// Модель корзина (добавление товара в корзину, стр. корзина(добавить/удалить товар, изменить кол-во товара))
// dependencies:
//  - jQuery (jquery.com)
//  - modules/app_cart.js
//  - modules/app_popup.js
//  - utils/app_send-ajax.js
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSignInDefault = function () {
        function FrondevoSignInDefault() {
                _classCallCheck(this, FrondevoSignInDefault);

                this.buttonAddToCart = $('[data-tocart]');

                // popups
                this.popupCartSel = '#popups-cart';
                this.popupCartEl = $(this.popupCartSel);
                this.continueShopping = $('[data-close-button]');
                this.popupCartDataUrlAtribute = 'url';
                this.popupCartDataCartLoadUrlAtribute = 'cart-load-url';

                this.buttonMinusInCartSel = '[data-prod-minus]';
                this.buttonPlusInCartSel = '[data-prod-plus]';
                this.buttonDelInCartSel = '[data-prod-del]';
                this.checkoutButtonPlus = $(this.buttonPlusInCartSel);
                this.checkoutButtonMinus = $(this.buttonMinusInCartSel);
                this.checkoutButtonDel = $(this.buttonDelInCartSel);

                // header cart
                this.headerCartEl = $('#header-cart');
                this.cartQuantity = $('[data-cart-num]');
                this.cartEmptyClass = 'empty-cart';

                //Cart
                this.cartItemsListClass = '.cart-items-list';
                this.cartItemClass = '.cart-item';
                this.dataCartTotalSelectorAttr = $("[data-cart-total]");
                this.dataProdIdAttributeSelectot = '[data-prod-id]';
                this.dataProdIdAttributeDataName = 'prod-id';
                this.dataProdNumSelectot = '[data-prod-num]';

                this._eventHandlersInit();
        }

        _createClass(FrondevoSignInDefault, [{
                key: '_initModules',
                value: function _initModules() {

                        this.cartModel = new FrondevoCart({
                                // popups
                                popupCartSel: this.popupCartSel,
                                popupCartEl: this.popupCartEl,
                                popupCartDataUrlAtribute: this.popupCartDataUrlAtribute,
                                popupCartDataCartLoadUrlAtribute: this.popupCartDataCartLoadUrlAtribute,

                                // header cart
                                headerCartEl: this.headerCartEl,
                                cartQuantity: this.cartQuantity,
                                cartEmptyClass: this.cartEmptyClass,

                                //Cart
                                cartItemsListClass: this.cartItemsListClass,
                                cartItemClass: this.cartItemClass,
                                dataCartTotalSelectorAttr: this.dataCartTotalSelectorAttr,
                                dataProdIdAttributeSelectot: this.dataProdIdAttributeSelectot,
                                dataProdIdAttributeDataName: this.dataProdIdAttributeDataName,
                                dataProdNumSelectot: this.dataProdNumSelectot

                        });
                }
        }, {
                key: '_eventHandlersInit',
                value: function _eventHandlersInit() {
                        var _this = this;

                        $(document).on('ready', function () {
                                return _this._initModules();
                        });
                        this.buttonAddToCart.on('click', function (event) {
                                return _this.cartModel.addToCart(event.currentTarget);
                        });
                        this.continueShopping.on('click', function (event) {
                                return _this.cartModel.closeCart(event.currentTarget);
                        });
                        this.headerCartEl.on('click', function () {
                                return _this.cartModel.showCart();
                        });
                        this.popupCartEl.on('click', this.buttonMinusInCartSel, function (event) {
                                return _this.cartModel.changeQuantityInCart(event.currentTarget, 'minus');
                        });
                        this.checkoutButtonMinus.on('click', function (event) {
                                return _this.cartModel.changeQuantityInCart(event.currentTarget, 'minus');
                        });
                        this.popupCartEl.on('click', this.buttonPlusInCartSel, function (event) {
                                return _this.cartModel.changeQuantityInCart(event.currentTarget, 'plus');
                        });
                        this.checkoutButtonPlus.on('click', function (event) {
                                return _this.cartModel.changeQuantityInCart(event.currentTarget, 'plus');
                        });
                        this.popupCartEl.on('click', this.buttonDelInCartSel, function (event) {
                                return _this.cartModel.delInCart(event.currentTarget);
                        });
                        this.checkoutButtonDel.on('click', function (event) {
                                return _this.cartModel.delInCart(event.currentTarget);
                        });
                }
        }]);

        return FrondevoSignInDefault;
}();

var signindefault = new FrondevoSignInDefault();