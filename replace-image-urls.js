#!/usr/bin/env node

/**
 * Script para reemplazar las URLs externas de imágenes por rutas locales
 * Uso: node replace-image-urls.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer el archivo JSON
const questionsPath = path.join(__dirname, 'src', 'database', 'questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

console.log('═══════════════════════════════════════════════════════════════');
console.log('🔄 REEMPLAZANDO URLs DE IMÁGENES');
console.log('═══════════════════════════════════════════════════════════════\n');

let replacedCount = 0;

// Reemplazar URLs por rutas locales
questions.forEach(question => {
  if (question.imagen && question.imagen.startsWith('http')) {
    const extension = question.imagen.includes('.png') ? 'png' : 'jpg';
    const newPath = `/images/questions/${question.id}.${extension}`;
    
    console.log(`✓ ${question.id}: ${question.imagen.substring(0, 60)}...`);
    console.log(`  → ${newPath}\n`);
    
    question.imagen = newPath;
    replacedCount++;
  }
});

// Crear backup del archivo original
const backupPath = path.join(__dirname, 'src', 'database', 'questions.backup.json');
fs.copyFileSync(questionsPath, backupPath);
console.log(`💾 Backup creado: ${backupPath}\n`);

// Guardar el archivo actualizado
fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 4), 'utf8');

console.log('═══════════════════════════════════════════════════════════════');
console.log('✅ COMPLETADO');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`Total de URLs reemplazadas: ${replacedCount}`);
console.log(`Archivo actualizado: ${questionsPath}`);
console.log(`\n⚠️  IMPORTANTE: Asegúrate de que las imágenes estén en:`);
console.log(`   public/images/questions/\n`);
console.log(`💡 Si algo sale mal, restaura desde: ${backupPath}\n`);
