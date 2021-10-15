import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SUPPORTED_FORMATS = ["image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 10000000;

export const NewImageValidator = yup.object().shape({
    image: yup.mixed()
        .required("Arquivo obrigatório")
        .test("image_size", "O arquivo deve ser menor que 10MB", value => value[0].size <= FILE_SIZE)
        .test("image_format", "Somente são aceitos arquivos PNG, JPEG e GIF", value => SUPPORTED_FORMATS.includes(value[0].type)),
    title: yup.string()
        .required("Título obrigatório")
        .min(2, "Mínimo de 2 caracteres")
        .max(20, "Máximo de 20 caracteres"),
    description: yup.string()
        .required("Descrição obrigatória")
        .max(65, "Máximo de 65 caracteres"),
});

export const NewImageValidatorResolver = yupResolver(NewImageValidator);