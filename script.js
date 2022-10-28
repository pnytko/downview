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