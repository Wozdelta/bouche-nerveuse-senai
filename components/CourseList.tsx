"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Filter, PlayCircle, Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function CourseList() {
  const [cursoFiltro, setCursoFiltro] = useState('Todos');

  const cursos = [
    {
      id: 1,
      titulo: 'Libras Básico para Atendimento',
      categoria: 'Libras',
      duracao: '4h 30m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Libras Básico para Atendimento.png',
      modulos: 12
    },
    {
      id: 2,
      titulo: 'Comunicação Inclusiva no Trabalho',
      categoria: 'Diversidade',
      duracao: '2h 15m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Comunicação Inclusiva no Trabalho.png',
      modulos: 6
    },
    {
      id: 3,
      titulo: 'Liderança e Equidade de Gênero',
      categoria: 'Liderança',
      duracao: '3h 45m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Liderança e Equidade de Gênero.png',
      modulos: 8
    },
    {
      id: 4,
      titulo: 'Combate ao Capacitismo',
      categoria: 'Diversidade',
      duracao: '1h 50m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Combate ao Capacitismo.png',
      modulos: 5
    },
    {
      id: 5,
      titulo: 'Libras Intermediário: Contexto Gastronômico',
      categoria: 'Libras',
      duracao: '5h 20m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Libras Intermediário Contexto Gastronômico.png',
      modulos: 15
    },
    {
      id: 6,
      titulo: 'Vieses Inconscientes na Contratação',
      categoria: 'Liderança',
      duracao: '2h 30m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Vieses Inconscientes na Contratação.png',
      modulos: 7
    }
  ];

  const categorias = ['Todos', 'Libras', 'Diversidade', 'Liderança'];

  const cursosFiltrados = cursoFiltro === 'Todos' 
    ? cursos 
    : cursos.filter((curso: any) => curso.categoria === cursoFiltro);

  return (
    <section className="mt-24 mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-serif font-bold text-brown-dark mb-4">Plataforma de Cursos</h2>
          <p className="text-gray-600 max-w-2xl text-lg">
            Explore nossos treinamentos online disponíveis para todos os colaboradores.
          </p>
        </div>
        
        {/* Filtros */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter size={20} className="text-gray-400 mr-2 shrink-0" />
          {categorias.map(categoria => (
            <button
              key={categoria}
              onClick={() => setCursoFiltro(categoria)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                cursoFiltro === categoria 
                  ? 'bg-wine text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-wine/50 hover:text-wine'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cursosFiltrados.map((curso: any) => (
          <div key={curso.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={curso.imagem} 
                alt={curso.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <PlayCircle size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-wine uppercase tracking-wider">
                {curso.categoria}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-brown-dark mb-2 line-clamp-2">
                {curso.titulo}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Com {curso.instrutor}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-wine/70" />
                    <span>{curso.duracao}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-wine/70" />
                    <span>{curso.modulos} mód.</span>
                  </div>
                </div>
                <button className="text-wine hover:text-wine-light font-medium text-sm flex items-center gap-1 transition-colors">
                  Acessar <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {cursosFiltrados.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-500 text-lg">Nenhum curso encontrado para esta categoria.</p>
        </div>
      )}
    </section>
  );
}
