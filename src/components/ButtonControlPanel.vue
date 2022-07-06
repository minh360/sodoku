<script setup>
import {defineEmits,defineProps} from "vue";
defineProps({
  status_note: Boolean
})
const emits = defineEmits(['undo','erase','note','hint'])
</script>

<template>
  <div class="control">
    <button @click="emits('undo')">Undo</button>
    <button @click="emits('erase')">Erase</button>
    <button @click="emits('note')">Notes ({{status_note}})</button>
    <button @click="emits('hint')">Hint</button>
  </div>
</template>

<style scoped>
.control{
  display: flex;
  justify-content: space-between;
}
</style>