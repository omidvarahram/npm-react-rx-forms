import React from 'react';
import './Validation-message.component.scss'

interface ValidationMessageProps {
  valid: boolean,
  error: string;
}

export const ValidationMessageComponent: React.FunctionComponent<ValidationMessageProps>
  = (props: ValidationMessageProps ) => {
  return !props.valid && props.error ? (
    <div className="error-message">{props.error}</div>
  ) : null;
}
