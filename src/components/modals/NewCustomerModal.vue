<script setup lang="ts">
import {reactive, useTemplateRef} from "vue"
import {push} from "notivue"
import * as z from 'zod'
import type {Form, FormSubmitEvent} from '@nuxt/ui'

const emit = defineEmits<{ close: [boolean] }>()
const form = useTemplateRef<Form<any>>("form")
const schema = z.object({
  name: z.string().min(3),
  email: z.string().email("Invalid email")
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined
})

function submitForm() {
  return form.value?.submit()
}

async function onFormSubmit(event: FormSubmitEvent<Schema>) {
  await new Promise(resolve => setTimeout(resolve, 1750))
  emit('close', false)
  await new Promise(resolve => setTimeout(resolve, 1250))
  push.success({
    message: `${event.data.name} has added to customer list`,
    duration: 90000
  })
}
</script>
<template>
  <UModal :dismissible="false" title="New Customer" close-icon="i-lucide-x"
          description="Add a new customer to the database"
  >
    <template #body>
      <UForm :schema="schema" @submit="onFormSubmit" ref="form" :state="state" class="grid grid-cols-2 gap-2">
        <UFormField label="Name" name="name">
          <UInput autocomplete="given-name" v-model="state.name" type="text" class="w-full" :ui="{ base: 'peer' }"/>
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput autocomplete="on" v-model="state.email" type="email" class="w-full" :ui="{ base: 'peer' }"/>
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="emit('close',false)"/>
      <div class="flex-1"/>
      <UButton
          loading-icon="i-lucide-loader"
          @click="submitForm"
          loading-auto
          class="disabled:bg-neutral-200 disabled:text-(--ui-text-muted)/80 dark:disabled:bg-(--ui-bg-elevated) dark:disabled:text-(--ui-text-muted)/40"
          label="Submit"
          trailing
          variant="solid"/>
    </template>
  </UModal>
</template>