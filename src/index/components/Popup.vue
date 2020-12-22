<template>
    <div class="popup" :class="active?'active':''">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Popup",
    props: {
        active: Boolean
    }
}
</script>

<style scoped>
    .popup {
        position: fixed;
        bottom: 0;
        width: 500px;
        height: 0;
        transition: height .5s;
    }

    .popup.active {
        height: 100vh;
    }

</style>