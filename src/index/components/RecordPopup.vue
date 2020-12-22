<template>
    <Popup :active="active">RecordPopup</Popup>
</template>

<script>
    import Popup from './Popup.vue'

    export default {
        name: "RecordPopup",
        components: {
            Popup
        },
        props: {
            active: Boolean
        }
    }
</script>

<style scoped>

</style>