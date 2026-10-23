import { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, AlertTriangle, XCircle, Info, ShieldAlert } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ProductsView } from './components/ProductsView';
import { OrdersView } from './components/OrdersView';
import { CustomersView } from './components/CustomersView';
import { ReviewsView } from './components/ReviewsView';
import { SettingsView } from './components/SettingsView';

const INITIAL_PRODUCTS = [
  { id: 'PRD-101', name: 'Terracotta Linen Overcoat', category: 'Apparel', price: 1500.00, stock: 24, status: 'In Stock', rating: 4.9, sku: 'TRC-COT-01', earnings: '3.5k earned', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-102', name: 'Brushed Gold Chronograph', category: 'Accessories', price: 1290.00, stock: 7, status: 'Low Stock', rating: 4.8, sku: 'GLD-CHR-02', earnings: '5.3k earned', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-103', name: 'Sovereign Saddle Leather Duffel', category: 'Luggage', price: 620.00, stock: 15, status: 'In Stock', rating: 4.7, sku: 'SOV-DLF-03', earnings: '11.4k earned', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-104', name: 'Minimalist Brass Task Lamp', category: 'Home', price: 340.00, stock: 3, status: 'Low Stock', rating: 4.6, sku: 'MIN-LMP-04', earnings: '1.2k earned', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-105', name: 'Forged Damask Chef Knife', category: 'Kitchen', price: 295.00, stock: 42, status: 'In Stock', rating: 5.0, sku: 'FRG-KNF-05', earnings: '4.8k earned', image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-106', name: 'Tuscan Silk Pocket Square', category: 'Accessories', price: 110.00, stock: 89, status: 'In Stock', rating: 4.5, sku: 'SLK-PQT-06', earnings: '2.1k earned', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-107', name: 'Oatmeal Merino Wool Suit', category: 'Apparel', price: 1850.00, stock: 12, status: 'In Stock', rating: 4.9, sku: 'OAT-SUI-07', earnings: '8.9k earned', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-108', name: 'Amber Glass Decanter', category: 'Home', price: 410.00, stock: 19, status: 'In Stock', rating: 4.8, sku: 'AMB-DEC-08', earnings: '3.1k earned', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-109', name: 'Tailored Velvet Tuxedo', category: 'Apparel', price: 2200.00, stock: 8, status: 'Low Stock', rating: 5.0, sku: 'VLT-TUX-09', earnings: '14.2k earned', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-110', name: 'Antique Bronze Cufflinks', category: 'Accessories', price: 310.00, stock: 30, status: 'In Stock', rating: 4.7, sku: 'BRZ-CFL-10', earnings: '1.9k earned', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgutZBTSgkkjQ5HHRMtRI6y2AribV7lvjm64iGaxlTORNr_HZ_p7cGN-0&s=10' },
  { id: 'PRD-111', name: 'Sandalwood & Fig Candle', category: 'Home', price: 65.00, stock: 120, status: 'In Stock', rating: 4.6, sku: 'SND-CAN-11', earnings: '4.5k earned', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-112', name: 'Terracotta Teaware Set', category: 'Kitchen', price: 180.00, stock: 22, status: 'In Stock', rating: 4.9, sku: 'TRC-TEA-12', earnings: '2.8k earned', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-113', name: 'Executive Saddle Briefcase', category: 'Luggage', price: 780.00, stock: 11, status: 'In Stock', rating: 4.8, sku: 'EXEC-BRF-13', earnings: '6.4k earned', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-114', name: 'Cognac Leather Loafers', category: 'Apparel', price: 450.00, stock: 16, status: 'In Stock', rating: 4.7, sku: 'CGN-LOA-14', earnings: '5.2k earned', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3DF5X80Ax6ALyC7G4Qs7-yhSmRYMH7HpwJFBdTZXvQ5-nbH3Nu9vSfsE&s=10' },
  { id: 'PRD-115', name: 'Tortoiseshell Sunglasses', category: 'Accessories', price: 390.00, stock: 0, status: 'Out of Stock', rating: 4.5, sku: 'TRT-SUN-15', earnings: '3.3k earned', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-116', name: 'Earthenware Ceramic Vase', category: 'Home', price: 210.00, stock: 14, status: 'In Stock', rating: 4.7, sku: 'ERT-VAS-16', earnings: '1.8k earned', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-117', name: 'Amber Crystal Wine Goblets', category: 'Home', price: 280.00, stock: 35, status: 'In Stock', rating: 4.9, sku: 'CRY-GLS-17', earnings: '4.1k earned', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-118', name: 'Sanjo Santoku Blade', category: 'Kitchen', price: 320.00, stock: 9, status: 'Low Stock', rating: 5.0, sku: 'SJO-SAN-18', earnings: '7.6k earned', image: 'https://sanjoblade.com/cdn/shop/products/Santoku_4-2.jpg?v=1658452254' },
  { id: 'PRD-119', name: 'Florentine Leather Tote', category: 'Luggage', price: 590.00, stock: 18, status: 'In Stock', rating: 4.8, sku: 'FLO-TOT-19', earnings: '9.2k earned', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=contain&w=600&q=80' },
  { id: 'PRD-120', name: 'Burgundy Silk Gown', category: 'Apparel', price: 2950.00, stock: 4, status: 'Low Stock', rating: 5.0, sku: 'BRG-GOW-20', earnings: '18.5k earned', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=contain&w=600&q=80' }
];

const INITIAL_ORDERS = [
  { id: 'ORD-9001', customer: 'Eleanor Vance', email: 'eleanor.v@luxmail.co', total: 2140.00, status: 'Delivered', date: '2026-10-01', items: 3, address: '742 Evergreen Terr, Springfield' },
  { id: 'ORD-9002', customer: 'Julian Sterling', email: 'julian@sterling.com', total: 1290.00, status: 'Delivered', date: '2026-10-02', items: 1, address: '120 Wall Street, New York, NY' },
  { id: 'ORD-9003', customer: 'Beatrice Dupond', email: 'b.dupond@paris-art.fr', total: 620.00, status: 'Processing', date: '2026-10-03', items: 1, address: '14 Rue de Rivoli, Paris' },
  { id: 'ORD-9004', customer: 'Marcus Thorne', email: 'mthorne@vanguard.io', total: 1795.00, status: 'Shipped', date: '2026-10-04', items: 2, address: '88 King William St, London' },
  { id: 'ORD-9005', customer: 'Seraphina Moon', email: 'seraphina@moonstudio.design', total: 450.00, status: 'Cancelled', date: '2026-10-05', items: 1, address: '450 Mission St, San Francisco, CA' },
  { id: 'ORD-9006', customer: 'Arthur Pendelton', email: 'arthur@pendelton.co', total: 3400.00, status: 'Delivered', date: '2026-10-06', items: 4, address: '10 Downing St, London' },
  { id: 'ORD-9007', customer: 'Genevieve Du Pont', email: 'genevieve@dupont.fr', total: 950.00, status: 'Processing', date: '2026-10-07', items: 2, address: '5 Avenue des Champs-Élysées, Paris' },
  { id: 'ORD-9008', customer: 'Oliver Queen', email: 'oliver@starling.net', total: 1500.00, status: 'Delivered', date: '2026-10-08', items: 1, address: '1007 Mountain Dr, Star City' },
  { id: 'ORD-9009', customer: 'Diana Prince', email: 'diana@themyscira.gov', total: 2950.00, status: 'Shipped', date: '2026-10-09', items: 2, address: '350 5th Ave, New York, NY' },
  { id: 'ORD-9010', customer: 'Bruce Wayne', email: 'bruce@wayneenterprises.com', total: 5400.00, status: 'Processing', date: '2026-10-10', items: 5, address: '1007 Greystone Manor, Gotham' },
  { id: 'ORD-9011', customer: 'Clark Kent', email: 'clark@dailyplanet.com', total: 295.00, status: 'Delivered', date: '2026-10-11', items: 1, address: '344 Clinton St, Metropolis' },
  { id: 'ORD-9012', customer: 'Barry Allen', email: 'barry@cc-pd.gov', total: 620.00, status: 'Delivered', date: '2026-10-12', items: 1, address: '144 St. Roch St, Central City' },
  { id: 'ORD-9013', customer: 'Hal Jordan', email: 'hal@ferrisair.com', total: 1290.00, status: 'Pending', date: '2026-10-13', items: 2, address: 'Coast City Airbase #4' },
  { id: 'ORD-9014', customer: 'Arthur Curry', email: 'arthur@atlantis.gov', total: 1850.00, status: 'Shipped', date: '2026-10-14', items: 1, address: 'Amnesty Bay Lighthouse' },
  { id: 'ORD-9015', customer: 'Victor Stone', email: 'victor@s.t.a.r.labs', total: 780.00, status: 'Delivered', date: '2026-10-15', items: 2, address: 'S.T.A.R. Labs, Detroit' },
  { id: 'ORD-9016', customer: 'John Constantine', email: 'john@hellblazer.co', total: 340.00, status: 'Cancelled', date: '2026-10-16', items: 1, address: 'Raven Park, London' },
  { id: 'ORD-9017', customer: 'Zatanna Zatara', email: 'zatanna@stagemagic.com', total: 980.00, status: 'Processing', date: '2026-10-17', items: 2, address: 'Broadway Theatre Dist, NY' },
  { id: 'ORD-9018', customer: 'Selina Kyle', email: 'selina@catburglar.org', total: 1500.00, status: 'Delivered', date: '2026-10-18', items: 3, address: 'East End Penthouse, Gotham' },
  { id: 'ORD-9019', customer: 'Lois Lane', email: 'lois@dailyplanet.com', total: 410.00, status: 'Shipped', date: '2026-10-19', items: 1, address: 'Metropolis Midtown' },
  { id: 'ORD-9020', customer: 'Lex Luthor', email: 'lex@luthorcorp.com', total: 4200.00, status: 'Processing', date: '2026-10-20', items: 3, address: 'Luthor Plaza Tower, Metropolis' }
];

const INITIAL_CUSTOMERS = [
  { id: 'CST-101', name: 'Eleanor Vance', email: 'eleanor.v@luxmail.co', tier: 'VIP', totalSpent: 14200.00, ordersCount: 12, lastOrder: '2026-10-20', phone: '+1 (555) 382-9102' },
  { id: 'CST-102', name: 'Julian Sterling', email: 'leo@sterling.com', tier: 'VIP', totalSpent: 28900.00, ordersCount: 24, lastOrder: '2026-10-21', phone: '+1 (555) 901-2234' },
  { id: 'CST-103', name: 'Beatrice Dupond', email: 'b.dupond@paris-art.fr', tier: 'Regular', totalSpent: 3100.00, ordersCount: 4, lastOrder: '2026-10-21', phone: '+33 1 42 68 55 00' },
  { id: 'CST-104', name: 'Marcus Thorne', email: 'mthorne@vanguard.io', tier: 'Regular', totalSpent: 5400.00, ordersCount: 7, lastOrder: '2026-10-19', phone: '+44 20 7946 0921' },
  { id: 'CST-105', name: 'Seraphina Moon', email: 'seraphina@moonstudio.design', tier: 'New', totalSpent: 450.00, ordersCount: 1, lastOrder: '2026-10-18', phone: '+1 (555) 789-4321' },
  { id: 'CST-106', name: 'Arthur Pendelton', email: 'arthur@pendelton.co', tier: 'VIP', totalSpent: 19400.00, ordersCount: 15, lastOrder: '2026-10-17', phone: '+44 20 7123 4567' },
  { id: 'CST-107', name: 'Genevieve Du Pont', email: 'genevieve@dupont.fr', tier: 'Regular', totalSpent: 4800.00, ordersCount: 6, lastOrder: '2026-10-22', phone: '+33 1 40 50 60 70' },
  { id: 'CST-108', name: 'Oliver Queen', email: 'oliver@starling.net', tier: 'VIP', totalSpent: 11200.00, ordersCount: 9, lastOrder: '2026-10-08', phone: '+1 (555) 234-5678' },
  { id: 'CST-109', name: 'Diana Prince', email: 'diana@themyscira.gov', tier: 'VIP', totalSpent: 32500.00, ordersCount: 22, lastOrder: '2026-10-09', phone: '+1 (555) 876-5432' },
  { id: 'CST-110', name: 'Bruce Wayne', email: 'bruce@wayneenterprises.com', tier: 'VIP', totalSpent: 89000.00, ordersCount: 54, lastOrder: '2026-10-10', phone: '+1 (555) 000-1111' },
  { id: 'CST-111', name: 'Clark Kent', email: 'clark@dailyplanet.com', tier: 'Regular', totalSpent: 2950.00, ordersCount: 5, lastOrder: '2026-10-11', phone: '+1 (555) 333-4444' },
  { id: 'CST-112', name: 'Barry Allen', email: 'barry@cc-pd.gov', tier: 'Regular', totalSpent: 4100.00, ordersCount: 8, lastOrder: '2026-10-12', phone: '+1 (555) 555-6666' },
  { id: 'CST-113', name: 'Hal Jordan', email: 'hal@ferrisair.com', tier: 'Regular', totalSpent: 6200.00, ordersCount: 11, lastOrder: '2026-10-13', phone: '+1 (555) 777-8888' },
  { id: 'CST-114', name: 'Arthur Curry', email: 'arthur@atlantis.gov', tier: 'VIP', totalSpent: 15400.00, ordersCount: 13, lastOrder: '2026-10-14', phone: '+1 (555) 999-0000' },
  { id: 'CST-115', name: 'Victor Stone', email: 'victor@s.t.a.r.labs', tier: 'Regular', totalSpent: 3900.00, ordersCount: 6, lastOrder: '2026-10-15', phone: '+1 (555) 123-9876' },
  { id: 'CST-116', name: 'John Constantine', email: 'john@hellblazer.co', tier: 'New', totalSpent: 340.00, ordersCount: 1, lastOrder: '2026-10-16', phone: '+44 20 7946 9999' },
  { id: 'CST-117', name: 'Zatanna Zatara', email: 'zatanna@stagemagic.com', tier: 'Regular', totalSpent: 5900.00, ordersCount: 10, lastOrder: '2026-10-17', phone: '+1 (555) 456-7890' },
  { id: 'CST-118', name: 'Selina Kyle', email: 'selina@catburglar.org', tier: 'VIP', totalSpent: 18200.00, ordersCount: 16, lastOrder: '2026-10-18', phone: '+1 (555) 654-3210' },
  { id: 'CST-119', name: 'Lois Lane', email: 'lois@dailyplanet.com', tier: 'Regular', totalSpent: 4200.00, ordersCount: 7, lastOrder: '2026-10-19', phone: '+1 (555) 789-0123' },
  { id: 'CST-120', name: 'Lex Luthor', email: 'lex@luthorcorp.com', tier: 'VIP', totalSpent: 65400.00, ordersCount: 38, lastOrder: '2026-10-20', phone: '+1 (555) 321-9870' }
];

const INITIAL_REVIEWS = [
  { id: 'REV-01', customer: 'Eleanor Vance', product: 'Terracotta Linen Overcoat', rating: 5.0, comment: 'Exquisite craftsmanship and stunning earthy tone. Arrived in pristine packaging.', date: '2026-10-21', status: 'Approved' },
  { id: 'REV-02', customer: 'Julian Sterling', product: 'Brushed Gold Chronograph', rating: 4.8, comment: 'A magnificent timepiece. Fits impeccably and keeps precise atomic time.', date: '2026-10-20', status: 'Approved' },
  { id: 'REV-03', customer: 'Beatrice Dupond', product: 'Sovereign Saddle Leather Duffel', rating: 4.9, comment: 'The finest leather I have ever handled. Perfect companion for weekend getaways.', date: '2026-10-19', status: 'Approved' },
  { id: 'REV-04', customer: 'Marcus Thorne', product: 'Forged Damask Chef Knife', rating: 5.0, comment: 'Razor-sharp edge right out of the box. A true masterpiece in the kitchen.', date: '2026-10-18', status: 'Approved' },
  { id: 'REV-05', customer: 'Seraphina Moon', product: 'Minimalist Brass Task Lamp', rating: 4.6, comment: 'Gives off a gorgeous warm reading light. Fits our study aesthetic wonderfully.', date: '2026-10-18', status: 'Approved' },
  { id: 'REV-06', customer: 'Arthur Pendelton', product: 'Oatmeal Merino Wool Suit', rating: 5.0, comment: 'Luxuriously soft and drapes with absolute perfection.', date: '2026-10-17', status: 'Approved' },
  { id: 'REV-07', customer: 'Genevieve Du Pont', product: 'Tuscan Silk Pocket Square', rating: 4.7, comment: 'Impeccable hem work and rich tactile texture.', date: '2026-10-16', status: 'Approved' },
  { id: 'REV-08', customer: 'Oliver Queen', product: 'Terracotta Teaware Set', rating: 4.8, comment: 'Minimalist perfection. Every guest compliments this set.', date: '2026-10-15', status: 'Approved' },
  { id: 'REV-09', customer: 'Diana Prince', product: 'Amber Glass Decanter', rating: 5.0, comment: 'Breathtaking clarity and weight. A true statement piece.', date: '2026-10-14', status: 'Approved' },
  { id: 'REV-10', customer: 'Bruce Wayne', product: 'Tailored Velvet Tuxedo', rating: 5.0, comment: 'Unrivaled bespoke quality off-the-rack. Simply stunning.', date: '2026-10-13', status: 'Approved' },
  { id: 'REV-11', customer: 'Clark Kent', product: 'Sandalwood & Fig Candle', rating: 4.5, comment: 'Subtle and relaxing scent that fills the apartment.', date: '2026-10-12', status: 'Approved' },
  { id: 'REV-12', customer: 'Barry Allen', product: 'Tortoiseshell Sunglasses', rating: 4.4, comment: 'Light as a feather and extremely durable frames.', date: '2026-10-11', status: 'Approved' },
  { id: 'REV-13', customer: 'Hal Jordan', product: 'Executive Saddle Briefcase', rating: 4.9, comment: 'Sturdy hardware and gorgeous rich leather patina.', date: '2026-10-10', status: 'Approved' },
  { id: 'REV-14', customer: 'Arthur Curry', product: 'Earthenware Ceramic Vase', rating: 4.7, comment: 'Stunning glaze texture. Looks wonderful with pampas grass.', date: '2026-10-09', status: 'Approved' },
  { id: 'REV-15', customer: 'Victor Stone', product: 'Amber Crystal Wine Goblets', rating: 5.0, comment: 'Resonant crystal ring and elegant stem shape.', date: '2026-10-08', status: 'Approved' },
  { id: 'REV-16', customer: 'John Constantine', product: 'Sanjo Santoku Blade', rating: 4.8, comment: 'Cuts through root vegetables like butter.', date: '2026-10-07', status: 'Approved' },
  { id: 'REV-17', customer: 'Zatanna Zatara', product: 'Florentine Leather Tote', rating: 4.9, comment: 'Spacious and effortlessly elegant for daily travel.', date: '2026-10-06', status: 'Approved' },
  { id: 'REV-18', customer: 'Selina Kyle', product: 'Burgundy Silk Gown', rating: 5.0, comment: 'Drapes like liquid silk. Absolute showstopper.', date: '2026-10-05', status: 'Approved' },
  { id: 'REV-19', customer: 'Lois Lane', product: 'Antique Bronze Cufflinks', rating: 4.6, comment: 'Classic understated elegance.', date: '2026-10-04', status: 'Approved' },
  { id: 'REV-20', customer: 'Lex Luthor', product: 'Nordic Oak Lounge Chair', rating: 5.0, comment: 'Ergonomic masterpiece and gorgeous natural grain wood.', date: '2026-10-03', status: 'Approved' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('amazonproducts')) || INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('amazonorders')) || INITIAL_ORDERS);
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('amazoncustomers')) || INITIAL_CUSTOMERS);
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('amazonreviews')) || INITIAL_REVIEWS);

  useEffect(() => { localStorage.setItem('amazonproducts', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('amazonorders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('amazoncustomers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('amazonreviews', JSON.stringify(reviews)); }, [reviews]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const toggleLoadingState = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
    addToast('Synchronizing enterprise data nodes...', 'info');
  };

  const toggleErrorState = () => {
    setHasError(prev => !prev);
    addToast(hasError ? 'System connection restored.' : 'Simulated gateway timeout error.', hasError ? 'success' : 'error');
  };

  return (
    <div className="w-screen h-screen bg-[#2C2421] text-[#2C2421] font-sans flex items-center justify-center p-0 m-0 overflow-hidden antialiased selection:bg-[#C86D51] selection:text-white">
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
        {toasts.map(toast => (
          <div key={toast.id} className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl border shadow-lg transition-all duration-300 ${toast.type === 'success' ? 'bg-white border-[#EFECE6] text-[#2C2421]' : toast.type === 'error' ? 'bg-white border-rose-200 text-rose-900' : toast.type === 'warning' ? 'bg-white border-amber-200 text-amber-900' : 'bg-white border-[#EFECE6] text-[#2C2421]'}`}>
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-[#C86D51] shrink-0" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-[#C86D51] shrink-0" />}
              <p className="text-sm font-medium tracking-tight">{toast.message}</p>
            </div>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-zinc-400 hover:text-zinc-900 ml-3"><X className="w-4 h-4" /></button>
          </div>
        ))}
      </div>

      <div className="w-full h-full bg-[#2C2421] flex flex-col md:flex-row overflow-hidden relative">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden absolute top-3 left-3 z-50 bg-[#C86D51] text-white p-2.5 rounded-xl shadow-lg" aria-label="Toggle Menu">
          <Menu className="w-5 h-5" />
        </button>

        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen}
          productsCount={products.length}
          ordersCount={orders.length}
          customersCount={customers.length}
          reviewsCount={reviews.length}
          toggleLoadingState={toggleLoadingState}
          toggleErrorState={toggleErrorState}
          hasError={hasError}
          isLoading={isLoading}
          addToast={addToast}
        />

        <div className="flex-1 bg-[#FDFBF7] flex flex-col overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl border-2 border-[#C86D51] border-t-transparent animate-spin"></div>
              <p className="text-xs font-semibold text-[#2C2421] tracking-wide animate-pulse">SYNCHRONIZING ENTERPRISE NODES...</p>
            </div>
          )}

          {hasError ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white m-6 rounded-3xl border border-rose-200">
              <ShieldAlert className="w-10 h-10 text-rose-500 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Gateway Connection Interrupted</h3>
              <p className="text-xs text-slate-500 mb-5">A simulated connection timeout occurred while communicating with regional hubs.</p>
              <button onClick={() => setHasError(false)} className="bg-[#C86D51] text-white px-5 py-2.5 rounded-xl text-xs font-medium">Reconnect</button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
              {activeTab === 'dashboard' && <DashboardView products={products} orders={orders} customers={customers} setActiveTab={setActiveTab} />}
              {activeTab === 'products' && <ProductsView products={products} setProducts={setProducts} addToast={addToast} />}
              {activeTab === 'orders' && <OrdersView orders={orders} />}
              {activeTab === 'customers' && <CustomersView customers={customers} />}
              {activeTab === 'reviews' && <ReviewsView reviews={reviews} />}
              {activeTab === 'settings' && <SettingsView addToast={addToast} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
`;
document.head.appendChild(styleTag);