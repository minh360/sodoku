<script setup>
import {computed, onMounted, ref} from "vue";
import {challenge_3,challenge_1,challenge_2,answer_challenge_3,answer_challenge_2,answer_challenge_1} from "@/components/challenges";
import HeaderPanel from "@/components/HeaderPanel";
import GamePanel from "@/components/GamePanel";
import GameControlPanel from "@/components/GameControlPanel";
import ButtonControlPanel from "@/components/ButtonControlPanel";
const list_challenge = [challenge_1,challenge_2,challenge_3]
const list_answer_challenge = [answer_challenge_1,answer_challenge_2,answer_challenge_3]
let level = 0
let answer_challenge
// const log_history = ref([])
const challenge = ref([])
const status_note = ref(false)
const auto_check_mistakes = ref(false)
const cell_selected = ref({})
const cell = computed(() =>{
  return challenge.value[row.value][col.value]
})
const row = computed(()=>{
  return cell_selected.value.row
})
const col = computed(()=>{
  return cell_selected.value.col
})
const new_game = ()=>{
  if(level === 3){
    level = 0
  }
  challenge.value = list_challenge[level]
  answer_challenge = list_answer_challenge[level]
  level += 1
}
const undo = ()=>{

}
const erase = ()=>{
  cell.value.num = 0
  cell.value.note = []
}
const note = ()=>{
  status_note.value =! status_note.value
}
const hint = ()=>{
  cell.value.num = answer_challenge[row.value][col.value].num
  cell.value.read_only = true
  cell.value.active = false
  cell_selected.value = {}
}
const set_number = number =>{
  if (cell_selected.value && !cell.value.read_only){
    if(!status_note.value){
      if (cell.value.num === number){
        cell.value.num = 0
      }
      else {
        cell.value.num = number
        cell.value.note = []
      }
      cell.value.error = cell.value.num !== answer_challenge[row.value][col.value].num;
    }
    else {
      cell.value.num = 0
      let same = false
      cell.value.note.map(number_note => {
        if(number_note === number){
          cell.value.note = cell.value.note.filter(number_delete => number_delete !== number)
          same = true
        }
      })
      if (!same){
        cell.value.note.push(number)
      }
    }
  }
}
const update_cell_selected = obj =>{
  if(!obj.read_only){
    cell_selected.value = obj
    challenge.value.map(row => {
      row.map(column => {
        column.active = false
      })
    })
    cell.value.active = true
  }
}
onMounted(()=>{
  new_game()
})
</script>

<template>
  <header-panel />
  <div class="content">
    <div class="sudoku-wrapper">
      <div style="font-size: 20px">
        Auto_Check  <input type="checkbox" v-model="auto_check_mistakes" style="width: 20px;height: 20px">
      </div>
      <div class="game-wrapper">
        <game-panel :challenge="challenge" :answer_challenge="answer_challenge_3" style="width: 500px;" :cell_selected="cell_selected"
                  @update_cell_selected="update_cell_selected" :auto_check_mistakes="auto_check_mistakes"/>
        <game-control-panel @set_number="set_number" @new_game="new_game">
          <button-control-panel @undo="undo" @erase="erase" @note="note" @hint="hint" :status_note="status_note"/>
        </game-control-panel>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content{
  height: 100%;
  .sudoku-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 900px;
    .game-wrapper{
      display: flex;
      gap: 40px
    }
  }
}
</style>