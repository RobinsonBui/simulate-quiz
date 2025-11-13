# 🚀 Configuración de GitHub Pages

## ✅ Pasos Completados

1. ✅ Build configurado con base URL `/simulate-quiz/`
2. ✅ GitHub Actions workflow creado (`.github/workflows/deploy.yml`)
3. ✅ Archivo `.nojekyll` agregado
4. ✅ Código subido a GitHub

## 📋 Pasos para Habilitar GitHub Pages

### En GitHub.com:

1. Ve a tu repositorio: https://github.com/RobinsonBui/simulate-quiz

2. Click en **Settings** (Configuración)

3. En el menú lateral izquierdo, busca **Pages**

4. En la sección **Build and deployment**:
   - **Source**: Selecciona "GitHub Actions"
   
5. Guarda los cambios

6. Espera unos minutos mientras GitHub despliega tu sitio

7. Tu sitio estará disponible en:
   **https://robinsonbui.github.io/simulate-quiz/**

## 🔄 Deploy Automático

Cada vez que hagas `git push` a la rama `main`, GitHub Actions:
- Instalará las dependencias
- Ejecutará el build
- Desplegará automáticamente a GitHub Pages

## 🛠️ Verificar el Deploy

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Cuando termine (✅ verde), tu sitio estará actualizado

## 📱 Probar Localmente

```bash
npm run build
npm run preview
```

Esto iniciará un servidor local en http://localhost:4173/simulate-quiz/

## 🐛 Solución de Problemas

### El sitio no carga
- Verifica que GitHub Pages esté habilitado en Settings > Pages
- Asegúrate de que la fuente sea "GitHub Actions"
- Revisa la pestaña Actions para ver si hay errores

### Los assets no cargan
- Verifica que `base: '/simulate-quiz/'` esté en `vite.config.ts`
- Asegúrate de que el archivo `.nojekyll` exista en la raíz

### El workflow falla
- Revisa los logs en la pestaña Actions
- Verifica que `package.json` tenga todos los scripts necesarios

## 📊 Estadísticas del Proyecto

- **Total de preguntas**: 265
- **Módulos de aprendizaje**: 13
- **Tecnologías**: Vue 3, TypeScript, Tailwind CSS, Vite
- **Features**: Aprendizaje adaptativo, estadísticas, banco de preguntas

## 🎯 URLs Importantes

- **Repositorio**: https://github.com/RobinsonBui/simulate-quiz
- **GitHub Pages**: https://robinsonbui.github.io/simulate-quiz/
- **Actions**: https://github.com/RobinsonBui/simulate-quiz/actions
