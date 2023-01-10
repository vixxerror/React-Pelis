import { Field } from "formik";
import "./styles.css";

export default function CheckboxField(props: checkboxField) {
	return (
		<div className="mb-3 form-check">
			<Field
				className="form-check-input"
				id={props.field}
				name={props.field}
				type="checkbox"
			/>
			<label htmlFor={props.field} className="label_form_white">
				{props.displayName}
			</label>
		</div>
	);
}

interface checkboxField {
	displayName: string;
	field: string;
}
