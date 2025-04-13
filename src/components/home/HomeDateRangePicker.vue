<script setup lang="ts">
import {computed} from "vue";
import {DateFormatter, getLocalTimeZone, today, CalendarDate} from '@internationalized/date'
import type {Range} from "@/types";


const df = new DateFormatter("en-US", {
  dateStyle: "medium"
})

const selected = defineModel<Range>({required: true})

const calendarRange = computed({
  get: () => ({
    start: selected.value.start ? toCalendarDate(selected.value.start) : undefined,
    end: selected.value.end ? toCalendarDate(selected.value.end) : undefined
  }),
  set: (newValue: { start: CalendarDate | undefined, end: CalendarDate | undefined }) => {
    selected.value = {
      start: newValue.start ? newValue.start.toDate(getLocalTimeZone()) : new Date(),
      end: newValue.end ? newValue.end.toDate(getLocalTimeZone()) : new Date()
    }
  }
})


interface DateRange {
  label: string,
  days?: number,
  months?: number,
  years?: number
}

const ranges: DateRange[] = [
  {label: 'Last 7 days', days: 7},
  {label: 'Last 14 days', days: 14},
  {label: 'Last 30 days', days: 30},
  {label: 'Last 3 months', months: 3},
  {label: 'Last 6 months', months: 6},
  {label: 'Last year', years: 1}
]

function toCalendarDate(date: Date) {
  return new CalendarDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
  )
}

function selectRange(range: DateRange) {
  const endDate = today(getLocalTimeZone())
  let startDate = endDate.copy()
  if (range.days) {
    startDate = startDate.subtract({days: range.days})
  } else if (range.months) {
    startDate = startDate.subtract({months: range.months})
  } else if (range.years) {
    startDate = startDate.subtract({years: range.years})
  }
  selected.value = {
    start: startDate.toDate(getLocalTimeZone()),
    end: endDate.toDate(getLocalTimeZone()),
  }
}

const isRangeSelected = computed<(range: DateRange) => boolean>(() => {
  return (range: DateRange): boolean => {
    if (!selected.value.start || !selected.value.end) return false;
    const currentDate = today(getLocalTimeZone())
    let startDate = currentDate.copy()
    const {days, months, years} = range
    if (days) {
      startDate = startDate.subtract({days})
    } else if (months) {
      startDate = startDate.subtract({months})
    } else if (years) {
      startDate = startDate.subtract({years})
    }
    const selectedStart = toCalendarDate(selected.value.start);
    const selectedEnd = toCalendarDate(selected.value.end)

    return selectedStart.compare(startDate) === 0 && selectedEnd.compare(currentDate) === 0
  }
})
</script>

<template>
  <UPopover>
    <UButton icon="i-lucide-calendar" trailing-icon="i-lucide-chevron-down">
      <template v-if="selected.start">
        <template v-if="selected.end">
          {{ df.format(selected.start) }} - {{
            df.format(selected.end)
          }}
        </template>
        <template v-else>
          {{ df.format(selected.start) }}
        </template>
      </template>
      <template v-else>
        Pick a date
      </template>
    </UButton>
    <template #content>
      <div class="flex divide-x divide-(--ui-bg-elevated)">
        <ul class="hidden sm:flex flex-col justify-center">
          <UButton
              v-for="range in ranges"
              :label="range.label"
              truncate
              @click="selectRange(range)"
              class="p-2 rounded-none"
              :class="[isRangeSelected(range)?'bg-(--ui-bg-elevated)':'hover:bg-(--ui-bg-elevated)/50']"
          />
        </ul>
        <UCalendar range class="p-2" :number-of-months="2" v-model="calendarRange"/>
      </div>
    </template>
  </UPopover>
</template>
