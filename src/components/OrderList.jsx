import { currency } from '../App'

const OrderList = ({ order, updateStatus }) => {

    const paymentBadge = order.payment
        ? "bg-green-100 text-green-700"
        : "bg-amber-100 text-amber-700"

    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-300 transition-all">

            <div className="flex gap-3 sm:gap-4 items-start">

                {/* Icon Box */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-100 flex items-center justify-content shrink-0 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                    </svg>
                </div>

                <div className="flex-1 min-w-0">

                    {/* Items */}
                    <p className="text-sm font-medium text-gray-900 leading-relaxed mb-1">
                        {order.items.map((item, index) => (
                            <span key={index}>
                                {item.name} x {item.quantity} {item.size}
                                {index !== order.items.length - 1 && ", "}
                            </span>
                        ))}
                    </p>

                    {/* Address */}
                    <div className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-3">
                        <span className="font-medium text-neutral-700">
                            {order.address.firstName} {order.address.lastName}
                        </span>
                        <br />
                        {order.address.street},{" "}
                        {order.address.city}, {order.address.state},{" "}
                        {order.address.country}, {order.address.zipCode}
                        <br />
                        {order.address.phone}
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1.5 mb-0 sm:mb-0">

                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                            Items: <span className="font-medium text-neutral-800">{order.items.length}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 10h18" /><path d="M7 15h.01" /><path d="M11 15h2" /></svg>
                            <span className="font-medium text-neutral-800">{order.paymentMethod}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /></svg>
                            <span className="font-medium text-neutral-800">
                                {new Date(order.date).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></svg>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${paymentBadge}`}>
                                {order.payment ? "Done" : "Pending"}
                            </span>
                        </div>

                    </div>

                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200 my-4" />

            {/* Bottom */}
            <div className="flex items-center justify-between gap-3 flex-wrap">

                <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wide mb-0.5">Order total</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-900">
                        {currency}{order.amount}
                    </p>
                </div>

                <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wide mb-1">Update status</p>
                    <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="border border-neutral-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-black w-44 sm:w-52 bg-white"
                    >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>

            </div>

        </div>
    )
}

export default OrderList