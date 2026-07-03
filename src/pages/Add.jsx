import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineTag, HiOutlineCurrencyDollar } from "react-icons/hi2";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useSearchParams } from 'react-router-dom';
const SIZES = ["S", "M", "L", "XL", "XXL", "40L", "20L", "30L"];

const Add = () => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const imageSetters = [setImage1, setImage2, setImage3, setImage4]
  const imageValues = [image1, image2, image3, image4]
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [bestseller, setBestseller] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [loading, setLoading] = useState(false)
  // edit const 
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  useEffect(() => {
    if (editId) {
      const fetchProduct = async () => {
        const { data } = await axiosInstance.get(`/api/product/single/${editId}`);
        if (data.success) {
          const p = data.product;
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price);
          setCategory(p.category);
          setSubCategory(p.subCategory);
          setBestseller(p.bestseller);
          setSelectedSizes(p.sizes);
        }
      }
      fetchProduct();
    }
  }, [editId])

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(selectedSizes))
      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      if (editId) {
        const { data } = await axiosInstance.patch(`/api/product/update/${editId}`, {
          name, description, price, category, subCategory, bestseller, sizes: selectedSizes
        });
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } 
      else {
        const { data } = await axiosInstance.post('/api/product/add', formData)
        if (data.success) {
          toast.success(data.message)
          setName(''); setDescription(''); setPrice('')
          setCategory(''); setSubCategory('')
          setBestseller(false); setSelectedSizes([])
          setImage1(false); setImage2(false); setImage3(false); setImage4(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1 className="md:text-3xl text-xl font-semibold">{editId ? 'Edit Product' : 'Add Product'}</h1>
        <p className="text-neutral-500 mt-1 text-sm sm:text-base">
          {editId ? 'Update product details.' : 'Create and publish products for your store.'}
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="grid lg:grid-cols-[450px_1fr] gap-5 items-start">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-5">

          {/* Images */}
          <div className="bg-white border border-neutral-300 rounded-3xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlinePhotograph size={18} className="text-neutral-500" />
              <h3 className="font-medium">Product Images</h3>
            </div>
            <div className="grid grid-cols-2 mx-auto gap-4 max-w-70">
              {[0, 1, 2, 3].map((index) => (
                <label
                  key={index}
                  className="aspect-square border-2 border-dashed border-neutral-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-neutral-50 transition-all overflow-hidden"
                >
                  {imageValues[index] ? (
                    <img
                      src={URL.createObjectURL(imageValues[index])}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img src={assets.upload_area} alt="" className="w-8 opacity-50" />
                      <p className="md:text-xs text-[8px] text-neutral-400 mt-2">
                        {index === 0 ? "Cover Image" : `Gallery ${index}`}
                      </p>
                    </>
                  )}
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => imageSetters[index](e.target.files[0])}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-white border border-neutral-300 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineTag size={22} className="text-neutral-500" />
              <h3 className="font-medium">Available Sizes</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 rounded-full text-[12px] font-medium transition-all border
                    ${selectedSizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-neutral-50 border-neutral-300 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">

          {/* Product Details */}
          <div className="bg-white border border-neutral-300 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineCurrencyDollar size={18} className="text-neutral-500" />
              <h3 className="font-medium">Product Details</h3>
            </div>
            <div className="space-y-4">
              <input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Product Name"
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors"
              />
              <textarea
                required
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Write product description..."
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-black transition-colors"
              />
              <div className="grid md:grid-cols-3 gap-3">
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                >
                  <option value="" disabled>Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Bags">Bags</option>
                </select>
                <select
                  required
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                >
                  <option value="" disabled>Sub Category</option>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                  <option value="Travelbag">Travelbag</option>
                  <option value="Handbag">Handbag</option>
                  <option value="Backpack">Backpack</option>
                </select>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">₹</span>
                  <input
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    type="number"
                    min="1"
                    placeholder="00"
                    className="w-full border border-neutral-300 rounded-xl pl-8 pr-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bestseller */}
          <div className="bg-white border border-neutral-300 rounded-2xl px-4 py-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={() => setBestseller(!bestseller)}
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <p className="font-medium text-sm">Bestseller Product</p>
            </label>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white py-3.5 rounded-2xl font-medium hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <><Spinner /> {editId ? 'Updating...' : 'Uploading...'}</> : editId ? 'Update Product' : 'Publish Product'}
          </button>

        </div>
      </form>
    </div>
  )
}

export default Add