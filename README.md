# Proyecto 1 - Knight's Tour con Backtracking

## Instituto Tecnológico de Costa Rica

**Profesor:** Joss Pecou Johnson 

**Curso:** Análisis de Algoritmos

**Segundo semestre de 2025 - Grupo 60**

## Integrantes del grupo

- Roymar Castillo Carvajal

- Dilan Zamora Sánchez

---


## Tecnologías Utilizadas

### Frontend

- **React** - Biblioteca de JavaScript para construir interfaces de usuario
- **React Scripts** - Herramientas de construcción y desarrollo
- **HTML5** - Estructura y marcado de la aplicación web
- **CSS3** - Estilos personalizados con variables CSS y diseño responsivo

### Lenguajes de Programación

- **JavaScript** - Lenguaje principal de desarrollo
- **JSX** - Sintaxis de JavaScript extendida para React

### Herramientas de Desarrollo

- **ESLint** - Linter para mantener calidad del código siguiendo Google JavaScript Style Guide
- **npm** - Gestor de paquetes y dependencias
- **Git** - Control de versiones
- **GitHub Pages** - Despliegue de la aplicación

### Arquitectura y Patrones

- **Patrón MVC**: Separación de responsabilidades
  - **Modelos**: Clases para Tablero, Caballo, Casilla y AlgoritmoBacktracking
  - **Vistas**: Componentes React para la interfaz
  - **Controladores**: Custom Hooks y lógica de control
- **Custom Hooks de React** - Gestión de estado modular (useState, useEffect, useCallback, useRef)
- **Web Workers** - Procesamiento en segundo plano para cálculos intensivos

### Algoritmos Implementados

- **Backtracking** - Técnica de búsqueda exhaustiva que explora todas las posibilidades
- **Recorrido del Caballo (Knight's Tour)** - Problema clásico de búsqueda con restricciones

---

## Ejecución del Programa

### Acceso Directo

Puede acceder a la aplicación desplegada en:
```
https://racc1210.github.io/PY01-knight_tour/
```
### Ejecución Local


#### Clonar el repositorio
```
git clone https://github.com/Racc1210/PY01-knight_tour.git
```
#### Instalar dependencias
```
npm install
```
#### Ejecutar en modo desarrollo
```
npm start
```
#### Construir para producción
```
npm run build
```

---

## Instrucciones de Uso

### Paso 1: Configurar el Recorrido

1. **Tamaño del Tablero**: Seleccione el tamaño del tablero (4x4, 5x5, 6x6 o 7x7)
2. **Tipo de Recorrido**:
   - **Abierto**: El caballo no necesita regresar a la casilla inicial
   - **Cerrado**: El caballo debe poder regresar a la casilla inicial desde la última casilla visitada
3. **Posición Inicial**: Defina la casilla de inicio del caballo mediante:
   - Ingreso manual de coordenadas (fila, columna)
   - Click directo sobre la casilla en el tablero

### Paso 2: Ejecutar el Algoritmo

1. Presione el botón "Iniciar"
2. El programa ejecutará el algoritmo de backtracking en segundo plano usando Web Workers
3. Mostrará el progreso del cálculo en tiempo real
4. Una vez se encuentre la solucion, o determine que no existe una, se iniciará la animación visual del recorrido

### Paso 3: Visualización y Control

- **Panel Izquierdo (Estadísticas)**:
  - Tiempo de ejecución del algoritmo
  - Total de movimientos realizados
  - Número de retrocesos
  - Progreso de la animación
- **Panel Central (Tablero)**:
  - Visualización del tablero con la posición actual del caballo
  - Números de secuencia en casillas visitadas
  - Resaltado de casillas en el proceso de backtracking
- **Panel Derecho (Controles)**:
  - Control de velocidad de animación (deslizador)
  - Botones de pausa/reanudar
  - Botón de reinicio
  - Mini-tablero con la solución final (si existe)
  - Mensaje si no hay solución

---

## Análisis de Soluciones por Tamaño de Tablero

### Tablero 4x4

#### Recorrido Abierto y cerrado: Sin solución

 Un tablero 4x4 tiene 16 casillas. Matemáticamente, se ha demostrado que no existe ningún recorrido del caballo que visite todas las casillas exactamente una vez en un tablero de este tamaño.

El problema sucede ya que existe casillas en las que el caballo queda "atrapado", es decir: después de visitarlas, no hay forma de continuar el recorrido sin dejar casillas sin visitar o volver a casillas ya visitadas.


---

### Tablero 5x5

#### Recorrido Abierto: 

**Soluciones encontradas:** 

**Posiciones con solución:**  
`(0,0)`, `(0,2)`, `(0,4)`, `(1,1)`, `(1,3)`, `(2,0)`, `(2,2)`, `(2,4)`, `(3,1)`, `(3,3)`, `(4,0)`, `(4,2)`, `(4,4)`

**Posiciones sin solución:**  
`(0,1)`, `(0,3)`, `(1,0)`, `(1,2)`, `(1,4)`, `(2,1)`, `(2,3)`, `(3,0)`, `(3,2)`, `(3,4)`, `(4,1)`, `(4,3)`

- Las posiciones con solución corresponden a casillas donde la suma del numero de fila y el numero de columna es par
- Las posiciones sin solución tienen suma impar

Este patrón existe porque el caballo cambia el color de la casilla en cada movimiento. En un tablero de 5x5
el tablero tiene 25 casillas, de las cuales 13 son de un color y 12 del otro. Como el caballo debe visitar 25
casillas y el color de casilla debe cambiar en cada movimiento una solucion es posible cuando se empieza en una casillo del color mayoritario, ya que al tener una cantidad impar de pasos terminara en una casilla del color opuesto, algo que es imposible si se empieza en una casilla del color minoritario. 



#### Recorrido Cerrado:

En un tablero 5x5 no existe un recorrido cerrado del caballo porque el caballo siempre cambia de color en cada movimiento y como el numero de casillas es impar, siempre terminaria en un color distinto al inicial, lo que no permite volver a la casilla inicial.


### Tablero 6x6

#### Recorrido Abierto:  Solución completa
El tablero de 6x6, al tener una cantidad de casillas pares, permite que el caballo cambie de color de casilla, lo que permite llegar a visitar todas las casillas.



#### Recorrido Cerrado:

**Posiciones con solución:**  
`(0,0)`, `(0,1)`, `(0,3)`, `(0,4)`, `(0,5)`, `(1,1)`, `(1,2)`, `(1,3)`, `(1,4)`, `(1,5)`, `(2,0)`, `(2,2)`, `(2,3)`, `(3,0)`, `(3,3)`, `(3,4)`, `(3,5)`, `(4,5)`, `(5,0)`, `(5,1)`, `(5,2)`, `(5,3)`, `(5,4)` y otras.


Razón: Aunque el tablero 6x6 es par y permite recorridos cerrados, no todas las casillas sirven como inicio. Para que el recorrido sea cerrado, la última casilla debe quedar a un movimiento de casilla inicial. En esquinas y bordes hay menos movimientos posibles, lo que reduce las combinaciones y suele llevar a caminos sin solucion.

---

### Tablero 7x7

#### Recorrido Abierto:

**Soluciones encontradas:**

Razón: Al ser un tablero más grande, el caballo tiene más opciones de movimiento y más caminos posibles. Esto hace que sea mucho más fácil encontrar recorridos completos, y solo en casos muy puntuales puede fallar. Se estima que mas del 95% de las casillas funcionan como casilla inicial para completar el recorrido. 

#### Recorrido Cerrado:

Razón: Esto tiene el mismo razonamiento que en tablero de 5x5. Esto debido a que ambos son impares.

## Evidencias de funcionamiento
En este enlace se encuentra un presentacion en formato pdf con las evidencias de funcionamiento del programa:

```
https://drive.google.com/file/d/1lGV4aPvcslpunrZiQU7i9TdzoPrwggqv/view?usp=sharing
```

## Bitacora

- **1 de octubre a 15 de octubre**: En estos días nos dedicamos a aprender la sintaxis de JavaScript y React,  
  además de revisar la guia de estilo para JavaScript de Google, para implementar estos estandares en el proyecto.

- **19 de octubre**: Este dia lo dedicamos a establecer como implementar el patrón de diseño MVC, estableciendo  
  como dividir las responsabilidades del codigo y el enfoque que vamos a implementar, a lo que decidimos trabajar con clases. Este día tambien se implementaron las versiones iniciales de las clases: Casilla, Caballo y tablero.
- **20 de octubre**: Este día se dedicó a desarrollar la interfaz gráfica inicial del programa, se modificaron las estructuras de las clases Casilla y Caballo, junto con la  adicion de la lógica del algoritmo de backtracking.
- **21 de octubre**: En este dia no hubo commits pero se estuvo trabajando todo el día en los elementos de la capa de vista para poder vizualizar el recorrido del caballo en el tablero. 

- **22 de octubre**: Temprano en este día se terminó de implementar los elementos de la capa vista (con commit) y se desarrollo la capa del controlador para conectar la capa de vista con la capa de modelo y que el programa pudiera funcionar correctamente

- **23 de octubre**: Este dia se implemento el temporizador para medir el tiempo de ejecución en tiempo real, lo que necesito la implementacion de web workers para ejecutar el algoritmo de backtracking en un hilo y la interfaz en otra para que se pudiera actualizar de forma constante y mantenerse activa

- **24 de octubre**: Se dedico a hacer revisiones finales, tanto al codigo como a la documentacion externa. 

## Dificultades

Realmente, a excepción de los problemas esperados al estar aprendiendo una nueva tecnología, la única dificultad real que tuvimos fue acomodar la naturaleza del algoritmo de backtracking y su gran cantidad de iteraciones. En la clase Caballo se implementó una lista para guardar el historial y usarlo en la etapa de animación, pero tuvimos que limitar la cantidad de elementos que podía almacenar, ya que podía llegar a desbordar la memoria en algunas soluciones de tableros 6x6 y 7x7. De igual manera, al igual que el espacio de memoria, el tiempo de ejecución fue un problema. Descubrimos que, por defecto, en una página el código se ejecuta todo en un único hilo, lo que provoca que mientras se ejecuta el algoritmo este hilo se sature y no quede espacio para la interfaz, la cual quedaba congelada, incluso mostrando mensajes del navegador como “La página no responde”. Para solucionar esto, tuvimos que implementar web workers para que el algoritmo de backtracking se ejecutara en un hilo y, en otro diferente, se manejara lo relacionado con la interfaz para poder ejecutar ambas en paralelo.
