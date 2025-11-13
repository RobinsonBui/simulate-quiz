#!/usr/bin/env node

/**
 * Script para extraer todas las preguntas con imágenes del archivo questions.json
 * Uso: node extract-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer el archivo JSON
const questionsPath = path.join(__dirname, 'src', 'database', 'questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Filtrar preguntas con imágenes externas
const questionsWithImages = questions.filter(q => q.imagen && q.imagen.startsWith('http'));

console.log('═══════════════════════════════════════════════════════════════');
console.log('📸 LISTA DE PREGUNTAS CON IMÁGENES EXTERNAS');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log(`Total encontradas: ${questionsWithImages.length} preguntas\n`);

// Agrupar por bloque
const byBloque = {};
questionsWithImages.forEach(q => {
  if (!byBloque[q.bloque]) {
    byBloque[q.bloque] = [];
  }
  byBloque[q.bloque].push(q);
});

// Mostrar por categoría
Object.entries(byBloque).forEach(([bloque, preguntas]) => {
  console.log(`\n${'─'.repeat(70)}`);
  console.log(`📁 ${bloque.toUpperCase()} (${preguntas.length} imágenes)`);
  console.log('─'.repeat(70));
  
  preguntas.forEach((q, index) => {
    console.log(`\n${index + 1}. ID: ${q.id}`);
    console.log(`   Tema: ${q.tema}`);
    console.log(`   Pregunta: ${q.pregunta}`);
    console.log(`   URL: ${q.imagen}`);
    
    // Extraer nombre del archivo de la URL
    const urlParts = q.imagen.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const extension = fileName.includes('.png') ? 'png' : 'jpg';
    const suggestedName = `${q.id}.${extension}`;
    
    console.log(`   📝 Nombre sugerido: ${suggestedName}`);
  });
});

// Generar archivo CSV para fácil importación
const csvLines = ['ID,Bloque,Tema,Pregunta,URL_Original,Nombre_Sugerido'];
questionsWithImages.forEach(q => {
  const extension = q.imagen.includes('.png') ? 'png' : 'jpg';
  const suggestedName = `${q.id}.${extension}`;
  const preguntaClean = q.pregunta.replace(/"/g, '""'); // Escapar comillas
  csvLines.push(`"${q.id}","${q.bloque}","${q.tema}","${preguntaClean}","${q.imagen}","${suggestedName}"`);
});

const csvPath = path.join(__dirname, 'imagenes-lista.csv');
fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('✅ RESUMEN');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`Total de imágenes a reemplazar: ${questionsWithImages.length}`);
console.log(`Archivo CSV generado: ${csvPath}`);
console.log('\n💡 Siguiente paso:');
console.log('   1. Descarga las imágenes desde las URLs listadas');
console.log('   2. Guárdalas en: public/images/questions/');
console.log('   3. Usa los nombres sugeridos para cada archivo');
console.log('   4. Ejecuta el script de reemplazo (próximo paso)\n');

// Generar script de descarga (bash)
const downloadScript = ['#!/bin/bash', '', '# Script para descargar todas las imágenes', 'mkdir -p public/images/questions', ''];
questionsWithImages.forEach(q => {
  const extension = q.imagen.includes('.png') ? 'png' : 'jpg';
  const suggestedName = `${q.id}.${extension}`;
  downloadScript.push(`echo "Descargando ${q.id}..."`);
  downloadScript.push(`curl -L "${q.imagen}" -o "public/images/questions/${suggestedName}"`);
  downloadScript.push('');
});

const downloadScriptPath = path.join(__dirname, 'download-images.sh');
fs.writeFileSync(downloadScriptPath, downloadScript.join('\n'), 'utf8');
fs.chmodSync(downloadScriptPath, '755');

console.log(`📥 Script de descarga generado: ${downloadScriptPath}`);
console.log('   Ejecuta: ./download-images.sh\n');
