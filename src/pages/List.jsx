import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import ProductRow from '../components/ProductRow';
const List = () => {
  const [list, setList] = useState([])
  const navigate = useNavigate();
  const fetchList = async () => {
    try {
      const { data } = await axiosInstance.get('/api/product/list')
      if (data.success) {
        setList(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const { data } = await axiosInstance.post('/api/product/remove', { id })
      if (data.success) {
        toast.success(data.message)
        fetchList()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div>

      {/* Heading */}
      <div className="mb-6">
        <h1 className="md:text-3xl text-xl font-medium">All <b>Products</b> List</h1>
        <p className="text-neutral-500 mt-1 text-sm sm:text-base">
          Manage your store inventory.
        </p>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_60px] items-center px-5 py-3 bg-white border border-neutral-300 rounded-2xl text-xs font-medium text-neutral-500 mb-2">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product Rows */}
      <div className="flex flex-col gap-2 sm:h-112.5 h-137 overflow-y-auto scroll-smooth pr-1">
        {list.length === 0 ? (
          <div className="text-center py-16 text-neutral-400 text-sm border border-neutral-200 rounded-2xl bg-white">
            No products found.
          </div>
        ) : (
          list.map((item) => (
            <ProductRow
              key={item._id}
              item={item}
              removeProduct={removeProduct}
            />
          ))
        )}
      </div>

    </div>
  )
}

export default List