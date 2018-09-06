import React from 'react'

class Step02 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div id="mapDiv">step02</div>)
    }
}

export default Step02


// componentDidMount() {
//     var map;
//     require([
//         "esri/map",
//         "esri/layers/ArcGISDynamicMapServiceLayer",
//         "esri/dijit/Search",
//         "esri/layers/FeatureLayer",
//         "esri/InfoTemplate",
//         "dojo/on",
//         "dojo/dom",
//
//         "esri/tasks/QueryTask",
//         "esri/tasks/query",
//         "esri/tasks/IdentifyParameters",
//         "esri/toolbars/draw",
//         "esri/symbols/SimpleFillSymbol",
//         "esri/symbols/SimpleLineSymbol",
//         "esri/graphic",
//
//         "esri/symbols/Font",
//         "esri/geometry/Point",
//         "esri/SpatialReference",
//         "esri/symbols/SimpleMarkerSymbol",
//         "esri/symbols/PictureMarkerSymbol",
//         "dijit/registry",
//         "dojo/_base/Color",
//         "dojo/domReady!"
//     ], function(Map, ArcGISDynamicMapServiceLayer, Search, FeatureLayer, InfoTemplate, on, dom,
//
//     QueryTask,
//     Query,
//     IdentifyParameters,
//     Draw,
//     SimpleFillSymbol,
//     SimpleLineSymbol,
//     PictureMarkerSymbol,
//     registry,
//     Color,
//     Graphic) {
//
//         map = new Map("mapDiv", {
//             basemap: "osm",
//             center: [
//                 119.44, 32.2
//             ],
//             zoom: 12,
//             maxZoom: 15,
//             minZoom: 1,
//             logo: false
//         });
//
//
//         MapServer = "http://218.104.108.86:6080/arcgis/rest/services/China/ZJMapService/MapServer/0";
//
//         var layer = new ArcGISDynamicMapServiceLayer(MapServer);
//         map.addLayer(layer);
//     });
// }
