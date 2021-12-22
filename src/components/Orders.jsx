import useOrders from "../hooks/useOrders";
import usePrototypes from "../hooks/usePrototypes";
import useActions from "../hooks/useActions";
import { useMemo } from "react";

export default function Orders() {
  const orders = useOrders();
  const prototypes = usePrototypes();
  const { remove, removeAll } = useActions();
  const totalPrice = useMemo(() => {
    return orders
      .map((order) => {
        const { id, quantity } = order;
        const prototype = prototypes.find((p) => p.id === id);
        return prototype.price * quantity;
      })
      .reduce((a, b) => a + b, 0);
  }, [orders, prototypes]);
  console.log(orders);

  if (orders.length === 0) {
    return (
      <aside>
        <div className="empty">
          <div className="title">You don't hav any orders</div>
          <div className="subtitle">Click on a + to add an order</div>
        </div>
      </aside>
    );
  } else {
    return (
      <aside>
        <div className="order">
          <div className="body">
            {orders.map((order) => {
              const prototype = prototypes.find((p) => p.id === order.id);
              const click = () => {
                remove(order.id);
              };
              return (
                <div className="item" key={order.id}>
                  <div className="img">
                    <video src={prototype.thumbnail} />
                  </div>
                  <div className="content">
                    <p className="title">
                      {prototype.title} x {order.quantity}
                    </p>
                  </div>
                  <div className="action">
                    <p className="price">
                      $ {prototype.price * order.quantity}
                    </p>
                    <button className="btn btn--link" onClick={click}>
                      <i className="icon icon--cross"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="total">
            <hr />
            <div className="item">
              <div className="content">Total</div>
              <div className="action">
                <div className="price">$ {totalPrice} </div>
              </div>
              <button className="btn btn--link" onClick={removeAll}>
                <i className="icon icon--delete"></i>
              </button>
            </div>
            <button
              className="btn btn--secondary"
              style={{ width: "100%", marginTop: 10 }}
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    );
  }
}
