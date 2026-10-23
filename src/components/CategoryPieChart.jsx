import  { useMemo } from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';

export function CategoryPieChart({ products }) {
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    const total = products.length || 1;
    const colors = ['#C86D51', '#2C2421', '#EAE3D5', '#7B6F6A', '#f3d69b'];
    return Object.entries(counts).map(([cat, count], idx) => {
      const percentage = ((count / total) * 100).toFixed(1);
      return { category: cat, count, percentage, color: colors[idx % colors.length] };
    });
  }, [products]);

  return (
    <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif font-bold text-base text-[#2C2421]">Inventory Breakdown</h3>
          <p className="text-xs text-[#7B6F6A]">Catalog distribution by category</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-[#F7F6F3] flex items-center justify-center text-[#C86D51]">
          <PieChartIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
            {categoryCounts.map((item, idx, arr) => {
              const prevOffset = arr.slice(0, idx).reduce((acc, curr) => acc + parseFloat(curr.percentage), 0);
              return (
                <circle key={item.category} cx="16" cy="16" r="12" fill="transparent" stroke={item.color} strokeWidth="5" strokeDasharray={`${item.percentage} 100`} strokeDashoffset={-prevOffset} />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-serif font-bold text-lg text-[#2C2421]">{products.length}</span>
            <span className="text-[10px] uppercase text-[#7B6F6A]">Items</span>
          </div>
        </div>
        <div className="space-y-2">
          {categoryCounts.map(item => (
            <div key={item.category} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="font-medium text-[#2C2421]">{item.category}</span>
              </div>
              <span className="font-mono text-[#7B6F6A]">{item.count} ({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}