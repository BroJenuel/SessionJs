<script lang="ts" setup>
import SnapSession from "snap-storage"

function setOption() {
    const isSet = SnapSession.set('test', {test: "value"});
    console.log(isSet)
    if (isSet)
    console.log(SnapSession.get('test'));
}
</script>
<template>
    <button @click="setOption">Click</button>
</template>
