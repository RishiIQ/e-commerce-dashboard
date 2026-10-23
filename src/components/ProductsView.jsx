import { useState } from 'react'
import { Search, Plus } from 'lucide-react'

export function ProductsView ({ products, setProducts, addToast }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Apparel',
    price: '',
    stock: '',
    sku: '',
    image: ''
  })

  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Apparel',
      price: '',
      stock: '',
      sku: `TRC-${Math.floor(100 + Math.random() * 900)}`,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=contain&w=600&q=80'
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = p => {
    setEditingProduct(p)
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price.toString(),
      stock: p.stock.toString(),
      sku: p.sku,
      image: p.image || ''
    })
    setIsModalOpen(true)
  }

  const handleSave = e => {
    e.preventDefault()
    if (!formData.name || !formData.price) return
    const priceNum = parseFloat(formData.price)
    const stockNum = parseInt(formData.stock) || 10
    const status =
      stockNum === 0 ? 'Out of Stock' : stockNum < 10 ? 'Low Stock' : 'In Stock'

    if (editingProduct) {
      setProducts(
        products.map(p =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: priceNum, stock: stockNum, status }
            : p
        )
      )
      addToast(`Product "${formData.name}" successfully updated.`, 'success')
    } else {
      const newPrd = {
        id: `PRD-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        price: priceNum,
        stock: stockNum,
        status,
        rating: 5.0,
        earnings: '1.2k earned'
      }
      setProducts([newPrd, ...products])
      addToast('Product added successfully.', 'success')
    }
    setIsModalOpen(false)
  }

  return (
    <div className='space-y-6 animate-fade-in'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#EFECE6]'>
        <div className='relative flex-1'>
          <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B6F6A]' />
          <input
            type='text'
            placeholder={`Search across ${products.length} products...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#2C2421] focus:outline-none'
          />
        </div>
        <button
          onClick={handleOpenAdd}
          className='bg-[#C86D51] text-white px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 shrink-0 hover:bg-[#B35B40]'
        >
          <Plus className='w-4 h-4' /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Total Products</p>
      <h3 className="text-2xl font-serif font-bold text-[#2C2421] mt-1">{filtered.length}</h3>
    </div>
    
  </div>


  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">In Stock</p>
      <h3 className="text-2xl font-serif font-bold text-emerald-700 mt-1">
        {filtered.filter(e => e.status === 'In Stock').length}
      </h3>
    </div>
    
  </div>

 
  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Low Stock</p>
      <h3 className="text-2xl font-serif font-bold text-amber-700 mt-1">
        {filtered.filter(e => e.status === 'Low Stock').length}
      </h3>
    </div>
   
  </div>


  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Out Of Stock</p>
      <h3 className="text-2xl font-serif font-bold text-red-800 mt-1">
        {filtered.filter(e => e.status === 'Out of Stock' || e.status === 'Out Of Stack').length}
      </h3>
    </div>
   
  </div>
</div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filtered.map(p => (
          <div
            key={p.id}
            className='rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between bg-white border border-[#DCD7CD]'
          >
            <div className='h-64 w-full overflow-hidden bg-[#F4EDE2] relative flex items-center justify-center p-2'>
              <img
                src={p.image}
                alt={p.name}
                className='max-h-full max-w-full object-contain'
                onError={e => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=contain&w=600&q=80'
                }}
              />
              <div className='absolute top-3 left-3'>
                <span className='text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/90 text-[#2C2421] font-semibold'>
                  {p.category}
                </span>
              </div>
              <div className='absolute top-3 right-3'>
                <span
                  className='text-[10px] font-semibold px-2.5 py-1 rounded-full'
                  style={{
                    backgroundColor:
                      p.status === 'In Stock' ? '#d2f9ad' : '#fb2626',
                    color: p.status === 'In Stock' ? '#1b1b1a' : '#fef7f7'
                  }}
                >
                  {p.status}
                </span>
              </div>
            </div>
            <div className='p-5 flex flex-col justify-between flex-1'>
              <div>
                <h4 className='font-serif font-bold text-[#2C2421] text-base mb-1'>
                  {p.name}
                </h4>
                <p className='text-xs text-[#7B6F6A] font-mono mb-2'>
                  SKU: {p.sku}
                </p>
                <p className='text-[10px] bg-[#F7F6F3] border border-[#EFECE6] font-semibold w-fit px-2.5 py-0.5 rounded-full text-[#7B6F6A] mb-3'>
                  Stock - {p.stock} units
                </p>
              </div>
              <div className='flex items-baseline justify-between pt-4 mt-2 border-t border-[#DCD7CD]/60'>
                <span className='text-xl font-serif font-bold text-[#2C2421]'>
                  ${p.price.toFixed(2)}
                </span>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className='text-black hover:text-white text-xs font-bold px-3 py-1.5 bg-amber-100 hover:bg-amber-800 rounded-full'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setProducts(products.filter(x => x.id !== p.id))
                      addToast('Product removed.', 'warning')
                    }}
                    className='text-black hover:text-white text-xs font-bold px-3 py-1.5 bg-red-200 hover:bg-red-500 rounded-full'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0  z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4'>
          <div className='bg-white border border-[#EFECE6] rounded-3xl max-w-md w-full p-6 shadow-2xl'>
            <h3 className='font-serif font-bold text-lg text-[#2C2421] mb-4'>
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h3>
            <form onSubmit={handleSave} className='space-y-4 text-xs'>
              <div>
                <label className='block font-semibold text-[#7B6F6A] mb-1'>
                  Product Title
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5'
                  required
                />
              </div>
              <div>
                <label className='block font-semibold text-[#7B6F6A] mb-1'>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className='w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5'
                >
                  <option value='Apparel'>Apparel</option>
                  <option value='Accessories'>Accessories</option>
                  <option value='Luggage'>Luggage</option>
                  <option value='Home'>Home</option>
                  <option value='Kitchen'>Kitchen</option>
                </select>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block font-semibold text-[#7B6F6A] mb-1'>
                    Price ($)
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    value={formData.price}
                    onChange={e =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className='w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5'
                    required
                  />
                </div>
                <div>
                  <label className='block font-semibold text-[#7B6F6A] mb-1'>
                    Stock
                  </label>
                  <input
                    type='number'
                    value={formData.stock}
                    onChange={e =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className='w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5'
                  />
                </div>
              </div>
              <div>
                <label className='block font-semibold text-[#7B6F6A] mb-1'>
                  Image URL (Unsplash)
                </label>
                <input
                  type='url'
                  value={formData.image}
                  onChange={e =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className='w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5 font-mono text-[11px]'
                />
              </div>
              <div className='flex justify-end gap-2 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='bg-[#F7F6F3] px-4 py-2 rounded-2xl text-[#7B6F6A]'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#C86D51] text-white px-5 py-2 rounded-2xl font-semibold'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
