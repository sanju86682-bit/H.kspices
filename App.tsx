
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

type Page = 'home' | 'shop' | 'about' | 'profile';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Profile State
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('hk_user_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      address: ''
    };
  });

  // Auto-save profile to localStorage
  useEffect(() => {
    localStorage.setItem('hk_user_profile', JSON.stringify(profile));
  }, [profile]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))], []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const navigateToShop = useCallback((category: string = 'All') => {
    setActiveCategory(category);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToAbout = useCallback(() => {
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToProfile = useCallback(() => {
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigateHome={navigateToHome}
        onNavigateShop={() => navigateToShop('All')}
        onNavigateAbout={navigateToAbout}
        onNavigateProfile={navigateToProfile}
      />

      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section className="w-full flex justify-center py-6 px-4 md:px-10">
            <div className="max-w-[1280px] w-full fade-in-up">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl min-h-[500px] md:min-h-[600px] flex items-center bg-cover bg-center group" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAW7gQbdPRnEtKtyG_htV_U6Aax_72g1aSsvxl1k55ZILawRbmxV-xQ10qdo0TCs5xJLWnCa-pL4vYkzsKOmt3hy4f_KNtkZ8NOD-vN9OqVZPS_LxlEwEJoY9tsglmUSitLn1x7pMBApw_R3DvFEY3HKxYGtodtszsNiF__Q67vW0QxOn3u8pE6XnzGtEVINqoLxFjVklZeilPyBowBFVk4dkFb9rwm8ygxjOBFgG_A6ootvQ7-XjONWdRVJW3nHLOAVfL0BcbNyyM")` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                <div className="relative z-10 flex flex-col gap-6 px-6 md:px-16 max-w-[800px]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white w-fit">
                    <span className="material-symbols-outlined text-sm">health_and_safety</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Achi Health, Every Ghar</span>
                  </div>
                  <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-sm">
                    Purity in Every Pinch,<br/> <span className="text-primary">Health in Every Home.</span>
                  </h1>
                  <h2 className="text-gray-100 text-lg md:text-xl font-normal leading-relaxed max-w-[600px] drop-shadow-sm">
                    H.K. Spices brings you hand-picked ingredients and wood-pressed oils. We are committed to delivering 0% adulteration for your family's well-being.
                  </h2>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button 
                      onClick={() => navigateToShop('All')}
                      className="h-12 px-8 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-base tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-primary/30 flex items-center gap-2"
                    >
                      Shop Now
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                    <button onClick={navigateToAbout} className="h-12 px-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-base tracking-wide transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined">history</span>
                      Our 30 Year Legacy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-12 px-4 md:px-10 flex justify-center" id="categories">
            <div className="max-w-[1280px] w-full flex flex-col gap-8">
              <div className="flex justify-between items-end fade-in-up">
                <div>
                  <h2 className="text-text-main text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
                  <p className="text-text-muted">Essentials for every healthy meal.</p>
                </div>
                <button 
                  onClick={() => navigateToShop('All')}
                  className="hidden md:flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all"
                >
                  View All Categories <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up">
                {[
                  { title: 'Spices', desc: 'Hand-ground blends for perfect curry.', btn: 'Explore Spices', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6WveFR00ZeJkk2Z_e-luvldyTjMtdj-0GIfujsPUonGOh2Z9evAvmzokFcmlPEmD21bQxCXhLEnPTvfgyqez8tyjzT0BokHdxUcc5TrPoRzCXTRWOPjH0Qd1ppK6YQDQEky9qI3bSa8SRMwsQyt0tvM57-5fRsyw8Kj514P6ZdQNc9rEgC3ZlYXHyTl-gtVSTIAJas3ElKv_kFgcdMnQFLkVVnEapFAU5F5nHchcf1aXqj0QQn-Tvi3h9DkW1d_RI0DyatP5DNMM' },
                  { title: 'Oils', desc: 'Cold-pressed purity from premium seeds.', btn: 'Explore Oils', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu5r9dJwo-dvs1D1hLdykyRTQ7I3IxVnvtsEW9J-ZqbenET4VJv9me8JK3cA9C7l14D0LqIFPzQ2P-yLxBYXf18TWr2NZ6kILkfaD1OQIllzEgMEztUg_YuEaPS8Dvhv-LkuFrdBT99_Ra0USeeGcby_eusgICS-oxOaWBByLKve4BO57G64b_2sUk9pp5B8heWAHVu7Xc1bsg5n9_l6Wkjo9y5mp5bBE7FUCgxHMgN9TacR60G5PlPcYythSNm25eTLRIGNKULXU' },
                  { title: 'Essentials', desc: 'Daily premium raw materials.', btn: 'Shop Essentials', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVA3vMltnpyvVT50804ryIvPyh6dv5fx6Fgal8mPGVhBGn6oytJX8ZFKd8JQXkF5pNPCzFCfWjjgtR53ZtBSjcaoZYq7eKTSZNbfXqbWX2pM0p2Sq2296opKXb6u8SmBCe1AQU6SGdVIBM-EXhTf_q9tQfdUfHjINCE5bqowDCOnlSG5YPGDlMGmVaRt_rUA1paqh5dCVn3nbhJcdiO5-HrvvMMCZPodEhbes7_nG54oo0HFuCDPEalxE3EVVggLJxe0vU2zJqFqw' }
                ].map((cat, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigateToShop(cat.title)}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${cat.img}")` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-white text-2xl font-bold mb-1">{cat.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{cat.desc}</p>
                      <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full w-fit">{cat.btn}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-[#fcfbf9] border-y border-[#f4f3f0]" id="features">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10">
              <div className="text-center max-w-2xl mx-auto mb-12 fade-in-up">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Why Families Trust H.K. Spices</h2>
                <p className="text-text-muted">Achi Health begins with pure ingredients. We ensure every home gets the highest quality spices and oils.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: 'verified_user', title: '100% Pure & Lab Tested', desc: 'Zero artificial colors or preservatives. Certified quality.', color: 'primary' },
                  { icon: 'agriculture', title: 'Sourced from Farms', desc: 'Directly procured from select farms across India.', color: 'accent-olive' },
                  { icon: 'science', title: 'Traditional Processing', desc: 'Cold-pressed oils and stone-ground spices.', color: 'primary' },
                  { icon: 'local_shipping', title: 'Hygienic Delivery', desc: 'Vacuum sealed packaging for lasting freshness.', color: 'accent-olive' }
                ].map((feat, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 fade-in-up">
                    <div className={`size-16 rounded-full flex items-center justify-center ${feat.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent-olive/10 text-accent-olive'}`}>
                      <span className="material-symbols-outlined text-4xl">{feat.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{feat.title}</h3>
                      <p className="text-sm text-text-muted">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === 'shop' && (
        <section className="py-12 px-4 md:px-10 flex justify-center min-h-[60vh]">
          <div className="max-w-[1280px] w-full fade-in-up">
            <div className="mb-10">
              <button 
                onClick={navigateToHome}
                className="flex items-center gap-2 text-text-muted hover:text-primary mb-4 transition-colors font-medium"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Home
              </button>
              <h1 className="text-4xl font-black mb-6">Explore Purity</h1>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                      activeCategory === cat 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-white border-gray-200 text-text-muted hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">inventory_2</span>
                <p className="text-text-muted text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {currentPage === 'about' && (
        <section className="flex flex-col items-center">
          {/* About Hero */}
          <div className="w-full bg-background-dark py-24 px-4 md:px-10 text-center text-white">
            <div className="max-w-4xl mx-auto space-y-6 fade-in-up">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">H.K. Spices: Since 1994</span>
              <h1 className="text-5xl md:text-7xl font-black">30 Years of Purity</h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                What started as H.K.'s small local mill has grown into a legacy of trust and "Achi Health" for families across the nation.
              </p>
            </div>
          </div>

          {/* Legacy Story */}
          <div className="max-w-[1280px] py-20 px-4 md:px-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 fade-in-up">
              <h2 className="text-4xl font-bold text-text-main">A Journey Rooted in Health</h2>
              <p className="text-text-muted text-lg leading-relaxed">
                Three decades ago, H.K. set out with a simple mission: to ensure every home has access to spices and oils that aren't just flavorful, but fundamentally healthy. 
              </p>
              <div className="p-8 bg-primary/5 border-l-4 border-primary rounded-r-xl italic text-text-main">
                "Our promise is simple: Achi health, every ghar. We treat your kitchen like our own."
              </div>
              <p className="text-text-muted text-lg leading-relaxed">
                H.K. Spices continues to use stone-grinding and wood-pressing methods because we believe that some things shouldn't be rushed. Purity takes time.
              </p>
            </div>
            <div className="relative fade-in-up">
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
                alt="H.K. Spices Heritage" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-2xl shadow-xl z-20">
                <div className="text-4xl font-black">30+</div>
                <div className="text-sm font-bold uppercase tracking-wider">Years of Trust</div>
              </div>
            </div>
          </div>

          {/* Our Vishwas Section */}
          <div className="w-full bg-[#f8f5f0] py-20 px-4 md:px-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="fade-in-up">
                <h2 className="text-4xl font-bold text-text-main mb-6">Hamara Vishwas, Aapki Sehat</h2>
                <p className="text-text-muted text-lg">
                  At H.K. Spices, "Vishwas" (Trust) is our biggest asset. We believe that when you choose us, you're choosing health for your family.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-4xl text-primary mb-4">handshake</span>
                  <h4 className="font-bold text-xl mb-2">People First</h4>
                  <p className="text-sm text-text-muted">We build relationships, ensuring every ghar gets the best of H.K.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-4xl text-primary mb-4">transcribe</span>
                  <h4 className="font-bold text-xl mb-2">Total Honesty</h4>
                  <p className="text-sm text-text-muted">We are open about our traditional methods and farm sourcing.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-4xl text-primary mb-4">volunteer_activism</span>
                  <h4 className="font-bold text-xl mb-2">Achi Health</h4>
                  <p className="text-sm text-text-muted">Our core value is promoting health through pure, natural spices.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="py-24 text-center space-y-8 fade-in-up">
            <h2 className="text-3xl font-bold">Bring H.K. Spices to Your Kitchen</h2>
            <button 
              onClick={() => navigateToShop('All')}
              className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
            >
              Start Shopping
            </button>
          </div>
        </section>
      )}

      {currentPage === 'profile' && (
        <section className="flex flex-col items-center py-12 px-4 md:px-10 bg-[#fcfbf9] min-h-[80vh]">
          <div className="max-w-4xl w-full fade-in-up">
            <div className="flex items-center gap-4 mb-8">
               <button onClick={navigateToHome} className="p-2 hover:bg-white rounded-full transition-all">
                  <span className="material-symbols-outlined">arrow_back</span>
               </button>
               <h1 className="text-3xl font-black">My Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card Sidebar */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#f4f3f0] h-fit sticky top-24">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="size-24 rounded-full bg-primary/10 text-primary flex items-center justify-center border-4 border-white shadow-lg">
                    {profile.name ? (
                      <span className="text-3xl font-black uppercase">{profile.name.charAt(0)}</span>
                    ) : (
                      <span className="material-symbols-outlined text-5xl">person</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{profile.name || 'Guest User'}</h3>
                    <p className="text-sm text-text-muted">{profile.email || 'Complete your profile'}</p>
                  </div>
                  <div className="w-full pt-4 border-t border-gray-50">
                     <div className="flex justify-between items-center text-sm py-2">
                        <span className="text-text-muted">Member Since</span>
                        <span className="font-bold">2024</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Edit Details Area */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#f4f3f0]">
                  <div className="flex items-center justify-between mb-8">
                     <h2 className="text-xl font-bold">Account Details</h2>
                     <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-accent-olive bg-accent-olive/10 px-3 py-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">sync</span>
                        Auto-saving enabled
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={profile.name}
                        onChange={handleProfileChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={profile.email}
                        onChange={handleProfileChange}
                        placeholder="rahul@example.com"
                        className="w-full h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={profile.phone}
                        onChange={handleProfileChange}
                        placeholder="+91 00000 00000"
                        className="w-full h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Delivery Address</label>
                      <textarea 
                        name="address" 
                        value={profile.address}
                        onChange={handleProfileChange}
                        rows={3}
                        placeholder="Enter your home or office address for faster checkout"
                        className="w-full px-4 py-3 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#f4f3f0]">
                   <h2 className="text-xl font-bold mb-6">Order History</h2>
                   <div className="flex flex-col items-center justify-center py-10 text-center">
                      <span className="material-symbols-outlined text-4xl text-gray-200 mb-4">receipt_long</span>
                      <p className="text-text-muted">No orders found yet. <button onClick={() => navigateToShop()} className="text-primary font-bold">Start shopping</button></p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-text-main text-white px-4 md:px-10 mt-auto">
        <div className="max-w-[1280px] mx-auto rounded-3xl bg-white/5 border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Join the H.K. Spices Family</h2>
            <p className="text-gray-400 max-w-md text-lg">Get healthy recipes and wellness tips delivered to your inbox.</p>
          </div>
          <div className="flex-1 w-full max-w-md">
            <form className="flex flex-col gap-3">
              <input className="w-full h-14 px-6 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-all" placeholder="Enter your email address" type="email"/>
              <button className="w-full h-14 rounded-lg bg-primary hover:bg-primary-dark text-text-main font-bold text-lg transition-colors shadow-lg" type="button">Subscribe Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-white border-t border-[#f4f3f0] pt-16 pb-8 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-text-main">
              <div className="size-8 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">local_dining</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">H.K. Spices</h2>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none mt-1">Achi Health, Every Ghar</p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Committed to bringing the purest taste of tradition and health to every Indian household.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><button onClick={navigateToHome} className="hover:text-primary transition-colors">Home</button></li>
              <li><button onClick={() => navigateToShop('Spices')} className="hover:text-primary transition-colors">Pure Spices</button></li>
              <li><button onClick={() => navigateToShop('Oils')} className="hover:text-primary transition-colors">Wood Pressed Oils</button></li>
              <li><button onClick={navigateToAbout} className="hover:text-primary transition-colors">H.K. Legacy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><button onClick={navigateToProfile} className="hover:text-primary transition-colors">My Profile</button></li>
              <li><a className="hover:text-primary" href="#">Track Your Order</a></li>
              <li><a className="hover:text-primary" href="#">Shipping Details</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-6">Contact H.K.</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">call</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span>contact@hkspices.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto pt-8 border-t border-[#f4f3f0] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© 2023 H.K. Spices & Oils. Achi Health, Every Ghar.</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
