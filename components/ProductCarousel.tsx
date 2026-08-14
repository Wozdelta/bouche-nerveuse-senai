"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isDragging || isHovering) return;
    
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 404, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isDragging, isHovering]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'auto';
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovering(false);
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (carouselRef.current) {
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="relative group/carousel">
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-12 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Card 1 */}
        <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
          <Image src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop" alt="Bolo de Chocolate" fill sizes="(max-width: 768px) 100vw, 380px" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="font-serif text-3xl font-bold mb-2">Bolo de Chocolate</h3>
            <p className="text-white/80 font-light">Recheio cremoso & cobertura premium</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
          <Image src="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=600&auto=format&fit=crop" alt="Brigadeiro Gourmet" fill sizes="(max-width: 768px) 100vw, 380px" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="font-serif text-3xl font-bold mb-2">Brigadeiro Gourmet</h3>
            <p className="text-white/80 font-light">Feito na hora • 12 sabores</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
          <Image src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop" alt="Cheesecake Morango" fill sizes="(max-width: 768px) 100vw, 380px" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="font-serif text-3xl font-bold mb-2">Cheesecake Morango</h3>
            <p className="text-white/80 font-light">Frutas frescas & calda artesanal</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
          <Image src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop" alt="Donuts" fill sizes="(max-width: 768px) 100vw, 380px" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="font-serif text-3xl font-bold mb-2">Donuts</h3>
            <p className="text-white/80 font-light">Massa fofinha & coberturas exclusivas</p>
          </div>
        </div>
        {/* Card 5 */}
        <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
          <Image src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop" alt="Brownie Especial" fill sizes="(max-width: 768px) 100vw, 380px" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="font-serif text-3xl font-bold mb-2">Brownie Especial</h3>
            <p className="text-white/80 font-light">Nozes & chocolate belga</p>
          </div>
        </div>
      </div>
      {/* Arrows */}
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-brown hover:bg-wine hover:text-white transition-colors z-10 opacity-0 group-hover/carousel:opacity-100 hidden md:flex">
        <ChevronLeft size={32} />
      </button>
      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-brown hover:bg-wine hover:text-white transition-colors z-10 opacity-0 group-hover/carousel:opacity-100 hidden md:flex">
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
