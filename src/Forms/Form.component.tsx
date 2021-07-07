import React from 'react';
import '../style/Main.css'

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
