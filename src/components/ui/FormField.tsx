import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import "./formField.css";

interface BaseProps {
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
}

type InputProps = BaseProps & { as?: "input" } & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & { as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = BaseProps & { as: "select"; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>;

type FormFieldProps = InputProps | TextareaProps | SelectProps;

/** Campo de formulario accesible: etiqueta, control y mensaje de error enlazados. */
const FormField = (props: FormFieldProps) => {
  const autoId = useId();
  const { label, error, hint, optional, ...rest } = props;
  const id = rest.id ?? autoId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const common = { id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, className: "field_control" };

  let control: ReactNode;
  if (rest.as === "textarea") {
    const { as: _as, ...attrs } = rest;
    control = <textarea {...attrs} {...common} />;
  } else if (rest.as === "select") {
    const { as: _as, children, ...attrs } = rest;
    control = (
      <select {...attrs} {...common}>
        {children}
      </select>
    );
  } else {
    const { as: _as, ...attrs } = rest;
    control = <input {...attrs} {...common} />;
  }

  return (
    <div className={`field ${error ? "field_error" : ""}`}>
      <label htmlFor={id} className="field_label">
        {label}
        {optional && <span className="field_optional">(opcional)</span>}
      </label>
      {control}
      {error ? (
        <span id={`${id}-error`} className="field_message" role="alert">
          {error}
        </span>
      ) : (
        hint && (
          <span id={`${id}-hint`} className="field_hint">
            {hint}
          </span>
        )
      )}
    </div>
  );
};

export default FormField;
