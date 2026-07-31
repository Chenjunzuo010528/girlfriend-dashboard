@echo off
chcp 65001 >nul
echo.
echo   🌷  小日常 - 启动中...
echo   ═══════════════════════════
echo.

:: Get local IP for mobile access
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set "IP=%%a"
    set "IP=!IP: =!"
    goto :found
)
:found

echo   📱 手机浏览器访问:
echo   http://!IP!:8080
echo.
echo   💻 电脑浏览器访问:
echo   http://localhost:8080
echo.
echo   按 Ctrl+C 停止
echo   ═══════════════════════════
echo.

npx serve . -p 8080 --no-clipboard -s
