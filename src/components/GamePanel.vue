<script setup>
import {defineProps, defineEmits} from "vue";

defineProps({
  challenge: Array,
  answer_challenge: Array,
  cell_selected: Object,
  auto_check_mistakes: Boolean,
  done: Boolean,
  pause: Boolean
})
const emits = defineEmits(['update_cell_selected', 'continue_clock'])
const update_cell_selected = (obj, row, col) => {
  emits('update_cell_selected', {...obj, row: row, col: col})
}
</script>

<template>
  <div v-if="!pause">
    <div v-if="!done">
      <div class="row_flex" v-for="(row,index_row) in challenge.length" :key="row"
           :class="{border_bottom: (index_row+1) % 3 === 0 ,border_top: index_row === 0}">
        <div class="number_wrapper" v-for="(column,index_col) in challenge[row-1]" :key="index_col"
             @click="update_cell_selected(column,row-1,index_col)"
             :class="{read_only: column.read_only,active: column.active,border_left: (index_col) % 3 === 0,border_right: index_col === 8}">
          <section v-if="!column.read_only">
          <span v-if="column.num !== 0" class="number" :class="{error: column.error && auto_check_mistakes}">
            {{column.num}}
          </span>
            <div class="note_wrapper" v-else>
            <span v-for="number in 9" :key="number">
              <span v-for="number_note in column.note" :key="number_note">
                <span v-show="number === number_note">{{number}}</span>
              </span>
            </span>
            </div>
          </section>
          <section v-else>
            {{column.num}}
          </section>
        </div>
      </div>
    </div>
    <div v-else>
      <p style=" width: 200px;height: 50px;margin-top: 200px;margin-left: 150px">Good job !!!</p>
    </div>
  </div>
  <div v-else>
    <button @click="emits('continue_clock')">Continue</button>
  </div>
</template>

<style lang="scss" scoped>
.row_flex {
  display: flex;
  flex-direction: row;

  .number_wrapper {
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    color: blue;
    font-size: 30px;
    margin: 0;
    width: 55px;
    height: 50px;
    -moz-user-select: none !important;
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    -ms-user-select: none !important;

    .error {
      color: red;
    }

    .note_wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 10px;
      grid-row-gap: 5px;
      color: gray;
      padding: 5px;
      font-size: 10px;
      margin: 0;
    }
  }

  .active {
    background-color: skyblue;
  }

  .read_only {
    color: black;
  }

  .border_left {
    border-left: 2px solid black;
  }

  .border_right {
    border-right: 2px solid black;
  }

  &.border_bottom {
    border-bottom: 2px solid black;
  }

  &.border_top {
    border-top: 2px solid black;
  }
}
</style>