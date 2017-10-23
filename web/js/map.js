$(document).ready(function(){
    
});

ymaps.ready(function(){


var map = new ymaps.Map("map", {
            center: [55.107493,75.967676], 
            zoom: 3,
			controls: ["geolocationControl","typeSelector","zoomControl","rulerControl","fullscreenControl"]
        });
		
//Выборка городов
var filials = new ymaps.GeoObjectCollection({},{
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/img/mark2.png',
            // Размеры метки.
            iconImageSize: [30,40],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-13,-37]
        });
		
var filialsSelect = new ymaps.control.ListBox({
    data: {
        content: 'Выберите город'
    }
});		





$.post(
	'/ajax/getmapcities',
	
	function (result) {
		var cityData = [];
		if (result.type == 'error') {
			alert(error);
			return(false);
		}
		else {
			
			$(result.cities).each(function() {
									 
				cityData.push({
					name: $(this).attr('name'),
					adress: $(this).attr('adress'), 
					phones: $(this).attr('phones'),
					breef: $(this).attr('breef'),
					meet: $(this).attr('meet'),
					lat: $(this).attr('lat'),
					lon: $(this).attr('lon')
				})
			 
			});
			
			for(var i = 0; i < cityData.length; i++) {
				filials.add(
				new ymaps.Placemark([cityData[i].lat, cityData[i].lon], {
				hintContent: cityData[i].name,
				
				balloonContentHeader: "<a href='/contacts#"+cityData[i].breef+"' style='font-size:20px;font-weight:normal;' >"+cityData[i].name+"</a>",
				
				balloonContentBody: "<b>Адрес:</b> "+cityData[i].adress+" <br /><b>Тел.:</b> "+cityData[i].phones,
				balloonContentFooter: cityData[i].meet,
				
				}));
				
				filialsSelect.add(
				new ymaps.control.ListBoxItem({
                data: {
                    content: cityData[i].name,
                    center: [cityData[i].lat, cityData[i].lon],
                    zoom: 10.5
                },
				options: {
					selectOnClick: false	
				}
            })
				);
			
			}
			
		}
	},
	"json"
);

var mainOffice = new ymaps.Placemark([55.082081,83.038131], {
            hintContent: 'Новосибирск',
			balloonContentHeader: "<a href='/contacts#novosibirsk' style='font-size:20px;font-weight:normal;' >Новосибирск</a>",
				
				balloonContentBody: "<b>Адрес:</b> г. Новосибирск, пос. Восход, ул. Ростовская, 53 <br /><b>Тел.:</b> 8-913-725-9000",
				balloonContentFooter: "Собрания проходят каждое воскресенье в 11:30",
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/img/marker.png',
            // Размеры метки.
            iconImageSize: [30,40],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-15,-30],
			zIndex: 10000,
        });


map.geoObjects.add(filials);
//map.geoObjects.add(mainOffice);


filialsSelect.events.add('click', function (e) {
            // Получаем ссылку на объект, по которому кликнули.
            // События элементов списка пропагируются
            // и их можно слушать на родительском элементе.
            var item = e.get('target');
            // Клик на заголовке выпадающего списка обрабатывать не надо.
            if (item != filialsSelect) {
				
				/*map.panTo(item.data.get('center'),{
					 duration: 1000
					 }).then(function () {
							map.setZoom(item.data.get('zoom'),{
							duration: 1000
							})
				});*/
				map.setCenter(
                    item.data.get('center'),
                    item.data.get('zoom')
                );
				
				
				filialsSelect.collapse();
                
            }
        });



map.controls.add(filialsSelect, {
    float: "right",
    position: {
        top: 10,
        right: 145
    }
});

$('#map').addClass('frame-shadow-lifted');


}); //ymaps.ready

