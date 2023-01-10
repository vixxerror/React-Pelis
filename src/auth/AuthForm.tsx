import { userCredentials } from "./auth.models";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import "./style.css";
import { logo } from "../assets";

export default function AuthForm(props: authFormProps) {
	return (
		<Formik
			initialValues={props.model}
			onSubmit={props.onSubmit}
			validationSchema={Yup.object({
				email: Yup.string()
					.required("Este campo es requerido")
					.email("Inserta in Email valido"),
				password: Yup.string().required("Este campo es requerido"),
			})}>
			{(formikProps) => (
				<div className="auth_form_container">
					<div className="logo_head">
						<img src={logo} alt="logo" width={120} height={120} />
						<h2 className="logo_head_title">{props.title}</h2>
					</div>
					<Form>
						<TextField displayName="Email" field="email" />
						<TextField
							displayName="Contraseña"
							field="password"
							type="password"
						/>
						<div className="bottom_section">
							<Button
								className="bottom_login"
								disabled={formikProps.isSubmitting}
								type="submit">
								{props.button}
							</Button>
							<Link className="bottom_cancel" to="/">
								Cancelar
							</Link>
						</div>
					</Form>
				</div>
			)}
		</Formik>
	);
}

interface authFormProps {
	model: userCredentials;
	onSubmit(
		values: userCredentials,
		actions: FormikHelpers<userCredentials>
	): void;
	title: String;
	button: String;
}
