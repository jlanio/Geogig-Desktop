function leafletCtrl(leafletData){
 	
    angular.extend($s, {
        japan: {
            lat: 37.26,
            lng: 138.86,
            zoom: 4
        },
        geojson: {
        	data: undefined,
            style: style,
        },
	    legend: {
            position: 'bottomleft',
            colors: [ '#00CED1', '#FF8C00', '#BD0026'],
            labels: [ 'ADDED', 'MODIFIED', 'REMOVED' ]
        },
        defaults: {
            tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
    });
    
    function getColor(type_change) {
        if (type_change == "ADDED"){
            return '#00CED1'
        }else if(type_change == "MODIFIED"){
            return '#FF8C00'
        }else if(type_change == "REMOVED"){
            return '#DC143C'
        }
    }
    
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.type_change),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        }
    }
 }
angular
.module('geogig-desktop')
.controller('leafletCtrl', leafletCtrl)


