import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from '../forms/TextField';
import DateField from '../forms/DateField';
import ImageField from '../forms/ImageField';
import MarkdownField from '../forms/MarkdownField';
import Button from '../utils/Button';
import {actorCreationDTO} from './actors.model'
import * as Yup from 'yup';


export default function ActorForm(props: actorFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('Este campo es requerido').firstLetterUppercase(),
                dateOfBirth: Yup.date().nullable().required('Este campo es requerido')
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName="Nombre" field="name" />
                    <DateField displayName="Fecha de Nacimiento" field="dateOfBirth" />
                    <ImageField displayName="Imagen" field="picture" 
                    imageURL={props.model.pictureURL} />
                    <MarkdownField displayName="Biografia" field="biography" />

                    <Button disabled={formikProps.isSubmitting}
                        type="submit"
                    >Guardar Cambios</Button>
                    <Link to="/actors" className="btn btn-secondary">Cancelar</Link>
                </Form>
            )}
        </Formik>
    )
}

interface actorFormProps {
    model: actorCreationDTO;
    onSubmit(values: actorCreationDTO, action: FormikHelpers<actorCreationDTO>): void;
}