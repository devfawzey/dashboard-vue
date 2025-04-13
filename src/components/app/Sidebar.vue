<script setup lang="ts">
import SidebarSearchButton from "@/components/app/SidebarSearchButton.vue";
import {LINKS} from "@/utils/constants.ts";
import {computed, toValue} from "vue";

const {collapsed, isModal} = defineProps<{ collapsed?: boolean, closeBtn?: boolean, isModal?: boolean }>()
const sidebarSize = computed(() => {
  // TODO: inMobile has ::18remWidth
  if (isModal) return '100%'
  if (toValue(collapsed)) return '0'
  return '16rem'
})

</script>

<template>
  <div
      :style="{'--width':sidebarSize}"
      class="flex flex-col min-w-16 w-(--width) border-e border-(--ui-bg-elevated) max-h-svh min-h-svh bg-(--ui-bg-elevated)/50 shrink-0">
    <div class="header px-4 h-(--ui-header-height) items-center flex shrink-0 gap-3">
      <UButton icon="i-lucide-x" v-if="isModal" @click="$emit('update:model-value')"/>
      <SidebarTeamsMenu :collapsed="collapsed"/>
    </div>
    <div class="body px-4 py-2 flex flex-col gap-4 flex-grow overflow-y-auto">
      <SidebarSearchButton :collapsed="collapsed"/>
      <UNavigationMenu :collapsed="collapsed" orientation="vertical" :items="LINKS[0]"/>
      <UNavigationMenu :collapsed="collapsed" orientation="vertical" class="mt-auto" :items="LINKS[1]"/>
    </div>
    <div class="footer border-t border-(--ui-bg-elevated) px-4 py-2 shrink-0">
      <SidebarUserMenu :collapsed="collapsed"/>
    </div>
  </div>
</template>
