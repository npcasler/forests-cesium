//********************main.js**********************//
//This is the main js file for the application
//
//
//
//
      function moveClock() {
        console.log("Clock animate value is: "+ clock.shouldAnimate);
        if (clock.shouldAnimate === 1){
          clock.shouldAnimate = 0;
          } else {
          clock.shouldAnimate = 1;
          clock.tick();
        }
      }

      function animateClock(open) {
        if (open) {
          myTimer = setInterval(moveClock(), 2000);
        } else {
        window.clearInterval(myTimer);
        }
      }

      function addLayerOption(name, imageryProvider, alpha, show) {
        
        var layer = layers.addImageryProvider(imageryProvider);
        layer.alpha = alpha;
        layer.show = show;
        layer.name = name;
      }
      
      //change the selected layers url and reload
      function changeUrl(layer, rcp, year, species) {
        //remove layer
        name = layer.name;
        layers.remove(layer);
        
        var url  = proxy + rcp + '/' + year + '/' + species;
        
        var wms = new Cesium.TileMapServiceImageryProvider({
          url: url,
          maximumLevel : 7,
          
          gamma: 2,
          credit : 'Species Range Model courtesy of FFDM',
          parameters: {
            transparent: 'true',
            format: 'image/png'
          }
        });
          //proxy: new Cesium.DefaultProxy('/cgi-bin/proxy.cgi')
       
        
        addLayerOption(name, wms, 1, 1); 
      }


function init() {
      var proxy = '/cgi-bin/proxy.cgi?url=http://scooby.iplantcollaborative.org/maxent/';
      var species = 'Thuja_plicata';
      var year = '2011';
      var rcp = 'rcp26';
      //add a new layer to the imageryLayersCollection(adds to the map)
      // Set the clock to match the studies timeline
      var clock = new Cesium.Clock({
        startTime : Cesium.JulianDate.fromIso8601('2011-01-01'),
        currentTime: Cesium.JulianDate.fromIso8601('2011-01-01'),
        stopTime: Cesium.JulianDate.fromIso8601('2081-01-01'),
        clockRange: Cesium.ClockRange.LOOP_STOP,
        clockStep: Cesium.ClockStep.TICK_DEPENDENT,
        multiplier: 315576000,
        shouldAnimate: 0
 
      });
      //initialize the cesium view
      var viewer = new Cesium.Viewer('cesiumContainer', {
        imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        }),
        baseLayerPicker: true,
        clock: clock

      });
      var layers = viewer.scene.imageryLayers;
      var wms = new Cesium.TileMapServiceImageryProvider({
        url: proxy + rcp+'/'+year+'/'+species,
        maximumLevel : 7,
        
        contrast: 100,
        credit : 'Black Marble imagery courtesy FFDM',
        parameters: {
          transparent: 'true',
          format: 'image/png'
        },
      });
      addLayerOption(species, wms, 1, 1);
      
} 
