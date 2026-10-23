import  { useState } from 'react';
import { Search } from 'lucide-react';

export function CustomersView({ customers }) {
  const [search, setSearch] = useState('');
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#EFECE6]">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B6F6A]" />
          <input type="text" placeholder={`Search across ${customers.length} customers...`} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#2C2421] focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 
  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Total Customers</p>
      <h3 className="text-2xl font-serif font-bold text-[#2C2421] mt-1">{filtered.length}</h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-[#F7F6F3] text-[#2C2421] flex items-center justify-center font-bold">
      👥
    </div>
  </div>


  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">VIP Tier</p>
      <h3 className="text-2xl font-serif font-bold text-[#C86D51] mt-1">
        {filtered.filter(c => c.tier === 'VIP').length}
      </h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#C86D51] flex items-center justify-center font-bold">
      ★
    </div>
  </div>

  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">Regular Tier</p>
      <h3 className="text-2xl font-serif font-bold text-emerald-700 mt-1">
        {filtered.filter(c => c.tier === 'Regular').length}
      </h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
      ✓
    </div>
  </div>


  <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-[#7B6F6A] uppercase tracking-wider">New Customers</p>
      <h3 className="text-2xl font-serif font-bold text-indigo-700 mt-1">
        {filtered.filter(c => c.tier === 'New').length}
      </h3>
    </div>
    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
      ✦
    </div>
  </div>
</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-full bg-[#C86D51] text-white font-bold flex items-center justify-center shrink-0">{c.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="min-w-0">
                <h4 className="font-semibold text-[#2C2421] truncate">{c.name}</h4>
                <p className="text-xs text-[#7B6F6A] font-mono truncate">{c.email}</p>
                <p className="text-[11px] text-[#A89F9B] mt-0.5">Spent: ${c.totalSpent.toLocaleString()} ({c.ordersCount} orders)</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F7F6F3] text-[#2C2421] border border-[#EFECE6] shrink-0">{c.tier}</span>
          </div>
        ))}
      </div>
    </div>
  );
}