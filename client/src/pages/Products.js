import { useEffect, useState, useCallback, useRef } from "react";
import { getProducts } from "../services/productService";
import { createOrder } from "../services/orderService";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [checkoutData, setCheckoutData] = useState({
    customerName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const placeholderImage =
    "https://via.placeholder.com/500x300?text=12Fit+Product";

  const debounceRef = useRef(null);

  const loadProducts = useCallback(async (query) => {
    try {
      setLoading(true);
      const res = await getProducts(query);
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      loadProducts(search);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [search, loadProducts]);

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  const filteredProducts = products;

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setSelectedProduct(null);
    showMessage(`${product.name} added to cart`);
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getNumberPrice = (price) => {
    if (!price) return 0;

    const number = price.toString().replace(/[^\d.]/g, "");
    const parsed = Number(number);

    if (isNaN(parsed) || parsed === 0) {
      console.warn("Unexpected price format:", price);
    }

    return parsed || 0;
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + getNumberPrice(item.price) * item.quantity,
    0
  );

  const handleCheckoutChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value,
    });
  };

  const submitOrder = async () => {
    if (cartItems.length === 0) {
      showMessage("Your cart is empty");
      return;
    }

    const orderData = {
      customerName: checkoutData.customerName,
      phone: checkoutData.phone,
      address: checkoutData.address,
      notes: checkoutData.notes,
      paymentMethod: "Cash on Delivery",
      totalPrice,
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
    };

    try {
      setOrderLoading(true);

      await createOrder(orderData);

      setCartItems([]);
      setCheckoutData({
        customerName: "",
        phone: "",
        address: "",
        notes: "",
      });

      setShowCheckout(false);
      setShowCart(false);

      showMessage("Order placed successfully. We will contact you soon.");
    } catch (error) {
      console.error("Order failed:", error);
      showMessage("Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  const isCheckoutValid =
    checkoutData.customerName.trim() !== "" &&
    checkoutData.phone.trim() !== "" &&
    checkoutData.address.trim() !== "";

  return (
    <div className="products-page">
      <style>
        {`
          .products-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(0, 212, 255, 0.15), transparent 34%),
              radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.16), transparent 32%),
              linear-gradient(135deg, #07111f 0%, #0b1220 48%, #08101d 100%);
            color: #fff;
          }

          .products-hero {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.82));
            border: 1px solid rgba(34, 211, 238, 0.18);
            border-radius: 28px;
            padding: 45px 30px;
            box-shadow: 0 22px 70px rgba(0, 0, 0, 0.38);
            backdrop-filter: blur(14px);
          }

          .store-badge {
            background: linear-gradient(135deg, #06b6d4, #2563eb);
            color: #ffffff;
            border-radius: 40px;
            padding: 8px 18px;
            font-weight: 700;
            letter-spacing: 0.3px;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
          }

          .products-search {
            border-radius: 18px;
            border: 1px solid rgba(34, 211, 238, 0.25);
            padding: 15px 20px;
            background: rgba(248, 250, 252, 0.96);
            color: #0f172a;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
          }

          .products-search:focus {
            border-color: #22d3ee;
            box-shadow: 0 0 0 0.25rem rgba(34, 211, 238, 0.22);
          }

          .product-card {
            border-radius: 22px;
            overflow: hidden;
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(17, 24, 39, 0.94));
            color: #ffffff;
            border: 1px solid rgba(148, 163, 184, 0.18);
            cursor: pointer;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.32);
            transition: all 0.25s ease;
          }

          .product-card:hover {
            transform: translateY(-8px);
            border-color: rgba(34, 211, 238, 0.55);
            box-shadow:
              0 24px 55px rgba(0, 0, 0, 0.45),
              0 0 22px rgba(34, 211, 238, 0.12);
          }

          .product-img-wrap {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #111827, #1e293b);
            border-bottom: 1px solid rgba(148, 163, 184, 0.14);
          }

          .product-img {
            height: 185px;
            width: 100%;
            object-fit: cover;
            transition: transform 0.35s ease, opacity 0.35s ease;
          }

          .product-card:hover .product-img {
            transform: scale(1.07);
            opacity: 0.92;
          }

          .product-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            background: linear-gradient(135deg, #06b6d4, #2563eb);
            color: #fff;
            border-radius: 30px;
            padding: 6px 13px;
            font-size: 0.75rem;
            font-weight: 700;
            box-shadow: 0 8px 22px rgba(37, 99, 235, 0.35);
          }

          .product-title {
            color: #f8fafc;
            line-height: 1.35;
          }

          .product-desc {
            color: #94a3b8;
            font-size: 0.9rem;
            min-height: 42px;
          }

          .price-pill {
            background: rgba(34, 211, 238, 0.12);
            color: #22d3ee;
            border: 1px solid rgba(34, 211, 238, 0.22);
            border-radius: 30px;
            padding: 7px 12px;
            font-weight: 800;
          }

          .view-link {
            color: #93c5fd;
            font-weight: 700;
            font-size: 0.85rem;
          }

          .cart-floating-btn {
            position: fixed;
            right: 25px;
            bottom: 25px;
            z-index: 1000;
            border: none;
            border-radius: 50px;
            padding: 14px 22px;
            background: linear-gradient(135deg, #06b6d4, #2563eb);
            box-shadow: 0 16px 40px rgba(37, 99, 235, 0.42);
          }

          .cart-floating-btn:hover {
            background: linear-gradient(135deg, #0891b2, #1d4ed8);
            box-shadow: 0 20px 50px rgba(37, 99, 235, 0.55);
          }

          .modal-glass {
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(34, 211, 238, 0.2);
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.97), rgba(17, 24, 39, 0.96));
            color: #f8fafc;
            box-shadow: 0 30px 85px rgba(0, 0, 0, 0.6);
          }

          .modal-glass .modal-header {
            background: rgba(15, 23, 42, 0.95);
            border-bottom: 1px solid rgba(34, 211, 238, 0.14);
          }

          .modal-glass .modal-body {
            background:
              radial-gradient(circle at top right, rgba(34, 211, 238, 0.08), transparent 35%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(17, 24, 39, 0.96));
          }

          .modal-glass .modal-title,
          .modal-glass h3,
          .modal-glass h4,
          .modal-glass h5,
          .modal-glass h6 {
            color: #f8fafc;
          }

          .modal-glass .text-muted {
            color: #cbd5e1 !important;
          }

          .modal-category {
            color: #22d3ee;
            font-weight: 700;
          }

          .modal-price {
            color: #22d3ee;
            font-weight: 800;
          }

          .modal-info-box {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(34, 211, 238, 0.14);
            border-radius: 18px;
            padding: 18px;
          }

          .modal-info-box ul,
          .modal-info-box p,
          .modal-info-box li {
            color: #cbd5e1;
          }

          .modal-product-img {
            width: 100%;
            height: 330px;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(34, 211, 238, 0.14);
          }

          .modal-glass .btn-close {
            filter: invert(1);
            opacity: 0.8;
          }

          .modal-glass .btn-close:hover {
            opacity: 1;
          }

          .cart-item {
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.07);
            border: 1px solid rgba(34, 211, 238, 0.12);
            padding: 14px;
            color: #f8fafc;
          }

          .cart-img {
            width: 70px;
            height: 70px;
            border-radius: 14px;
            object-fit: cover;
          }

          .empty-box {
            background: rgba(15, 23, 42, 0.78);
            border: 1px solid rgba(34, 211, 238, 0.16);
            border-radius: 22px;
            padding: 35px;
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
          }

          .message-box {
            border-radius: 18px;
            background: rgba(34, 211, 238, 0.12);
            color: #cffafe;
            border: 1px solid rgba(34, 211, 238, 0.25);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          }

          .checkout-input {
            background: rgba(255, 255, 255, 0.92);
            border-radius: 14px;
            border: 1px solid rgba(34, 211, 238, 0.15);
          }

          .checkout-input:focus {
            box-shadow: 0 0 0 0.2rem rgba(34, 211, 238, 0.18);
            border-color: #22d3ee;
          }

          .btn-place-order:disabled {
            opacity: 0.55;
            cursor: not-allowed;
          }

          @media (max-width: 768px) {
            .products-hero {
              padding: 32px 18px;
            }

            .product-img {
              height: 210px;
            }

            .modal-product-img {
              height: 260px;
            }

            .cart-floating-btn {
              right: 15px;
              bottom: 15px;
              padding: 12px 18px;
            }
          }
        `}
      </style>

      <div className="container py-5">
        {message && (
          <div className="alert message-box text-center mb-4" role="alert">
            {message}
          </div>
        )}

        <div className="products-hero text-center mb-5">
          <span className="store-badge d-inline-block mb-3">12Fit Store</span>

          <h1 className="fw-bold display-5 mb-3">Supplements Store</h1>

          <p className="text-white-50 col-lg-7 mx-auto mb-4">
            Browse fitness supplements, check product details, usage tips, and
            order easily with cash on delivery.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <input
                type="text"
                className="form-control form-control-lg products-search"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status"></div>
            <p className="mt-3 text-white-50">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <div
                  className="product-card h-100"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-img-wrap">
                    <img
                      src={product.image || placeholderImage}
                      className="product-img"
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                    />

                    <span className="product-badge">
                      {product.category || "Supplement"}
                    </span>
                  </div>

                  <div className="card-body p-3">
                    <h6 className="fw-bold mb-2 product-title">
                      {product.name}
                    </h6>

                    <p className="mb-3 product-desc">
                      {product.shortDesc || "Fitness supplement"}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price-pill">{product.price}</span>
                      <span className="view-link">View →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-box text-center">
            <h4 className="fw-bold">No products found</h4>
            <p className="text-white-50 mb-0">
              Try searching with another product name.
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary cart-floating-btn"
        onClick={() => setShowCart(true)}
      >
        🛒 Cart ({cartCount})
      </button>

      {selectedProduct && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content modal-glass">
              <div className="modal-header border-0">
                <div>
                  <p className="modal-category mb-1">
                    {selectedProduct.category || "Supplement"}
                  </p>

                  <h4 className="modal-title fw-bold">
                    {selectedProduct.name}
                  </h4>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                />
              </div>

              <div className="modal-body p-4">
                <div className="row g-4 align-items-center">
                  <div className="col-md-6">
                    <img
                      src={selectedProduct.image || placeholderImage}
                      alt={selectedProduct.name}
                      className="modal-product-img"
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <h3 className="fw-bold mb-2">{selectedProduct.name}</h3>

                    <p className="modal-price fs-4 mb-3">
                      {selectedProduct.price}
                    </p>

                    <p className="text-muted mb-4">
                      {selectedProduct.description ||
                        "This product is designed to support your fitness journey."}
                    </p>

                    <div className="modal-info-box mb-3">
                      <h6 className="fw-bold mb-3">Benefits</h6>

                      {selectedProduct.benefits?.length > 0 ? (
                        <ul className="mb-0">
                          {selectedProduct.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0">
                          Helps support training and daily performance.
                        </p>
                      )}
                    </div>

                    <div className="modal-info-box mb-4">
                      <h6 className="fw-bold mb-2">Usage Tips</h6>

                      <p className="mb-0">
                        {selectedProduct.usageTips ||
                          "Use according to your training goal and product instructions."}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary rounded-pill px-4 py-2"
                      onClick={() => addToCart(selectedProduct)}
                      style={{
                        background: "linear-gradient(135deg, #06b6d4, #2563eb)",
                        border: "none",
                        boxShadow: "0 12px 28px rgba(37, 99, 235, 0.35)",
                      }}
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
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
          onClick={() => setShowCart(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content modal-glass">
              <div className="modal-header border-0">
                <h4 className="modal-title fw-bold">Your Cart</h4>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCart(false)}
                />
              </div>

              <div className="modal-body p-4">
                {cartItems.length > 0 ? (
                  <>
                    <div className="d-flex flex-column gap-3">
                      {cartItems.map((item) => (
                        <div
                          className="cart-item d-flex align-items-center gap-3 flex-wrap"
                          key={item._id}
                        >
                          <img
                            src={item.image || placeholderImage}
                            alt={item.name}
                            className="cart-img"
                            onError={(e) => {
                              e.target.src = placeholderImage;
                            }}
                          />

                          <div className="flex-grow-1">
                            <h6 className="fw-bold mb-1">{item.name}</h6>

                            <p className="modal-price fw-semibold mb-0">
                              {item.price}
                            </p>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-light"
                              onClick={() => decreaseQuantity(item._id)}
                            >
                              -
                            </button>

                            <span className="fw-bold">{item.quantity}</span>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-light"
                              onClick={() => increaseQuantity(item._id)}
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(item._id)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                      <h5 className="fw-bold mb-0">
                        Total: ₪{totalPrice.toFixed(2)}
                      </h5>

                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-light me-2"
                          onClick={clearCart}
                        >
                          Clear Cart
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setShowCart(false);
                            setShowCheckout(true);
                          }}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <h5 className="fw-bold">Your cart is empty</h5>

                    <p className="text-muted mb-0">
                      Add some supplements to continue.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content modal-glass">
              <div className="modal-header border-0">
                <h4 className="modal-title fw-bold">Checkout</h4>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCheckout(false)}
                />
              </div>

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>

                  <input
                    type="text"
                    name="customerName"
                    className="form-control checkout-input"
                    value={checkoutData.customerName}
                    onChange={handleCheckoutChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control checkout-input"
                    value={checkoutData.phone}
                    onChange={handleCheckoutChange}
                    placeholder="05x-xxxxxxx"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Address</label>

                  <input
                    type="text"
                    name="address"
                    className="form-control checkout-input"
                    value={checkoutData.address}
                    onChange={handleCheckoutChange}
                    placeholder="City, Street, Building"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Notes</label>

                  <textarea
                    name="notes"
                    className="form-control checkout-input"
                    rows="3"
                    value={checkoutData.notes}
                    onChange={handleCheckoutChange}
                    placeholder="Any special instructions..."
                  />
                </div>

                <div className="modal-info-box mb-3">
                  Payment Method: <strong>Cash on Delivery</strong>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-place-order w-100 rounded-pill py-2"
                  disabled={orderLoading || !isCheckoutValid}
                  onClick={submitOrder}
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #2563eb)",
                    border: "none",
                  }}
                >
                  {orderLoading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;