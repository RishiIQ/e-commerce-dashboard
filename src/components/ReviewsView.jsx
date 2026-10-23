

export function ReviewsView({ reviews }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="font-serif font-bold text-lg text-[#2C2421]">Client Reviews ({reviews.length})</h3>
      <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFECE6] gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAE3D5] flex items-center justify-center font-bold text-xs text-[#2C2421] shrink-0">{r.customer.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <h4 className="font-semibold text-sm text-[#2C2421]">{r.customer}</h4>
                  <p className="text-[10px] text-[#7B6F6A] font-mono">{r.product} • {r.date}</p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-xs font-semibold text-[#2C2421] bg-[#F7F6F3] px-2.5 py-1 rounded-full">★ {r.rating}</span>
            </div>
            <p className="text-xs text-[#7B6F6A] leading-relaxed">"{r.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}