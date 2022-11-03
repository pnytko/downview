// PRZEŁĄCZNIK WARSTW
function ToogleLayersWMS_Osm() {
  osm_layer.setVisible(!osm_layer.getVisible());
}

function ToogleLayersWMS_Wektory() {
  vector_layer.setVisible(!vector_layer.getVisible());
}
function ToggleLayersWMS_OrtoHD() {
  orto_layer.setVisible(!orto_layer.getVisible());
}

function ToggleLayersWMS_Ulice() {
  street_layer.setVisible(!street_layer.getVisible());
}

function ToggleLayersWMS_Dzialki() {
  parcel_layer.setVisible(!parcel_layer.getVisible());
}

function ToggleLayersWMS_Cieniowanie() {
  dem_layer.setVisible(!dem_layer.getVisible());
}

function ToggleLayersWMS_MiegMap() {
  mieg_layer.setVisible(!mieg_layer.getVisible());
}

function ToggleLayersWMS_Jaskinie() {
  cave_layer.setVisible(!cave_layer.getVisible());
  change_cave_style();
}

function ToggleLayersWMS_Szlaki(xd) {
  if (xd.checked) {
    trails_layer_yellow.setVisible(true);
    $("#tr_y").prop("checked", true);
    trails_layer_green.setVisible(true);
    $("#tr_g").prop("checked", true);
    trails_layer_blue.setVisible(true);
    $("#tr_b").prop("checked", true);
    trails_layer_red.setVisible(true);
    $("#tr_r").prop("checked", true);
    trails_layer_black.setVisible(true);
    $("#tr_bl").prop("checked", true);
  } else {
    trails_layer_yellow.setVisible(false);
    $("#tr_y").prop("checked", false);
    trails_layer_green.setVisible(false);
    $("#tr_g").prop("checked", false);
    trails_layer_blue.setVisible(false);
    $("#tr_b").prop("checked", false);
    trails_layer_red.setVisible(false);
    $("#tr_r").prop("checked", false);
    trails_layer_black.setVisible(false);
    $("#tr_bl").prop("checked", false);
  }
}

function ToogleLayersWMS_Szlaki_Yellow(xd) {
  trails_layer_yellow.setVisible(!trails_layer_yellow.getVisible());
}

function ToogleLayersWMS_Szlaki_Green() {
  trails_layer_green.setVisible(!trails_layer_green.getVisible());
}

function ToogleLayersWMS_Szlaki_Blue() {
  trails_layer_blue.setVisible(!trails_layer_blue.getVisible());
}

function ToogleLayersWMS_Szlaki_Red() {
  trails_layer_red.setVisible(!trails_layer_red.getVisible());
}

function ToogleLayersWMS_Szlaki_Black() {
  trails_layer_black.setVisible(!trails_layer_black.getVisible());
}
