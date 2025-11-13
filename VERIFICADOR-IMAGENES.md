# 🖼️ Verificador de Imágenes

## 📋 Descripción

El **Verificador de Imágenes** es una herramienta integrada en el simulador que te permite:
- Ver todas las preguntas que contienen imágenes
- Detectar automáticamente cuáles imágenes no se están cargando
- Filtrar por estado (exitosas, con error, cargando)
- Copiar URLs de imágenes fácilmente
- Identificar si las imágenes son externas o locales

---

## 🚀 Cómo Acceder

### Opción 1: Desde la interfaz
1. Inicia el servidor de desarrollo: `npm run dev`
2. Abre `http://localhost:5173`
3. Haz clic en el botón **"🖼️ Verificar Imágenes"** en la barra superior

### Opción 2: URL directa
Abre directamente: `http://localhost:5173/?debug=images`

---

## 📊 Características

### Panel de Estadísticas
- **Total**: Número total de preguntas con imágenes (26)
- **Cargadas**: Imágenes que se cargaron exitosamente ✅
- **Errores**: Imágenes que fallaron al cargar ❌
- **Cargando**: Imágenes que aún están cargando ⏳

### Filtros
- **Todas**: Muestra todas las preguntas con imágenes
- **✅ Exitosas**: Solo las que se cargaron correctamente
- **❌ Con Error**: Solo las que fallaron (¡estas necesitan atención!)
- **⏳ Cargando**: Las que están en proceso de carga

### Vista de Preguntas
Cada pregunta muestra:
- **ID de la pregunta** (ej: B1_S_011)
- **Estado de carga** (✅ ❌ ⏳)
- **Tipo de imagen** (Externa o Local)
- **Vista previa de la imagen**
- **Tema de la pregunta**
- **Texto de la pregunta**
- **URL completa de la imagen**
- **Botón para copiar URL**

---

## 🔍 Cómo Usar

### 1. Identificar Imágenes con Error

```
1. Abre el verificador
2. Haz clic en el filtro "❌ Con Error"
3. Verás solo las imágenes que no se están cargando
4. Anota los IDs de las preguntas con error
```

### 2. Verificar si las Imágenes son Locales o Externas

Las imágenes se marcan con etiquetas:
- **🟠 Externa**: La imagen viene de una URL externa (http/https)
- **🔵 Local**: La imagen está en tu proyecto (public/images/...)

### 3. Copiar URLs para Descargar

```
1. Encuentra la imagen que necesitas
2. Haz clic en "📋 Copiar URL"
3. Usa la URL para descargar la imagen manualmente
```

---

## ⚠️ Solución de Problemas

### Si ves muchas imágenes con error (❌):

**Causa**: Las imágenes aún no han sido descargadas y guardadas localmente.

**Solución**:
```bash
# 1. Descarga las imágenes
./download-images.sh

# 2. Verifica que estén en la carpeta correcta
ls public/images/questions/

# 3. Actualiza el JSON
node replace-image-urls.js

# 4. Recarga el verificador
```

### Si algunas imágenes locales no cargan:

**Causa**: El nombre del archivo no coincide con el esperado.

**Solución**:
1. Verifica el nombre exacto en el mensaje de error
2. Renombra el archivo para que coincida exactamente
3. Ejemplo: `B1_S_011.png` (respeta mayúsculas y extensión)

### Si las imágenes externas no cargan:

**Causa**: Problemas de CORS o la URL ya no existe.

**Solución**:
1. Descarga la imagen manualmente desde la URL
2. Guárdala en `public/images/questions/`
3. Actualiza el JSON con `node replace-image-urls.js`

---

## 📈 Flujo de Trabajo Recomendado

### Antes de Reemplazar Imágenes:
```
1. Abre el verificador
2. Filtra por "❌ Con Error"
3. Toma nota de cuántas imágenes fallan (debería ser 26 si no has descargado ninguna)
```

### Durante el Reemplazo:
```
1. Descarga las imágenes con ./download-images.sh
2. Verifica en el verificador que ahora se cargan
3. Si alguna falla, descárgala manualmente
```

### Después del Reemplazo:
```
1. Ejecuta: node replace-image-urls.js
2. Recarga el verificador
3. Verifica que el contador de "✅ Cargadas" sea 26
4. Verifica que el contador de "❌ Errores" sea 0
```

---

## 🎯 Checklist de Verificación

Usa esta lista para asegurarte de que todo está correcto:

- [ ] Todas las imágenes muestran ✅ (verde)
- [ ] No hay imágenes con ❌ (rojo)
- [ ] Todas las imágenes muestran la etiqueta "Local" (azul)
- [ ] Las vistas previas se ven correctamente
- [ ] El contador de "Cargadas" es 26
- [ ] El contador de "Errores" es 0

---

## 💡 Consejos

1. **Usa el filtro de errores** para enfocarte solo en lo que necesita atención
2. **Copia las URLs** directamente desde el verificador en lugar de buscarlas en el JSON
3. **Recarga la página** después de agregar nuevas imágenes para ver los cambios
4. **Verifica el tamaño** de las imágenes (no deberían ser muy pesadas)
5. **Mantén los nombres exactos** como se sugieren (B1_S_011.png, no b1_s_011.PNG)

---

## 🔄 Actualización en Tiempo Real

El verificador detecta automáticamente:
- ✅ Cuando una imagen se carga exitosamente
- ❌ Cuando una imagen falla al cargar
- ⏳ Mientras una imagen está cargando

No necesitas recargar manualmente, el estado se actualiza automáticamente.

---

## 📞 Ayuda Adicional

Si encuentras problemas:
1. Revisa la consola del navegador (F12) para ver errores específicos
2. Verifica que la carpeta `public/images/questions/` existe
3. Confirma que los archivos tienen los permisos correctos
4. Asegúrate de que los nombres de archivo coincidan exactamente

---

## 🎨 Interfaz

El verificador organiza las preguntas por **bloque**:
- 🚦 Señalización Vial
- 🚗 El Vehículo
- 📋 Normativa y Reglas
- 🛡️ Seguridad Vial
- ⚠️ Infracciones y Sanciones

Cada sección muestra cuántas imágenes contiene.
