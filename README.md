# Documentación del Proyecto

## Configuración Inicial

Para configurar el proyecto inicialmente, sigue estos pasos:

1. Asegúrate de tener instalado yarn. Si no lo tienes, puedes instalarlo con el comando `npm install -g yarn`.
2. Clona el repositorio a tu máquina local.
3. Navega hasta el directorio del proyecto.
4. Agrega las siguientes variables de entorno:
   1. `MMKV_KEY` Permite agregar una clave única para la información almacenada localmente
   2. `OPEN_AI_API_KEY` Es el API Key de OpenAI que permite hacer las llamadas a esta herramienta
5. Ejecuta `yarn install` para instalar todas las dependencias del proyecto.

## Desarrollo

Para iniciar el servidor de desarrollo, ejecuta `yarn start`.

## Pruebas

Para ejecutar las pruebas, usa el comando `yarn test`.

## Construcción

Para construir el proyecto, ejecuta `yarn build`.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de directorios:

- `__tests__/`: Contiene los archivos de prueba.
- `android/`: Contiene los archivos específicos de Android.
- `ios/`: Contiene los archivos específicos de iOS.
- `src/`: Contiene el código fuente del proyecto.
- `src/components/`: Contiene los componentes más pequeños.
- `src/contexts/`: Contiene todos los proveedores.
- `src/navigators/`: Contiene el navegador principal.
- `src/screens/`: Contiene solo las pantallas de la app.
- `src/utils/`: Contiene diversas utilidades enfocadas en el almacenamiento, navegación y llamadas a la API de OpenAI.

### Componentes Principales

- `App.tsx`: Este es el punto de entrada de .la aplicación.
- `RootNavigator.tsx`: Es el "stack" principal de la aplicación, aquí puedes agregar o eliminar pantallas.

## Configuración Adicional

Para configurar el proyecto para iOS, necesitarás abrir el archivo `ios/OnceUponATime.xcworkspace` en Xcode y seguir las instrucciones específicas de configuración de iOS.

Para configurar el proyecto para Android, necesitarás abrir el directorio `android/` en Android Studio y seguir las instrucciones específicas de configuración de Android.

Por favor, consulta la documentación oficial de React Native para obtener más detalles sobre la configuración de proyectos para iOS y Android.

## Contribución

Por favor, sigue las mejores prácticas de codificación y asegúrate de que todas las pruebas pasen antes de enviar un pull request.

## Contacto

Si tienes alguna pregunta o problema, por favor, abre un issue en GitHub o contáctame al correo electrónico [edwingarcessaucedo@gmail.com](mailto:edwingarcessaucedo@gmail.com).