<script setup>
import {defineEmits} from "vue";

const emits = defineEmits(['set_number','new_game'])
</script>

<template>
  <div class="game_control_wrapper">
    <button style="width: 100%;height: 50px" @click="emits('new_game')">{{$t('new_game')}}</button>
    <slot />
    <div class="number_wrapper">
      <p v-for="number in 9" :key="number" @click="emits('set_number',number)">{{number}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game_control_wrapper{
  display: flex;
  flex-direction: column;
  gap: 30px;
  .number_wrapper{
    flex: 1;
    flex-direction: row;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3, 108px);
    grid-template-rows: repeat(3, 108px);
    text-align: center;
    p{
      margin: 0;
      padding: 30px;
      font-size: 40px;
      color: dodgerblue;
      background-color: lightblue;
      border-radius: 10px;
      cursor: pointer;
      &:hover{
        opacity: 0.75;
      }
    }
  }
}
</style>