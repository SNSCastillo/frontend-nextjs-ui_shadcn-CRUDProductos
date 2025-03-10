import React from 'react'
import {getOneProduct} from '@/app/products/products.api'
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {buttonVariants} from '@/components/ui/button'
import Link from 'next/link';

// Para tipar
interface Props{
    params: {
        id: string,
    }
}

// Recibimos como parámetro un id
async function ProductDetailPage({params}: Props) {
    const product = await getOneProduct(params.id)    
    console.log(product);

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-between'>
                        Detalles del producto: {product.id}
                        <Link 
                            className={buttonVariants()}
                            href="/"
                        >
                            Go back
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <img src={product.image} alt=''
                        className='w-full h-64 object-cover'
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductDetailPage