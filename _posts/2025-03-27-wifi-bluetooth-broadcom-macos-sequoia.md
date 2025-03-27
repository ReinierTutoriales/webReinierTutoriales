---
layout: post
title: "Guía Completa: Soporte Broadcom WiFi/Bluetooth en macOS 15 Sequoia"
date: 2025-03-27
categories: [macos, hackintosh, hardware]
author: ReinierTutoriales
permalink: /broadcom-macos-15-guia-completa/
---

¡Bienvenido al repositorio oficial de **ReinierTutoriales**! Esta guía te llevará paso a paso para habilitar soporte completo de tarjetas **Broadcom** (WiFi y Bluetooth) en **macOS 15 Sequoia**, ideal para usuarios de Hackintosh.  

> **Créditos:** Todo esto es posible gracias al increíble trabajo de [👉 **OpenCore Legacy Patcher**](https://github.com/dortania/OpenCore-Legacy-Patcher/).


## 🛒 Dónde Comprar Hardware Compatible
Aquí tienes las mejores opciones para adquirir tarjetas Broadcom compatibles:

- ✅ **FENVI T919** *(Tarjeta PCIe WiFi + Bluetooth)*  
  [👉 Comprar en Amazon](https://amzn.to/3OOEQoa)  
- ✅ **BCM94360CD** *(Ideal para laptops con adaptador NGFF)*  
  [👉 Comprar en AliExpress](https://example.com/link)


## 🎥 Tutorial en Video
¡Mira el proceso en acción! Haz clic en la imagen para ver el video en YouTube:  

[![Video de Ayuda](https://img.youtube.com/vi/ZIEt9QYUu0Y/0.jpg)](https://www.youtube.com/watch?v=ZIEt9QYUu0Y "Tutorial Broadcom en macOS 15")


## 💻 Kexts Necesarios para macOS 15 Sequoia
Descarga e inyecta estos kexts en tu `config.plist` para habilitar todas las funciones:

1. ✅ **IOSkywalk.kext**  
   - *Versión:* 1.1.0  
   - [👉 Descargar](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/main/payloads/Kexts/Wifi/IOSkywalkFamily-v1.1.0.zip)  

2. ✅ **IO80211FamilyLegacy.kext**  
   - *Versión:* 1.0.0  
   - [👉 Descargar](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/main/payloads/Kexts/Wifi/IO80211FamilyLegacy-v1.0.0.zip)  
   - *Nota:* Incluye el complemento `AirPortBrcmNIC.kext`. Asegúrate de inyectarlo también.

3. ✅ **AirportBrcmFixup**  
   - *Versión:* 2.1.9  
   - [👉 Descargar](https://github.com/dortania/build-repo/releases/download/AirportBrcmFixup-c85ca2d/AirportBrcmFixup-2.1.9-RELEASE.zip)  
   - *Nota:* Incluye `AirPortBrcmNIC_Injector.kext`. No olvides añadirlo.

4. ✅ **AMFIPass**  
   - *Versión:* 1.4.1  
   - [👉 Descargar](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/sequoia-development/payloads/Kexts/Acidanthera/AMFIPass-v1.4.1-RELEASE.zip)

5. ✅ **Orden de los Kexts**  
   Organiza los kexts en tu `config.plist` como se muestra:  
   ![Orden de Kexts y MinKernel](IMG/orden-kexts-MinKernel.PNG "Orden correcto de kexts en config.plist")  
   - Añade `MinKernel` con valor `23.0.0` para compatibilidad con Sequoia.


## 🚫 Bloquear IOSkywalkFamily
Para evitar conflictos con el kext nativo de macOS, bloquea `IOSkywalkFamily`:

1. ✅ **Identificador:** `com.apple.iokit.IOSkywalkFamily`  
   - *Referencia:* [OpenCore Config](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/e21efa975c0cf228cb36e81a974bc6b4c27c7807/payloads/Config/config.plist#L1695-L1710/)

2. ✅ **Parche en `config.plist`:**  
   En `Kernel | Block`, agrega este bloque:  

```xml
<dict>
   <key>Arch</key>
   <string>Any</string>
   <key>Comment</key>
   <string>Allow IOSkywalk Downgrade</string>
   <key>Enabled</key>
   <true/>
   <key>Identifier</key>
   <string>com.apple.iokit.IOSkywalkFamily</string>
   <key>MaxKernel</key>
   <string></string>
   <key>MinKernel</key>
   <string>23.0.0</string>
   <key>Strategy</key>
   <string>Exclude</string>
</dict>
```

## ⚙️ Configuraciones Adicionales

Ajusta estas configuraciones en tu `config.plist` para un funcionamiento óptimo:

1. **Desactivar Secure Boot**  
   - [x] En `Misc | Security`, configura `SecureBootModel` a `Disabled`.

2. **Ajustar Protección de Integridad del Sistema (SIP)**  
   - [x] Dirígete a `NVRAM | Add | 7C436110-AB2A-4BBB-A880-FE41995C9F82`:  
     - Edita `csr-active-config` y cambia `00000000` por `03080000` (equivalente a `0x803`).

3. **Boot Arguments Opcionales**  
   - [x] En `NVRAM | Add | 7C436110-AB2A-4BBB-A880-FE41995C9F82 | boot-args`, añade:  
     - `amfi=0x80` *(si los parches raíz fallan)*  
     - `ipc_control_port_options=0` *(resuelve bloqueos de Electron con SIP abierto desde macOS 12.3)*

4. **Evitar Reinicio de NVRAM**  
   - [x] En `NVRAM | Delete | 7C436110-AB2A-4BBB-A880-FE41995C9F82`, añade:  
     - `csr-active-config`  
     - `boot-args`


## ✅ Pasos Finales

1. **Guarda los cambios** en tu `config.plist`.  
2. **Reinicia el sistema.**  
3. Ejecuta **OpenCore Legacy Patcher** desde el [👉 Repositorio Oficial](https://github.com/dortania/OpenCore-Legacy-Patcher/releases).

> ⚠️ **Importante:**  
> Este soporte es posible gracias a proyectos como **[Dortania](https://dortania.github.io/OpenCore-Legacy-Patcher/INSTALLER.html)** y **[OpenCore Legacy Patcher](https://dortania.github.io/OpenCore-Legacy-Patcher/INSTALLER.html)**. Asegúrate de apoyar a la comunidad.


## 🌟 ¡Listo!

Con esta configuración, tendrás WiFi y Bluetooth funcionando en **macOS 15 Sequoia** y **macOS 14 Sonoma** con tarjetas Broadcom. ¡Disfruta de tu Hackintosh al máximo!
