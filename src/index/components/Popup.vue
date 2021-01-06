<template>
    <div class="popup" :class="active?'active':''" :style="{height: realHeight}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Popup",
    props: {
        active: Boolean,
        height: {
            type: String,
            default: "100vh"
        }
    },
    computed: {
        realHeight: function() {
            return this.active ? this.height : 0;
        }
    }
}
</script>

<style scoped>
    .popup {
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: 500px;
        height: 0;
        /*transition: height .5s;*/
    }

    .popup.active {
        height: 100vh;
    }

</style>