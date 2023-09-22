import { FormlyFieldConfig } from "@ngx-formly/core";

export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Debe tener al menos ${field.props?.minLength} carácteres`;
}

export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Debe tener menos de ${field.props?.maxLength} carácteres`;
}

export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Debe ser mayor a ${field.props?.min}`;
}

export function maxValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Debe ser menor a ${field.props?.max}`;
}
