<script setup>
import {computed, onMounted, ref} from "vue";
import {challenge_3,challenge_1,challenge_2,answer_challenge_3,answer_challenge_2,answer_challenge_1} from "@/components/challenges";
import {STATUSES_CLOCK,STATES_CHANGE} from "@/components/statuses";
import HeaderPanel from "@/components/HeaderPanel";
import GamePanel from "@/components/GamePanel";
import GameControlPanel from "@/components/GameControlPanel";
import ButtonControlPanel from "@/components/ButtonControlPanel";
import ClockPanel from "@/components/ClockPanel";
import dayjs from "dayjs";
const list_challenge = [challenge_1,challenge_2,challenge_3]
const list_answer_challenge = [answer_challenge_1,answer_challenge_2,answer_challenge_3]
let setInter
let level = 0
const done = ref(false)
let answer_challenge = []
const status_clock = ref(STATUSES_CLOCK.START)
const lastTotalMilli = ref(0)
const newTotalMilli = ref(0)
const totalMilli = computed(()=>{
  return lastTotalMilli.value + newTotalMilli.value
})

const pause = ref(false)
const log_history = ref([])
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

const begin_clock = ()=>{
  let timeBegin = new Date()
  lastTotalMilli.value = totalMilli.value
  setInter = setInterval(() => {
    newTotalMilli.value = dayjs(new Date()).diff(timeBegin)
  }, 0)
  status_clock.value = STATUSES_CLOCK.PAUSE
  pause.value = false
}
const stop_clock = () => {
  clearInterval(setInter)
  status_clock.value = STATUSES_CLOCK.START
  pause.value = true
}
const reset_time = () => {
  stop_clock()
  newTotalMilli.value = 0
  lastTotalMilli.value = 0
  status_clock.value = STATUSES_CLOCK.START
}

const new_game = () => {
  if(level === 3){
    level = 0
  }
  challenge.value = JSON.parse(JSON.stringify(list_challenge[level]))
  answer_challenge = list_answer_challenge[level]
  level += 1
  cell_selected.value = {}
  log_history.value = []
  reset_time()
  pause.value = false
  setInter = undefined
  done.value = false
}
const undo = ()=>{
  if (log_history.value.length !== 0){
    let cell_changed = log_history.value[0]
    if (cell_changed.status === STATES_CHANGE.BOTH){
      if(cell_changed.first_change === STATES_CHANGE.CHANGE_NUMBER){
        undo_note([],cell_changed.row,cell_changed.col)
        undo_number(cell_changed.old_value_num,cell_changed.row,cell_changed.col)
      }
      else{
        undo_number(0,cell_changed.row,cell_changed.col)
        undo_note(cell_changed.old_value_note,cell_changed.row,cell_changed.col)
      }
    }
    if(cell_changed.status === STATES_CHANGE.CHANGE_NUMBER){
      undo_number(cell_changed.old_value,cell_changed.row,cell_changed.col)
    }
    if(cell_changed.status === STATES_CHANGE.CHANGE_NOTE){
      undo_note(cell_changed.old_value,cell_changed.row,cell_changed.col)
    }
    log_history.value.shift()
    if(log_history.value[0].first_change === STATES_CHANGE.CHANGE_NUMBER){
      undo_note([], log_history.value[0].row, log_history.value[0].col)
      undo_number(log_history.value[0].old_value_num, log_history.value[0].row, log_history.value[0].col)
      log_history.value.shift()
    }
  }
}
const undo_number = (number,row,col) =>{
  update_cell_selected({...challenge.value[row][col],row: row,col: col})
  challenge.value[row][col].note = []
  challenge.value[row][col].num = number
}
const undo_note = (note,row,col) =>{
  update_cell_selected({...challenge.value[row][col],row: row,col: col})
  challenge.value[row][col].num = 0
  challenge.value[row][col].note = note
}
const erase = ()=>{
  if(cell.value.num !== 0)
    log_history.value.unshift({status: STATES_CHANGE.CHANGE_NUMBER,row: row.value,col: col.value,old_value: cell.value.num})
  else
    log_history.value.unshift({status: STATES_CHANGE.CHANGE_NOTE,row: row.value,col: col.value,old_value: [cell.value.note]})
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
  check_done()
}
const set_number = number =>{
  if (cell_selected.value && !cell.value.read_only){
    if(!status_note.value){
      if(cell.value.note.length !== 0){
        log_history.value.unshift({status: STATES_CHANGE.BOTH,first_change: STATES_CHANGE.CHANGE_NOTE,row: row.value,col: col.value,old_value_note: cell.value.note})
        cell.value.note = []
      }
      else
        log_history.value.unshift({status: STATES_CHANGE.CHANGE_NUMBER,row: row.value,col: col.value,old_value: cell.value.num})
      if (cell.value.num === number){
        cell.value.num = 0
      }
      else {
        cell.value.num = number
      }
      cell.value.error = cell.value.num !== answer_challenge[row.value][col.value].num;
      check_done()
    }
    else {
      let notes = cell.value.note
      if(cell.value.num !== 0){
        log_history.value.unshift({status: STATES_CHANGE.BOTH,first_change: STATES_CHANGE.CHANGE_NUMBER,row: row.value,col: col.value,old_value_num: cell.value.num})
        cell.value.num = 0
      }
      let same = false
      cell.value.note.map(number_note => {
        if(number_note === number){
          log_history.value.unshift({status: STATES_CHANGE.CHANGE_NOTE,row: row.value,col: col.value,old_value: notes})
          cell.value.note = cell.value.note.filter(number_delete => number_delete !== number)
          same = true
        }
      })
      if (!same){
        cell.value.note.push(number)
        notes = notes.filter(number_delete => number_delete !== number)
        log_history.value.unshift({status: STATES_CHANGE.CHANGE_NOTE,row: row.value,col: col.value,old_value: notes})
      }
    }
  }
}
const update_cell_selected = obj =>{
  if(!obj.read_only){
    if(!setInter){
      begin_clock()
    }
    cell_selected.value = obj
    challenge.value.map(row => {
      row.map(column => {
        column.active = false
      })
    })
    cell.value.active = true
  }
}
const check_done = ()=>{
  let same = true
  for(let row = 0;row < answer_challenge.length;row++ ){
    for (let col = 0;col <answer_challenge[row].length;col++){
      if(challenge.value[row][col].num !== answer_challenge[row][col].num){
        same = false
      }
    }
  }
  if(same){
    stop_clock()
    pause.value = false
    done.value = true
  }
}
onMounted(()=>{
  new_game()
  pause.value = false
})
</script>

<template>
  <header-panel />
  <div class="content">
    <div class="sudoku-wrapper">
      <div style="display:flex;flex-direction: row;justify-content: space-between">
        <div style="font-size: 20px">
          {{$t('auto_check_mistakes')}} <input type="checkbox" v-model="auto_check_mistakes" style="width: 20px;height: 20px">
        </div>
        <clock-panel :status="status_clock" :total-milli="totalMilli" @stop_clock="stop_clock" @begin_clock="begin_clock"/>
      </div>
      <div class="game-wrapper">
        <game-panel style="width: 500px;border: 1px solid black" :challenge="challenge" :answer_challenge="answer_challenge" :cell_selected="cell_selected"
                    @update_cell_selected="update_cell_selected" :auto_check_mistakes="auto_check_mistakes" :done="done" :pause="pause" @continue_clock="begin_clock"/>
        <game-control-panel @set_number="set_number" @new_game="new_game" style="flex: 1">
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
      gap: 40px;
    }
  }
}
</style>