<script setup lang="ts">
import {ref, watch} from "vue";
import {Period, Range, Stat} from "@/types";
import {randomInt} from "@/utils/index.ts";

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  })
}

const baseStats = [
  {
    title: 'Customers',
    icon: 'i-lucide-users',
    minValue: 400,
    maxValue: 1000,
    minVariation: -15,
    maxVariation: 25
  }, {
    title: 'Conversions',
    icon: 'i-lucide-chart-pie',
    minValue: 1000,
    maxValue: 2000,
    minVariation: -10,
    maxVariation: 20
  }, {
    title: 'Revenue',
    icon: 'i-lucide-circle-dollar-sign',
    minValue: 200000,
    maxValue: 500000,
    minVariation: -20,
    maxVariation: 30,
    formatter: formatCurrency
  }, {
    title: 'Orders',
    icon: 'i-lucide-shopping-cart',
    minValue: 100,
    maxValue: 300,
    minVariation: -5,
    maxVariation: 15
  }]

const {period, range} = defineProps<{ period: Period, range: Range }>()
const stats = ref<Stat[]>([])

watch([() => period, () => range], (_) => {
  stats.value = baseStats.map((stat) => {
    const value = randomInt(stat.minValue, stat.maxValue)
    const variation = randomInt(stat.minVariation, stat.maxVariation)
    return {
      title: stat.title,
      icon: stat.icon,
      value: stat.formatter ? stat.formatter(value) : value,
      variation
    }
  })
}, {
  immediate: true
})

</script>
<template>
  <div class="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--ui-gap) lg:gap-px">
    <UCard
        v-for="{icon,value,title,variation} in stats"
        class="hover:bg-(--ui-bg-elevated) hover:z-1 transition bg-(--ui-bg-elevated)/50 hover:ring-(--ui-border-accented)
      lg:rounded-none first:rounded-l-[calc(var(--ui-radius)*2)] last:rounded-r-[calc(var(--ui-radius)*2)] relative">
      <div class="flex flex-col items-start gap-2">
        <UBadge :icon="icon" class="rounded-full aspect-square" variant="subtle" size="xl">
        </UBadge>
        <p v-text="title" class="text-sm uppercase text-(--ui-text-muted)"/>
        <div class="flex items-center gap-2">
          <div v-text="value" class="text-2xl font-bold"/>
          <UBadge :label="(variation>=0?'+'+variation:variation)+'%'" :color="variation>=0?'success':'error'"
                  variant="subtle"/>
        </div>
      </div>
      <ULink
          to="/customers"
          class="focus:outline-none peer"
          tabindex="-1"
          raw
      >
        <span class="absolute inset-0" aria-hidden="true"/>
      </ULink>
    </UCard>
  </div>
</template>