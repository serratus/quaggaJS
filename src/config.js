/**
 * The basic configuration 
 */

define(function(){
  var config = {
      inputStream: { name: "Live",
          type: "LiveStream",
          constraints: {
              width: 640,
              height: 480,
              facing: "environment" // or user
          }
      },
      tracking: false,
      debug: false,
      controls: false,
      locate: true,
      numOfWorkers: 4,
      visual: {
        show: true
      },
      decoder:{
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: true,
        showPattern: true,
        readers: [
          'code_128_reader'
        ]
      },
      locator: {
        halfSample: true,
        patchSize: 64,
        showCanvas: true,
        showPatches: false,
        showFoundPatches: true,
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