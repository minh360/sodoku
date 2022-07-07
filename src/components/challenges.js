function make_challenge (list_read_only){
    let list_challenge = []
    for( let row = 0; row < 9; row++){
        list_challenge.push([])
        for (let column = 0; column < 9; column++){
            list_challenge[row].push({num: 0,read_only: false, active: false,error: false,note: []})
        }
    }
    for (let element = 0; element < list_read_only.length; element++){
        const row_list = list_read_only[element].row
        for (let child_element = 0; child_element < list_read_only[element].value.length; child_element++){
            const col_list = list_read_only[element].value[child_element].column
            list_challenge[row_list][col_list].num = list_read_only[element].value[child_element].num
            list_challenge[row_list][col_list].read_only = true
            delete list_challenge[row_list][col_list].note
        }
    }
    return list_challenge
}
function make_answer (list_challenge,list_answer){
    let challenge =  make_challenge(read_only_1)
    for (let element = 0; element < list_answer.length; element++){
        const row_list = list_answer[element].row
        for (let child_element = 0; child_element < list_answer[element].value.length; child_element++){
            const col_list = list_answer[element].value[child_element].column
            challenge[row_list][col_list].num = list_answer[element].value[child_element].num
        }
    }
    return challenge
}
const read_only_1 = [
    {row: 0,value:[{column: 1,num: 7},{column: 2,num: 8},{column: 3,num: 5},{column: 4,num: 1},{column: 5,num: 4},{column: 6,num: 9},{column: 8,num: 2}]},
    {row: 1,value:[{column: 0,num: 5},{column: 1,num: 6},{column: 5,num: 9},{column: 6,num: 3}]},
    {row: 2,value:[{column: 4,num: 6},{column: 6,num: 1},{column: 7,num: 8}]},
    {row: 3,value:[{column: 1,num: 4},{column: 2,num: 5},{column: 6,num: 2}]},
    {row: 4,value:[{column: 0,num: 8},{column: 1,num: 3},{column: 2,num: 2},{column: 3,num: 7},{column: 4,num: 5},{column: 5,num: 1},{column: 6,num: 4}]},
    {row: 5,value:[{column: 3,num: 4},{column: 5,num: 2},{column: 8,num: 3}]},
    {row: 6,value:[{column: 0,num: 9},{column: 3,num: 2},{column: 6,num: 5}]},
    {row: 7,value:[{column: 3,num: 1},{column: 4,num: 3},{column: 5,num: 8},{column: 7,num: 4}]},
    {row: 8,value:[{column: 0,num: 6},{column: 2,num: 3},{column: 5,num: 5},{column: 6,num: 8}]}
]
const answer_1 = [
    {row: 0,value:[{column: 0,num: 3},{column: 7,num: 6}]},
    {row: 1,value:[{column: 2,num: 1},{column: 3,num: 8},{column: 4,num: 2},{column: 7,num: 7},{column: 8,num: 4}]},
    {row: 2,value:[{column: 0,num: 4},{column: 1,num: 2},{column: 2,num: 9},{column: 3,num: 3},{column: 5,num: 7},{column: 8,num: 5}]},
    {row: 3,value:[{column: 0,num: 7},{column: 3,num: 6},{column: 4,num: 9},{column: 5,num: 3},{column: 7,num: 1},{column: 8,num: 8}]},
    {row: 4,value:[{column: 7,num: 9},{column: 8,num: 6}]},
    {row: 5,value:[{column: 0,num: 1},{column: 1,num: 9},{column: 2,num: 6},{column: 4,num: 8},{column: 6,num: 7},{column: 7,num: 5}]},
    {row: 6,value:[{column: 1,num: 8},{column: 2,num: 4},{column: 4,num: 7},{column: 5,num: 6},{column: 7,num: 3},{column: 8,num: 1}]},
    {row: 7,value:[{column: 0,num: 2},{column: 1,num: 5},{column: 2,num: 7},{column: 6,num: 6},{column: 8,num: 9}]},
    {row: 8,value:[{column: 1,num: 1},{column: 3,num: 9},{column: 4,num: 4},{column: 7,num: 2},{column: 8,num: 7}]}
]
const read_only_2 = [
    {row: 0,value:[{column: 0,num: 4},{column: 1,num: 2},{column: 2,num: 7},{column: 3,num: 5},{column: 7,num: 1}]},
    {row: 1,value:[{column: 5,num: 6},{column: 6,num: 7}]},
    {row: 2,value:[{column: 0,num: 9},{column: 2,num: 6},{column: 3,num: 1},{column: 5,num: 3}]},
    {row: 3,value:[{column: 2,num: 2},{column: 3,num: 4}]},
    {row: 4,value:[{column: 0,num: 3},{column: 1,num: 6},{column: 6,num: 5},{column: 8,num: 7}]},
    {row: 5,value:[{column: 5,num: 5},{column: 7,num: 6},{column: 8,num: 2}]},
    {row: 6,value:[{column: 0,num: 6},{column: 2,num: 5},{column: 4,num: 2},{column: 5,num: 8},{column: 6,num: 4},{column: 7,num: 7},{column: 8,num: 1}]},
    {row: 7,value:[{column: 4,num: 9},{column: 5,num: 4},{column: 6,num: 3}]},
    {row: 8,value:[{column: 0,num: 8},{column: 1,num: 4},{column: 2,num: 3},{column: 4,num: 5},{column: 5,num: 1},{column: 7,num: 9},{column: 8,num: 6}]}
]
const answer_2 = [
    {row: 0,value:[{column: 4,num: 8},{column: 5,num: 9},{column: 6,num: 6},{column: 8,num: 3}]},
    {row: 1,value:[{column: 0,num: 1},{column: 1,num: 3},{column: 2,num: 8},{column: 3,num: 2},{column: 4,num: 4},{column: 7,num: 5},{column: 8,num: 9}]},
    {row: 2,value:[{column: 1,num: 5},{column: 4,num: 7},{column: 6,num: 8},{column: 7,num: 2},{column: 8,num: 4}]},
    {row: 3,value:[{column: 0,num: 5},{column: 1,num: 1},{column: 4,num: 6},{column: 5,num: 7},{column: 6,num: 9},{column: 7,num: 3},{column: 8,num: 8}]},
    {row: 4,value:[{column: 2,num: 9},{column: 3,num: 8},{column: 4,num: 1},{column: 5,num: 2},{column: 7,num: 4}]},
    {row: 5,value:[{column: 0,num: 7},{column: 1,num: 8},{column: 2,num: 4},{column: 3,num: 9},{column: 4,num: 3},{column: 6,num: 1}]},
    {row: 6,value:[{column: 1,num: 9},{column: 3,num: 3}]},
    {row: 7,value:[{column: 0,num: 2},{column: 1,num: 7},{column: 2,num: 1},{column: 3,num: 6},{column: 7,num: 8},{column: 8,num: 5}]},
    {row: 8,value:[{column: 3,num: 7},{column: 6,num: 2}]}
]
const read_only_3 = [
    {row: 0,value:[{column: 2,num: 2},{column: 4,num: 8},{column: 6,num: 5}]},
    {row: 1,value:[{column: 0,num: 8},{column: 2,num: 1},{column: 3,num: 2},{column: 4,num: 5},{column: 5,num: 7},{column: 7,num: 4},{column: 8,num: 9}]},
    {row: 2,value:[{column: 1,num: 4},{column: 5,num: 3},{column: 6,num: 8},{column: 7,num: 2},{column: 8,num: 7}]},
    {row: 3,value:[{column: 1,num: 8},{column: 2,num: 4},{column: 3,num: 1},{column: 4,num: 9},{column: 8,num: 3}]},
    {row: 4,value:[{column: 0,num: 3},{column: 3,num: 7},{column: 5,num: 5},{column: 6,num: 2}]},
    {row: 5,value:[{column: 0,num: 1},{column: 2,num: 7},{column: 4,num: 3},{column: 5,num: 2}]},
    {row: 6,value:[{column: 4,num: 7},{column: 5,num: 8}]},
    {row: 7,value:[{column: 1,num: 6},{column: 5,num: 9},{column: 6,num: 1}]},
    {row: 8,value:[{column: 1,num: 2},{column: 2,num: 8},{column: 3,num: 5},{column: 7,num: 7},{column: 8,num: 4}]}
]
const answer_3 = [
    {row: 0,value:[{column: 0,num: 6},{column: 1,num: 7},{column: 3,num: 9},{column: 5,num: 4},{column: 7,num: 3},{column: 8,num: 1}]},
    {row: 1,value:[{column: 1,num: 3},{column: 6,num: 6}]},
    {row: 2,value:[{column: 0,num: 5},{column: 2,num: 9},{column: 3,num: 6},{column: 4,num: 1}]},
    {row: 3,value:[{column: 0,num: 2},{column: 5,num: 6},{column: 6,num: 7},{column: 7,num: 5}]},
    {row: 4,value:[{column: 1,num: 9},{column: 2,num: 6},{column: 4,num: 4},{column: 7,num: 1},{column: 8,num: 8}]},
    {row: 5,value:[{column: 1,num: 5},{column: 3,num: 8},{column: 6,num: 4},{column: 7,num: 9},{column: 8,num: 6}]},
    {row: 6,value:[{column: 0,num: 4},{column: 1,num: 1},{column: 2,num: 5},{column: 3,num: 3},{column: 6,num: 9},{column: 7,num: 6},{column: 8,num: 2}]},
    {row: 7,value:[{column: 0,num: 7},{column: 2,num: 3},{column: 3,num: 4},{column: 4,num: 2},{column: 7,num: 8},{column: 8,num: 5}]},
    {row: 8,value:[{column: 0,num: 9},{column: 4,num: 6},{column: 5,num: 1},{column: 6,num: 3}]}
]
export const challenge_1 = make_challenge(read_only_1)
export const challenge_2 = make_challenge(read_only_2)
export const challenge_3 = make_challenge(read_only_3)
export const answer_challenge_1 = make_answer(challenge_1,answer_1)
export const answer_challenge_2 = make_answer(challenge_2,answer_2)
export const answer_challenge_3 = make_answer(challenge_3,answer_3)


