<script setup lang="ts">
import {ref} from "vue";

const input = ref("")
</script>
<template>
  <UWrapper>
    <h1>ABOUT_VIEW</h1>
    <UInput v-model="input"/>
  </UWrapper>
</template>