import React from 'react';
import './Form.component.scss'

interface FormProps {
  children: any;
  baseClassname: string;
}

const FormComponent: React.FunctionComponent<FormProps> = (props: FormProps) => {
  return (
    <form className={`App-Form ${props.baseClassname}`}>
      {props.children}
    </form>
  )
}

export default FormComponent
