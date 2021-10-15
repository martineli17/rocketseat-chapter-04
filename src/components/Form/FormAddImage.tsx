import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import { NewImageValidatorResolver } from '../../validators/formNewImageValidator';

interface FormAddImageProps {
  closeModal: () => void;
}

interface FormFields {
  title: string;
  description: string;
  image: any;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: FormFields): Promise<boolean> => {
    const newData = { title: data.title, description: data.description, url: imageUrl };
    const response = await api.post('/api/images', newData);
    return response.status === 201;
  },
    {
      onSuccess() {
        queryClient.invalidateQueries();
      }
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm({ resolver: NewImageValidatorResolver });
  const { errors } = formState;

  const onSubmit = async (data: FormFields): Promise<void> => {
    try {
      if (!!imageUrl) {
        await mutation.mutateAsync(data);
        toast({
          title: "Imagem cadastrada",
          description: "Sua imagem foi cadastrada com sucesso.",
          status: "success",
        })
      }
      else{
        toast({
          title: "Imagem não adicionada",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
          status: "warning",
        })
      }
    } catch {
      toast({
        title: "Falha no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        status: "error",
      })
    } finally {
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register("image")}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register("title")}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          error={errors.description}
          {...register("description")}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
