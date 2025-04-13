<script setup lang="ts">
import {sub} from "date-fns"
import type {DropdownMenuItem} from "@nuxt/ui"
import HomePeriodPicker from "@/components/home/HomePeriodPicker.vue"
import NotificationButton from "@/components/app/NotificationButton.vue";
import NewCustomerModal from "@/components/modals/NewCustomerModal.vue";
import NewMailModal from "@/components/modals/NewMailModal.vue";
import UWrapper from "@/components/base/Wrapper.vue";
import {ref, shallowRef} from "vue";
import type {Period, Range} from "@/types";

const overlay = useOverlay()
const createCustomerModal = overlay.create(NewCustomerModal)
const createMailModal = overlay.create(NewMailModal)

const range = shallowRef<Range>({
  start: sub(new Date(), {days: 14}),
  end: new Date()
})


const items: DropdownMenuItem[] = [
  {
    label: "New mail",
    icon: "i-lucide-send",
    onSelect() {
      createMailModal.open()
    }
  },
  {
    label: "New customer",
    icon: "i-lucide-user-plus",
    onSelect() {
      createCustomerModal.open()
    }
  },
]

const period = ref<Period>('daily')
</script>
<template>
  <main class="w-full h-screen flex flex-col overflow-hidden">
    <UWrapper class="shrink-0 h-(--ui-header-height) flex items-center">
      <Header label="Home">
        <NotificationButton/>
        <UDropdownMenu :items="items">
          <UButton color="primary" icon="i-lucide-plus" square class="rounded-full ms-3" size="md" variant="solid"/>
        </UDropdownMenu>
      </Header>
    </UWrapper>
    <UWrapper class="py-2 flex items-center gap-2 border-y border-y-(--ui-bg-elevated) shrink-0 h-(--ui-header-height)">
      <HomeDateRangePicker v-model="range"/>
      <HomePeriodPicker :range="range" v-model="period"/>
    </UWrapper>
    <UWrapper class="overflow-y-auto p-4 sm:p-6 flex flex-col flex-1 mx-0">
      <HomeStats :period="period" :range="range"/>
      <HomeChart :period="period" :range="range"/>
    </UWrapper>
  </main>
</template>