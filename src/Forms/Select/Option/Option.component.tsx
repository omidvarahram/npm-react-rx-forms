import React from 'react';
import {OptionProps} from "../../form.model";

export const OptionComponent: React.FunctionComponent<OptionProps> =
  (props: OptionProps) => {
    return (
      <option
        key={`${Math.random()}`}
        value={props.value}
      >
        {props.label}
      </option>
    )
  }
