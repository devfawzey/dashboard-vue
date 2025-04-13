<script setup lang="ts">
import {computed, ref} from "vue";
import type {DropdownMenuItem, ButtonProps} from '@nuxt/ui'

const {collapsed} = defineProps<{ collapsed: boolean }>()

const teams = ref<Pick<ButtonProps, "label" | "avatar">[]>([
  {
    label: "Vue",
    avatar: {
      alt: "Vue",
      src: 'https://github.com/vuejs.png',
    }
  },
  {
    label: "Vite",
    avatar: {
      alt: "Vite",
      src: "https://github.com/vite.png"
    },
  }, {
    label: "Vitest",
    avatar: {
      alt: "Vitest",
      src: "https://github.com/vitest.png"
    },
  }
])
const items = computed<DropdownMenuItem[] | DropdownMenuItem[][]>(() => {
  return [teams.value.map(team => ({
    ...team,
    onSelect() {
      selectedTeam.value = team
    }
  })), [{
    label: 'Create team',
    icon: 'i-lucide-circle-plus'
  }, {
    label: 'Manage teams',
    icon: 'i-lucide-cog'
  }]]
})

const selectedTeam = ref(teams.value[0])
</script>
<template>
  <UDropdownMenu
      :items="items"
      :content="{ align: 'end', collisionPadding: 12,side:'right' }"
      :ui="{ content:collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)'  }"
  >
    <UButton
        color="neutral"
        variant="ghost"
        block
        v-bind="{...selectedTeam,
        label:collapsed?undefined:selectedTeam.label,
        trailingIcon:collapsed?undefined:'i-lucide-chevrons-up-down'
        }"
        :square="collapsed"
        class="data-[state=open]:bg-(--ui-bg-elevated)"
        :class="[!collapsed && 'py-2']"
        :ui="{
        trailingIcon: 'text-(--ui-text-dimmed)'
      }"
    />
  </UDropdownMenu>
</template>