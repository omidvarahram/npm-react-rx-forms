import React from 'react';
import './Form.component.scss'

interface FormProps {
  children: any;
  baseClassname: string;
}

export const FormComponent: React.FunctionComponent<FormProps> = (props: FormProps) => {
  return (
    <form className={`App-Form ${props.baseClassname}`}>
      {props.children}
    </form>
  )
}
