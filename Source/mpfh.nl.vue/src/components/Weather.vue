<template>
    <div class="weather">
    
    </div>
</template>

<script lang='ts'>

import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class Weather extends Mixins(){
    key = "8f4c4ea7864e00a14e3726343881727b/";
    baseurl = "https://api.darksky.net/forecast/"

    getLocation() {
        let coords;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                this.getWeather(position.coords)
            });
        } else {
            //some form of error handling here
        }
    }

    getWeather(coords: any) {
        //console.log(coords)
        var http = new XMLHttpRequest();
        var url = this.baseurl + this.key + coords.latitude + "," + coords.longitude;

        http.onload = function(e) {
            // console.log(http.response);
        }
        http.open("GET", url);
        http.send();
        
        function callback(response: any) {
            // console.log("test")
            // console.log(response)
        }
    }
    
    
    
    
    
    mounted() {
        let coords = this.getLocation();
        if (coords != null) {
            this.getWeather(coords);
        }
    }
}
</script>
