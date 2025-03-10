import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import ProductForm from '@/app/products/new/product-form'
import { getOneProduct } from '../products.api'

interface Props {
    // Es de tipo Id
    params: {
        id: string
    }
}

// Como vamos a reutilizar esto para editar los datos de un producto, entonces le pasaos un parámetro
async function ProductsNewPage({params}: Props) {
    // Obtenemos un producto con el id
    // Esto está bien porque estamos para el lado servidor

    const product = await getOneProduct(params.id);
    console.log(product);

  return (
    // Como ProductsNewPage es una página
    // Y si no quiero que toda la página del lado del cliente
    // Lo unico que se va a convertir a lado cliente es el Formulario que contiene la lógica de recibir los datos del usuario
    <div className='h-screen flex justify-center items-center'>
        <Card>
            <CardHeader>
                <CardTitle>
                    {
                        params.id ? "Editar registro" : "Crear registro"
                    }
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/*esto no solo cargará la interfaz, sino que cuando la página reciba el dato, se lo da al form*/}
                <ProductForm product={product} />
            </CardContent>
        </Card>
    </div>
  )
}

export default ProductsNewPage