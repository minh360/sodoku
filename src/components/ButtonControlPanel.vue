<script setup>
import {defineEmits, defineProps} from "vue";

defineProps({
  status_note: Boolean
})
const emits = defineEmits(['undo', 'erase', 'note', 'hint'])
</script>

<template>
  <div class="control">
    <button @click="emits('undo')">{{ $t('undo') }}</button>
    <button @click="emits('erase')">{{ $t('erase') }}</button>
    <button @click="emits('note')">{{ $t('notes') }} ({{ $t(String(status_note)) }})</button>
    <button @click="emits('hint')">{{ $t('hint') }}</button>
  </div>
</template>

<style scoped>
.control {
  display: flex;
  justify-content: space-between;
}
</style>