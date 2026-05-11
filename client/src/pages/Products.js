import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const placeholderImage =
    "https://via.placeholder.com/500x300?text=12Fit+Product";

  const loadProducts = useCallback(async () => {
    try {
      const res = await getProducts(search);
      setProducts(res.data || []);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    alert(`${product.name} added to cart`);
    setSelectedProduct(null);
  };

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3">Supplements Store</h2>

        <p className="text-muted col-md-7 mx-auto">
          Search supplements, view product details, usage tips, and add products
          to your cart.
        </p>

        <button className="btn btn-outline-dark mt-2">
          Cart ({cartCount})
        </button>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-sm-6 col-lg-4" key={product._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image || placeholderImage}
                  className="card-img-top"
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = placeholderImage;
                  }}
                  style={{
                    height: "230px",
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title fw-bold">{product.name}</h5>

                  <p className="text-muted mb-2">
                    {product.shortDesc || "Fitness supplement"}
                  </p>

                  <p className="text-primary fw-semibold mb-0">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-light text-center shadow-sm border-0">
              No products found.
            </div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {selectedProduct.name}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-4 align-items-center">
                  <div className="col-md-6">
                    <img
                      src={selectedProduct.image || placeholderImage}
                      alt={selectedProduct.name}
                      className="img-fluid rounded"
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                      style={{
                        width: "100%",
                        height: "320px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <p className="text-muted mb-2">
                      {selectedProduct.category || "Supplement"}
                    </p>

                    <h3 className="fw-bold">{selectedProduct.name}</h3>

                    <p className="text-primary fs-4 fw-bold">
                      {selectedProduct.price}
                    </p>

                    <p className="text-muted">
                      {selectedProduct.description ||
                        "This product is designed to support your fitness journey."}
                    </p>

                    <div className="bg-light rounded p-3 mb-3">
                      <h6 className="fw-bold">Benefits</h6>

                      {selectedProduct.benefits &&
                      selectedProduct.benefits.length > 0 ? (
                        <ul className="mb-0 text-muted">
                          {selectedProduct.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0 text-muted">
                          Helps support training and daily performance.
                        </p>
                      )}
                    </div>

                    <div className="bg-light rounded p-3 mb-3">
                      <h6 className="fw-bold">Usage Tips</h6>
                      <p className="mb-0 text-muted">
                        {selectedProduct.usageTips ||
                          "Use according to your training goal and product instructions."}
                      </p>
                    </div>

                    <button
                      className="btn btn-dark px-4"
                      onClick={() => addToCart(selectedProduct)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;