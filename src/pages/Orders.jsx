import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import toast from 'react-hot-toast';
import OrderList from '../components/OrderList';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/api/order/list');
      console.log(data);
      
      if (data?.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await axiosInstance.post('/api/order/status', { orderId, status });
      if (data.success) {
        toast.success(data.message);
        fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1 className="md:text-3xl text-xl font-medium">All <b>Orders</b></h1>
        <p className="text-neutral-500 mt-1 text-sm sm:text-base">Manage and update customer orders.</p>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-3 h-125 overflow-y-auto scroll-smooth pr-1">
        {orders.length === 0 ? (
          <div className="text-center py-16 text-neutral-400 text-sm border border-neutral-200 rounded-2xl bg-white">
            No orders found.
          </div>
        ) : (
          orders.map((order) => (
            <OrderList key={order._id} order={order} updateStatus={updateStatus} />
          ))
        )}
      </div>
    </div>
  )
}

export default Orders;