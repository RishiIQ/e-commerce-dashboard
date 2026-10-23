
export function RevenueLineChart() {
  const points = [
    { x: 50,  y: 120 }, { x: 150, y: 95  }, { x: 250, y: 105 },
    { x: 350, y: 70  }, { x: 450, y: 45  }, { x: 550, y: 30  }
  ];
  const pathD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    return `${acc} C ${prev.x + (pt.x - prev.x)/2} ${prev.y}, ${prev.x + (pt.x - prev.x)/2} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');
  const areaD = `${pathD} L 550 150 L 50 150 Z`;

  return (
    <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-base text-[#2C2421]">Revenue Growth Trend</h3>
          <p className="text-xs text-[#7B6F6A]">Monthly performance across all channels ($8.5K)</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F7F6F3] text-[#C86D51]">+24.8% vs last year</span>
      </div>
      <div className="h-48 w-full relative flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="terracottaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C86D51" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C86D51" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30" x2="600" y2="30" stroke="#F4F1EA" strokeDasharray="4 4" />
          <line x1="0" y1="80" x2="600" y2="80" stroke="#F4F1EA" strokeDasharray="4 4" />
          <line x1="0" y1="130" x2="600" y2="130" stroke="#F4F1EA" strokeDasharray="4 4" />
          <path d={areaD} fill="url(#terracottaGrad)" />
          <path d={pathD} fill="none" stroke="#C86D51" strokeWidth="3" strokeLinecap="round" />
          {points.map((pt, idx) => (
            <circle key={idx} cx={pt.x} cy={pt.y} r="5" className="fill-white stroke-[#C86D51] stroke-2" />
          ))}
        </svg>
      </div>
      <div className="flex justify-between text-[11px] font-mono text-[#7B6F6A] px-4 pt-2 border-t border-[#EFECE6]">
        <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
      </div>
    </div>
  );
}