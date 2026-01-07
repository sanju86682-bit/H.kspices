
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateAbout: () => void;
  onNavigateProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onOpenCart, 
  onNavigateHome, 
  onNavigateShop, 
  onNavigateAbout,
  onNavigateProfile 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#f4f3f0]">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-text-main hover:opacity-80 transition-opacity cursor-pointer group"
        >
          <div className="size-10 flex items-center justify-center text-primary bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-3xl">local_dining</span>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight leading-none">H.K. Spices</h2>
            <p className="text-[9px] md:text-[10px] text-primary font-bold uppercase tracking-[0.2em] leading-none mt-1">Achi Health, Every Ghar</p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={onNavigateHome} className="text-sm font-semibold hover:text-primary transition-colors">Home</button>
          <button onClick={onNavigateShop} className="text-sm font-semibold hover:text-primary transition-colors">Shop</button>
          <button onClick={onNavigateAbout} className="text-sm font-semibold hover:text-primary transition-colors">Our Legacy</button>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#best-sellers">Best Sellers</a>
        </nav>

        <div className="flex gap-2 md:gap-3">
          <button className="flex items-center justify-center size-10 rounded-full bg-background-light hover:bg-primary/20 text-text-main hover:text-primary transition-all duration-300">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          <button 
            onClick={onOpenCart}
            className="flex items-center justify-center size-10 rounded-full bg-background-light hover:bg-primary/20 text-text-main hover:text-primary transition-all duration-300 relative"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={onNavigateProfile}
            className="flex items-center justify-center size-10 rounded-full bg-background-light hover:bg-primary/20 text-text-main hover:text-primary transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
