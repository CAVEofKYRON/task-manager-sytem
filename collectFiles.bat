@echo off
REM Alte output.txt löschen, falls vorhanden
if exist output.txt del output.txt

REM Rekursive Suche ab dem aktuellen Verzeichnis starten
call :searchDirectory "%cd%"

echo Alle Dateien wurden in output.txt geschrieben.
pause
exit /b

:searchDirectory
REM Parameter %~1 enthält das aktuelle Verzeichnis
set "currentDir=%~1"

REM Durchsuche das aktuelle Verzeichnis nach Dateien mit den gewünschten Endungen
for %%x in (js html css jsx) do (
    for %%F in ("%currentDir%\*.%%x") do (
        if exist "%%F" (
            echo ===================================== >> output.txt
            echo Datei: %%F >> output.txt
            echo ===================================== >> output.txt
            type "%%F" >> output.txt
            echo. >> output.txt
        )
    )
)

REM Durchsuche alle Unterordner (ohne den node_modules-Ordner)
for /d %%D in ("%currentDir%\*") do (
    REM Überprüfe, ob der Ordnername nicht "node_modules" ist (Groß-/Kleinschreibung wird ignoriert)
    if /I "%%~nD" NEQ "node_modules" (
        call :searchDirectory "%%D"
    )
)
exit /b
