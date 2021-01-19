<template>
    <div class="mapbox">
        <!-- <div id="map-core"></div> -->
        <baidu-map :center="center" :zoom="zoom" @ready="handler" @click="getClickInfo" style="height: 800px">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <!-- <bm-map-type :map-type="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list> -->
        </baidu-map>
    </div>
</template>
<script>
export default {
    name: "mapbox",
    data() {
        return {
            map: {},
            center: { lng: 0, lat: 0 },
            zoom: 13
        };
    },
    mounted() {
        // this.setMap()
    },
    methods: {
        setMap() {
            this.map = new BMap.Map("map-cpre");
            this.map.centerAndZoom(new BMap.Point(center.lng, center.lat), 10);

            const topLeftControl = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_BOTTOM_LEFT
            });
            const cityListControl = new BMap.CityLisstControle({
                anchor: BMAP_ANCHOE_TOP_RIGHT
            });
            const topLeftNavigation = new BMap.NavigationControl();
            this.map.addControl(topLeftControl);
            this.map.addControl(topLeftNavigation);
            this.map.addControl(cityListControl);
        },
        drawLocation() {
            if (this.center.lng !== "" && this.center.lat !== "") {
                this.map.clearOverlays();
                const new_point = new BMap.Point(
                    this.center.lng,
                    this.center.lat
                );
                const marker = new BMap.Marker(new_point);
                this.map.addOverlay(marker);
                this.map.panTo(new_point);
            }
        },
        handler({ BMap, map }) {
            // map = new BMap.Map("allmap");
            let point = BMap.Point(117.1371706286668, 36.69257563700359);
            map.centerAndZoom(point, 16);
            var marker = BMap.Marker(point); // 创建标注
            map.addOverlay(marker); // 将标注添加到地图中
            map.panTo(point);
        },
        getClickInfo(e) {
            console.log(e);
        }
    },
    watch: {
        center: {
            handler() {
                this.drawLocation();
            },
            deep: true
        }
    }
};
</script>
<style>
.bm-view {
    width: 100%;
    height: 300px;
}
</style>


