---
title: "OpenCore Sin Inyección ACPI - Guía Completa"
date: 2025-03-27
description: "Guía sobre cómo usar OpenCore sin inyección ACPI para evitar conflictos con Windows"
image: "https://raw.githubusercontent.com/ReinierTutoriales/webReinierTutoriales/main/assets/img/no-acpi.png"
category: "guides"
categories: ["OpenCore", "ACPI", "Hackintosh"]
---

# OpenCore Sin Inyección ACPI

## **Acerca de** ℹ️
**OpenCore Sin Inyección ACPI** es una bifurcación *no oficial* de OpenCore, creada por [**btwise**](https://gitee.com/btwise/OpenCore_NO_ACPI), sin respaldo de Acidanthera (equipo oficial de OpenCore) ni de mí. Este documento solo ofrece información útil. Su diferencia principal es que **evita la inyección de ACPI** (parches, tablas y parámetros de arranque) en sistemas operativos distintos a macOS.

Esto resulta útil cuando la inyección de ACPI genera problemas en otros sistemas, como Microsoft Windows, donde SSDTs no conformes suelen causar la famosa "Pantalla Azul de la Muerte" (BSOD). Está pensado para usuarios novatos y "veteranos" de Hackintosh que no saben desactivar la inyección en Windows con unas pocas líneas de código. Si tu EFI está bien configurado, no necesitas esta versión.

**Pregunta**: ¿Cómo funciona?  
**Respuesta**: Añade una opción (*Quirk*) en `ACPI/Quirks` y `Booter/Quirks` llamada `EnableForAll`. Si se establece en `false`, **no se inyectan parches ACPI, SSDTs ni parámetros de arranque** en sistemas distintos a macOS.

## **Requisitos Previos** ✅
1. Una carpeta EFI funcional y un archivo `config.plist` ya configurados.
2. ⚠️ **¡Asegúrate de que las versiones de OpenCore y OpenCore Sin Inyección ACPI coincidan!** Por ejemplo, si usas OpenCore 0.8.7, esta bifurcación debe ser 0.8.7 también. De lo contrario, aparecerán errores de validación.


## **Instrucciones** 🛠️
1. ⚠️ **¡Realiza una copia de seguridad de tu EFI actual!** Guárdala en una unidad USB formateada en FAT32.
2. Descarga la versión correcta de [**OpenCore Sin Inyección ACPI**](https://github.com/wjz304/OpenCore_NO_ACPI_Build/releases) que coincida con tu OpenCore y descomprímela.
3. Reemplaza estos archivos en tu carpeta `EFI`:
   - `BootX64.efi` (en `EFI/Boot`)
   - `OpenCore.efi` (en `EFI/OC`)
   - Los **Drivers** que uses (en `EFI/OC/Drivers`)
   - Las **Tools** que emplees (en `EFI/OC/Tools`)
4. Añade estas claves a tu `config.plist`:
   - En `ACPI/Quirks`: `EnableForAll` (Tipo: Boolean) → `NO`
   - En `Booter/Quirks`: `EnableForAll` (Tipo: Boolean) → `NO`
5. Guarda los cambios y reinicia tu sistema. 🔄


## **Verificación** 🔍
- Inicia Windows desde el selector de arranque de OpenCore.
- Ejecuta [**HWiNFO**](https://sourceforge.net/projects/hwinfo/).
- En la ventana principal, revisa el "Nombre de la marca del equipo". Debería mostrar el fabricante y modelo de tu placa base (o portátil). Si aparece "Acidanthera" seguido del modelo de Mac de tu SMBIOS, algo falló.


> [!TIP] 💡  
> **¿Solo necesitas evitar la inyección de SMBIOS en Windows?**  
> No requieres esta bifurcación. Con la versión oficial de OpenCore, puedes lograrlo ajustando estas configuraciones en tu config.plist:  
> - `Kernel/Quirks/CustomSMBIOSGuid` = `YES`  
> - `PlatformInfo/SMBIOS/UpdateSMBIOSMode` = `Custom`  
> ¡Guarda los cambios y listo!


## **Recursos** 🌐
- **OpenCore Sin Inyección ACPI** – [Última versión](https://github.com/wjz304/OpenCore_NO_ACPI_Build/releases)
