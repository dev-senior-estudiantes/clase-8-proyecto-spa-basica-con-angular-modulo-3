# 🔍 Workflow de Análisis Estático - EstudiantesApp

Este documento describe la configuración y uso del workflow de análisis estático para garantizar la calidad del código en el proyecto Angular.

## 📋 Herramientas Integradas

- **ESLint**: Análisis de código TypeScript/JavaScript
- **Prettier**: Formateo automático de código
- **Angular CLI Lint**: Linter específico de Angular
- **Depcheck**: Detección de dependencias no utilizadas
- **SonarCloud**: Análisis profundo de calidad y seguridad

## ⚙️ Configuración Inicial

### 1. Instalar dependencias

```bash
npm install --save-dev @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/schematics @angular-eslint/template-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint prettier depcheck sonar-scanner
```

### 2. Configurar ESLint para Angular

```bash
ng add @angular-eslint/schematics
```

### 3. Configurar SonarCloud (opcional)

1. Regístrate en [SonarCloud](https://sonarcloud.io)
2. Conecta tu repositorio de GitHub
3. Agrega `SONAR_TOKEN` a los secrets de GitHub

## 🚀 Comandos Disponibles

### Comandos con npm run

```bash
# Ejecutar todos los análisis
npm run analyze

# ESLint - Verificar código
npm run lint

# ESLint - Corregir automáticamente
npm run lint:fix

# Prettier - Formatear código
npm run prettier

# Prettier - Verificar formato
npm run prettier:check

# Depcheck - Verificar dependencias
npm run depcheck

# SonarQube - Análisis local
npm run sonar
```

### Comandos con Angular CLI

```bash
# Linter integrado de Angular
ng lint

# Linter con corrección automática
ng lint --fix

# Build del proyecto
ng build

# Tests unitarios
ng test

# Tests con cobertura
ng test --code-coverage
```

## 🔄 Workflow de GitHub Actions

El workflow se ejecuta automáticamente cuando:

- Haces push a `main`, `master` o `develop`
- Abres un Pull Request hacia `main` o `master`

### Pasos del workflow:

1. ✅ Checkout del código
2. ✅ Setup de Node.js 20
3. ✅ Instalación de dependencias
4. ✅ Análisis con ESLint
5. ✅ Verificación de formato con Prettier
6. ✅ Detección de dependencias no usadas
7. ✅ Build del proyecto
8. ✅ Ejecución de tests
9. ✅ Análisis con SonarCloud

## 🛠️ Solución de Errores Comunes

### Error al ejecutar `npm run analyze` - ESLint no configurado

**Problema:**

```
Cannot find "lint" target for the specified project.
You can add a package that implements these capabilities.
For example: ESLint: ng add angular-eslint
Would you like to add ESLint now? (Y/n)
```

**Causa:**
Angular 12+ ya no incluye ESLint por defecto y necesitas configurarlo manualmente.

**Solución paso a paso:**

1. **Instalar ESLint para Angular:**

   ```bash
   ng add angular-eslint
   ```

   Responde `Y` cuando pregunte si quieres proceder.

2. **Si aparecen errores de dependencias (ERESOLVE), sigue estos pasos:**

   ```bash
   # Paso 1: Desinstalar versiones conflictivas
   npm uninstall @typescript-eslint/eslint-plugin @typescript-eslint/parser @typescript-eslint/utils

   # Paso 2: Instalar versiones compatibles con Angular 20
   npm install --save-dev @typescript-eslint/eslint-plugin@8 @typescript-eslint/parser@8 @typescript-eslint/utils@8

   # Paso 3: Instalar paquetes de Angular ESLint versión 20
   npm install --save-dev @angular-eslint/schematics@20 @angular-eslint/eslint-plugin@20 @angular-eslint/eslint-plugin-template@20 @angular-eslint/builder@20 @angular-eslint/template-parser@20

   # Paso 4: Forzar instalación si hay conflictos menores
   npm install --legacy-peer-deps
   ```

3. **Verificar que todo funcione:**
   ```bash
   npm run lint
   npm run analyze
   ```

**Resultado esperado:**

- ✅ `up to date, audited packages`
- ✅ `found 0 vulnerabilities`
- ✅ Los comandos `ng lint` y `npm run analyze` funcionan correctamente

### Error de ESLint básico

**Problema:**

```
2:1  error  Missing semicolon  semi
```

**Solución:**

```bash
# Corregir automáticamente
npm run lint:fix

# O agregar manualmente el punto y coma
```

### Error de Prettier

**Problema:**

```
Code style issues found in the above file(s).
```

**Solución:**

```bash
# Formatear automáticamente
npm run prettier

# Verificar después
npm run prettier:check
```

### Error de dependencias no usadas

**Problema:**

```
Unused dependencies:
* lodash
```

**Solución:**

```bash
# Remover dependencia no usada
npm uninstall lodash

# O usarla en el código si es necesaria
```

### Error de compilación TypeScript

**Problema:**

```
error TS2304: Cannot find name 'document'
```

**Solución:**

```typescript
// Agregar el tipo correcto
declare var document: any;

// O importar desde @angular/common
import { DOCUMENT } from "@angular/common";
```

### Error en tests

**Problema:**

```
Chrome Headless has not captured in 60000 ms
```

**Solución:**

```typescript
// En karma.conf.js, aumentar el timeout
captureTimeout: 120000,
browserDisconnectTimeout: 120000,
browserNoActivityTimeout: 120000,
```

## 📊 Interpretación de Resultados

### ESLint

- ❌ **Error**: Problemas que deben corregirse
- ⚠️ **Warning**: Sugerencias de mejora
- ✅ **Clean**: Sin problemas detectados

### Prettier

- ❌ **Formato incorrecto**: Archivos que necesitan formateo
- ✅ **Formato correcto**: Código bien formateado

### SonarCloud

- 🔴 **Bugs**: Errores en el código
- 🟡 **Code Smells**: Problemas de mantenibilidad
- 🔒 **Security**: Vulnerabilidades de seguridad
- 📈 **Coverage**: Porcentaje de cobertura de tests

## 📝 Buenas Prácticas

### Pre-commit (recomendado)

```bash
# Ejecutar antes de cada commit
npm run analyze

# Si hay errores, corregir automáticamente
npm run lint:fix
npm run prettier

# Verificar que todo esté bien
npm run lint
npm run prettier:check
```

### Durante el desarrollo

```bash
# Verificar código mientras desarrollas
npm run lint:fix
npm run prettier

# Ejecutar tests
ng test
```

### Antes del push

```bash
# Verificación completa
npm run build
npm run test:ci
npm run analyze
```

## 🎯 Configuración Personalizada

### Modificar reglas de ESLint

Edita `.eslintrc.json`:

```json
{
  "rules": {
    "no-console": "off",
    "@typescript-eslint/explicit-function-return-type": "error"
  }
}
```

### Modificar configuración de Prettier

Edita `.prettierrc`:

```json
{
  "singleQuote": false,
  "printWidth": 120
}
```

### Excluir archivos del análisis

Crea `.eslintignore`:

```
dist/
coverage/
node_modules/
*.min.js
```

## 🚨 Resolución de Problemas Avanzados

### Problema: Workflow falla en GitHub Actions

**Diagnóstico:**

1. Revisa los logs en la pestaña "Actions"
2. Verifica que todas las dependencias estén en `package.json`
3. Confirma que los secrets estén configurados

**Solución:**

```yaml
# Agregar más timeout en el workflow
- name: Ejecutar tests
  run: npm run test:ci
  timeout-minutes: 10
```

### Problema: Conflictos entre ESLint y Prettier

**Solución:**

```bash
# Instalar plugin de compatibilidad
npm install --save-dev eslint-config-prettier

# Agregar a .eslintrc.json
{
  "extends": ["@angular-eslint/recommended", "prettier"]
}
```

## 📚 Recursos Adicionales

npm install --legacy-peer-depsnpm install --legacy-peer-deps

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)

---

¡Con este workflow tendrás un análisis automático y completo de la calidad de tu código! 🚀

## 🎯 Comandos Rápidos de Referencia

```bash
# Análisis completo local
npm run analyze

# Corrección automática
npm run lint:fix && npm run prettier

# Verificación antes del commit
npm run build && npm run test:ci

# En Windows: ejecutar script automático
analisis-local.bat
```

## 📁 Archivos Creados

El workflow incluye los siguientes archivos de configuración:

- `.github/workflows/analisis-estatico.yml` - Workflow de GitHub Actions
- `.eslintrc.json` - Configuración de ESLint
- `.prettierrc` - Configuración de Prettier
- `.eslintignore` - Archivos ignorados por ESLint
- `.prettierignore` - Archivos ignorados por Prettier
- `sonar-project.properties` - Configuración de SonarCloud
- `analisis-local.bat` - Script para análisis local en Windows

¡Ahora tu proyecto está completamente configurado para análisis estático automático! 🎉
