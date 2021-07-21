import {BehaviorSubject} from "rxjs";

export interface ReactiveFormControl {
    controlName: string;
    control: 'input' | 'select' | 'textArea' | 'radio';
    controlType: ReactiveInputControlType;
    formGroup: string;
    label: string;
    required: boolean;
    autoComplete?: string;
    placeholder?: string;
    accessibleName?: string;
    defaultVale?: string | number;
    value?: string | number;
    valid?: boolean;
    validator?: ReactiveValidator
    controlValueChanges: BehaviorSubject<any>;
    controlValidationChanges: BehaviorSubject<{ valid: boolean, error: string }>;
    controlOnFocus: BehaviorSubject<any>;
    controlOnBlur: BehaviorSubject<any>;
}

export class FormControl {
    public controlValueChanges: BehaviorSubject<any> = new BehaviorSubject('');
    public controlValidationChanges: BehaviorSubject<{ valid: boolean, error: string }>
        = new BehaviorSubject<{ valid: boolean, error: string }>(
        {
            valid: false,
            error: ''
        }
    );
    public controlOnFocus: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public controlOnBlur: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public placeholder: string;
    public autoComplete: string;
    public accessibleName?: string;
    public defaultVale?: string | number;
    public value?: string | number;
    public valid?: boolean;

    constructor(
        public controlName: string,
        public control: 'input' | 'select' | 'textArea' | 'radio',
        public controlType: ReactiveInputControlType,
        public formGroup: string,
        public label: string,
        public required: boolean,
        public validator?: ReactiveValidator,
        placeholder?: string,
        autoComplete?: boolean,
        accessibleName?: string,
        defaultVale?: string | number,
        value?: string | number,
        valid?: boolean,
    ) {
        this.placeholder = placeholder || '';
        this.autoComplete = autoComplete ? 'on' : 'off'
        this.accessibleName = accessibleName || this.controlName;
        this.defaultVale = defaultVale;
        this.value = value;
        this.valid = valid || false;
    }
}

export interface ReactiveFormGroup {
    formGroupName: string;
    controls: ReactiveFormControl[],
    onFormValueChanges: BehaviorSubject<{ [key: string]: any }>
    onFormValidationChanges: BehaviorSubject<{ [key: string]: { valid: boolean, error: string } }>;
    onFormSubmit: BehaviorSubject<any>;
}

export class FormGroup {
    public onFormValueChanges: BehaviorSubject<{ [key: string]: any }> =
        new BehaviorSubject<{ [p: string]: any }>({});
    public onFormValidationChanges: BehaviorSubject<{
        [key: string]: { valid: boolean, error: string }
    }> = new BehaviorSubject<{
        [p: string]: { valid: boolean; error: string }
    }>({});
    public onFormSubmit: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(
        public formGroupName: string,
        public controls: ReactiveFormControl[],
    ) {
    }
}

export interface ReactiveValidator {
    type: ReactiveValidatorType
}

export type ReactiveValidatorType =
    'email'
    | 'numeric'
    | 'filled'
    | 'phone'
    | 'enum'
    | 'alpha-numeric'
    | 'no-symbols'
    | 'range'

export type ReactiveInputControlType = 'checkbox' | 'search' | 'email' | 'text' | 'password'

export enum ReactiveControls {
    INPUT = 'input',
    SELECT = 'select',
    TEXT_AREA = 'textArea',
    RADIO = 'radio'
}

export enum ReactiveInputs {
    CHECKBOX = 'checkbox',
    SEARCH = 'search',
    EMAIL = 'email',
    TEXT = 'text',
    PASSWORD = 'password'
}

export enum ReactiveValidators {
    EMAIL = 'email',
    NUMERIC = 'numeric',
    FILLED = 'filled',
    PHONE = 'phone',
    ENUM = 'enum',
    ALPHA_NUMERIC = 'alpha-numeric',
    NO_SYMBOLS = 'no-symbols',
    RANGE = 'range'
}