import React from 'react'

export default function Duck(props) {
  return (
    <div className="duck-card">
      <h3>🦆 {props.duck.nickName}</h3>
      <p>Age: {props.duck.age}</p>
      <p>Weight: {props.duck.weight}</p>
      {props.duck.pondId != null 
        ? <p>Pond Id: {props.duck.pondId}</p> 
        : <p>Pond Id: unassigned</p>}
    </div>
  )
}
