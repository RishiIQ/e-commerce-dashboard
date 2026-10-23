
import { Bell, Sparkles, ShoppingCart, Heart, ShoppingBag, Package } from 'lucide-react';
import { RevenueLineChart } from './RevenueLineChart';
import { CategoryPieChart } from './CategoryPieChart';

export function DashboardView({ products, orders, customers, setActiveTab }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 md:pt-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2421] tracking-tight">Welcome back, Rishi!</h2>
          <p className="text-xs text-[#7B6F6A] font-medium mt-0.5">23 October, Friday</p>
        </div>
      
      </div>

      <div className="bg-[#C86D51] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider text-white">
            <Sparkles className="w-3.5 h-3.5" /> Milestone Achieved
          </div>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-white">Good Job!</h3>
          <p className="text-xs md:text-sm text-white/90 max-w-md leading-relaxed">You have over 20,000 visitors in the last 10 days. Keep it up!</p>
        </div>
        <div className="relative z-10 flex items-center gap-4 bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/20 shrink-0 w-full md:w-auto">
          <ShoppingCart className="w-10 h-10 text-white animate-bounce shrink-0" />
          <div>
            <p className="text-xs text-white/85">Active Cart Conversion</p>
            <p className="font-serif font-bold text-lg text-white">+24.8% Today</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#7B6F6A] uppercase">Engagement</span>
            <div className="w-9 h-9 rounded-xl bg-[#F7F6F3] text-[#C86D51] flex items-center justify-center"><Heart className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#2C2421]">+8,5K</h3>
            <p className="text-xs text-[#7B6F6A] mt-1 font-medium">Favorite items added</p>
          </div>
        </div>
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#7B6F6A] uppercase">Intent</span>
            <div className="w-9 h-9 rounded-xl bg-[#F7F6F3] text-[#C86D51] flex items-center justify-center"><ShoppingBag className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#2C2421]">+5,2K</h3>
            <p className="text-xs text-[#7B6F6A] mt-1 font-medium">Add to bag actions</p>
          </div>
        </div>
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#7B6F6A] uppercase">Fulfillment</span>
            <div className="w-9 h-9 rounded-xl bg-[#F7F6F3] text-[#C86D51] flex items-center justify-center"><Package className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#2C2421]">+{orders.length * 100}</h3>
            <p className="text-xs text-[#7B6F6A] mt-1 font-medium">Completed Orders</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueLineChart />
        <CategoryPieChart products={products} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-[#2C2421]">Recent Sold ({products.length})</h3>
          <button onClick={() => setActiveTab('products')} className="text-xs font-semibold text-[#C86D51] hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between bg-white border border-[#DCD7CD]">
              <div className="h-64 w-full overflow-hidden bg-[#F4EDE2] relative flex items-center justify-center p-2">
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=contain&w=600&q=80'; }} />
                <div className="absolute top-3 left-3"><span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/90 text-[#2C2421] font-semibold">{p.category}</span></div>
                <div className="absolute top-3 right-3"><span className="text-[10px] font-semibold text-[#2C2421] bg-white/90 px-2.5 py-1 rounded-full">{p.earnings || '$1.5k earned'}</span></div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <h4 className="font-serif font-bold text-[#2C2421] text-base mb-1">{p.name}</h4>
                <div className="flex items-baseline justify-between pt-4 mt-2 border-t border-[#DCD7CD]/60">
                  <span className="text-lg font-serif font-bold text-[#2C2421]">${p.price.toFixed(2)}</span>
                  <span className="text-xs text-[#7B6F6A] font-medium">{p.stock} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}