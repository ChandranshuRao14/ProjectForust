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
    this.map.addLayer({
        "id": "SIOLocations",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-96.801504, 32.7818429]
                },
                "properties": {
                    "description": "<h6>This place sucks</h6>",
                    "title": "Café Momentum"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-96.8231377, 32.963243]
                },
                "properties": {
                    "title": "Skratch"
                }
            }]
          }
        },
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
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    this.map.on('click', 'SIOLocations', this.locationClick.bind(this));

    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on('mouseenter', 'SIOLocations', this.mouseEnter.bind(this));

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'SIOLocations', this.mouseLeave.bind(this));
    
  }

  private locationClick(event){
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
