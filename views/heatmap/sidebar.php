<br/>
<script type="text/javascript" src="<?php echo url::base(); ?>plugins/heatmap/media/heatmap/js/heatmap.js"></script>
<script type="text/javascript" src="<?php echo url::base(); ?>plugins/heatmap/media/heatmap/js/heatmap-openlayers.js"></script>
<script type="text/javascript" src="<?php echo url::base(); ?>plugins/heatmap/views/heatmap/heatmap.js"></script>

<script>
var response;
var script;
var created = false;
var baseURL = "<?php echo url::base(); ?>";

function createHeatmap(){
    $('.filters').after('<div id =hmap style=" width: 573px; height: 500px;"></div>');
    created=true;
    init();
}

function showHeatmap(){
    $('#showMap').show();
    $('#showHmap').hide();   
    $('.map').hide();
    if(!created)
        createHeatmap();
    else{
        console.log("updating");
        updateMap();
        $('#hmap').show(); 
        } 
}

function hideHeatmap(){
    $('#showMap').hide();
    $('#showHmap').show();
    $('#hmap').hide();
    $('.map').show();  
}
</script>
<ul class="category-filters" id="heatmapButton">
	<li id="showHmap" onclick="showHeatmap()">
			<span ><img src="<?php echo url::base() ?>plugins/heatmap/media/heatmap/images/fire.png" style="float:left;padding-right:5px;"></span>
			<span class="category-title" style="line-height:22px;"><?php echo Kohana::lang('heatmap.heatmap'); ?></span>
	</li>
	<li id="showMap" onclick="hideHeatmap()" style="display:none">
	    <span><img src="<?php echo url::base() ?>plugins/heatmap/media/heatmap/images/marker.png" height="24" width="21" style="float:left;padding-right:5px;"></span>
  	    <span class="category-title" style="line-height:22px;">Show Markers</span>
	</li>
</ul>
</br>
<script>
var heatmapDiv = document.createElement('div');
heatmapDiv.id = "heatmapSidebar";
heatmapDiv.setAttribute("style","height:70px");

var rightSidebar = document.getElementById('right');

var sidebarList = document.getElementById('category_switch');
sidebarList.insertBefore(heatmapDiv, sidebarList.firstChild);

var hmButton = document.getElementById('heatmapButton');
heatmapDiv.appendChild(hmButton);

</script>
 

