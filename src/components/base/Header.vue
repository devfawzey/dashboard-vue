<script setup lang="ts">
import {computed} from "vue"
import {useSidebar} from "@/composables/useSidebar.ts";

const {label = "home"} = defineProps<{ label: string }>()
const {state, isMobile, setOpenMobile, openMobile, toggleSidebar} = useSidebar()

function handleSidebar(): void {
  if (isMobile.value)
    return setOpenMobile(!openMobile.value)
  toggleSidebar()
}

const getHandlerIcon = computed<string>(() => {
  if (isMobile.value) return 'heroicons:bars-2'
  if (state.value === 'expanded') return 'i-lucide-panel-left-open'
  return 'i-lucide-panel-left-close'
})
</script>

<template>
  <div class="flex items-center w-full data-[sidebar-collapsed=true]:bg-red-900">
    <UButton
        @click="handleSidebar"
        :icon="getHandlerIcon"
        variant="ghost"
        color="neutral"
        square
        class="rounded-full"
    />
    <h1 v-text="label" class="ms-2 font-semibold"/>
    <div class="flex-1"/>
    <slot name="default"/>
  </div>
</template>


