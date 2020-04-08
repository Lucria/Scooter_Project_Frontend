<template>
    <div>
        <h1>Other APIs</h1>
        <div>This page is meant test connection with backend</div>
        <div>and for ease of creation of Scooter objects.</div>
        <div>All output will be printed out to console.</div>

        <h2>Get Coordinates of all Scooters</h2>
        <button @click="GetAll">
            GetAll
        </button>

        <h2>Get Coordinates of specific Scooter using UUID</h2>
        <label> UUID:
            <input v-model="GetUUID"/>
        </label>
        <button @click="GetId">
            Get
        </button>

        <h2> Create a Scooter with specific coordinates</h2>
        <label> Latitude:
            <input v-model.number="latitude"/>
        </label>
        <label> Longitude:
            <input v-model.number="longitude"/>
        </label>
        <button @click="Create">
            Create
        </button>

        <h2> Edit coordinates of existing Scooter</h2>
        <label> UUID:
            <input v-model="PutUUID"/>
        </label>
        <label> Latitude:
            <input v-model.number="PutLat"/>
        </label>
        <label> Longitude:
            <input v-model.number="PutLong"/>
        </label>
        <button @click="Edit">
            Edit
        </button>

        <h2> Delete a Scooter using UUID</h2>
        <label> UUID:
            <input v-model="DeleteUUID"/>
        </label>
        <button @click="DeleteId">
            Delete
        </button>
    </div>
</template>

<style lang='scss' scoped>
    .table {
        margin: auto;
    }
</style>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class About extends Vue {
        GetUUID: string = "";
        latitude: number = 0;
        longitude: number = 0;
        PutLat: number = 0;
        PutLong: number = 0;
        PutUUID: string = "";
        DeleteUUID: string = "";

        async GetAll() {
            const resp = await fetch("http://localhost:5000/scooters");
            const json: { latitude: number, longitude: number, id: string }[] = await resp.json();
            console.log(json);
        }

        async GetId() {
            const resp = await fetch("http://localhost:5000/scooters/" + this.GetUUID);
            const json = await resp.json();
            console.log(json);
        }

        async Create() {
            const resp = await fetch("http://localhost:5000/scooters/", {
                method: "POST",
                body: JSON.stringify({
                    latitude: this.latitude,
                    longitude: this.longitude
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await resp.json();
            console.log(json);
        }

        async Edit() {
            const resp = await fetch("http://localhost:5000/scooters/" + this.PutUUID, {
                method: "PUT",
                body: JSON.stringify({
                    latitude: this.PutLat,
                    longitude: this.PutLong
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await resp.json();
            console.log(json);
        }

        async DeleteId() {
            const resp = await fetch("http://localhost:5000/scooters/" + this.DeleteUUID, {
                method: "DELETE"
            });
            console.log(resp.status);
        }
    }
</script>
