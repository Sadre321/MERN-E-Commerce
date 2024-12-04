import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";

const CartTotals = () => {
  const [fastCargo, setFastCargo] = useState(false);

  const { cartItems } = useContext(CartContext);

  const cartItemsTotal = cartItems.map((item) => {
    return item.price.newPrice * item.quantity;
  });

  const subTotal = cartItemsTotal.reduce((previousValue, nextValue) => {
    return previousValue + nextValue;
  }, 0);

  const cargoFee = 15;

  const CartTotals = fastCargo?subTotal+cargoFee:subTotal;

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotal.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargo}
                      onChange={() => setFastCargo(!fastCargo)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${CartTotals.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartTotals;
