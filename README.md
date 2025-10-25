# Proyecto 1 - Knight's tour con Backtracking

## Instituto Tecnológico de Costa Rica

Profesor: Joss Pecou Johnson  
Analisis de algoritmos  
Segundo semestre de 2025 - Grupo 60

## Integrantes del grupo

- Roymar Castillo Carvajal
- Dilan Zamora Sanchez

---

## Tecnologías Utilizadas

### Frontend

- **React** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción y desarrollo rápido
- **HTML5** - Estructura y marcado de la aplicación web
- **CSS3** - Estilos y diseño responsivo con variables CSS

### Lenguajes de Programación

- **JavaScript** - Lenguaje principal de desarrollo
- **JSX** - Sintaxis de JavaScript extendida para React

### Herramientas de Desarrollo

- **ESLint** - Linter para mantener calidad del código
- **npm** - Gestor de paquetes y dependencias
- **Git** - Control de versiones

### Algoritmos y Técnicas

- **Algoritmo Backtracking** - Técnica de búsqueda exhaustiva y sistemática para resolver problemas que implican restricciones.
- **Recorrido del Caballo (Knight’s Tour)** 
- **Programación Funcional** - Paradigma utilizado en componentes React
- **Hooks de React** - Gestión de estado con `useState`

## Ejecución del Programa

Se puede ingresar a la pagina por medio de este link:

https://racc1210.github.io/PY01-knight_tour/

### Instrucciones de Uso

#### Paso 1: Configurar el inicio del recorrido

- Ingreasr el tamaño del tablero 
- Seleccionar el tipo de recorrido (abierto - cerrado)
- Seleccionar la posicion inicial del caballo, ya sea en numeración o seleccionando la casilla en el tablero

#### Paso 2: Ejecutar el Algoritmo

-Hacer click en el boton "Iniciar" color verde
-El programa iniciara el algoritmo del punto de partida, analiza si existe solucion o no, una vez hecho el analisis el caballo iniciara el recorrido en la interfaz.

#### Paso 3: Resultados

- **Panel izquierdo | Estadísticas**: Tiempo de ejecución, movimientos, retrocesos, progreso.
- **Panel derecho**: Velocidad de movimiento ajustable para ver el recorrido del caballo, boton de pausa o reinicio y la solución final *SI existe*.

---

## Soluciones y sin solución

#### 4X4
-No existe solución para ninguna posición en el recorrido abierto ni cerrado.


#### 5X5
-Existe solución desde 13 posiciones en el recorrido abierto:
(0,0), (0,2), (0,4), (1,1), (1,3), (2,0), (2,2), (2,4), (3,1), (3,3), (4,0), (4,2), (4,4)

Sin solución 12 posiciones: (0,1), (0,3), (1,0), (1,2), (1,4), (2,1), (2,3), (3,0), (3,2), (3,4), (4,1), (4,3)

-En el recorrido cerrado no existe solución.


#### 6X6
-En el recorrido abierto existe solución desde todas las posiciones.

-En el recorrido cerrado solo existe solución en 28 posiciones: (0,0), (0,1), (0,3), (0,4), (0,5), (1,1), (1,2), (1,3), (1,4),(1,5), (2,0), (2,2), (2,3), (3,0), (3,3), (3,4), (3,5), (4,5), (5,0), (5,1), (5,2), (5,3), (5,4).


#### 7x7
-Tanto como el recorrido cerrado y abierto existen soluciones posibles en casi todas las posiciones del tablero como punto inicial.

## Bitacora

- **1 de octubre a 15 de octubre**: En estos días nos dedicamos a aprender la sintaxis de JavaScript y React,  
  además de revisar la guia de estilo para JavaScript de Google, para implementar estos estandares en el proyecto.

- **19 de octubre**: Este dia lo dedicamos a establecer como implementar el patrón de diseño MVC, estableciendo  
  como dividir las responsabilidades del codigo y el enfoque que vamos a implementar, a lo que decidimos trabajar con clases. Este día tambien se implementaron las versiones iniciales de las clases: Casilla, Caballo y tablero.
- **20 de octubre**: Este día se dedicó a desarrollar la interfaz gráfica inicial del programa, se modificaron las estructuras de las clases Casilla y Caballo, junto con la adicion de la lógica del algoritmo de backtracking
