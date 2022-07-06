<script setup>
import {defineProps} from "vue";
defineProps({
  challenge : Array,
  answer_challenge: Array
})

</script>

<template>
  <div>
    <div class="row-flex" v-for="(row,index) in challenge.length" :key="row" :class="{borderBottom: (index+1) % 3 === 0 ,borderTop: index === 0}">
      <div class="number" v-for="(column,index) in challenge[row-1]" :key="column" :class="{read_only: column.read_only,borderLeft: (index) % 3 === 0,borderRight: index === 8}">
        <section v-if="!column.read_only">
          <div class="note-wrapper">
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
</template>

<style lang="scss" scoped>
.row-flex{
  display: flex;
  flex-direction: row;
  .number{
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    color: aqua;
    font-size: 30px;
    margin: 0;
    width: 55px;
    height: 50px;
    -moz-user-select: none !important;
    -webkit-touch-callout: none!important;
    -webkit-user-select: none!important;
    -ms-user-select: none!important;
    .note-wrapper{
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
  .read_only{
    color: black;
  }
  .borderLeft{
    border-left: 2px solid black;
  }
  .borderRight{
    border-right: 2px solid black;
  }
  &.borderBottom{
    border-bottom: 2px solid black;
  }
  &.borderTop{
    border-top: 2px solid black;
  }
}
</style>