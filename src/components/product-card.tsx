"use client";

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';

import {removeProduct} from '@/app/products/products.api'
import {useRouter} from 'next/navigation'


// Va a recibir un product
export function ProductCard({product}: any) {
    const router = useRouter();

    async function handleRemove(id:any){
        console.log(id);
        await removeProduct(id);
        router.refresh();
    }
  return (
    <Card onClick={() => {
        router.push(`/products/${product.id}`)
    }}>
        {/*Voy a convertir todo el Card para el lado cliente*/}
        {/*Cada vez que demos un click a Card vamos a cambiar de página*/}
        <CardHeader >
        <CardTitle className='flex justify-between'>
            {product.name}
            <span className='text-sm font-bold text-gray-500'>
            ${product.price}
            </span>
        </CardTitle>
        </CardHeader>
        <img src={product.image} alt="" />
        <CardContent>
        <p>
            {product.description}
        </p>
        </CardContent>
        <CardFooter className='flex justify-between'>
        
        <Button className='mt-5'
            onClick={(e) => {
                // Para que no ejecute el click del Card
                e.stopPropagation()
                // Y ahora sí, se debe enviarse al product id/edit
                router.push(`/products/${product.id}/edit`)
            }}
        >
            Editar
        </Button>
        {/*Esta propiedad que trae chadcn es para que aparezca en rojo el botón*/}
        {/*Al hacet un click a este botón podemos empezar a hacer peticiones en el backend*/}
        <Button className='mt-5' variant="destructive"
            onClick={(e) => {
                e.stopPropagation();
                handleRemove(product.id)
            }
            }
        >
            Eliminar
        </Button>
        </CardFooter>
    </Card>
  )
}