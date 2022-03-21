'use strict';

/**
 * Created by Serhii on 12.01.2017.
 */

$(document).ready(function () {

    /*======================================
     Demos
     ======================================*/
    $.fn.selectric.defaults.disableOnMobile = false;

    $('#basic').selectric();

    /*------------------------------------*/

    // Cache the target element
    var $selectValue = $('#select_value').find('strong');

    // Get initial value
    $selectValue.text($('#get_value').val());

    // Initialize Selectric and bind to 'change' event
    $('#get_value').selectric().on('change', function () {
        $selectValue.text($(this).val());
    });

    /*------------------------------------*/

    $('#set_value').selectric();

    $('#set_first_option').on('click', function () {
        $('#set_value').prop('selectedIndex', 0).selectric('refresh');
    });

    $('#set_second_option').on('click', function () {
        $('#set_value').prop('selectedIndex', 1).selectric('refresh');
    });

    $('#set_third_option').on('click', function () {
        $('#set_value').prop('selectedIndex', 2).selectric('refresh');
    });

    /*------------------------------------*/

    $('#dynamic').selectric();

    $('#bt_add_val').click(function () {
        // Store the value in a variable
        var value = $('#add_val').val();

        // Append to original select
        $('#dynamic').append('<option>' + (value ? value : 'Empty') + '</option>');

        // Refresh Selectric
        $('#dynamic').selectric('refresh');
    });

    /*------------------------------------*/

    // With events
    $('#callbacks').on('selectric-before-open', function () {
        alert('Before open');
    }).on('selectric-before-close', function () {
        alert('Before close');
    })
    // You can bind to change event on original element
    .on('change', function () {
        alert('Change');
    });

    // Or, with plugin options
    $('#callbacks').selectric({
        onOpen: function onOpen() {
            alert('Open');
        },
        onChange: function onChange() {
            alert('Change');
        },
        onClose: function onClose() {
            alert('Close');
        }
    });

    /*------------------------------------*/

    $.get('php/ajax.html', function (data) {
        $('#ajax').append(data).selectric();
    });

    /*------------------------------------*/

    $('.custom-options').selectric({
        optionsItemBuilder: function optionsItemBuilder(itemData) {
            return itemData.value.length ? '<span class="ico ico-' + itemData.value + '"></span>' + itemData.text : itemData.text;
        }
    });
});