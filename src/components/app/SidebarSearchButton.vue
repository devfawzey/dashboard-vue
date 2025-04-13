<script setup lang="ts">
import {computed, ref, toValue} from "vue";
import type {CommandPaletteItem, CommandPaletteGroup} from "@nuxt/ui"
import {LINKS} from "@/utils/constants.ts";
import {useColorMode} from "@vueuse/core";

const {collapsed} = defineProps<{ collapsed: boolean }>()
const colorMode = useColorMode()
const kbds = ["Ctrl", "K"]
const open = ref(false);
const searchTerm = ref('')

const cmdGoToItemsWithCloseModal = computed<CommandPaletteItem[]>(() => LINKS[0].map(link => ({
  label: link.label,
  icon: link.icon,
  to: link.to
})))
const cmdGoToGroup = computed<CommandPaletteGroup<CommandPaletteItem>>(() => ({
  id: "goto",
  label: "Go To",
  items: [...cmdGoToItemsWithCloseModal.value.map(item => ({
    ...item, onSelect() {
      open.value = false
    }
  })),
    ...LINKS[1],
  ]
}))

const cmdCodeGroup: CommandPaletteGroup<CommandPaletteItem> = {
  id: 'code',
  label: 'Code',
  items: [{
    label: 'View page source',
    icon: 'simple-icons:github',
    to: `https://github.com/nuxt-ui-pro/dashboard-vue`,
    target: '_blank'
  }]
}
const cmdThemeGroup = computed<CommandPaletteGroup<CommandPaletteItem>>(() => ({
  id: "theme",
  label: "Theme",
  items: [
    {
      label: "System",
      icon: "i-lucide-laptop-minimal",
      active: colorMode.store.value === 'auto',
      onSelect() {
        colorMode.value = 'auto'
      }
    },
    {
      label: "Dark",
      icon: "i-ph-moon",
      active: colorMode.store.value === 'dark',
      onSelect() {
        colorMode.value = 'dark'
      }
    },
    {
      label: "Light",
      icon: "i-ph-sun",
      active: colorMode.store.value === 'light',
      onSelect() {
        colorMode.value = 'light'
      }
    }
  ]
}))

const commandGroups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() => [toValue(cmdGoToGroup), cmdCodeGroup, toValue(cmdThemeGroup)])

defineShortcuts({
  ctrl_k: () => open.value = !open.value
})

</script>
<template>
  <UModal v-model:open="open">
    <UButton block :label="collapsed?undefined:'Search...'" color="neutral" variant="outline" icon="i-lucide-search"
             class="bg-transparent ring-(--ui-border)">
      <template #trailing>
        <div class="flex items-center gap-0.5 ms-auto" v-if="!collapsed">
          <UKbd v-for="kbd in kbds" :value="kbd" variant="subtle"/>
        </div>
      </template>
    </UButton>
    <template #content>
      <UCommandPalette
          :groups="commandGroups"
          v-model:search-term="searchTerm"
          @update:open="open = $event"
      />
    </template>
  </UModal>
</template>