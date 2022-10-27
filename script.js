//CONFIG
const minzoom = 3;																	// Zoom min.	
const maxzoom = 21;																	// Zoom max .
const s_zoom = 18;																	// Zoom startowy
start_xy = [20.9884, 50.01225]; 									// Koordynaty startowe

//PREDEFINIOWANE KIERUNKI
const N_dir = 0																		//0 stopni, orto wyjściowo skierowane jest na północ
const S_dir = (3.14)																//180deg	
const W_dir = ((3*3.14)/2)															//270deg	
const E_dir = (3.14/2)																//90deg	

//POMIARY WSPÓŁRZĘDNYCH

const mousePositionControl = new ol.control.MousePosition({
	coordinateFormat: ol.coordinate.createStringXY(4),
	projection: 'EPSG:4326',
	className: 'custom-mouse-position',
	target: document.getElementById('mouse-position'),
});

const projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function (event) {
  mousePositionControl.setProjection(event.target.value);
});

const precisionInput = document.getElementById('precision');
precisionInput.addEventListener('change', function (event) {
  const format = ol.coordinate.createStringXY(event.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});

//STRUKTURA WARSTW
// 1 - OSM
// 2 - ORTO
// 3 - CIENIOWANIE
// 4 - MIEG MAP, TARNOW1944
// 5 - DZIAŁKI
// 6 - ULICE
// 100 - VECTOR LAYER


// WARSTWA WEKTOROWA

 let vector_layer = new ol.layer.Vector({
 	source: new ol.source.Vector(),
 	zIndex: 100,
     visible: true
 });

// WARSTWA OSM
const osm_layer = new ol.layer.Tile({
	source: new ol.source.OSM(),
	title: 'OSM',
	visible: true,
	zIndex: 1
});

// WARSTWA ORTO:
const orto_layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/HighResolution', //https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/HighResolution
        params:{
            //'FORMAT': 'image/png',
            'TILED': true,
            'VERSION': '1.3.0',
			'REQUEST':"GetMap",
			'LAYERS':'Raster'
        },
        transition: 0,
        projection: 'EPSG:4326'
    }),
	visible: false,
	title: 'OrthoHD',
    zIndex: 2
});

// WARSTWA CIENIOWANIE:
const dem_layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/ShadedRelief',
        params:{
            'FORMAT': 'image/png',
            'TILED': true,
            'VERSION': '1.1.1',
			'REQUEST':"GetMap",
			'LAYERS':'Raster'
        },
        transition: 0,
        projection: 'EPSG:2180'
    }),
	visible: false,
	title: 'Działki',
    zIndex: 3
});

// WARSTWA DZIAŁKI:
const parcel_layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow',
        params:{
            'FORMAT': 'image/png',
            'TILED': true,
            'VERSION': '1.3.0',
			'REQUEST':"GetMap",
			'LAYERS':'dzialki,numery_dzialek'
        },
        transition: 0,
        projection: 'EPSG:2180'
    }),
	visible: false,
	title: 'Działki',
    zIndex: 5
});

//MIEG MAP - obecnie nieaktywne

const mieg_layer= new ol.layer.Tile({
    source: new ol.source.XYZ({
    url:
        './orto/{z}/{x}/{y}.png'
    }),
	visible: false,
	title: 'MiegMap',
    zIndex: 4
});

//WARSTWA ULIC
const street_layer=new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'https://wms.epodgik.pl/cgi-bin/KrajowaIntegracjaPunktowAdresowych',
        params:{
            'FORMAT': 'image/png',
            'TILED': true,
            'VERSION': '1.3.0',
            'LAYERS': "emuia-ulice"
        },
        transition: 0,
        projection: 'EPSG:4326'
    }),
	visible: false,
	title: 'Ulice',
    zIndex: 6
});

var caveStyle = feature => {
    return new ol.style.Style({
        image: new ol.style.Icon({
            scale: 0.15,
            src: './img/cave.png'
        }),
        text: new ol.style.Text({
            font: '40px Roboto',
            text: feature.get('NAZWA'),
            placement: 'line',
            scale: 0.5,
            offsetY: 30,
            fill: new ol.style.Fill({
                color: '#000'
            })
        })
    });
}
//JASKINIE - PRZYKŁAD PODCZYTANIA GEOJSONA
const cave_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json_data/jaskinie.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: false,
    style: caveStyle,
    declutter: true
});

cave_layer.setZIndex(10)

// WARSTWA SZLAKI [ŻÓŁTY]:
const trails_layer_yellow = new ol.layer.Tile({
  source: new ol.source.TileWMS({
      url: 'https://mapserver.bdl.lasy.gov.pl/ArcGIS/services/WMS_BDL_Mapa_turystyczna/MapServer/WMSServer',
      params:{
          'FORMAT': 'image/png',
          'TILED': true,
          'VERSION': '1.1.1',
    'LAYERS':['10']
      },
      transition: 0,
      projection: 'EPSG:4326'
  }),
visible: false,
  zIndex: 10
});

// WARSTWA SZLAKI [ZIELONY]:
const trails_layer_green = new ol.layer.Tile({
  source: new ol.source.TileWMS({
      url: 'https://mapserver.bdl.lasy.gov.pl/ArcGIS/services/WMS_BDL_Mapa_turystyczna/MapServer/WMSServer',
      params:{
          'FORMAT': 'image/png',
          'TILED': true,
          'VERSION': '1.1.1',
    'LAYERS':['11']
      },
      transition: 0,
      projection: 'EPSG:4326'
  }),
visible: false,
  zIndex: 10
});

// WARSTWA SZLAKI [NIEBIESKI]:
const trails_layer_blue = new ol.layer.Tile({
  source: new ol.source.TileWMS({
      url: 'https://mapserver.bdl.lasy.gov.pl/ArcGIS/services/WMS_BDL_Mapa_turystyczna/MapServer/WMSServer',
      params:{
          'FORMAT': 'image/png',
          'TILED': true,
          'VERSION': '1.1.1',
    'LAYERS':['12']
      },
      transition: 0,
      projection: 'EPSG:4326'
  }),
visible: false,
  zIndex: 10
});

// WARSTWA SZLAKI [CZERWONY]:
const trails_layer_red = new ol.layer.Tile({
  source: new ol.source.TileWMS({
      url: 'https://mapserver.bdl.lasy.gov.pl/ArcGIS/services/WMS_BDL_Mapa_turystyczna/MapServer/WMSServer',
      params:{
          'FORMAT': 'image/png',
          'TILED': true,
          'VERSION': '1.1.1',
    'LAYERS':['13']
      },
      transition: 0,
      projection: 'EPSG:4326'
  }),
visible: false,
  zIndex: 10
});

// WARSTWA SZLAKI [CZARNY]:
const trails_layer_black = new ol.layer.Tile({
  source: new ol.source.TileWMS({
      url: 'https://mapserver.bdl.lasy.gov.pl/ArcGIS/services/WMS_BDL_Mapa_turystyczna/MapServer/WMSServer',
      params:{
          'FORMAT': 'image/png',
          'TILED': true,
          'VERSION': '1.1.1',
    'LAYERS':['14']
      },
      transition: 0,
      projection: 'EPSG:4326'
  }),
visible: false,
  zIndex: 10
});

//WARSTWA MAPY - INTEGRACJA MAP

let interaction = new ol.interaction.DragRotateAndZoom(); //ROTACJA SHIFT+LPM

const map = new ol.Map({
    projection: 'EPSG:4326',
	controls: ol.control.defaults().extend([mousePositionControl]),
	interactions: ol.interaction.defaults().extend([
		interaction
    ]),
    layers: [
		osm_layer,
    orto_layer,
		vector_layer,
		street_layer,
		parcel_layer,
		dem_layer,
		mieg_layer,
    cave_layer,
    trails_layer_yellow,
    trails_layer_green,
    trails_layer_blue,
    trails_layer_red,
    trails_layer_black
	],
			
    target: 'map',
    view: new ol.View({
        center:  ol.proj.fromLonLat(start_xy),
        zoom: s_zoom,
        minZoom: minzoom,
        maxZoom: maxzoom,
		rotation: 0
    })
});

//MARKERY

var markers = new ol.layer.Vector({
    source: new ol.source.Vector(),
    zIndex: 15,
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: 'img/marker.png',
      })
    })
  });
  map.addLayer(markers);
  
  var marker1 = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([20.9884, 50.0125])));
  var marker2 = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([20.9972, 49.9891])));
  markers.getSource().addFeature(marker1);
  markers.getSource().addFeature(marker2);

// PRZEŁĄCZNIK WARSTW
function ToogleLayersWMS_Osm(){
    osm_layer.setVisible(!osm_layer.getVisible());
}

function ToogleLayersWMS_Wektory(){
    vector_layer.setVisible(!vector_layer.getVisible());
}
function ToggleLayersWMS_OrtoHD(){
    orto_layer.setVisible(!orto_layer.getVisible());
}

function ToggleLayersWMS_Ulice(){
    street_layer.setVisible(!street_layer.getVisible());
}

function ToggleLayersWMS_Dzialki(){
    parcel_layer.setVisible(!parcel_layer.getVisible());
}

function ToggleLayersWMS_Cieniowanie(){
    dem_layer.setVisible(!dem_layer.getVisible());
}

function ToggleLayersWMS_MiegMap(){
    mieg_layer.setVisible(!mieg_layer.getVisible());
}

function ToggleLayersWMS_Jaskinie(){
    cave_layer.setVisible(!cave_layer.getVisible());
    change_cave_style()
}

 function ToggleLayersWMS_Szlaki(xd){
     if (xd.checked){
      trails_layer_yellow.setVisible(true)
      $("#tr_y").prop("checked", true);
      trails_layer_green.setVisible(true)
      $("#tr_g").prop("checked", true);
      trails_layer_blue.setVisible(true)
      $("#tr_b").prop("checked", true);
      trails_layer_red.setVisible(true)
      $("#tr_r").prop("checked", true);
      trails_layer_black.setVisible(true)
      $("#tr_bl").prop("checked", true);
    }
    else{
      trails_layer_yellow.setVisible(false)
      $("#tr_y").prop("checked", false);
      trails_layer_green.setVisible(false)
      $("#tr_g").prop("checked", false);
      trails_layer_blue.setVisible(false)
      $("#tr_b").prop("checked", false);
      trails_layer_red.setVisible(false)
      $("#tr_r").prop("checked", false);
      trails_layer_black.setVisible(false)
      $("#tr_bl").prop("checked", false);
    }

};

function ToogleLayersWMS_Szlaki_Yellow(xd){
  trails_layer_yellow.setVisible(!trails_layer_yellow.getVisible());
}

function ToogleLayersWMS_Szlaki_Green(){
  trails_layer_green.setVisible(!trails_layer_green.getVisible());
}

function ToogleLayersWMS_Szlaki_Blue(){
  trails_layer_blue.setVisible(!trails_layer_blue.getVisible());
}

function ToogleLayersWMS_Szlaki_Red(){
  trails_layer_red.setVisible(!trails_layer_red.getVisible());
}

function ToogleLayersWMS_Szlaki_Black(){
  trails_layer_black.setVisible(!trails_layer_black.getVisible());
}

//AKTYWACJA POPUP'A O MNIE
function DisplayPopupDiv(){
    let popup = document.querySelector('#popup-div');

    if(popup.classList.contains('popup-div-visible')==false){
        popup.classList.remove('popup-div-novisible');
        popup.classList.add('popup-div-visible');
    }
}
function ClosePopup(){
    let popupdiv=document.querySelector('#popup-div');
    popupdiv.classList.remove('popup-div-visible');
    popupdiv.classList.add('popup-div-novisible');
}

//AKTYWACJA POPUP'A SZLAKI
function DisplayPopupDiv_trails(){
  let popup_trails = document.querySelector('#trails-popup');

  if(popup_trails.classList.contains('popup-div-visible')==false){
      popup_trails.classList.remove('popup-div-novisible');
      popup_trails.classList.add('popup-div-visible');
  }
}
function ClosePopup_trails(){
  let popupdiv_trails=document.querySelector('#trails-popup');
  popupdiv_trails.classList.remove('popup-div-visible');
  popupdiv_trails.classList.add('popup-div-novisible');
}

//CZYSZCZENIE POMIARÓW

function ClearMeasurements(){
    vector_layer.getSource().getFeatures().forEach(feature=>vector_layer.getSource().removeFeature(feature));
    map.getOverlays().clear()
 }