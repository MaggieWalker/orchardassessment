import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_FOOD = 'GOT_FOOD'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
export const gotFood = food => ({type: GOT_FOOD, food})

/**
 * THUNK CREATORS
 */

export const fetchFood = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users')
      const foodData = response.data
      console.log('food response in store', response.data)
      const action = gotFood(foodData)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_FOOD:
      return action.food
    default:
      return state
  }
}
