<script setup lang="ts">
import {computed} from "vue";
import {useSidebar} from "@/composables/useSidebar.ts";
import {darkTheme, lightTheme, Notification, Notivue, type NotivueTheme} from "notivue"
import {useDark} from "@vueuse/core";

const isDark = useDark()
const {openMobile, isMobile, collapsed} = useSidebar()
const customMaterialTheme: NotivueTheme = {
  ...lightTheme,
  "--nv-success-bg": "var(--ui-bg-elevated)",
  "--nv-success-accent": "var(--ui-primary)",
}
const customDarkTheme: NotivueTheme = {
  ...darkTheme,
  "--nv-success-bg": "var(--ui-bg-elevated)",
  "--nv-success-accent": "var(--ui-primary)",
}
const notivueTheme = computed(() => isDark.value ? customDarkTheme : customMaterialTheme)

</script>
<template>
  <UApp>
    <Notivue v-slot="item">
      <Notification :theme="notivueTheme" :item="item"/>
    </Notivue>
    <div class="flex">
      <USlideover
          v-if="isMobile"
          :ui="{content:'max-w-2xs data-[state=open]:animate-wiggle-in data-[state=closed]:animate-wiggle-out'}"
          side="left" v-model:open="openMobile">
        <template #content>
          <Sidebar is-modal @update:model-value="openMobile=false"/>
        </template>
      </USlideover>
      <Sidebar v-else :collapsed="collapsed"/>
      <RouterView v-slot="{ Component }">
        <Transition name="scale" mode="out-in">
          <component :is="Component"/>
        </Transition>
      </RouterView>
    </div>
  </UApp>
</template>
