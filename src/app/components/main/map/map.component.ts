import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as $ from 'jquery';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = environment.mapbox.style;
  lat = 32.8;
  long = -96.8;
  places: any;

  constructor() { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap(){
    this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 9,
        center: [this.long, this.lat]
    });

    $("#map").height(window.innerHeight);
    
    this.map.resize();

    var nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-right');

    this.map.on('load', this.initializeLayer.bind(this));
  }

  private initializeLayer(){
    var handleimage = function(error,image){
      if(error) throw error;
      this.map.addImage("pin",image);
    };
    this.map.loadImage("https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png",handleimage.bind(this));
    this.places = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "geometry": {
              "id": 1223,
              "type": "Point",
              "coordinates": [-96.801504, 32.7818429]
          },
          "properties": {
              "description": "<h6>This place sucks</h6>",
              "title": "Café Momentum",
              "icon": "music"
          }
      }, {
          "type": "Feature",
          "geometry": {
              "id": 1225,
              "type": "Point",
              "coordinates": [-96.8231377, 32.963243]
          },
          "properties": {
              "description": "<h6>This joint blows</h6>",
              "title": "Skratch",
              "icon": "music"
          }
      }]
    };

    
    var layerIDs = []; // Will contain a list used to filter against.
    var filterInput = document.getElementById('filter-input');
    this.map.addSource('places', {
      "type": "geojson",
      "data": this.places
    });

    this.places.features.forEach(function(feature){
      var symbol = feature.properties['icon'];
      var featureTitle = feature.properties['title'];
      var layerID = 'poi-' + featureTitle;
      layerID = layerID.trim().toLowerCase();
      
      // Add a layer for this symbol type if it hasn't been added already.
      if (!this.map.getLayer(layerID)) {
        this.map.addLayer({
            "id": layerID,
            "type": "symbol",
            "source": "places",
            "layout": {
                "icon-image": "pin",
                "icon-size": .1,
                "icon-allow-overlap": true,
                "text-field": "{title}",
                "text-optional": true,
                "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                "text-size": 11,
                "text-transform": "uppercase",
                "text-letter-spacing": 0.05,
                "text-offset": [0, .8],
                "text-anchor": "top"
            },
            "paint": {
                "text-color": "#bc3e3e",
                "text-halo-color": "#fff",
                "text-halo-width": 2
            },
            "filter": ["==", "title", featureTitle]
        });
  
        layerIDs.push(layerID);
      }
    }, this);

    filterInput.addEventListener('keyup', function(e) {
      // If the input value matches a layerID set
      // it's visibility to 'visible' or else hide it.
      var value = e.target.value.trim().toLowerCase();
      console.log(value);
      layerIDs.forEach(function(layerID) {
        var id = layerID.substring(4);
        console.log(id.indexOf(value));
          if(id.indexOf(value) == -1){
            this.map.setLayoutProperty(layerID, 'visibility', 'none');
          }
          else{
            this.map.setLayoutProperty(layerID, 'visibility', 'visible');
          }
      }, this);
    }.bind(this), false);
    
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    layerIDs.forEach(function(currentLayer){
      this.map.on('click', currentLayer , this.locationClick.bind(this));
      this.map.on('mouseenter', currentLayer, this.mouseEnter.bind(this));
      this.map.on('mouseleave', currentLayer, this.mouseLeave.bind(this));
    }, this);
  }

  private locationClick(event){
    this.map.flyTo({center: event.features[0].geometry.coordinates});    
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML(event.features[0].properties.description)
        .addTo(this.map);
  }

  private mouseEnter(){
    this.map.getCanvas().style.cursor = 'pointer';
  }

  private mouseLeave(){
    this.map.getCanvas().style.cursor = '';
  }
}


/*

 {


        "layout": {
          "icon-image": "pin",
          "icon-size": .1,
          "text-field": "{title}",
          "text-optional": true,   
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, .8],
          "text-anchor": "top"
        },
        "paint":{
          "text-color": "#bc3e3e"
        }
*/