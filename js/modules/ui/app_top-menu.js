// 'use strict';
//
// // =============================================================================
// // behaviours for top navigation
// // dependencies:
// //  - jQuery
// // =============================================================================
//
// class FrondevoTopNav {
//
//     constructor( elTopNav ) {
//
//         this.topNav = elTopNav;
//         this.topNavUl = this.topNav.find('ul').eq(0);  // необходимо для избавления от мигания меню при переходе с пункта на пункт
//
//         // при инициализации добавляем класс, чтобы при первом показе под меню, оно показалось с аниацией
//         // после показа первого пункта класс, убираем, чтобы при переходе по смежным пунктам не было миганий
//         this.arrTopNavSubMenu = this.topNavUl.find('.h-menu-dd__layout-sub-menu');
//         this.elForShowMobMenu = $('#h-menu-dd__show-menu'); // чекбокс если включен - показывается меню
//
//         this.classForAnimationSubMenu   = 'h-menu-dd__layout-sub-menu_animation';
//         this.globalNoScrollClass        = 'noscroll';
//         this.mobileSubMenuOpenClass     = 'h-menu__item-open';
//         this.firstLevelMenuItemClass    = 'h-menu-dd__item';
//         this.firstLevelLinkOnlyClass    = 'h-menu__item-link';              // todo хорошо бы избавиться от этого доп класса (усложняет привязку)
//
//         this.arrTopNavSubMenu.addClass( this.classForAnimationSubMenu );
//         // элемент для отслеживания тапов для показа под меню на моб версии
//         this.arrItemMenuFirstLevel = this.topNav.find('.h-menu-dd__item');
//
//         this._eventHandlersInit();
//     }
//
//
//     _firedIfShowDropDownMenu() {
//
//         let event = $.Event( 'topMenuDropDown:show' );
//         this.topNav.trigger(event);
//         return this;
//
//     }
//
//
//     _firedIfHideDropDownMenu() {
//
//         this._addAnimationForSubmenu();
//         let event = $.Event( 'topMenuDropDown:hide' );
//         this.topNav.trigger(event);
//         return this;
//
//     }
//
//
//     _removeAnimationForSubmenu() {
//         this.arrTopNavSubMenu.removeClass( this.classForAnimationSubMenu );
//     }
//
//     _addAnimationForSubmenu() {
//         this.arrTopNavSubMenu.addClass( this.classForAnimationSubMenu );
//     }
//
//     _toogleSubMenuForMobile( event ) {
//
//         if(window.innerWidth > 1000) return; // если десктоп, то должна просто отрабоатть ссылка
//
//         event.preventDefault(); // без этого на мобилках при клике на ссылки прыгало меню
//
//
//         let $elItemMenuFirstLevel = $(event.target).parent();
//
//         // если элемент не содержит спец класс, обозначающий что это ссылка
//         // делаем раскрытие под меню
//         // иначе переходим по ссылке
//
//         if( $elItemMenuFirstLevel.hasClass(this.firstLevelLinkOnlyClass)) {
//
//             document.location.href = $(event.target).attr('href');
//         }
//
//         // если кликаем по первому уровню меню и меню не открыто
//         if( !$elItemMenuFirstLevel.hasClass(this.mobileSubMenuOpenClass) &&
//             $elItemMenuFirstLevel.hasClass(this.firstLevelMenuItemClass) ) {
//
//             $elItemMenuFirstLevel.addClass(this.mobileSubMenuOpenClass);
//
//         } else if( $elItemMenuFirstLevel.hasClass(this.firstLevelMenuItemClass)) { // если кликаем по первому уровню меню и меню открыто
//
//             $elItemMenuFirstLevel.removeClass(this.mobileSubMenuOpenClass);
//
//         }
//
//     }
//
//     _toggleGlobalScroll() {
//         if(this.elForShowMobMenu.is(':checked')) {
//             $('html').addClass(this.globalNoScrollClass);
//         } else {
//             $('html').removeClass(this.globalNoScrollClass);
//         }
//     }
//
//     _closeMenu(clickEvent) {
//         console.log("serhii");
//     }
//
//
//     _eventHandlersInit () {
//
//         this.topNavUl.on( 'mouseenter', () => this._firedIfShowDropDownMenu());
//         this.topNavUl.on( 'mouseleave', () => this._firedIfHideDropDownMenu());
//         this.arrTopNavSubMenu.on( 'transitionend', () => this._removeAnimationForSubmenu());
//         this.arrItemMenuFirstLevel.on( 'click', (event) => this._toogleSubMenuForMobile( event ));
//         this.elForShowMobMenu.on('change', () => this._toggleGlobalScroll());
//
//         //$('.h-menu-dd__item').on( 'click', (event) => this._closeMenu( event ));
//         $('.h-menu-dd__item').on('click',(event) => this._closeMenu(event.target));
//
//     }
// }
"use strict";