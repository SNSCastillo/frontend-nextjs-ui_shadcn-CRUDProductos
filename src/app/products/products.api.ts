// variables de entorno 
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


// Recibe un dato de un producto
// Esto se llama desde el formulario, lado cliente
export async function createProducts (productData: any){
    const res = await fetch(`${BACKEND_URL}/api/products`, {
        // Esto va a rebir parámetros
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(productData)
    })

    // Ese response lo voy a convertir a datos
    const data = await res.json();
    console.log(data);
}


// Esta función es para obtener productos
// Lo va a usar la página que necesita listarlos
export async function getAllProducts(){
    // Esto va a recibir datos
    const data = await fetch(`${BACKEND_URL}/api/products`,{
        // Para que no se guarde en memoria caché
        cache: "no-store",
    })
    // Retornamos esos datos
    return await data.json();
}

// Esta función es para obtener los detalles de un producto
// Se va a usar en al dar click en ver más detalles de un producto
export async function getOneProduct(id: string){
    // Esto va a recibir datos
    const data = await fetch(`${BACKEND_URL}/api/products/${id}`,{
    })
    // Retornamos esos datos
    return await data.json();
}


// Petición para eliminar
export async function removeProduct(id: string){
    const res = await fetch(`${BACKEND_URL}/api/products/${id}`,{
        method: 'DELETE',
    })
    return res.json();
}

// Petición para actualizar
export async function updateProduct(id: string, newProduct: any){
    const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        // Los nuevos datos es el que se va a enviar
        body: JSON.stringify(newProduct),
        cache: 'no-store',
    });
    return await res.json();
}