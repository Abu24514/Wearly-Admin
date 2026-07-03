import { currency } from '../App';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ProductRow = ({ item, removeProduct }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[80px_1fr_60px] md:grid-cols-[80px_1fr_120px_100px_60px] items-center px-5 py-3 bg-white border border-neutral-300 rounded-2xl text-sm transition-all hover:border-neutral-400">
      
      {/* Image */}
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-12 h-12 object-cover rounded-xl"
      />

      {/* Name */}
      <div>
        <p className="font-medium text-gray-900 leading-snug">{item.name}</p>
        <p className="text-xs text-neutral-400 mt-0.5 md:hidden">{item.category}</p>
      </div>

      {/* Category */}
      <p className="hidden md:block text-neutral-500 text-sm">{item.category}</p>

      {/* Price */}
      <p className="hidden md:block font-medium">{currency}{item.price}</p>

      {/* Actions */}
      <div className="flex gap-1">
        <button
          onClick={() => navigate(`/add?edit=${item._id}`)}
          className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-500 text-neutral-400 transition-all active:scale-95">
          <FiEdit size={16} />
        </button>
        <button
          onClick={() => removeProduct(item._id)}
          className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 text-neutral-400 transition-all active:scale-95">
          <RiDeleteBin3Line size={16} />
        </button>
      </div>

    </div>
  );
};

export default ProductRow;