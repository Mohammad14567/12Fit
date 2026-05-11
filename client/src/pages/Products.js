import { useEffect, useState, useCallback, useMemo } from "react";
import { getProducts } from "../services/productService";
import { createOrder } from "../services/orderService";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const placeholderImage =
    "https://via.placeholder.com/600x400?text=12Fit+Product";

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProducts(search);
      setProducts(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const numberPrice = Number(String(item.price).replace(/[^\d.]/g, ""));
      return total + numberPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

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

    setSelectedProduct(null);
    setShowCart(true);
    showMessage(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  };

  const handleOrderChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      customerName: orderForm.customerName,
      phone: orderForm.phone,
      address: orderForm.address,
      notes: orderForm.notes,
      paymentMethod: "Cash on Delivery",
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      totalPrice,
    };

    try {
      setOrderLoading(true);

      await createOrder(orderData);

      setCartItems([]);
      setOrderForm({
        customerName: "",
        phone: "",
        address: "",
        notes: "",
      });

      setShowCheckout(false);
      setShowCart(false);
      showMessage("Order placed successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #08111f 0%, #111827 45%, #0f172a 100%)",
      }}
    >
      <div className="container">
        <div
          className="rounded-4 p-4 p-md-5 mb-5 text-center shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(15,23,42,0.95))",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "white",
          }}
        >
          <span className="badge bg-primary rounded-pill px-3 py-2 mb-3">
            12Fit Store
          </span>

          <h1 className="fw-bold mb-3">Supplements Store</h1>

          <p className="text-white-50 col-md-8 mx-auto mb-4">
            Discover fitness supplements, view product details, add items to
            your cart, and place your order with cash on delivery.
          </p>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <button
              className="btn btn-light px-4"
              onClick={() => setShowCart(true)}
            >
              Cart Items ({cartCount})
            </button>

            {cartItems.length > 0 && (
              <button
                className="btn btn-primary px-4"
                onClick={() => setShowCheckout(true)}
              >
                Checkout
              </button>
            )}
          </div>
        </div>

        {message && (
          <div className="alert alert-success rounded-4 shadow-sm text-center">
            {message}
          </div>
        )}

        <div className="row justify-content-center mb-5">
          <div className="col-md-7 col-lg-6">
            <input
              type="text"
              className="form-control form-control-lg rounded-4 shadow-sm"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="text-white-50 mt-3">Loading products...</p>
          </div>
        ) : (
          <div className="row g-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="col-sm-6 col-lg-4" key={product._id}>
                  <div
                    className="card h-100 border-0 shadow-lg"
                    style={{
                      borderRadius: "22px",
                      overflow: "hidden",
                      cursor: "pointer",
                      background:
                        "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <img
                      src={product.image || placeholderImage}
                      className="card-img-top"
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                      style={{
                        height: "240px",
                        objectFit: "cover",
                      }}
                      onClick={() => setSelectedProduct(product)}
                    />

                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start gap-3">
                        <div>
                          <h5 className="fw-bold mb-2">{product.name}</h5>
                          <p className="text-white-50 small mb-3">
                            {product.shortDesc || "Fitness supplement"}
                          </p>
                        </div>

                        <span className="badge bg-primary">
                          {product.category || "Product"}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="text-info fw-bold fs-5 mb-0">
                          {product.price}
                        </p>

                        <button
                          className="btn btn-outline-light btn-sm rounded-pill px-3"
                          onClick={() => setSelectedProduct(product)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-dark text-center rounded-4 shadow-sm">
                  No products found.
                </div>
              </div>
            )}
          </div>
        )}

        {selectedProduct && (
          <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-content border-0 shadow rounded-4 overflow-hidden"
                style={{
                  background: "#111827",
                  color: "white",
                }}
              >
                <div className="modal-header border-secondary">
                  <h5 className="modal-title fw-bold">
                    {selectedProduct.name}
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setSelectedProduct(null)}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  <div className="row g-4 align-items-center">
                    <div className="col-md-6">
                      <img
                        src={selectedProduct.image || placeholderImage}
                        alt={selectedProduct.name}
                        className="img-fluid rounded-4 shadow-sm"
                        onError={(e) => {
                          e.target.src = placeholderImage;
                        }}
                        style={{
                          width: "100%",
                          height: "340px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <span className="badge bg-primary mb-3">
                        {selectedProduct.category || "Supplement"}
                      </span>

                      <h3 className="fw-bold">{selectedProduct.name}</h3>

                      <p className="text-info fs-4 fw-bold">
                        {selectedProduct.price}
                      </p>

                      <p className="text-white-50">
                        {selectedProduct.description ||
                          "This product is designed to support your fitness journey."}
                      </p>

                      <div
                        className="rounded-4 p-3 mb-3"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <h6 className="fw-bold">Benefits</h6>

                        {selectedProduct.benefits &&
                        selectedProduct.benefits.length > 0 ? (
                          <ul className="mb-0 text-white-50">
                            {selectedProduct.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mb-0 text-white-50">
                            Supports your training and daily performance.
                          </p>
                        )}
                      </div>

                      <div
                        className="rounded-4 p-3 mb-4"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <h6 className="fw-bold">Usage Tips</h6>
                        <p className="mb-0 text-white-50">
                          {selectedProduct.usageTips ||
                            "Use according to product instructions."}
                        </p>
                      </div>

                      <button
                        className="btn btn-primary px-4 rounded-pill"
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

        {showCart && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 9999,
            }}
            onClick={() => setShowCart(false)}
          >
            <div
              className="shadow-lg"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "100%",
                maxWidth: "430px",
                height: "100%",
                background: "#111827",
                color: "white",
                padding: "24px",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold mb-1">Your Cart</h4>
                  <p className="text-white-50 mb-0">{cartCount} items</p>
                </div>

                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => setShowCart(false)}
                >
                  Close
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-white-50">Your cart is empty.</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-4 p-3 mb-3"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <div className="d-flex gap-3">
                        <img
                          src={item.image || placeholderImage}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = placeholderImage;
                          }}
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "14px",
                            objectFit: "cover",
                          }}
                        />

                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">{item.name}</h6>
                          <p className="text-info mb-2">{item.price}</p>

                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-outline-light btn-sm"
                              onClick={() => decreaseQuantity(item._id)}
                            >
                              -
                            </button>

                            <span className="fw-bold">{item.quantity}</span>

                            <button
                              className="btn btn-outline-light btn-sm"
                              onClick={() => increaseQuantity(item._id)}
                            >
                              +
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm ms-auto"
                              onClick={() => removeFromCart(item._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    className="rounded-4 p-3 mt-4"
                    style={{
                      background: "rgba(37,99,235,0.16)",
                      border: "1px solid rgba(59,130,246,0.35)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Total</h5>
                      <h5 className="fw-bold text-info mb-0">
                        ₪{totalPrice.toFixed(2)}
                      </h5>
                    </div>

                    <button
                      className="btn btn-primary w-100"
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {showCheckout && (
          <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
            onClick={() => setShowCheckout(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-content border-0 shadow rounded-4"
                style={{
                  background: "#111827",
                  color: "white",
                }}
              >
                <div className="modal-header border-secondary">
                  <h5 className="modal-title fw-bold">Checkout</h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowCheckout(false)}
                  ></button>
                </div>

                <form onSubmit={handleSubmitOrder}>
                  <div className="modal-body p-4">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        className="form-control"
                        value={orderForm.customerName}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={orderForm.phone}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={orderForm.address}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Notes</label>
                      <textarea
                        name="notes"
                        className="form-control"
                        rows="3"
                        value={orderForm.notes}
                        onChange={handleOrderChange}
                      ></textarea>
                    </div>

                    <div
                      className="rounded-4 p-3"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <strong>Payment Method:</strong> Cash on Delivery
                    </div>
                  </div>

                  <div className="modal-footer border-secondary">
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => setShowCheckout(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={orderLoading}
                    >
                      {orderLoading ? "Submitting..." : "Submit Order"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;