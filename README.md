SPACE Y
=======
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/main.png?raw=true)

Nombre del juego
----------------


Space Y

Descripción de la temática
--------------------------

   * Cooperativo
   * Minijuegos
   * Gestión de recursos
   * Espacio

Integrantes del desarrollo
--------------------------

Nombre y Apellidos: Manuel Mantecón Polo  
Correo: m.mantecon.2018@alumnos.urjc.es  
Github: manutoarts  
  
Nombre y Apellidos: Sofía de Vega Giménez  
Correo: s.devegag.2018@alumnos.urjc.es  
Github: sofiadevega  
  
Nombre y Apellidos: José Ignacio Pintado Murillo  
Correo: ji.pintado.2018@alumnos.urjc.es  
Github: PepePm  
  
Nombre y Apellidos: Jacques David Meyns Villaldea  
Correo: jd.meyns.2018@alumnos.urjc.es  
Github: Jacquesmeyns  
  
Trello
------

https://trello.com/b/OI6kYl75/juegos-en-red

Github
------

https://github.com/Jacquesmeyns/SpaceY

FAQ
------
- ¿Cómo jugar Offline?

Abrir en cualquier navegador el archivo index.html, esto lanzará el juego.
Esperar a que cargue el juego, esto puede llevar unos segundos dependiendo del navegador y la computadora. 
Ver en el apartado de controles la distribución de los mismos para dos jugadores. Puedes consultar el Tutorial en el menú principal. 
Elegir que posición tomará el jugador, y en el menú principal pulsar sobre PLAY. 

- ¿Cómo jugar Online?

Método OpenVPN:

    Descargar la carpeta que contiene los archivos de configuración del servidor (Space_Y_Server_Files.zip) o de la siguiente dirección de Google Drive https://drive.google.com/file/d/1zql_eXVl3SPLzgq2Laj4gVRrOyECQqHC/view?usp=sharing CONTIENE: SpaceY_Server.jar, Run_Server.bat, la base de datos BD_SpaceY.accdb y el archivo de configuración del servidor de OpenVPN SpaceY.ovpn

    Instalar OpenVpn en nuestra máquina, descargándolo de https://openvpn.net/client-connect-vpn-for-windows/ o del archivo adjuntado en la carpeta del servidor.

    Abrimos OpenVpn, seleccionamos FILE y seleccionamos en nuestra carpeta del servidor el archivo SpaceY.ovpn contenido en Space_Y_Server_Files.rar. Para finalizar, pulsamos sobre el botón ADD en la esquina superior derecha. Nos aparecerá un apartado nuevo con la ip de nuestro servidor, al pinchar sobre el se activará y ya tendremos abierto el servidor.

    Ejecutar el archivo Run_Server.bat para abrir el servidor. Nos aparecerá una ventana indicando que SPRING se ha lanzado.

    Introducir en el navegador la siguiente URL : http://193.161.193.99:63511/ Si somos el servidor, proporcionar a los jugadores la URL de la máquina que hace de servidor.

    Esperar a que el Servidor se lance y cargue todos los Assets del juego

Podremos comprobar el estado del servidor en el icono del mundo dentro del menú principal

ATENCIÓN: Para que funcione el servidor los archivos SpaceY_Server.jar, Run_Server.bat, la base de datos BD_SpaceY.accdb deben estar en la misma carpeta. Puede que por tu versión de java el servidor no pueda funcionar. Adjuntamos un archivo que actualiza la versión actual en tu máquina. (jdk-15.0.1_windows-x64_bin.exe)

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/tutorial_github-10.png?raw=true)


GDD
------
ÍNDICE:

- ANÁLISIS DEL JUEGO
- SINOPSIS
- GÉNERO
- PLATAFORMAS
- PÚBLICO OBJETIVO
- TRASFONDO Y PERSONAJES
- GAMEPLAY
   - VISIÓN GENERAL DEL GAMEPLAY
   - EXPERIENCIA DE JUGADOR
   - DIRECTRICES DEL GAMEPLAY
   - OBJETIVOS DEL JUEGO Y RECOMPENSAS
   - MECÁNICAS
   - DISEÑO DE NIVEL
- CONTROLES Y NAVEGACIÓN
- PANTALLA COMPARTIDA EN LOCAL
- ESTÉTICA DE JUEGO Y EXPERIENCIA DE USUARIO
- MÚSICA


# Análisis del juego

Dos jugadores deben resolver la misión de terraformar Marte. Para ello se comunican a través
de un terminal, uno en la Tierra y el otro en Marte.
El operario en la Tierra comunica las misiones al explorador, soluciona papeleo e informa sobre
futuras condiciones meteorológicas de Marte.
El explorador completará tareas dadas por la base Terrestre, arreglará el equipamiento de la
base y explorará el planeta en busca de recursos que llevar a la Tierra.

# Sinopsis

Marte es un entorno peligroso. Necesitas un buen equipo y dotes de comunicación, anticiparse
a peligros y ser eficaz. Sobrevive a la misión de terraformar Marte en 300 días y proclama
nuestro futuro en las estrellas.

# Género

Gestión de recursos, cooperativo, minijuegos, simulación.

# Plataformas

Juego de navegador.

# Público objetivo

Edad: 12 a 25 años.
Personas que les gusten los juegos de cooperación, gestión de recursos y desarrollo.
Personas con un marcado gusto por los videojuegos basados en el espacio y la conquista del
universo.

# Trasfondo y Personajes

El mundo está en crisis después de varios desastres de origen humano. Las corporaciones
siguen en pie pero quieren invertir en algo que tenga futuro. Entre todas las ideas destaca el
programa espacial de Kospolita desarrollado por la empresa Space-y , que tiene la vista puesta
en Marte y promete llevarnos a todos al planeta rojo en un par de años si consiguen los fondos
necesarios. 

El objetivo es llevar a cabo progresos en Marte para que los inversores se queden
tranquilos. Con cada avance que se consigue, el stelonauta y su camarada en Tierra aseguran un
brillante futuro para la supervivencia de Kospolita. Pero si fallan, se perderán inversores y será
más difícil conseguirlo. Dios no lo quiera, pero si todo va mal nos quedaremos sin inversores ni
futuro.  

De todas formas confiamos en que se trabaje codo con codo construyendo,
literalmente, nuestro futuro en una moderna base marciana.    

**Stelonauta:** ​Es callado, aventurero y obediente. Le gusta la soledad y la mayonesa.    
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/stelonauta_concept.png?raw=true)

**Supervisor:** ​Le gusta controlar las cosas y pulsar botones. Ha llegado muy alto siguiendo estos principios.    
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/supervisor_concept.png?raw=true)


# Gameplay

## Visión general del Gameplay

Es una mezcla entre “Keep talking and nobody Explodes”, “SpaceTeam”, “Papers Please”,
“Among Us” y “Surviving Mars”. Se diferencia principalmente en que el jugador de marte tiene
acción en tiempo real.    
El juego estará disponible para navegador. (A través de Itch.io)    

El juego requerirá un mínimo de dos jugadores y se jugará en los siguientes modos:

**- Cooperativo LOCAL (2 jugadores):**
    Un jugador asumirá el rol de supervisor de la centralita y el otro será el
    stelonauta en Marte.  
**- Cooperativo ONLINE (2 jugadores):**
    Un jugador asumirá el rol de supervisor de la centralita y el otro será el
    stelonauta en Marte.  
**- Cooperativo - competitivo por equipos (más de 2 jugadores):**
    Por cada equipo habrá un supervisor de la centralita y el resto serán los
    stelonautas en Marte.      
    
**Dinámicas clave:**
- **Socialización** ​ mediante la comunicación y la cooperación
- **Terraformar** ​ el planeta y ver cómo evoluciona
- **Competición** ​ amistosa entre equipos


**Experiencia de Jugador**    

Ventana de título y pequeña introducción con el lanzamiento de un cohete atravesando la
órbita de Marte.    
Primero seleccionarás el avatar y el puesto que ocupas. Tu experiencia será diferente según tu
posición.  

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/navegacion.png?raw=true)

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/xp_jugador.png?raw=true)


**Supervisor:**
Si controlas al supervisor, tendrás que supervisar tareas de central, una sensación de estrés por
querer tomar la decisión correcta para la misión pero satisfacción en los momentos que hayas
ayudado a tu compañero en Marte. Tu objetivo es mantener la situación bajo control y liarla lo
menos posible. Papeleo, control del tiempo, supervisión de los registros de la misión.    

**Stelonauta:**
Si eres el stelonauta, tu objetivo principal es sobrevivir y completar las tareas de
terraformación. Dependerás de la comunicación con el supervisor puesto que éste te comunica
qué debes hacer en todo momento. Cuidado con las tormentas de arena, vigila tus recursos...    

**Directrices del gameplay**    
El juego está destinado a un público joven (13-35 años), su estética futurista se utilizará para
contentar al público más adulto. Se procura un acercamiento realista pero sin comprometer el
gameplay del juego, por lo que se tomarán ciertas libertades creativas.    
En pos del realismo se ha realizado una documentación teniendo los siguientes documentales
como referencia:  
_-Conquistando Marte (Disney, 2006)  
-Marte, dentro del Falcon Heavy (National Geographic, 2018)_


**Objetivos del juego y recompensas**  

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/tablaRecom.png?raw=true)


**Mecánicas**  
**TIERRA**    

El jugador de tierra tiene acceso desde un terminal a varias aplicaciones desde las que podrá
realizar una serie de acciones.    
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/supervisor_interfaz.png?raw=true)
(posible interfaz del jugador de Tierra)    

**Aplicaciones:**    
**Envío de paquetes:**
(RECURSOS: comida y materiales para construir/reparar)    
Puedes añadir hasta 8 paquetes de recursos, iguales o diferentes.    
Para enviar el cohete pulsaremos el botón naranja.    
Si el cohete está roto, no podrá extraer ni recibir materiales.
PANEL IZQUIERDA    

**Cámara de control:**
Panel con minimapa de Marte.    
(se ve el planeta, con mini-iconos para las zonas)    
PANEL ABAJO IZQUIERDA    

**Estado de máquinas:**
Son pilotos que se pueden activar y muestran el estado de las máquinas.    
(INVERNADERO, COMUNICACIONES, PLACAS SOLARES, BASE/ESCUDOS, ESTACIÓN DE TRANSPORTE)    
Extras (PILOTO OXÍGENO, PILOTO HAMBRE, MATERIALES, ENERGÍA EN MARTE)     
ABAJO DERECHA     

**Mapa meteorológico:**
En la Tierra no te avisan de los fenómenos si la estación de comunicaciones está rota.    
(TORMENTAS DE ARENA, LLUVIA ASTEROIDES)     
ARRIBA DERECHA     

**Conversora de recursos:**
PANEL IZQUIERDO    
- **Mecánica DDR:** aparece una combinación de tres flechas que hay que ejecutar para cambiar 1-1 los
    recursos de Marte por los de tierra.    
- Pinchar en el **botón del recurso** que quieres generar y ejecutar la **combinación de flechas.** Se creará
un recurso que se transmite por una tubería hacia tu almacén de recursos.
- Si fallas, el código se resetea y te da un **feedback visual** de que has generado mal un recurso.    
- Para poder enviar el cohete de vuelta debe ser vaciado de materiales.    
PANEL ABAJO CENTRO     


**Recursos:**
Son finitos, la comida se consume automáticamente con el tiempo y puedes recibir enviando en función de si
tienes suficientes para ello. Si desde marte te envían recursos, éstos se rellenan más rápido.    

**Juego activo**    
Consola de comandos donde tienes acceso a los códigos de control de cada zona de la base marciana. 
Si introduces el código de una zona, en el mapa meteorológico verás el estado de la maquinaria de esa 
zona [VERDE = OK, ROJO = ROTO]. Si te equivocas simplemente te pide que metas el código de nuevo. 
Interfaz de consola de comandos CMD.    
Los códigos serán de 8 dígitos alfanuméricos.


**Mapa meteorológico:**    

Solo te informa de algo inminente que va a ocurrir en Marte con un periodo de antelación. Estos
son eventos que ocurren sí o sí y el stelonauta no tiene manera de predecirlo hasta que lo tiene
encima. Son los siguientes:    

● Tormenta de arena:     
- Disminuye la barra del hambre.    
- Llena de polvo algunas zonas.    
- Vas más lento.    

● Lluvia de meteoritos:    
- Puede destrozar algunas zonas. Será necesario repararlas.   
- El stelonauta puede morir de un impacto directo.    


**MARTE**    
**Mecánicas:**    

- Moverse.    
- Recolectar recursos.    
- Interactuar (reparar, limpiar).    

**Zonas:**    
Tienen 2 estados básicos (rota/funcionando).    
● Si está rota hay que repararla usando materiales.    
● Si está funcionando, hace su tarea correctamente.    

1. TERRAFORMADOR: Da puntos cuando lo llenas de materiales para ganar la partida.    
2. COMUNICACIONES: permite que tierra vea el estado de marte. Si
coge polvo o se rompe por los meteoritos hay que reparar. Cuesta materiales.    
3. ESTACIÓN DE TRANSPORTE: : Enviar y recoger recursos de la Tierra. Recoges comida y 
materiales de construcción y puedes enviar materiales de Marte.    
4. MINA: Proporciona recursos a Marte. Estos recursos se pueden mandar a la Tierra, donde se
transforman en nuevos recursos que enviar al stelonauta o emplear en el terraformador que otorga 
puntos de victoria.    

**Atributos de los personajes**    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/tablaAtribPers.png?raw=true)



**Game Modes**    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/tablaFasesT.png?raw=true)


**Sistema de puntuación**

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/tablaPuntuacion.png?raw=true)


**Diagrama de fuentes, recursos y conversores**    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/recursos.png?raw=true)


**Diseño de nivel**

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/tablaDiseñoNivel.png?raw=true)


# Controles y Navegación


**Supervisor**    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/controlesSup.png?raw=true)

**Stelonauta**    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/controlesStelo.png?raw=true)

**Navegación**

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/DIAGRAMA_DE_FLUJO.png?raw=true)


### FASE 2: MODO LOCAL


Controles stelonaula :
- AD: movimiento
- W: cargar materiales
- H: descargar recursos
- R: reparar máquina    
Controles supervisor:
- FLECHAS: minijuego de recursos.
- TECLADO NUMÉRICO: minijuego de comunicación.
- RATÓN : Interaccionar con todas las opciones del panel de control.    

-Añadido un tutorial y cambio de la estructura del menú

### FASE 3 EN ADELANTE (ONLINE)

Ambos (supervisor y stelonauta) disponen de teclado y ratón propios.



Controles stelonaula:    

- WASD: movimiento    
- ESPACIO: interactuar    
- FLECHAS Y TECLADO NUMÉRICO: minijuegos    
- RATÓN: minijuegos    



Controles supervisor:    
- FLECHAS: minijuego de comunicación.    
- TECLADO NUMÉRICO: minijuego de comunicación.    
- NÚMEROS: minijuego de comunicación.    
- SHIFT:    
- LETRAS: minijuego de comunicación.    
- ESPACIO:    
- RATÓN : Interaccionar con todas las opciones del panel de control.    

MEJORAS EN CONECTIVIDAD:
-Hemos añadido una base de datos para registrar los usuarios, sus contraseñas, sus mensajes y su imagen de perfil.  
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/registro.png?raw=true)
-Hemos añadido un CHAT implementado en el icono del MENSAJE en el menú principal. 
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/chat.PNG?raw=true)
-Hemos añadido una consola para el estado del SERVIDOR implementado en el icono del MUNDO en el menú principal. 
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/global.PNG?raw=true)
-Hemos añadido una caja para iniciar sesión y registrarse en la base de datos del juego que identifica los usuarios conectados. Además permitimos personalización.    
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/login.PNG?raw=true)
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/usericon.PNG?raw=true)



# Pantalla compartida en Local

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/pantallaCompartida.png?raw=true)

# Estética de juego y experiencia de usuario

1. Se utilizará una estética (vectorial/pixelart) para evitar pérdidas de calidad y resolución.
    Utilizaremos una paleta inspirada en películas de Marte: de manera muy sintética,
    mantendremos un contraste entre los elementos y el polvo del planeta.
2. Queremos que experimenten una sensación de amenaza constante con la música y la
    tormenta que viene.
3. Queremos que sienta satisfacción y curiosidad por hacer tareas que tienen nombres
    complejos pero resolución muy sencilla. (SpaceTeam)
4. Queremos que experimenten cierta tensión por comunicarse rápido y eficazmente.
    Posteriormente una satisfacción por haber completado las tareas a tiempo.
5. Una barra de progreso como en “Among Us” para sintetizar el progreso de
    terraformación y poder ver mejor las tareas realizadas.
    
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/interfaz1.png?raw=true)


### Diseño de interfaz:
**Pantalla Marte**    
● Barras de stats: tienen 5 niveles.    
● Teclas: para pedir comida, oxígeno o materiales.    
● Panel de alerta: Comunicaciones de tierra urgentes    
● Barra Terraformación (Verde): nivel de progreso    
● Barra de Energía solar : aparece al estar cubiertas de polvo los paneles solares.    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/pantallaMarte.png?raw=true)
Diseño preliminar de la interfaz de stelonauta    


**Referencias: (Among us, Green the Planet, The escapist, Surviving mars)**    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/visual1.png?raw=true)

**Pantalla Tierra (Preliminar):**    

● Pantalla de información.    
● Panel de control.    
● Pantalla de visualización de Marte.    
● Botón de Emergencia.    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/supervisor_interfaz.png?raw=true)

**Referencias (paneles de control y juego space team):**    

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/visual2.png?raw=true)

# Música

Queremos un Tic Tac in crescendo a medida que avanza el gameplay, para ir confirmando la
sensación de presión ante la tormenta que viene. (Interestellar)    
Sonidos de oficina/panel de control/beep de radares para el supervisor, cuenta atrás...
(Apollo 11)    
Efectos de sonido de polvo, aparatos electrónicos, carga de energía eléctrica, lanzamiento de
cohetes    

Todos los efectos de sonido y canciones han sido obtenidos a través de https://opengameart.org/ .

# Capturas de pantalla
**● Menú logos:**
**Pantalla de logos y título. Sirve para precargar todo el contenido antes de ejecutar el juego en si. Nos permite agilizar procesos mientras introducimos al jugador.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneLogos.png?raw=true)

**● Menú inicial:**
**JUGAR: nos lleva al bucle principal del juego.**
**TUTORIAL: Nos lleva a la escena tutorial. El jugador será guiado pulsando el botón 'Y'.**
**OPCIONES: Podremos controlar el Volumen de la MÚSICA y SFX.**
**CONTACTO: Muestra los nombres de los creadores del proyecto y dirige a su página de Itch.io.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneMenu.png?raw=true)

**● Menú opciones:**
**Mediante dos sliders podremos controlar el volumen de los SFX y la MÚSICA.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneOptions.png?raw=true)

**● Menú contacto:**
Se ha implementado una escena de contactos con una pequeña caricatura de los desarrolladores y su enlace correspondiente a su página en Itch.io, donde se podrán ver sus otros **trabajos.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneContacts.png?raw=true)

**● Escena del juego:**
**Interfaz de juego inicial, con sus diferentes zonas y máquinas.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneGame.png?raw=true)

**● Escena del tutorial:**
**Vista de Tutorial, para avanzar será necesario pulsar la Y, no se puede salir de él si no se completa. Nos enseñará las mecánicas básicas y cómo jugar.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneTutorial.png?raw=true)

**● Menú de pausa:**
**Se ha implementado un menu de PAUSA pulsando la tecla ESC, que nos permite detener el juego. Podremos regresar al menu de inicio o cambiar nuestros ajustes en pantalla.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_scenePause.png?raw=true)

**● Escena de victoria/derrota:**
**Hemos implementado las condiciones de VICTORIA y DERROTA: Para ganar hace falta rellenar la barra de terraformacion al 100% y no morir de hambre o por golpe de un meteorito.**
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneWin.png?raw=true)
![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/master/Resources/Img/img_sceneDefeat.png?raw=true)

**● Diagrama de clases:**
**Diagrama api rest de la aplicación.**

![alt text](https://github.com/Jacquesmeyns/SpaceY/blob/Pruebas-spring/Resources/Img/diagrama_clases.png?raw=true)


# FASE 4 (MULTIJUGADOR con WebSockets)

Controles stelonaula:    

- WASD: movimiento    
- H: accionar máquina    
- R: reparar máquina    


Controles supervisor:    
- FLECHAS: minijuego de comunicación.    
- NÚMEROS: minijuego de comunicación.    
- RATÓN : Interaccionar con todas las opciones del panel de control.    

# Pantalla individual en Multijugador    
Pantalla de Marte:    
![falta_foto_pantalla_multijugador_marte](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/cohete_roto.png)

Pantalla de Tierra:    
![falta_foto_pantalla_multijugador_tierra](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/tierra_sin_cohete.png)

### Diseño de interfaz:
**Menú principal**    
Se han implementado mejoras visuales en el menú principal:    
![nuevo_menu](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/nuevo_menu.png)

● Opciones de Host y Join (creador de la partida y jugador que se une)    
![pantalla_host_join](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/menu_play.png)
    
Para jugar una partida, el usuario tiene la opción de ser el host de una:    
![pantalla_host_join_logged_in](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/menu_play_host_logged.png)

O la otra opción de entrar en una partida ya hosteada:    
![pantalla_host_join_logged_in](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/menu_play_join_logged.png)
    
Se han contemplado la posibilidad de varios errores por parte del jugador, y para evitarlos hemos insertado mecanismos de feedback para que el usuario sepa qué falta por hacer mediante la visualización de mensajes en color rojo indicando el problema.    
    
● Para indicar que no se puede jugar sin estar conectado con una cuenta.    
![mensaje_error_login](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/error_not_logged.png)
    
● Para indicar que necesita elegir un planeta si quiere ser el host.    
![mensaje_error_planeta](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/error_choose_planet.png)
    
● Para indicar que el código de lobby insertado es erróneo.    
![mensaje_error_join](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/error_lobby_not_found.png)

**Pantalla Marte**    
● 3 barras de estadísticas (Vida, materiales, herramientas de reparación).    
● Botones: para pedir comida o herramientas de reparación.    
● Panel de chat: Comunicaciones de tierra.    
● Nivel de Terraformación (Círculo verde en panel de chat): Nivel de progreso.    

**Pantalla Tierra**    
● Panel de chat: Comunicaciones de marte.    
● Panel de control de máquinas.    
● Botones: de Emergencia.    
● Pantalla de visualización de Marte (mapa marciano).    
● Panel de control de cohete.    
● Minijuego DDR.    

Ambos jugadores pueden comunicarse entre sí a través del chat durante la partida. También pueden utilizar los botones dedicados a eventos concretos para una comunicación más directa. Toda esta comunicación se hace mediante websockets.    

**Protocolo WebSockets**    
Se han creado dos "Handlers" de websockets, uno para administrar los lobbies, y otra para sincronizar las partidas de los jugadores. Funcionan de la siguiente manera:    
● WsLobbiesHandler:   
  * afterConnectionEstablished: El handshake inicial se realiza:
      - En el host, cuando crea una sala al pulsar el botón "Host".
      - En el invitado, cuando pulsa el botón de "Join".

  * handleTextMessage: Según el valor de "action", realiza distintas acciones:
      - "Create": Crea un lobby añadiendo en un mapa concurrenthash al usuario con la clave "lobbyID". Este es el identificador de la sala, el cual ha sido creado mediante "Hashid", que crea un código hash a partir del id del usuario, para que sea aleatorio y único.
      - "Sync": Utilizado para sincronizar información entre el host y el invitado. Solo sincroniza la elección de rol(Tierra/Marte) dentro de la partida.
      - "startGame": Llamado cuando el inivtado se une a un lobby. Envía un mensaje a cada usuario con el nombre de la escena de juego que dene cargar ("sceneEarth"/"sceneMars") y da la orden de que comience la partida.

  * afterConnectionClosed: Se llama cuando un usuario se desconecta. Esto puede ser porque haya empezado la partida (y ya no se necesite el lobby), o porque haya una desconexión del usuario. Si el usuario desconectado...
    - Es host, elimina el lobby del mapa hash y desconecta del WebSocket al usuario invitado, si lo hubiese.
    - Es invitado, lo desconecta y lo elimina del mapa hash; pero no desconecta al host.

● WsGamesHandler:  
  * afterConnectionEstablished: El handshake inicial se realiza nada más el jugador carga la escena de juego ("sceneEarth"/"sceneMars").

  * handleTextMessage: Según el valor de "action", realiza distintas acciones:
      - "Start": Se ejecuta tras hacer el handshake inicial. Si es el primer jugador del lobby que se une, almacena en un mapa concurrenthash al usuario con el id del lobby como clave. Si es el segundo jugador (ya existe en el hashmap su lobby como clave), modifica el valor de esa clave añadiendo a este jugador tambíen.
      - "Sync": Utilizado para sincronizar variables de juego. Al servidor los jugadores le envían un json con 3 atributos: id del lobby, "type" que indica el nombre de la variable y "value" que indica su nuevo valor. El servidor distingue de qué jugador es el mensaje y se lo reenvia al otro usuario de la partida con ese lobbyID.

  * afterConnectionClosed: Si un jugador se desconecta en mitad de una partida, también se cierra la conexión al otro jugador.

![falta_diagrama_de_clases](https://github.com/PepePm/SpaceY_Fase4/blob/master/pruebaSpaceY/Img/diagrama_clasesF4.png)

### Arreglo de bugs
Hubo un problema en el que un plugin que usábamos para la interfaz dejó de funcionar para la versión que usábamos de Phaser. Hemos actualizando Phaser a la última versión y conseguido solucionar el problema.

### Vídeo
![falta_link_al_video]()

# FASE 5 (Mejoras finales / Publicación del juego)
### Glitches encontrados
● Cuando el usuario se conectaba, no comprobaba si ya estaba conectado, y se podía conectar a la misma cuenta varias veces desde distintos clientes.    
● Al refrescar o cerrar la página no se desconectaba al usuario de la base de datos.    
● El menú de pausa no funcionaba bien en la escena de la Tierra.    
● Tras pasar un tiempo jugando el juego se congelaba y el sonido se quedaba en bucle.    
● La máquina de comunicaciones no actualizaba bien su estado a la tierra.    
● La cuenta atrás de tierra y marte no estaban sincronizadas.    
● Cuando un jugador refrescaba o cerraba la página el otro jugador no era devuelto al menú principal.    
● Al terminar una partida y volver al menú principal el menú de login no muestra ni el usuario actual ni da opción a desconectarse ni a identificarse.    
● Las cajas de texto de los chats ingame no estaban bien ajustadas a la interfaz.    
● Las cajas de texto de los chats ingame no se ocultaban bien al pausar el juego o al mostrar el post-it de ayuda.    


### Mejoras de fases previas
Balance de juego:    
- Velocidad de movimeento del stelonauta +20%    
- Tiempo de partida +50%    
- Velocidad de carga del cohete: +28%    
- Cantidad de recursos que se obtienen al descargar el cohete:    
  * Comida: +25%    
  + Herramientas: +50%    

### Publicado en las siguientes páginas webs

● Outpan: https://www.outpan.com/app/45269f840d/space-y    
● Gamejolt: https://gamejolt.com/games/space_y/627500    
● Newgrounds: https://www.newgrounds.com/portal/view/802004    

