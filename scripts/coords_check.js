//POMIARY WSPÓŁRZĘDNYCH
const projectionSelect = document.getElementById("projection");
projectionSelect.addEventListener("change", function (event) {
  mousePositionControl.setProjection(event.target.value);
});

const precisionInput = document.getElementById("precision");
precisionInput.addEventListener("change", function (event) {
  const format = ol.coordinate.createStringXY(event.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});
