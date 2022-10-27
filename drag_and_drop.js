//DRAG-N-DROP DLA SHAPE'ÓW

let dragAndDropInteraction;

function setInteraction() {
   if (dragAndDropInteraction) {
     map.removeInteraction(dragAndDropInteraction);
   }
   dragAndDropInteraction = new ol.interaction.DragAndDrop({
     formatConstructors: [
       ol.format.GPX,
       ol.format.GeoJSON,
       ol.format.IGC,
       ol.format.KML,
       ol.format.TopoJSON
     ],
   });

   dragAndDropInteraction.on('addfeatures', function (event) {
     vector_layer.getSource().addFeatures(event.features)
     map.getView().fit(vector_layer.getSource().getExtent());
   });
   map.addInteraction(dragAndDropInteraction);
 }
 setInteraction();

 

 map.on('pointermove', function (evt) {
   if (evt.dragging) {
     return;
   }
   const pixel = map.getEventPixel(evt.originalEvent);
 });
 
const exportButton = document.getElementById('download_pdf');

 exportButton.addEventListener(
   'click',
   function () {
     exportButton.disabled = true;
     document.body.style.cursor = 'progress';
       
         const format = [1189, 841];
         const resolution = 150;
         const dim = format;
         const width = Math.round((dim[0] * resolution) / 25.4);
         const height = Math.round((dim[1] * resolution) / 25.4);
         const size = map.getSize();
         const viewResolution = map.getView().getResolution();
         map.once('rendercomplete', function () {
           const mapCanvas = document.createElement('canvas');
           mapCanvas.width = width;
           mapCanvas.height = height;
           const mapContext = mapCanvas.getContext('2d');
           Array.prototype.forEach.call(
             document.querySelectorAll('.ol-layer canvas'),
             function (canvas) {
               if (canvas.width > 0) {
                 const opacity = canvas.parentNode.style.opacity;
                 mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                 const transform = canvas.style.transform;
                 // Get the transform parameters from the style's transform matrix
                 const matrix = transform
                   .match(/^matrix\(([^\(]*)\)$/)[1]
                   .split(',')
                   .map(Number);
                 // Apply the transform to the export map context
                 CanvasRenderingContext2D.prototype.setTransform.apply(
                   mapContext,
                   matrix
                 );
                 mapContext.drawImage(canvas, 0, 0);
               }
             }
           );
           mapContext.globalAlpha = 1;
           mapContext.setTransform(1, 0, 0, 1, 0, 0);
           const pdf = new jspdf.jsPDF('landscape', undefined, format);
           pdf.addImage(
             mapCanvas.toDataURL('image/jpeg'),
             'JPEG',
             0,
             0,
             dim[0],
             dim[1]
           );
           pdf.save('map.pdf');
           // Reset original map size
           map.setSize(size);
           map.getView().setResolution(viewResolution);
           exportButton.disabled = false;
           document.body.style.cursor = 'auto';
         });
           const printSize = [width, height];
           map.setSize(printSize);
           const scaling = Math.min(width / size[0], height / size[1]);
           map.getView().setResolution(viewResolution / scaling);
       },
       false
   );
