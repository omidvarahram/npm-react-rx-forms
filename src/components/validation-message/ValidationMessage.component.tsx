import React from "react";

export function ValidationMessageComponent(
    props: {
        valid: boolean,
        error: string
    }
): JSX.Element | null {
    return (!props.valid && !!props.error) ? (
        <i
            className="App-Form-Validation"
            role='contentinfo'
            title={props.error}
            aria-describedby={`Form error: ${props.error}`}
        >
            {'* '}{props.error}
        </i>
    ) : null
}