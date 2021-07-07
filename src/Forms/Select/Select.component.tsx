import React, { useState } from 'react';
import { OptionComponent } from './Option/Option.component';
import {SelectProps} from "../form.model";

export const SelectComponent: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
  const [selected, select] = useState('');
  return (
    <div className="App-Form__select">
      <label>{`${props.required ? '* ': ''}${props.label}`}</label>
      <select
        key={`select___${props.controlName}`}
        className={!props.valid && props.error ? 'invalid' : ''}
        required={props.required}
        value={selected}
        onChange={(event) => {
          props.handler.next(
            {
              event,
              controlName: props.controlName,
              formGroupName: props.formGroupName
            }
          );

          select(event.target.value);
        }}
      >
        {
          props.options.map(option => {
            return (
              <OptionComponent
                key={`option___${option.label}`}
                value={option.value}
                label={option.label}
                selected={option.value === selected || undefined}
              />

            )
          })
        }
      </select>
    </div>
  )
}


