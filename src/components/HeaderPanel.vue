<script setup>
import {ref} from "vue";

const languages = ref([{name: 'English', value: 'en'}, {name: 'Vietnamese', value: 'vi'}])
</script>

<template>
  <div class="header">
    <p>Sudoku.com</p>
    <select v-model="$i18n.locale">
      <option v-for="locale in languages" :key="locale.name" :value="locale.value">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: baseline;
  font-size: 50px;
  height: 70px;
  border-bottom: 1px solid whitesmoke;
  margin-bottom: 30px;
}
</style>