import React from 'react';
import '../../style/Main.css'
import {ReactiveControls, ReactiveFormControl, ReactiveFormGroup} from "../../core/models";
import {InputComponent} from "../input/Input.component";
import {BehaviorSubject} from "rxjs";

interface FormProps {
  formGroup: ReactiveFormGroup
  children?: any;
  baseClassname?: string;
}

const determineFormItem = (formItem: ReactiveFormControl, fromGroup: ReactiveFormGroup) => {
  switch (formItem.control) {
    case ReactiveControls.INPUT: {
      return <React.Fragment
          key={`[${formItem.formGroup}][${formItem.controlName}][${Math.random()}]`}
      >
        <InputComponent
            control={formItem}
            onFormValueChanges={(value) => fromGroup.onFormValueChanges.next({
              [formItem.controlName]: value
            })}
            onFormValidationChanges={(validation) => fromGroup.onFormValidationChanges.next({
              [formItem.controlName]: validation
            })}
        />
      </React.Fragment>
    }
    case ReactiveControls.SELECT: {
      return renderSelect(formItem)
    }
    case ReactiveControls.TEXT_AREA: {
      return renderTextArea(formItem)
    }
    case ReactiveControls.RADIO: {
      return renderRadio(formItem)
    }
    default: {
      return null
    }
  }
}

const renderSelect = (formItem: ReactiveFormControl) => {
  return formItem.controlName
}

const renderTextArea = (formItem: ReactiveFormControl) => {
  return formItem.controlName

}

const renderRadio = (formItem: ReactiveFormControl) => {
  return formItem.controlName

}

const onFormSubmit = (event: any, handler: BehaviorSubject<any>) => {
  event.preventDefault();
  handler.next(event)
}

export const FormComponent: React.FunctionComponent<FormProps> = (props: FormProps) => {
  return (
    <form
        className={`App-Form ${props.baseClassname || ''}`}
        title={props.formGroup.formGroupName}
        onSubmit={(event) => onFormSubmit(event, props.formGroup.onFormSubmit)}
    >
      {
        props.formGroup.controls.map(formItem => {
          return determineFormItem(formItem, props.formGroup);
        })
      }
    </form>
  )
}


