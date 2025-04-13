<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>()
import {push} from "notivue"

function onSubmit() {
  push.success({
    message: "New Mail has added"
  })
}
</script>
<template>
  <UModal title="New Mail Modal">
    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="emit('close',false)"/>
      <UButton @click="onSubmit" label="Submit" color="neutral"/>
    </template>
  </UModal>
</template>