"use client";

  import { ShoppingCart, ArrowRight, Star } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { getApiUrl } from "@/lib/utils";
  import { motion } from "framer-motion";

  interface Product {
    id: string | number;
    title: string;
    price: string;
    description: string;
    image: string;
  }

  export function ProductGrid({ products }: { products?: Product[] }) {
    if (!products || products.length === 0) return null;

    return (
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Premium Store
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our curated collection of spiritual art and premium design assets.
              </p>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm cursor-pointer hover:underline group">
              View all products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={product.image?.startsWith('http') || product.image?.startsWith('/') ? product.image : getApiUrl(product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 shadow-sm flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-indigo-600" />
                      NEW ARRIVAL
                    </div>
                  </div>
                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="bg-white text-indigo-600 hover:bg-white/90 shadow-xl rounded-full px-6 transition-transform translate-y-4 group-hover:translate-y-0 duration-500">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col items-start text-left">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 h-8">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto w-full pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-0.5">Price</span>
                      <span className="text-xl font-black text-indigo-600">{product.price}</span>
                    </div>
                    <Button size="icon" className="rounded-full bg-slate-900 hover:bg-indigo-600 text-white transition-all transform hover:rotate-12">
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
