function Guitar({guitar, addToCart/*cart, Removemos el cart porque set cart ya conoce el state*/ /*setCart removemos esto porque no tenemos control sobre objetos duplicados*/}) {

    const {id, name, image, description, price} = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    // Debemos declarar el onClic con un arrow function para que no se llame sola
                    // Crea una copia del arreglo de cart y le agrega el nuevo elemento de esta forma mantenemos los datos anteriores
                    //onClick={() => setCart([...cart, guitar])} //Le pasamos todo el objeto de la guitarra
                    //Segunda forma, como setCart ya conoce el state previo, no es necesario pasara cart, lo hacemos arrow function y nombramos los valores anteriores del carrito con un prev
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )

}

export default Guitar