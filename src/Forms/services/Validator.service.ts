import {ChangeEvent} from 'react';
import {FormDataModel, FormValidatorModel} from "../form.model";

const patterns: { [key: string]: RegExp } = {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    numeric: /^\d+$/
}

const errors = {
    required: 'Field is required',
    email: 'Email should be this format: example@example.com',
    phone: 'Phone number format is wrong',
    numeric: 'Should be a valid number'
}

export function validateForm(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    controlName: string,
    state: any,
    setState: (...args: any) => void,
    formData: FormDataModel[]
) {
    const formGroup = state.formGroup;
    const required = formData.find(item => item.controlName === controlName)?.required

    for (const item of formGroup) {
        if (item.controlName === controlName) {
            const validator = formData.find(validator => validator.controlName === controlName)?.validator;
            if (validator?.type) {
                const validation = ValidatorService(validator, event.target.value);

                item.valid = validation.valid;
                item.error = validation.error;

                if (!required && !event.target.value) {
                    item.valid = true;
                    item.error = ''
                }
            }
        }
    }

    setState({formGroup});
}


export const ValidatorService = (validator: FormValidatorModel, value: string): { valid: boolean, error: string } => {
    let valid = false;
    let error = ''
    switch (validator.type) {
        case 'email': {
            valid = patterns.email.test(value);
            error = valid ? '' : errors.email
            break;
        }

        case 'phone': {
            valid = patterns.phone.test(value);
            error = valid ? '' : errors.phone
            break;
        }

        case 'numeric': {
            valid = !!value && patterns.numeric.test(value);
            error = !value ? errors.required :
                !patterns.numeric.test(value) ? errors.numeric : ''
            break;
        }

        case 'range': {
            if (validator.minRange && validator.maxRange && value.length) {
                const rangMin = validator.minRange
                    .join()
                    .replace(',', '');
                const rangMax = validator.maxRange
                    .join()
                    .replace(',', '');

                if (
                    patterns.numeric.test(value) &&
                    parseFloat(value) &&
                    parseFloat(rangMin) &&
                    parseFloat(rangMax)
                ) {
                    if (
                        parseFloat(value) <= parseFloat(rangMax) &&
                        parseFloat(value) >= parseFloat(rangMin)
                    ) {
                        valid = true;
                        error = ''
                    } else {
                        valid = false;
                        error = `Should be between ${rangMin} - ${rangMax}`
                    }
                } else {
                    valid = false;
                    error = errors.numeric
                }
            } else {
                valid = false;
                error = errors.required
            }

            break;
        }

        default: {
            valid = !!value.length;
            error = !!value.length ? '' : errors.required
        }
    }

    return {valid, error}
}
