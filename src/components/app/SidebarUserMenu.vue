<script setup lang="ts">
import {computed} from "vue";
import type {DropdownMenuItem} from '@nuxt/ui'
import {useColorMode} from "@vueuse/core";

const {collapsed} = defineProps<{ collapsed: boolean }>()
const colorMode = useColorMode()
const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'MohammedFawzey',
      type: 'label',
      avatar: {
        src: 'https://github.com/benjamincanac.png',
        alt: 'Benjamin Canac'
      }
    },
  ]
  , [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    }, {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    }, {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/settings'
    }],
  [
    {
      label: "Appearance",
      icon: "i-lucide-sun-moon",
      children: [
        {
          label: "System",
          type: "checkbox",
          icon: "i-lucide-laptop-minimal",
          checked: colorMode.store.value === 'auto',
          onSelect() {
            colorMode.value = 'auto'
          }
        }, {
          label: "Dark",
          type: "checkbox",
          icon: "i-ph-moon",
          checked: colorMode.store.value === 'dark',
          onSelect() {
            colorMode.value = 'dark'
          }
        }, {
          label: "Light",
          type: "checkbox",
          icon: "i-ph-sun",
          checked: colorMode.store.value === 'light',
          onSelect() {
            colorMode.value = 'light'
          }
        },

      ]
    }
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out"
    }
  ]
])
const user = {
  name: 'MohammedFawzey', avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'MohammedFawzey'
  }
}
</script>

<template>
  <UDropdownMenu
      :items="items"
      :content="{ align: 'center', collisionPadding: 12 }"
      :ui="{ content:collapsed?'w-48': 'w-(--reka-dropdown-menu-trigger-width)'  }"
  >
    <UButton color="neutral"
             variant="ghost"
             v-bind="{...user,label:collapsed?undefined:user.name,trailingIcon:collapsed?undefined:'i-lucide-chevrons-up-down'}"
             block
    />
  </UDropdownMenu>
</template>

<style scoped>

</style>