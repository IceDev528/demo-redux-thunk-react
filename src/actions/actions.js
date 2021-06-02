import * as types from './actionTypes'

export const setItems = (data) => ({
  type: types.SET_ITEMS,
  data,
})

export const updateItems = (data) => ({
  type: types.UPDATE_ITEMS,
  data,
})

export const updateTimer = (data) => ({
  type: types.UPDATE_TIMER,
  data,
})