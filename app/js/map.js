Map                    = {

  init: function(){
    // attribution
        var mbAttr     = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    // URL for receiving maptiles
        mbUrl          = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmV4dHF1ZXN0IiwiYSI6ImNqM2x1dzNkbDAxajUyd3F0bmc3b3E0dHQifQ.V4hEw7CC3e_76sNhMxwE3Q';

    // initialisation of two baselayers
        var grayscale  = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
            streets    = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

        var baseLayers = {
          "Streets": streets,
          "Grayscale": grayscale
        };

    // initialisation of different overlay groups
            sales      = L.layerGroup();
            services   = L.layerGroup();


        var overlays   = {
          "Sales": sales,
          "Services": services
        };

    // initialisation of the map

        var map        = L.map('mapid', {
          center: [52.475520505340306,13.448638916015627],
          zoom: 12,
          layers: [streets, sales],
          doubleClickZoom: false
        });

    // adding controls
        L.control.layers(baseLayers, overlays).addTo(map);
        map.on('dblclick', function(e){
            Map.onMapDblclick(e, map);
        });

  },

  setMarker: function(position){
    s                  = position.split(",");

    lat                = s[0];
    lng                = s[1];
    mes                = s[2];
    sales.clearLayers();
    var marker         = L.marker([lat,lng]).bindPopup(mes).addTo(sales);


  },

  onMapDblclick: function(event, map){
    console.log(event);
    var popup = L.popup({minWidth: 300})
                  .setLatLng(event.latlng)
      .setContent(
        "<h4 class='mx-auto'>New Place</h4>"+
        "<form id='form'>"+


    "<div class='form-group'><label for='content'>Message</label><textarea rows='5' id='content' class='form-control' placeholder='...' required></textarea></div>"+

        "<br><button type='submit' class='btn btn-primary' >Submit</button>"+
        "</form>")
      .openOn(map);

    position= event.latlng;



          $('#form').submit(function(e){
            e.preventDefault();

            App.setMarker(position.lat.toString() + "," + position.lng.toString() + "," + $("#content").val());
            var marker         = L.marker([position.lat.toString(),position.lng.toString()]).setOpacity(0.5).bindPopup($("#content").val()).bindTooltip("waiting for new block ...").addTo(sales);
            map.closePopup();
            console.log("submit");
          });

  }
}
