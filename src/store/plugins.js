/**
 * 1、自动化恢复session中的数据到store，
 * 2、自动同步vuex中的数据到session
 * @param {*} store
 */

const sessionStoragePlugin = store => {
  // 自动化恢复session中的数据到store
  const sessionState = {}
  Object.keys(window.sessionStorage).forEach(sessionName => {
    const obj = {}
    obj[sessionName] = JSON.parse(window.sessionStorage.getItem(sessionName))
    Object.assign(sessionState, obj)
  })
  store.replaceState(Object.assign({}, store.state, sessionState))

  // 自动同步vuex中的数据到session
  store.subscribe((mutation, state) => {

    Object.keys(state).forEach((stateName, index) => {
      window.sessionStorage.setItem(
        stateName,
        JSON.stringify(state[stateName])
      )
    })

  })
}

export default [sessionStoragePlugin]
