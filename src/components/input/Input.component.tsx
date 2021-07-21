import React, {useState} from "react";
import {ReactiveFormControl, ReactiveInputs} from "../../core/models";
import {ValidationMessageComponent} from "../validation-message/ValidationMessage.component";

export interface InputProps {
    control: ReactiveFormControl;
    onFormValueChanges: (value: any) => any;
    onFormValidationChanges: (validation: { valid: boolean, error: string }) => any;
}

export const InputComponent: React.FunctionComponent<InputProps> = (props: InputProps) => {
    const [focusState, setFocusState] = useState(false);
    const [validationState, setValidationState] = useState({
        valid: false,
        error: ''
    });
    let isInputTouched = false;

    function getInputClassName(prefix: string) {
        const validationClassName = !validationState.valid && validationState.error ? ' invalid' : ''
        const focusClassName = !focusState ? '' : ' focused'
        return prefix + validationClassName + focusClassName
    }

    function getUserInputValidation(value: any): { valid: boolean, error: string } {
        const validation = {
            valid: false,
            error: ''
        }

        if (isInputTouched) {
            if (props.control.validator) {
                validation.valid = value.length > 4;
                validation.error = value.length > 4 ? '' : `${props.control.controlName} should be at least 5 characters`
            } else {
                validation.valid = props.control.required ?
                    !!value?.length : true;
                validation.error = props.control.required ?
                    !value?.length ?
                        'This field is required!' : '' : ''
            }
        }

        return validation
    }

    function onBlur(event: any) {
        const validation = getUserInputValidation(event.target.value);
        props.onFormValidationChanges(validation);
        props.control.controlValidationChanges.next(validation);
        setValidationState(validation);
    }
    function onChange(event: any) {
        const validation = getUserInputValidation(event.target.value);
        props.onFormValueChanges(event.target.value);
        props.control.controlValueChanges.next(event.target.value);

        if (
            (!validationState.valid && !!validationState.error)
            || (!validation.valid && validationState.valid)
            || (validation.valid && !validationState.valid)
        ) {
            props.onFormValidationChanges(validation);
            props.control.controlValidationChanges.next(validation);
            setValidationState(validation);
        }
    }

    if (props.control.controlType === ReactiveInputs.CHECKBOX) {
        return <div/>
    } else {
        return (
            <React.Fragment>

                <div className={getInputClassName('App-Form-Input')}>
                    {
                        focusState ? (
                            <label
                                className='top'
                                htmlFor={props.control.controlName}>
                                <span>{props.control.label}</span>
                                <span>{props.control.required && <sup>*</sup>}</span>


                            </label>
                        ) : (
                            <label htmlFor={props.control.controlName}>
                                <span>{props.control.label}</span>
                                <span>{props.control.required && <sup>*</sup>}</span>
                            </label>
                        )
                    }
                    <input
                        autoComplete={props.control.autoComplete}
                        name={props.control.controlName}
                        type={props.control.controlType}
                        required={props.control.required || false}
                        placeholder={props.control.placeholder || ''}
                        title={props.control.controlName}
                        aria-placeholder={props.control.placeholder || ''}
                        aria-describedby={props.control.accessibleName}
                        onFocus={(event) => {
                            setFocusState(true);
                            props.control.controlOnFocus.next(event);
                        }}
                        onBlur={(event) => {
                            isInputTouched = true;
                            setFocusState(false);
                            props.control.controlOnBlur.next(event)
                            onBlur(event)
                        }}
                        onChange={(event) => {
                            isInputTouched = true;
                            onChange(event)
                        }}
                    />
                </div>
                {
                    (props.control.required || props.control.validator) &&
                    <ValidationMessageComponent {...validationState}/>
                }
            </React.Fragment>
        )
    }
}