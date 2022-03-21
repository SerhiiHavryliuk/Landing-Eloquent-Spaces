'use strict';

/**
 * Created by Serhii on 22.11.2016.
 */

$('#responsiveTabsDemo').responsiveTabs({
    startCollapsed: 'tabs',
    active: 1,
    disabled: [4, 5],
    setHash: true,
    animation: 'slide'
});

// Vertical Tabs
$('#responsiveTabsDemoVertical').responsiveTabs({
    startCollapsed: 'tabs',
    setHash: true
    // animation: 'slide'
});
// Vertical Tabs
$('#responsiveTabsDemoAcordion').responsiveTabs({
    collapsible: true
    //collapsible: 'true',
    //startCollapsed: 'accordion',
    //setHash: true
});