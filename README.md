BoneCarter
======

Proyecto javascript vanilla, ES6 - Compiler Grunt File -        
Usando:     
Backbonejs      
Jquery Mobile       
Sqlite Storage Local Extra      

npm i -g @capacitor/cli
npm i @capacitor/core

* npx cap init

* npm i @capacitor/android    

* npx cap add android

* npx cap open android

* npx cap run android

* npx cap sync


android/app/build.gradle        

    defaultConfig {
    -       applicationId "com.capacitorjs.app"
    +       applicationId "com.mycompany.myapp"


strings.xml     
    <string name="app_name">MyApp</string>
    <string name="title_activity_main">MyApp</string>
    <string name="custom_url_scheme">com.capacitorjs.myapp</string>

Agregar permisos        
------
AndroidManifest.xml

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- other stuff -->
    </activity>

    <!-- More stuff -->

    <!-- Your permissions -->

    <!-- Network API -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>


"android": {
    // Agente de usuario de Capacitor WebView para Android
    "overrideUserAgent": "my custom user agent for Android",
    
    // Cadena para agregar al agente de usuario original de Capacitor WebView para Android.
    "appendUserAgent": "string to append for Android",
    
    // Color de fondo de Capacitor WebView solo para Android
    "backgroundColor": "#ffffff",
    
    // En Android, si está cargando la aplicación desde un servidor remoto/de prueba desde https
    // protocolo, debe habilitar el modo de contenido mixto para permitir que WebView se cargue
    // archivos de diferentes esquemas como capacitor-content:// o capacitor-file://
    "allowMixedContent": true,

    // El teclado predeterminado de Android no permite la captura adecuada de claves JS
    // Puede usar un teclado más simple habilitando esta preferencia
    // Tenga en cuenta que este teclado tiene algunos problemas y limitaciones
    "captureInput": true,

    // Habilita la depuración de contenidos web (HTML/CSS/JavaScript) cargados en
    // cualquier WebView de esta aplicación.
    // Esta bandera se puede habilitar para facilitar la depuración de diseños web
    // y el código JavaScript que se ejecuta dentro de WebViews.
    "webContentsDebuggingEnabled": true,

    // A Boolean value that determines whether to hide native Android logs or not
    // Default is false
    "hideLogs": true,
  },