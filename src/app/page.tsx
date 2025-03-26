import Link from 'next/link'
import {Button, buttonVariants} from '@/components/ui/button'
import {getAllProducts} from '@/app/products/products.api'
import {ProductCard} from '@/components/product-card'

export const dynamic = "force-dynamic";

// Esto esta renderizado en el servidor
async function HomePage() {
  const productos = await getAllProducts();
  console.log(productos);
  
  return (
    <>
      <div className='flex justify-between'>
        <h1
          className='text-4xl font-bold'
          >
          NextNestApp
        </h1>
        <Link
          href="/products/new"
          className={buttonVariants()}
          >
          Crear producto
        </Link>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {
          productos.map(p => (
            // Como es un bucle el key va a ser de id
            <ProductCard product={p} key={p.id} />
          ))
        }
      </div>
    </>
  )
}

export default HomePage;
