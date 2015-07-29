var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/base',

  paths: {
    'array_helper': 'src/array_helper',
    'cv_utils': 'src/cv_utils',
    'typedefs': 'src/typedefs',
    'glMatrixAddon': 'src/glMatrixAddon',
    'cluster': 'src/cluster',
    'camera_access': 'src/camera_access',
    'events': 'src/events',
    'html_utils': 'src/html_utils',
    'quagga': 'src/quagga',
    'barcode_decoder': 'src/barcode_decoder',
    'barcode_locator': 'src/barcode_locator',
    'barcode_reader': 'src/barcode_reader',
    'bresenham': 'src/bresenham',
    'codabar_reader': 'src/codabar_reader',
    'code_39_reader': 'src/code_39_reader',
    'code_39_vin_reader': 'src/code_39_vin_reader',
    'code_128_reader': 'src/code_128_reader',
    'config': 'src/config',
    'ean_8_reader': 'src/ean_8_reader',
    'ean_reader': 'src/ean_reader',
    'frame_grabber': 'src/frame_grabber',
    'image_debug': 'src/image_debug',
    'image_loader': 'src/image_loader',
    'image_wrapper': 'src/image_wrapper',
    'input_stream': 'src/input_stream',
    'rasterizer': 'src/rasterizer',
    'skeletonizer': 'src/skeletonizer',
    'subImage': 'src/subImage',
    'tracer': 'src/tracer',
    'upc_e_reader': 'src/upc_e_reader',
    'upc_reader': 'src/upc_reader',
    'async': 'node_modules/async/lib/async',
    'result_collector': 'src/result_collector',
    'i2of5_reader': 'src/i2of5_reader'
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});
