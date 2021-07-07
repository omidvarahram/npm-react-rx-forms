import React from 'react';
import {FormItemProps} from "../form.model";
import {InputComponent} from "../Input/Input.component";
import {SelectComponent} from "../Select/Select.component";

export const FormItemComponent: React.FunctionComponent<FormItemProps> = (props: FormItemProps) => {
  switch (props.formItemType) {
    case 'input' : {
      return (
        <InputComponent
          label={`${props.label} :`}
          type={props.type}
          formGroupName={props.formGroupName}
          controlName={props.controlName}
          placeHolder={props.placeHolder}
          required={props.required}
          validatorType={props.validatorType}
          handler={props.handler}
          valid={props.valid}
          error={props.error}
        />
      )
    }

    case 'select': {
      return (
        <SelectComponent
          label={`${props.label} :`}
          required={props.required}
          formGroupName='address'
          controlName={props.controlName}
          handler={props.handler}
          options={props.options || []}
          valid={props.valid}
          error={props.error}
        />
      )
    }

    default: {
      return null
    }
  }
}
