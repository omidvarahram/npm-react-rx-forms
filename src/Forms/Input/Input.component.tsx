import React from 'react';
import {InputProps} from "../form.model";

export const InputComponent: React.FunctionComponent<InputProps> = (props: InputProps) => {
  return (
    <div className="App-Form__input"
      key={`input___${props.controlName}`}
    >
      <label>{`${props.required ? '* ': ''}${props.label}`}</label>
      <input
        className={!props.valid && props.error ? 'invalid' : ''}
        type={props.type}
        required={props.required}
        placeholder={props.placeHolder}
        onChange={(event) => props.handler.next({
          event,
          controlName: props.controlName,
          formGroupName: props.formGroupName
        })}
      />
    </div>
  )
}
