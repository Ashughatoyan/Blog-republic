const initialState = { user:null };

export function rootReducer(state = initialState, action){
  switch( action.type ){
    case 'registration':
      return { ...state, user: action.user }
    case 'sign in':
      return { ...state, user: action.user }
    case 'sign out':
      return { ...state, user: null }
    default: return state
  }
};