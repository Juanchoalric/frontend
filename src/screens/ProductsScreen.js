import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, saveProduct, deleteProducts } from '../actions/productActions';

function ProductsScreen (props) {

    const [id, setId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state=> state.productList);
    const {loading, products, error} = productList;
    const productSave = useSelector(state=>state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
    const productDelete = useSelector(state=>state.productDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
          setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
          //
        };
      }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
    };

    const deleteHandler = (product) => {
        dispatch(deleteProducts(product._id));   
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveProduct({_id:id, name, price, image, brand, category, description}));
    }

    return <div className="content content-margined">
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Crea tu Producto</h2>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="price">
                        Precio
                    </label>
                    <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="image">
                        Imagen
                    </label>
                    <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="category">
                        Categoria
                    </label>
                    <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="brand">
                        Marca
                    </label>
                    <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="description">
                        Descripcion
                    </label>
                    <textarea type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}>

                    </textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">{ id? "Modificar": "Crear"}</button>
                </li>
            </ul>
        </form>
    </div>

    <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Editar
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
}

export default ProductsScreen;