"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {useForm} from 'react-hook-form';
import {createProducts, updateProduct} from '../products.api';
import React from 'react'

// Si todo sale bien en el ingreso de un nuevo producto,
// se redirecciona al usuario
import { useRouter, useParams } from 'next/navigation';


// Puede ser importante tener el componente de la siguiente manera
export default function ProductForm({product}: any) {
    console.log(product);
    // Me trae un método register, handllSumit
    const { register, handleSubmit } = useForm({
        defaultValues:{
            name: product?.name,
            description: product?.description,
            price: product?.price,
            image: product?.image
        }
    })

    const router = useRouter();
    const params = useParams<{id: string}>(); // Obtiene el id que es params para saber cuándo se está editando y cuándo se está registrando

    const onSubmit = handleSubmit(async data => {
        console.log(data);
        if(params?.id){
            // Si existe el params significa que quieren editar,
            // entonces hacemos una petición hacia el Backend
            await updateProduct(params.id, {
                ...data,
                price: parseFloat(data.price)
            })
        }else{
            // Ejecuta la función que se importa "createProducts()"
            // Antes que envíe los datos "data" voy a ahcer que haga una copia,
            // pero para el precio vamos a convertirlo en Float
            await createProducts({
                ...data,
                price: parseFloat(data.price),
            });
        }

        // Después d eque termine de crear se redirige
        router.push('/');
        // Hacemos un refresh para que se actualice los datos donde se redirige
        router.refresh();
    })
  return (
    // Cuando el formulario envía algo va a ejecutar ese handleSubmit
    <form onSubmit={onSubmit}>
        <Label>
            Nombre del producto
        </Label>
        <Input
            {...register('name')}
        />

        <Label>
            Descripción del producto
        </Label>
        <Input 
            {...register('description')}
        />

        <Label>
            Precio
        </Label>
        <Input 
            {...register('price')}
        />

        <Label>
            Imagen
        </Label>
        <Input 
            {...register('image')}
        />

        <Button>
            {/*Como se está reutilizando el form tenemos que condicionar lo que aparece en el botón*/}
            {
                params.id ? "Actualizar": "Registrar"
            }
        </Button>
    </form>
  )
}
