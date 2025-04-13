<script setup lang="ts">
import {computed, watch} from "vue";
import {eachDayOfInterval} from "date-fns"
import type {Period, Range} from "@/types";

const model = defineModel<Period>({required: true})
const {range} = defineProps<{ range: Range }>()
const days = computed(() => eachDayOfInterval(range))
const periods = computed<Period[]>(() => {
  if (days.value.length <= 8)
    return ["daily"]
  if (days.value.length <= 31)
    return ['daily', "weekly"]
  return ['weekly', "monthly"]
})

watch(periods, (_) => {
  if (!periods.value.includes(model.value))
    model.value = periods.value[0]
})
</script>
<template>
  <USelect v-model="model" :items="periods" :ui="{value:'capitalize',itemLabel:'capitalize'}"/>
</template>