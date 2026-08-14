"use client";

import React, { useRef, useState, useEffect } from 'react';

export default function AnimatedNumber({ value, prefix = "", suffix = "", isFloat = false }: { value: number, prefix?: string, suffix?: string, isFloat?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let startTimestamp: number;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = easeProgress * value;
        
        if (isFloat) {
          setDisplayValue(currentVal.toFixed(1).replace('.', ','));
        } else {
          setDisplayValue(Math.round(currentVal).toString());
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          if (isFloat) {
            setDisplayValue(value.toFixed(1).replace('.', ','));
          } else {
            setDisplayValue(value.toString());
          }
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isVisible, value, isFloat]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}
