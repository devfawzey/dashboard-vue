<script lang="ts">
import type {DropdownMenuItem} from "@nuxt/ui";

interface Sender {
  name: string,
  email: string,
  avatar: {
    src: string
  },
}

export interface Notification {
  id?: string,
  unread?: boolean,
  body?: string,
  date: string,
  sender?: Sender
}
</script>
<script setup lang="ts">
import {useFetch, formatTimeAgo} from "@vueuse/core";
import {computed, toValue, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const {data} = useFetch("https://dashboard-template.nuxt.dev/api/notifications", {initialData: []}).json<Notification[]>()
const max = ref(8)
const dropDownNotificationMessages = computed<DropdownMenuItem[]>(() => (data.value?.map(notification => ({
  label: notification.sender?.name,
  avatar: notification.sender?.avatar,
  extraData: {...notification},
  to: `/inbox?id=${notification.id}`,
})) ?? []).slice(0, toValue(max)));

const dropDownNotifications = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: "label",
      label: "Notifications",
      slot: "header",
    }
  ],
  toValue(dropDownNotificationMessages)
])

function getNotification(item: any): Notification {
  return item.extraData as Notification
}
</script>

<template>
  <UDropdownMenu :content="{align:'end',sideOffset:0}" arrow :items="dropDownNotifications">
    <template #item="{item}">
      <div class="flex w-full items-center gap-3">
        <UChip v-bind="{show:!!getNotification(item).unread}">
          <UAvatar v-bind="{...item.avatar}" :alt="item.label"/>
        </UChip>
        <div class="text-left flex-1">
          <h2 v-text="item.label"/>
          <p v-text="getNotification(item).body" class="text-sm text-(--ui-text-muted)"/>
        </div>
        <p v-text="formatTimeAgo(new Date(getNotification(item).date))" class="text-xs text-(--ui-text-dimmed)"/>
      </div>
    </template>
    <UTooltip text="Notifications">
      <UButton square>
        <UChip color="error" inset>
          <UIcon name="i-lucide-bell" class="size-5"/>
        </UChip>
      </UButton>
    </UTooltip>
  </UDropdownMenu>
</template>
