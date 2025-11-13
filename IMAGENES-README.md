# 📸 Guía de Reemplazo de Imágenes

Este documento lista todas las preguntas que contienen imágenes externas y necesitan ser reemplazadas por imágenes locales.

## 📋 Instrucciones

### 1. Crear la carpeta de imágenes
```bash
mkdir -p public/images/questions
```

### 2. Descargar y organizar las imágenes
- Descarga cada imagen desde su URL original
- Guárdala en `public/images/questions/` con un nombre descriptivo
- Usa el ID de la pregunta como referencia (ej: `B1_S_011.png`)

### 3. Actualizar el JSON
Reemplaza la URL externa por la ruta local:
```json
// Antes:
"imagen": "https://ejemplo.com/imagen.png"

// Después:
"imagen": "/images/questions/B1_S_011.png"
```

---

## 🖼️ Lista de Preguntas con Imágenes

### Señalización Vial (17 imágenes)

#### 1. **B1_S_011** - Prohibida la circulación de bicicletas
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SR-26-PROHIBIDA-LA-CIRCULACION-DE-BICICLETAS.png`
- **Nombre sugerido:** `B1_S_011_SR-26.png`
- **Pregunta:** ¿Qué indica esta señal circular con una bicicleta?

#### 2. **B1_S_013** - Doble vía más adelante
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-40-DOBLE-VIA-MAS-ADELANTE.png`
- **Nombre sugerido:** `B1_S_013_SP-40.png`
- **Pregunta:** ¿Qué advierte esta señal amarilla con dos flechas en sentidos opuestos?

#### 3. **B1_S_014** - Prohibido parquear
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SR-28-PROHIBIDO-PARQUEAR.png`
- **Nombre sugerido:** `B1_S_014_SR-28.png`
- **Pregunta:** Esta señal (círculo rojo, fondo blanco, 'E' tachada) significa:

#### 4. **B1_S_015** - Descenso peligroso
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-23-DESCENSO-PELIGROSO.png`
- **Nombre sugerido:** `B1_S_015_SP-23.png`
- **Pregunta:** ¿Qué advierte esta señal?

#### 5. **B1_S_018** - Monumento nacional
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SI-20-MONUMENTO-NACIONAL.png`
- **Nombre sugerido:** `B1_S_018_SI-20.png`
- **Pregunta:** Una señal informativa de color CAFÉ indica:

#### 6. **B1_S_019** - Prohibido pito
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SR-29-PROHIBIDO-PITO.png`
- **Nombre sugerido:** `B1_S_019_SR-29.png`
- **Pregunta:** ¿Qué indica esta señal?

#### 7. **B1_S_020** - Zona de peatones
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-46-ZONA-DE-PEATONES.png`
- **Nombre sugerido:** `B1_S_020_SP-46.png`
- **Pregunta:** ¿Qué advierte esta señal amarilla?

#### 8. **B1_S_021** - No bloquear cruce
- **URL actual:** `https://www.motor.com.co/files/article_multimedia/uploads/2021/08/18/611d92305377f.jpeg`
- **Nombre sugerido:** `B1_S_021_no-bloquear.jpg`
- **Pregunta:** ¿Qué indica una 'X' grande pintada en el pavimento dentro de un cruce?

#### 9. **B1_S_022** - Curvas sucesivas
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-04-CURVAS-SUCESIVAS-PRIMERA-A-LA-IZQUIERDA.png`
- **Nombre sugerido:** `B1_S_022_SP-04.png`
- **Pregunta:** ¿Qué tipo de curva advierte esta señal?

#### 10. **B1_S_023** - Prohibida circulación de vehículos de carga
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SR-35-PROHIBIDA-LA-CIRCULACION-DE-VEHICULOS-DE-CARGA.png`
- **Nombre sugerido:** `B1_S_023_SR-35.png`
- **Pregunta:** ¿Qué indica esta señal?

#### 11. **B1_S_025** - Superficie rizada
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-33-SUPERFICIE-RIZADA.png`
- **Nombre sugerido:** `B1_S_025_SP-33.png`
- **Pregunta:** ¿Qué advierte esta señal?

#### 12. **B1_S_026** - Confluencia a la derecha
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-53-CONFLUENCIA-A-LA-DERECHA.png`
- **Nombre sugerido:** `B1_S_026_SP-53.png`
- **Pregunta:** Esta señal amarilla con una flecha recta y otra que se anexa indica:

#### 13. **B1_S_027** - Circulación obligatoria
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SR-41-CIRCULACION-OBLIGATORIA.png`
- **Nombre sugerido:** `B1_S_027_SR-41.png`
- **Pregunta:** ¿Qué indica esta señal SR-41?

#### 14. **B2_S_001** - Resalto (policía acostado)
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-34-RESALTO.png`
- **Nombre sugerido:** `B2_S_001_SP-34.png`
- **Pregunta:** ¿Qué advierte esta señal?

#### 15. **B2_S_002** - Circulación obligatoria de peatones
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SR-42-CIRCULACION-OBLIGATORIA-DE-PEATONES.png`
- **Nombre sugerido:** `B2_S_002_SR-42.png`
- **Pregunta:** Esta señal azul circular (SR-42) indica:

#### 16. **B2_S_003** - Animales en la vía
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-48-ANIMALES-EN-LA-VIA.png`
- **Nombre sugerido:** `B2_S_003_SP-48.png`
- **Pregunta:** ¿Qué le advierte esta señal amarilla?

#### 17. **B2_S_004** - Cruce ferroviario
- **URL actual:** `https://vial.vialcontrol.co/wp-content/uploads/2022/01/SP-50-CRUCE-A-NIVEL-SIN-BARRERAS.png`
- **Nombre sugerido:** `B2_S_004_SP-50.png`
- **Pregunta:** ¿Qué advierte esta señal?

---

### El Vehículo (4 imágenes)

#### 18. **B1_M_002** - Check Engine
- **URL actual:** `https://www.autofacil.es/wp-content/uploads/2021/04/Testigo-motor-1024x683.jpg`
- **Nombre sugerido:** `B1_M_002_check-engine.jpg`
- **Pregunta:** Este testigo amarillo en el tablero (forma de motor) se conoce como 'Check Engine'. ¿Qué indica?

#### 19. **B1_M_004** - Temperatura motor
- **URL actual:** `https://www.actualidadmotor.com/wp-content/uploads/2022/03/testigo-temperatura-motor-rojo.jpg`
- **Nombre sugerido:** `B1_M_004_temperatura.jpg`
- **Pregunta:** Este testigo rojo en el tablero (termómetro en líquido) indica:

#### 20. **B1_M_008** - Testigo batería
- **URL actual:** `https://www.actualidadmotor.com/wp-content/uploads/2016/09/Testigo-bateria-coche-rojo-830x553.jpg`
- **Nombre sugerido:** `B1_M_008_bateria.jpg`
- **Pregunta:** Este testigo rojo en el tablero (batería) indica:

#### 21. **B1_M_011** - Luces altas
- **URL actual:** `https://www.autofacil.es/wp-content/uploads/2021/04/Testigo-luces-largas-1024x683.jpg`
- **Nombre sugerido:** `B1_M_011_luces-altas.jpg`
- **Pregunta:** Este testigo azul en el tablero (único de este color) indica:

---

## 🔧 Script de Ayuda

Puedes usar este script Node.js para extraer todas las URLs:

```javascript
const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('./src/database/questions.json', 'utf8'));

const questionsWithImages = questions.filter(q => q.imagen && q.imagen.startsWith('http'));

console.log(`Total de preguntas con imágenes externas: ${questionsWithImages.length}\n`);

questionsWithImages.forEach((q, index) => {
  console.log(`${index + 1}. ID: ${q.id}`);
  console.log(`   URL: ${q.imagen}`);
  console.log(`   Pregunta: ${q.pregunta}`);
  console.log('');
});
```

---

## ✅ Checklist de Reemplazo

Marca cada imagen cuando la hayas reemplazado:

- [ ] B1_S_011 - SR-26 Prohibida circulación bicicletas
- [ ] B1_S_013 - SP-40 Doble vía
- [ ] B1_S_014 - SR-28 Prohibido parquear
- [ ] B1_S_015 - SP-23 Descenso peligroso
- [ ] B1_S_018 - SI-20 Monumento nacional
- [ ] B1_S_019 - SR-29 Prohibido pito
- [ ] B1_S_020 - SP-46 Zona de peatones
- [ ] B1_S_021 - No bloquear cruce
- [ ] B1_S_022 - SP-04 Curvas sucesivas
- [ ] B1_S_023 - SR-35 Prohibida circulación vehículos carga
- [ ] B1_S_025 - SP-33 Superficie rizada
- [ ] B1_S_026 - SP-53 Confluencia derecha
- [ ] B1_S_027 - SR-41 Circulación obligatoria
- [ ] B2_S_001 - SP-34 Resalto
- [ ] B2_S_002 - SR-42 Circulación obligatoria peatones
- [ ] B2_S_003 - SP-48 Animales en la vía
- [ ] B2_S_004 - SP-50 Cruce ferroviario
- [ ] B1_M_002 - Check Engine
- [ ] B1_M_004 - Temperatura motor
- [ ] B1_M_008 - Testigo batería
- [ ] B1_M_011 - Luces altas

---

## 📝 Notas Importantes

1. **Formato de imágenes:** Preferiblemente PNG para señales de tránsito, JPG para testigos del tablero
2. **Tamaño recomendado:** 800x600px o similar (no muy pesadas)
3. **Optimización:** Comprime las imágenes antes de subirlas
4. **Nombres:** Usa nombres descriptivos y consistentes
5. **Ruta pública:** Las imágenes en `/public/images/` serán accesibles como `/images/...`

---

## 🚀 Después del Reemplazo

Una vez reemplazadas todas las imágenes:
1. Verifica que todas las imágenes se muestren correctamente en la aplicación
2. Elimina este archivo README si ya no es necesario
3. Considera agregar las imágenes al `.gitignore` si son muy pesadas
