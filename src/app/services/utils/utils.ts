import { FormArray, FormControl, FormGroup } from '@angular/forms';



export const isBlank = (value: any): boolean => {
	return isNil(value) || (isObject(value) && Object.keys(value).length === 0) || value.toString().trim() === '';
};
export const isNil = (value: any): value is null | undefined => {
	return value === null || value === 'null' || value === 'undefined' || typeof value === 'undefined';
};

export const isObject = (value: any): boolean => {
	return value && value.constructor === Object;
};






export const validateAllFormFields = (formGroup: any): void => {
	// This code also works in IE 11
	Object.keys(formGroup.controls).forEach((field) => {
		const control = formGroup.get(field);
		if (control instanceof FormControl) {
			const value: any = control.value;
			const errors: any = control.errors;
			if (value != undefined && typeof value === 'string') {
				control.setValue(value.replace(/ +/g, ' '));
			}
			control.markAsDirty();
			control.markAsTouched();
			if (isObject(errors)) {
				control.setErrors({ ...errors });
			}
		} else if (control instanceof FormGroup) {
			validateAllFormFields(control);
		} else if (control instanceof FormArray) {
			validateAllFormFields(control);
		}
	});
};


