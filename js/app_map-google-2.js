// 1) https://developers.google.com/maps/documentation/javascript/examples/icon-complex?hl=ru

var option = $("option"),
    imgMarker, // путь где лежит иконка маркера
    $selectValue,
    zoomMarker,
    zoomValue = 0;

// инициализация карты
function initMap() {
    var latActive;
    var lngActive;

    // Если функция вызывается второй раз(выбран определенный магазин) то делаем зум больше
    if(0 == zoomValue) {
        // уменньшаем зум карты для моб. устройств
        if(document.documentElement.clientWidth>768) {
            zoomMarker = 12;
        } else {
            zoomMarker = 11;
        }
        zoomValue++;
    } else {
        zoomMarker = 15;
    }

    for (var i = 0; i < stores.length; i++) {
        //центрируем карту относительно активного маркера
        if (option.eq(i).hasClass("stores__select_item_active")) {
            latActive = stores[i][1];
            lngActive = stores[i][2];
        }
    }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomMarker,
        center: {lat: latActive, lng: lngActive}
    });

    setMarkers(map);
}

//считываем атрибуты всех магазтнов в массив
var DataValue = [];
var DataLocationStore = [];
var DataLat = [];
var DataLng = [];
var zIndex = [];

// получаем данные сатрибутов селекта для каждого магазина
for (var i = 0; i < option.length; i++) {
    var zIndexValue = 1;
    // при первой загрузке стр для главного (первого маркера) делаем zIndex больше, чтобы маркер был поверх других маркеров
    if(0 == i) {
        zIndexValue = 2;
    }
    DataValue[i] = option.eq(i).attr("value");
    DataLocationStore[i] = option.eq(i).attr("data-location-store");
    DataLat[i] = Number(option.eq(i).attr("data-lat"));
    DataLng[i] = Number(option.eq(i).attr("data-lng"));
    zIndex[i] = zIndexValue;
}

// Data for the markers consisting attributes:  data-location-store, data-lat, data-lng and a zIndex for the
// order in which these markers should display on top of each other.
var stores = [];
for (var i = 0; i < option.length; i++) {
    stores[i] = [];
    stores[i][0] = DataLocationStore[i];
    stores[i][1] = DataLat[i];
    stores[i][2] = DataLng[i];
    stores[i][3] = DataValue[i];
    stores[i][4] = zIndex[i];
}


// Adds markers to the map.
function setMarkers(map) {

    for (var i = 0; i < stores.length; i++) {

        //присваиваем желтый маркер активному элементу в списке
        if(option.eq(i).hasClass("stores__select_item_active")) {
            imgMarker = $('#map').attr('data-url-marker-main');
        } else {
            imgMarker = $('#map').attr('data-url-marker');
        }

        var store = stores[i];
        var marker = new google.maps.Marker({
            position: {lat: store[1], lng: store[2]},
            map: map,
            icon: imgMarker,
            title: store[0],
            zIndex: store[4],
            value: store[3]
        });


        // обработчик клика на маркер
        marker.addListener('click', function() {
            //map.setCenter(marker.getPosition());

            for (var i = 0; i < stores.length; i++) {
                if(this.value == option.eq(i).val() ) {
                    var curentStores = this.value *1; // текущий элемент в селекте

                    // добавляем текст под селектом
                    var address_text = $(".stores__address");
                    address_text.removeClass("stores__address_active");
                    address_text.eq(curentStores).addClass("stores__address_active");

                    // добавляем класс активному элементу в селекте
                    option.removeClass("stores__select_item_active");// удаляем все активные классы
                    option.eq(curentStores).addClass("stores__select_item_active"); // добавляем активному элементу класс

                    // смену текста в селекте при клике на маркер
                    $(".label").text(option.eq(i).attr("data-location-store"));

                    initMap();
                    //map.setZoom(12);
                }
            }

        });

    }
}


//------------------------------------- jQuery Selectric ------------------------------------
// http://selectric.js.org/demo.html
$( function() {

    $('.custom-options').selectric({
        // На км эта строчка была нужна, после обновления плагина через нее возникают ошибки
        // пока отключил, все работает
        // optionsItemBuilder: function(itemData, element, index) {
        //     return element.val().length ?  itemData.text  : itemData.text;
        // }
    });

    // Cache the target element
    $selectValue = $('#select_value').find('strong');

    // Get initial value
    $selectValue.text($('#get_value').val());

    // Initialize Selectric and bind to 'change' event
    $('#get_value').selectric().on('change', function() {

        //$selectValue.text($(this).val());
        var curentStores = $(this).val() *1; // текущий элемент в селекте

        // добавляем текст под селектом
        var address_text = $(".stores__address");
        address_text.removeClass("stores__address_active");
        address_text.eq(curentStores).addClass("stores__address_active");

        // добавляем класс активному элементу в селекте
        option.removeClass("stores__select_item_active");
        option.eq(curentStores).addClass("stores__select_item_active");

        initMap();

    });


} );
