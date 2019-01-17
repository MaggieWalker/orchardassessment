import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_FOOD = 'GOT_FOOD'

/**
 * INITIAL STATE
 */
const defaultState = {
  food: []
}

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
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GOT_FOOD:
      return {...state, food: action.food}
    default:
      return state
  }
}

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)
export default store
