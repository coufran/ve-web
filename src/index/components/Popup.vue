<template>
    <div class="popup">
        Popup
    </div>
</template>

<script>
export default {
    name: "Popup"
}
</script>

<style scoped>
    .popup {
        position: fixed;
        bottom: 0;
        width: 500px;
        height: 100vh;
        background-color: white;
        transition: height .5s;
    }

</style>