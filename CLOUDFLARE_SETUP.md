# ☁️ Desplegar en Cloudflare Pages

## 🚀 Ventajas de Cloudflare Pages

- ⚡ **Más rápido** que GitHub Pages (CDN global)
- 🌍 **500 builds/mes gratis** (vs 2000 minutos de GitHub)
- 🔒 **SSL automático** y gratuito
- 📊 **Analytics incluido**
- 🎯 **Dominio personalizado** fácil
- 💨 **Deploy en segundos**

## 📋 Pasos para Conectar con Cloudflare Pages

### 1️⃣ Crear Cuenta en Cloudflare

1. Ve a: https://dash.cloudflare.com/sign-up
2. Crea una cuenta gratuita (solo email y contraseña)
3. Verifica tu email

### 2️⃣ Conectar tu Repositorio de GitHub

1. En el dashboard de Cloudflare, ve a **Workers & Pages**
   - URL directa: https://dash.cloudflare.com/?to=/:account/pages

2. Click en **"Create application"** (Crear aplicación)

3. Selecciona la pestaña **"Pages"**

4. Click en **"Connect to Git"** (Conectar a Git)

5. Autoriza a Cloudflare para acceder a tu GitHub
   - Click en **"Connect GitHub"**
   - Autoriza la aplicación
   - Selecciona tu repositorio: **simulate-quiz**

### 3️⃣ Configurar el Build

Cloudflare te pedirá la configuración del build. Usa estos valores:

```
Project name: simulate-quiz (o el nombre que prefieras)
Production branch: main
```

**Build settings:**
```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

**Environment variables (opcional):**
```
NODE_VERSION: 20
```

### 4️⃣ Deploy

1. Click en **"Save and Deploy"**
2. Espera 1-2 minutos mientras Cloudflare:
   - Clona tu repositorio
   - Instala dependencias
   - Ejecuta el build
   - Despliega a su CDN global

3. ¡Listo\! Tu sitio estará disponible en:
   ```
   https://simulate-quiz.pages.dev
   ```
   (o el nombre que hayas elegido)

## 🔄 Deploy Automático

Cada vez que hagas `git push` a `main`:
- Cloudflare detectará el cambio automáticamente
- Ejecutará el build
- Desplegará la nueva versión
- Todo en menos de 2 minutos

## 🌐 Configurar Dominio Personalizado (Opcional)

### Si tienes un dominio propio:

1. En tu proyecto de Cloudflare Pages, ve a **"Custom domains"**
2. Click en **"Set up a custom domain"**
3. Ingresa tu dominio (ej: `quiz.tudominio.com`)
4. Sigue las instrucciones para configurar los DNS
5. Cloudflare configurará SSL automáticamente

### Si NO tienes dominio:

Tu sitio funcionará perfectamente en:
```
https://simulate-quiz.pages.dev
```

## 📊 Monitorear Deploys

1. Ve a tu proyecto en Cloudflare Pages
2. Verás el historial de todos los deploys
3. Puedes ver logs, revertir versiones, etc.

## 🔧 Configuración Avanzada (Opcional)

### Variables de Entorno

Si necesitas agregar variables de entorno:

1. En tu proyecto, ve a **"Settings"** > **"Environment variables"**
2. Agrega las variables que necesites
3. Redeploy para aplicar cambios

### Preview Deployments

Cloudflare crea automáticamente un preview para cada Pull Request:
- Cada PR tendrá su propia URL de preview
- Perfecto para probar cambios antes de mergear

### Redirects y Headers

Crea un archivo `_redirects` o `_headers` en la carpeta `public/` si necesitas:
- Redirecciones personalizadas
- Headers de seguridad adicionales
- Configuración de caché

## 🆚 Cloudflare vs GitHub Pages

| Característica | Cloudflare Pages | GitHub Pages |
|---------------|------------------|--------------|
| Velocidad | ⚡⚡⚡ Muy rápido | ⚡⚡ Rápido |
| CDN Global | ✅ 275+ ubicaciones | ✅ Limitado |
| SSL Gratis | ✅ Automático | ✅ Automático |
| Builds/mes | 500 gratis | 2000 min gratis |
| Deploy time | 1-2 minutos | 2-5 minutos |
| Analytics | ✅ Incluido | ❌ Requiere Google |
| Dominio custom | ✅ Fácil | ✅ Medio |
| Preview PRs | ✅ Automático | ❌ No |

## 🐛 Solución de Problemas

### El build falla

1. Revisa los logs en Cloudflare Pages
2. Verifica que `package.json` tenga todos los scripts
3. Asegúrate de que `NODE_VERSION` sea 18 o 20

**Error: "lockfile had changes, but lockfile is frozen"**
- ✅ Ya está solucionado en el proyecto
- El `package.json` incluye `"packageManager": "npm@10.9.2"`
- Esto fuerza a Cloudflare a usar npm en lugar de bun
- Si persiste, ve a Settings > Build & deployments > Build configurations
- Asegúrate de que no haya override del package manager

### Los assets no cargan

1. Verifica que `base: '/'` esté configurado para Cloudflare
2. Revisa la consola del navegador para errores
3. Limpia el caché de Cloudflare (Purge Cache)

### El sitio no actualiza

1. Espera 1-2 minutos (propagación de CDN)
2. Limpia el caché de tu navegador (Ctrl + Shift + R)
3. Verifica que el deploy haya terminado exitosamente

## 📱 URLs del Proyecto

- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Tu sitio**: https://simulate-quiz.pages.dev
- **Repositorio**: https://github.com/RobinsonBui/simulate-quiz

## 💡 Tips Pro

1. **Branch Previews**: Crea branches para features y Cloudflare creará previews automáticos
2. **Analytics**: Activa Cloudflare Analytics para ver estadísticas de visitantes
3. **Caché**: Cloudflare cachea automáticamente, tu sitio será súper rápido
4. **Rollback**: Puedes volver a cualquier versión anterior con un click

## 🎯 Resumen

1. ✅ Crea cuenta en Cloudflare
2. ✅ Conecta tu repo de GitHub
3. ✅ Configura build: `npm run build` → `dist`
4. ✅ Deploy automático
5. ✅ Tu sitio en: `https://simulate-quiz.pages.dev`

¡Es así de simple\! 🚀
