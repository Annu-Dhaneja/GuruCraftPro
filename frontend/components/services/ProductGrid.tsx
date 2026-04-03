"use client";

  import { ShoppingCart, ArrowRight, Tag } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { getApiUrl } from "@/lib/utils";
  import { motion } from "framer-motion";

  interface Product {
    id: string | number;
    title: string;
    price: string;
    priceType?: string;
    description: string;
    image: string;
    subCategory?: string;
    tags?: string;
    status?: string;
  }

  export function ProductGrid({ products }: { products?: Product[] }) {
    if (!products || products.length === 0) return null;

    // Only show active (or undefined-status) products
    const visibleProducts = products.filter(p => !p.status || p.status === 'active');
    if (visibleProducts.length === 0) return null;

    return (
      <section className="py-28 bg-gradient-to-b from-slate-50/0 via-indigo-50/30 to-slate-50/0 dark:from-transparent dark:via-indigo-950/10 dark:to-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
                <Tag className="w-3 h-3" /> Divine Collection
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">Premium Store</span>
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                Curated spiritual art and premium design assets — crafted with purpose.
              </p>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm cursor-pointer hover:underline group">
              View all products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/80 dark:border-slate-800 p-2 overflow-hidden hover:shadow-[0_20px_60px_rgba(79,70,229,0.12)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={product.image?.startsWith('http') || product.image?.startsWith('/') ? product.image : getApiUrl(product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598965394087-b7c34e92e85c?w=400&q=80'; }}
                  />

                  {/* Price Type Badge */}
                  {product.priceType && (
                    <div className="absolute top-3 left-3">
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border shadow-lg ${
                        product.priceType === 'Free' ? 'bg-emerald-500/90 text-white border-emerald-400/50' :
                        product.priceType === 'Subscription' ? 'bg-purple-500/90 text-white border-purple-400/50' :
                        product.priceType === 'Custom' ? 'bg-amber-500/90 text-white border-amber-400/50' :
                        'bg-white/90 text-indigo-700 border-indigo-100'
                      }`}>
                        {product.priceType}
                      </div>
                    </div>
                  )}

                  {/* Live Status Dot */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-md rounded-full px-2 py-1 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,1)] animate-pulse" />
                    <span className="text-white text-[8px] font-black uppercase tracking-widest">Live</span>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <Button size="sm" className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-2xl rounded-full px-6 font-bold transition-transform translate-y-4 group-hover:translate-y-0 duration-500">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col items-start text-left">
                  {product.subCategory && (
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1 block">{product.subCategory}</span>
                  )}
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Tags */}
                  {product.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {String(product.tags).split(',').filter(Boolean).slice(0, 3).map((tag: string, ti: number) => (
                        <span key={ti} className="text-[8px] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto w-full pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest block mb-0.5">Price</span>
                      <span className="text-xl font-black text-indigo-600">{product.price}</span>
                    </div>
                    <Button size="icon" className="rounded-full bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white transition-all transform hover:rotate-12 shadow-lg">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
