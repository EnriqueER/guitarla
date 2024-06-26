//import { useEffect, useState } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
//import { db } from './data/db'
import useCart from './hooks/useCart.js'
//import './App.css'

function App() {

  const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart()
  /*
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
  }*/

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
              {/* Map siempre nos devuelve un nuevo arreglo */}
              {data.map((guitar) => (
                <Guitar
                  key={guitar.id}
                  guitar={guitar} // este es el prop que pasamos al componente guitarra
                  //cart={cart} Podemos omitir pasar el cart por que setCart ya esta asociada con el state de cart
                  //setCart={setCart}
                  addToCart={addToCart}
                />
              ))}
            </div>
        </main>

      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
