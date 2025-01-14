@echo off

set project_path=E:\other\myweb
set vscode_path="D:\develop\Microsoft VS Code\Code.exe"

:: 打开项目
start "" %vscode_path% %project_path%
cd /d %project_path%

:: 打开浏览器，并访问指定的端口
start "" "http://localhost:3000/web/"

call npm run dev
