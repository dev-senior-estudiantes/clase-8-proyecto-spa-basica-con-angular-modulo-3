@echo off
echo =========================================
echo    ANÁLISIS ESTÁTICO - ESTUDIANTES APP
echo =========================================
echo.

echo [1/6] Instalando dependencias...
call npm install

echo.
echo [2/6] Ejecutando ESLint...
call npm run lint
if %errorlevel% neq 0 (
    echo ⚠️  ESLint encontró problemas. Ejecuta 'npm run lint:fix' para corregir automáticamente.
)

echo.
echo [3/6] Verificando formato con Prettier...
call npm run prettier:check
if %errorlevel% neq 0 (
    echo ⚠️  Prettier encontró problemas de formato. Ejecuta 'npm run prettier' para corregir.
)

echo.
echo [4/6] Verificando dependencias no usadas...
call npm run depcheck

echo.
echo [5/6] Compilando proyecto...
call npm run build

echo.
echo [6/6] Ejecutando tests...
call npm run test:ci

echo.
echo ✅ Análisis completado!
echo.
echo Para corregir problemas automáticamente:
echo   npm run lint:fix
echo   npm run prettier
echo.
pause
