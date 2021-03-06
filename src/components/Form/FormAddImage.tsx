import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: (files: File[]) =>
          files[0].size / 1024 / 1024 <= 10 ||
          'O arquivo deve ser menor que 10MB',
        acceptedFormats: (files: File[]) => {
          const regex = /image\/(jpg|png|gif)/g;
          const { type } = files[0];
          if (regex.exec(type)) return true;

          return 'Somente são aceitos arquivos PNG, JPEG e GIF';
        },
      },
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
    },
    title: {
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres',
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres',
      },
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 20,
        message: 'Máximo de 65 caracteres',
      },
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => api.post('api/images', data),
    // TODO MUTATION API POST REQUEST,
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('images', {
          refetchActive: true,
        });
      },
      // TODO ONSUCCESS MUTATION
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
          duration: 3000,
        });
        throw new Error('add image');
      } else {
        await mutation.mutateAsync({ ...data, url: imageUrl });
        toast({
          title: 'Imagem cadastrada',
          description: 'Sua imagem foi cadastrada com sucesso.',
          status: 'success',
          duration: 3000,
        });
      }
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error',
        duration: 3000,
      });
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
          {...register('image', { ...formValidations.image })}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', { ...formValidations.title })}
          error={errors.title}
        />
        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', { ...formValidations.description })}
          error={errors.description}
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
