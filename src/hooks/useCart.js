import { useEffect, useState, useMemo } from 'react'
import { db } from '../data/db'

const useCart = () => {

    //state - Como es archivo local podemos poner lo que hay en el archivo - por ejemplo - useState(db)
    const initialCart = () => { // Buscamos si el carrito tiene algo almacenado localmente
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(initialCart); // Originalmente tenia un [] pero ya se configuro el local storage

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    // Si consultamos los datos desde una api lo usamos asi
    useEffect(() => {
        setData(db)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
    // Con esta funcion creada si podemos controlar lo que pasa en el carrito
    function addToCart(item){

        // Debemos tener cuidado con no mutar el arreglo original, usaremos metodos que no muten el arreglo
        // la pagina que dice que metodo no muta el arreglo es doesitmutate
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id) //Buscamos elementos duplicados por id

        if(itemExist >= 0){
        if(cart[itemExist].quantity >= MAX_ITEMS) return
        const updateCart = [...cart] // Creamos una copia del satate para no modificar el original
        updateCart[itemExist].quantity++ // Actualizams la cantidad del producto en el carrito
        setCart(updateCart) // enviamos el nuevo carrito
        }else{
        item.quantity = 1
        setCart([...cart, item])
        // Forma opcional
        // setCart(prevCart => [...prevCart, item])
        }

    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity < MAX_ITEMS){ // Si encontramos el id lo incrementamos en 1 porque se esta agregando nuevas cantidades
            return{
            ...item,
            quantity: item.quantity + 1
            }
        }
        return item // Si no devolvemos esto, los demas item el arreglo se van a perder, por eso debemos retornar los que no incrementan cantidades
        })
        
        setCart(updatedCart) // Pasamos los datos nuevos actualizados
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity > MIN_ITEMS){
            return{
            ...item,
            quantity: item.quantity - 1
            }
        }
        return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    //State derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart]); //Tratamos de mantener la logica fuera del template
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [cart] )// reduce ocupa dos parametros

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }

}

export default useCart