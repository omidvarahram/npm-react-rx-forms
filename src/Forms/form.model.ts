import { ChangeEvent } from 'react';
import { BehaviorSubject } from 'rxjs';

type FormElementType = 'input' | 'select' | 'button'
type InputTypes = 'checkbox' | 'search' | 'email' | 'text'
type buttonTypes = 'submit' | 'button'
type validatorTypes = 'email' | 'numeric' | 'filled' | 'phone' | 'enum' | 'alpha-numeric' | 'no-symbols' | 'range'

export interface FormElementProps {
  controlName: string;
  formElementType: FormElementType;
  formElementInputType: InputTypes | buttonTypes;
  formGroupName: string;
  label?: string;
  required: boolean;
  validator: FormValidatorModel;
  placeholder?: string;
  defaultValue?: string | number;
  initialValue?: string | number;
  handler: (event: any, item: FormElementProps) => any;
  options?: {
    label: string;
    value: any;
    selected?: true;
  }[];
  valid?: boolean;
  value: any;
  error: string;
}

export interface InputProps {
  formGroupName: string;
  controlName: string;
  type: InputTypes | buttonTypes;
  defaultValue?: string | number | boolean;
  value?: any;
  required: boolean;
  label: string;
  validatorType: FormValidatorModel;
  valid?: boolean;
  error?: string;
  placeHolder?: string;
  handler: BehaviorSubject<UserInteractionHandler | undefined>;
}


export interface SelectProps {
  formGroupName: string;
  controlName: string;
  defaultValue?: string | number | boolean;
  value?: any;
  required: boolean;
  label: string;
  valid?: boolean;
  error?: string;
  options: OptionProps[];
  handler: BehaviorSubject<UserInteractionHandler | undefined>;
}

export interface FormItemProps {
  formGroupName: string;
  controlName: string;
  formItemType: FormElementType;
  type: InputTypes | buttonTypes;
  defaultValue?: string | number | boolean;
  value?: any;
  required: boolean;
  label: string;
  validatorType: FormValidatorModel;
  valid?: boolean;
  error?: string;
  placeHolder?: string;
  options?: OptionProps[];
  handler: BehaviorSubject<UserInteractionHandler | undefined>;
}

export interface OptionProps {
  value: string;
  selected?: true;
  label: string;
}

export interface UserInteractionHandler {
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement>;
  controlName: string;
  formGroupName: string;
}

export interface FormDataModel {
  controlName: string;
  formElementType: FormElementType;
  formElementInputType: InputTypes | buttonTypes;
  formGroupName: string;
  label?: string;
  defaultValue?: string;
  required: boolean;
  validator: FormValidatorModel;
  placeholder?: string;
  options?: {
    label: string;
    value: any;
  }[];
}

export interface FormValidatorModel {
  type: validatorTypes;
  minRange?: number[];
  maxRange?: number[];
  enum?: string[];
  custom?: RegExp[]
  minLength?: number;
  maxLength?: number;
}
