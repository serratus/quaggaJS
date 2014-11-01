/**
 * The basic configuration 
 */

define(function(){
  var config = {
      inputStream: { name: "Live",
           type: "LiveStream"
      },
      tracking: false,
      debug: false,
      controls: false,
      locate: true,
      visual: {
        show: true
      },
      decoder:{
        drawBoundingBox: true,
        showFrequency: false,
        drawScanline: true,
        showPattern: false,
        readers: [
          'code_128_reader'
        ]
      },
      locator: {
        showCanvas: false,
        showPatches: false,
        showFoundPatches: false,
        showSkeleton: false,
        showLabels: false,
        showPatchLabels: false,
        showRemainingPatchLabels: false,
        boxFromPatches: {
          showTransformed: false,
          showTransformedBox: false,
          showBB: false
        }
      }
   };
   
   return config;
});