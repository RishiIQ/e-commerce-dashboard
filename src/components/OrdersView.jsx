import  { useState } from 'react';
import { Search } from 'lucide-react';

export function OrdersView({ orders }) {
  const [search, setSearch] = useState('');
  const filtered = orders.filter(o => o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#EFECE6]">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B6F6A]" />
          <input type="text" placeholder={`Search across ${orders.length} orders...`} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#2C2421] focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Total Orders</p>
      <h3 className="text-2xl font-serif font-bold text-[#2C2421] mt-1">{filtered.length}</h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-[#F7F6F3] text-[#2C2421] flex items-center justify-center font-bold">
      🛒
    </div>
  </div>


  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Delivered</p>
      <h3 className="text-2xl font-serif font-bold text-emerald-700 mt-1">
        {filtered.filter(o => o.status === 'Delivered').length}
      </h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
      ✓
    </div>
  </div>


  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Processing</p>
      <h3 className="text-2xl font-serif font-bold text-amber-700 mt-1">
        {filtered.filter(o => o.status === 'Processing' || o.status === 'Shipped' || o.status === 'Pending').length}
      </h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
      ⌛
    </div>
  </div>


  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Cancelled</p>
      <h3 className="text-2xl font-serif font-bold text-red-800 mt-1">
        {filtered.filter(o => o.status === 'Cancelled').length}
      </h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
      ✕
    </div>
  </div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-xs">
        {filtered.map(o => (
          <div key={o.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#F7F6F3] border border-[#EFECE6] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#2C2421]">{o.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#EAE3D5] text-[#2C2421] font-semibold">{o.status}</span>
              </div>
              <p className="text-xs text-[#7B6F6A] mt-1">{o.customer} ({o.email})</p>
              <p className="text-[11px] text-[#A89F9B] font-mono mt-0.5">{o.address}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-serif font-bold text-base text-[#2C2421]">${o.total.toFixed(2)}</p>
              <p className="text-xs text-[#7B6F6A]">{o.items} items • {o.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}