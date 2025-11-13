# 📸 Guía Rápida: Reemplazo de Imágenes

## 📊 Resumen

**Total de imágenes a reemplazar:** 26 preguntas
- 22 imágenes de Señalización Vial (PNG)
- 4 imágenes de El Vehículo (JPG - testigos del tablero)

---

## 🚀 Proceso Rápido (3 pasos)

### Paso 1: Descargar las imágenes
```bash
# Opción A: Usar el script automático
./download-images.sh

# Opción B: Descargar manualmente
# Consulta el archivo imagenes-lista.csv para ver todas las URLs
```

### Paso 2: Verificar las imágenes
```bash
# Las imágenes deben estar en:
ls public/images/questions/

# Deberías ver 26 archivos:
# B1_S_011.png, B1_S_013.png, ..., B1_M_011.jpg
```

### Paso 3: Actualizar el JSON
```bash
# Ejecutar el script de reemplazo
node replace-image-urls.js

# Esto creará un backup automático en:
# src/database/questions.backup.json
```

---

## 📋 Lista Completa de Imágenes

### Señalización Vial (22 imágenes)

| ID | Nombre Archivo | Descripción |
|---|---|---|
| B1_S_011 | B1_S_011.png | SR-26 Prohibida circulación bicicletas |
| B1_S_013 | B1_S_013.png | SP-40 Doble vía más adelante |
| B1_S_014 | B1_S_014.png | SR-28 Prohibido parquear |
| B1_S_015 | B1_S_015.png | SP-23 Descenso peligroso |
| B1_S_018 | B1_S_018.png | SI-20 Monumento nacional |
| B1_S_019 | B1_S_019.png | SR-29 Prohibido pito |
| B1_S_020 | B1_S_020.png | SP-46 Zona de peatones |
| B1_S_021 | B1_S_021.jpg | Marcas viales - No bloquear cruce |
| B1_S_022 | B1_S_022.png | SP-04 Curvas sucesivas |
| B1_S_023 | B1_S_023.png | SR-35 Prohibida circulación vehículos carga |
| B1_S_025 | B1_S_025.png | SP-33 Superficie rizada |
| B1_S_026 | B1_S_026.png | SP-53 Confluencia a la derecha |
| B1_S_027 | B1_S_027.png | SR-41 Circulación obligatoria |
| B1_S_028 | B1_S_028.png | SP-34 Resalto (policía acostado) |
| B1_S_029 | B1_S_029.png | SR-42 Circulación obligatoria peatones |
| B1_S_030 | B1_S_030.png | SP-48 Animales en la vía |
| B1_S_031 | B1_S_031.png | SP-37 Final de pavimento |
| B1_S_033 | B1_S_033.png | ST-02 Banderero |
| B1_S_034 | B1_S_034.png | SP-44 Inicio de separador |
| B1_S_035 | B1_S_035.jpg | Líneas amarillas en zigzag |
| B1_S_036 | B1_S_036.png | SI-01 Poste de destino |
| B1_S_037 | B1_S_037.png | SP-45 Zona de derrumbes |

### El Vehículo (4 imágenes)

| ID | Nombre Archivo | Descripción |
|---|---|---|
| B1_M_002 | B1_M_002.jpg | Testigo Check Engine (amarillo) |
| B1_M_004 | B1_M_004.jpg | Testigo temperatura motor (rojo) |
| B1_M_008 | B1_M_008.jpg | Testigo batería (rojo) |
| B1_M_011 | B1_M_011.jpg | Testigo luces altas (azul) |

---

## 📁 Archivos Generados

1. **imagenes-lista.csv** - Lista completa en formato CSV para Excel
2. **download-images.sh** - Script bash para descargar todas las imágenes
3. **extract-images.js** - Script para listar las imágenes con detalles
4. **replace-image-urls.js** - Script para actualizar el JSON

---

## ⚠️ Notas Importantes

1. **Backup automático:** El script `replace-image-urls.js` crea un backup antes de modificar
2. **Formato de nombres:** Usa exactamente los nombres sugeridos (ej: `B1_S_011.png`)
3. **Ubicación:** Las imágenes DEBEN estar en `public/images/questions/`
4. **Extensiones:** Respeta PNG para señales y JPG para testigos del tablero

---

## 🔄 Restaurar desde Backup

Si algo sale mal:
```bash
# Restaurar el archivo original
cp src/database/questions.backup.json src/database/questions.json
```

---

## ✅ Verificación Final

Después de completar el proceso:
```bash
# 1. Iniciar el servidor de desarrollo
npm run dev

# 2. Abrir http://localhost:5173

# 3. Verificar que todas las imágenes se muestren correctamente
```

---

## 📞 Ayuda Adicional

- Ver detalles completos: `node extract-images.js`
- Ver archivo CSV: `cat imagenes-lista.csv`
- Listar imágenes descargadas: `ls -lh public/images/questions/`
