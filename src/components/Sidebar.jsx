
import { LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, Settings, RefreshCw, ShieldAlert } from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  productsCount, 
  ordersCount, 
  customersCount, 
  reviewsCount, 
  toggleLoadingState, 
  toggleErrorState, 
  hasError, 
  isLoading, 
  addToast 
}) {
  return (
    <aside className={`w-72 bg-[#231C1A] border-r border-[#3E3430] flex flex-col justify-between p-5 shrink-0 transition-transform duration-300 md:translate-x-0 absolute md:relative inset-y-0 left-0 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div>
        <div className="flex items-center gap-3.5 mb-8 pt-2">
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#C86D51] shadow-md bg-[#EFECE6] flex items-center justify-center font-bold text-[#2C2421] text-xs">
              R
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#C86D51] border-2 border-[#231C1A]"></div>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm tracking-tight">Rishi</h3>
            <p className="text-[11px] text-[#A89F9B]">Administrator</p>
          </div>
        </div>
        <nav className="space-y-1.5">
          <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<Package className="w-4 h-4" />} label="Products" badge={productsCount} isActive={activeTab === 'products'} onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<ShoppingCart className="w-4 h-4" />} label="Orders" badge={ordersCount} isActive={activeTab === 'orders'} onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<Users className="w-4 h-4" />} label="Customers" badge={customersCount} isActive={activeTab === 'customers'} onClick={() => { setActiveTab('customers'); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<MessageSquare className="w-4 h-4" />} label="Reviews" badge={reviewsCount} isActive={activeTab === 'reviews'} onClick={() => { setActiveTab('reviews'); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<Settings className="w-4 h-4" />} label="Settings" isActive={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} />
        </nav>
      </div>
      <div className="space-y-1.5 pt-4 border-t border-[#3E3430]">
        <button onClick={toggleLoadingState} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-[#A89F9B] hover:text-white hover:bg-[#3E3430]/50 transition-all font-medium">
          <RefreshCw className={`w-3.5 h-3.5 text-[#C86D51] ${isLoading ? 'animate-spin' : ''}`} />
          <span>Simulate Loading</span>
        </button>
        <button onClick={toggleErrorState} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-[#A89F9B] hover:text-white hover:bg-[#3E3430]/50 transition-all font-medium">
          <ShieldAlert className={`w-3.5 h-3.5 ${hasError ? 'text-rose-400 animate-pulse' : 'text-[#A89F9B]'}`} />
          <span>{hasError ? 'Clear Error' : 'Simulate Error'}</span>
        </button>
        
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, badge, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-xs font-medium ${isActive ? 'bg-[#C86D51] text-white font-bold shadow-md' : 'text-[#A89F9B] hover:text-white hover:bg-[#3E3430]/60'}`}>
      <div className="flex items-center gap-3">
        <span className={isActive ? 'text-white' : 'text-[#A89F9B]'}>{icon}</span>
        <span className="tracking-wide">{label}</span>
      </div>
      {badge !== undefined && (
        <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${isActive ? 'bg-white text-[#2C2421]' : 'bg-[#3E3430] text-[#A89F9B]'}`}>{badge}</span>
      )}
    </button>
  );
}