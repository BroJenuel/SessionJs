<script lang="ts" setup>
import { session } from "storage-container-js";

session.set('testing=lang', 'here you go!!');
</script>
<template>
    <button>Click</button>
</template>
