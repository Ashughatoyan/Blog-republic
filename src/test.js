import React from 'react'
import {connect} from 'react-redux'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(){
    console.log({state:this.state, props:this.props})
  }

  render() {
    return (
        <>
            <h1>from props {this.props.value}</h1>
            <button onClick={() => { this.props.dispatch({type: 'increment'}) } } >increment</button>
            <button onClick={()=>{this.props.dispatch({type:'decrement'})}}>Decrement</button>
        </>
    )
  }
}

const mapStateToProps = state => ({
  value: state.value
})

export default connect(mapStateToProps)(PostForm);

/*
createStore(reducer), combineReducer from redux
Provider, connect from react-redux

connect is highe order component - connect(mapStateToProps, mapDispatchToProps)(component)
mapStateToProps - get state as argument and what it returns component get as props
  it can be object or function thet return obj

reducer - function(state = initialState, action){ switch(action.type ) default: return state  }

*/