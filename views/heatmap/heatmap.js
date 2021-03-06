var hmap, layer, heatmap;
var ushahidiData;
var categoryId;
			
$("ul#category_switch li > a").click(function(e) {
    categoryId = this.id.substring(4);
    setTimeout( function(){
		updateMap();
	}, 50);			    
});
			
function init(){
    var query = (idArray.length != 0) ? "/?c=" + idArray.toString() : "";
    console.log("QUERY" + query);
           
    $.ajax({
        type:"GET",
        url:  baseURL + '/heatmap' + query,
        dataType: 'json'
      }).done(function(result){
            buildMap(result);
        });
}
			
function transformData(data){
    var   datalen = data.length,
		nudata = [];

// in order to use the OpenLayers Heatmap Layer we have to transform our data into 
// { max: <max>, data: [{lonlat: <OpenLayers.LonLat>, count: <count>},...]}

    while(datalen--){
		nudata.push({
			lonlat: new OpenLayers.LonLat(data[datalen].lon, data[datalen].lat),
			count: data[datalen].count
		});
	}
	return nudata;
}
			
function buildMap(result){
	var transformedUshahidiData = { max: 2 , data: [] };				
		
	transformedUshahidiData.data = transformData(result);
              
	hmap = new OpenLayers.Map('hmap');
	layer = new OpenLayers.Layer.OSM();
                
	// create our heatmap layer
	var pointGradient = {0.10: "rgb(104,40,96)", 0.30: "rgb(0,255,255)", 0.50: "rgb(0,255,0)", 0.99: "yellow", 1.0: "rgb(255,0,0)"};
				
	heatmap = new OpenLayers.Layer.Heatmap( "Heatmap Layer", hmap, layer, {visible: true, radius:20, grRadIn: 2, grRadOut: 20, gradient: pointGradient, opacity:50}, {isBaseLayer: false, opacity: 0.3, projection: new OpenLayers.Projection("EPSG:4326")});
	hmap.addLayers([layer, heatmap]);
				
	//heatmap = new OpenLayers.Layer.Heatmap( "Heatmap Layer", hmap, layer, {visible: true, radius:10}, {isBaseLayer: false, opacity: 0.3, projection: new OpenLayers.Projection("EPSG:4326")});
	//hmap.addLayers([layer, heatmap]);

	hmap.zoomToMaxExtent();
	heatmap.setDataSet(transformedUshahidiData);
}
			
function updateMap(){
    var query = (idArray.length != 0) ? "/?c=" + idArray.toString() : "";
    console.log("QUERY" + query);
    $.ajax({
        type:"GET",
        url:  baseURL + '/heatmap' + query,
        dataType: 'json'
      }).done(function(result){
		   	var transformedUshahidiData = { max: 2 , data: [] };
        	transformedUshahidiData.data = transformData(result);
	        heatmap.setDataSet(transformedUshahidiData);
     });			    
}
