<template>
    <div>
        <div id="map">
        </div>
        <div>
            <div>
                <label>
                    Range
                    <input v-model.number="range"/>
                    <div class="error"> {{rangeError}}</div>
                </label>
                <label>
                    Number of Scooters
                    <input v-model.number="scooters"/>
                    <div class="error"> {{numberError}}</div>
                </label>
            </div>
            <div>
                <label>
                    Latitude
                    <input v-model.number="lat"/>
                    <div class="error"> {{latError}}</div>
                </label>
                <label>
                    Longitude
                    <input v-model.number="long"/>
                    <div class="error"> {{longError}}</div>
                </label>
            </div>
        </div>
        <button @click="Send">
            Send
        </button>
    </div>
</template>
<style scoped lang="scss">
    .error {
        color: darkred;
        font-size: 8px;

    }

    #map {
        height: 60vh;
        width: 60vw;
        margin: auto;

    }
</style>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    declare var google: any;


    @Component
    export default class Maps extends Vue {

        lat: number = 0;
        long: number = 0;
        scooters: number = 0;
        range: number = 0;


        Send() {
                if (this.rangeError != "" || this.numberError != "" || this.latError != "" || this.longError != "") return;
                console.log("Sending POST request");

                fetch("http://localhost:5000/scooters/closest", {
                    method: "POST",
                    body: JSON.stringify({
                        nearestNumberOfScooters: this.scooters,
                        radius: this.range,
                        chosenLatitude: this.lat,
                        chosenLongitude: this.long
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success: ", data);
                });
        }

        get rangeError(): string {
            try {
                this.range.ToInt()
            } catch {
                return "Needs to be a number"
            }
            if (this.range.ToInt() != this.range) {
                return "Needs to be integer"
            }
            if (this.range < 0) {
                return "Cannot be negative"
            }
            return ""
        }

        get numberError(): string {
            try {
                this.scooters.ToInt()
            } catch {
                return "Needs to be a number"
            }
            if (this.scooters.ToInt() != this.scooters) {
                return "Needs to be integer"
            }
            if (this.scooters < 0) {
                return "Cannot be negative"
            }
            return ""
        }


        get latError(): string {
            try {
                this.lat.ToFloat()
            } catch {
                return "Needs to be a number"
            }
            return ""
        }

        get longError(): string {
            try {
                this.long.ToFloat()
            } catch {
                return "Needs to be a number"
            }
            return ""
        }

        async mounted() {

            const m = document.getElementById('map');
            const c = new google.maps.Map(m, {
                center: {lat: 1.3139991, lng: 103.7742101},
                zoom: 12
            });
            const resp = await fetch("http://localhost:5000/scooters");
            const json: { latitude: number, longitude: number, id: string }[] = await resp.json();
            console.log(json);
            json.Map(e => new google.maps.Marker({
                position: new google.maps.LatLng(e.latitude, e.longitude),
                title: e.id
            })).Map(e => e.setMap(c));
        }
    }
</script>