# Module 1: SVG Foundations

*Master the fundamental concepts and building blocks of SVG graphics*

---

## Table of Contents

1. [Introduction to SVGs](#introduction-to-svgs)
2. [The Seven Primitive Shapes](#the-seven-primitive-shapes)
3. [How Shapes Are Made](#how-shapes-are-made)
4. [Coordinate System](#coordinate-system)
5. [Styling Attributes](#styling-attributes)
6. [Grouping Elements](#grouping-elements)
7. [Practice Exercises](#practice-exercises)

---

## Introduction to SVGs

SVG (Scalable Vector Graphics) is a markup language for images, similar to how HTML is a markup language for documents. All SVGs begin with a root `<svg>` element:

```html
<svg viewBox="0 0 100 100">
  <!-- SVG code goes here -->
</svg>
```

**Key Concepts:**
- SVGs are made up of **elements** (shapes)
- Each element represents a **primitive shape**
- Shapes are controlled through **attributes**
- SVGs are **vector-based** and scale infinitely
- SVGs follow the **path model** - everything is constructed from paths

### The Path Model

Unlike HTML/CSS which uses the **box model**, SVGs use the **path model**:
- All SVG shapes are constructed from a path
- Shapes begin with an outline (path)
- The outline is then colored in or made thicker
- This creates the final visible shape

---

## The Seven Primitive Shapes

SVG has only **seven primitive shapes** that form the foundation of all SVG graphics:

### 1. Rectangle (`<rect>`)
```html
<svg viewBox="0 0 100 100">
  <rect 
    x="20" 
    y="20" 
    width="60" 
    height="60" 
    fill="crimson"
  />
</svg>
```

**Attributes:**
- `x`, `y`: Position (top-left corner)
- `width`, `height`: Dimensions
- `fill`: Fill color
- `stroke`: Border color
- `stroke-width`: Border thickness
- `rx`, `ry`: Corner radius for rounded rectangles

### 2. Circle (`<circle>`)
```html
<svg viewBox="0 0 100 100">
  <circle 
    cx="50" 
    cy="50" 
    r="30" 
    fill="darkorchid"
    stroke="currentColor"
    stroke-width="3"
  />
</svg>
```

**Attributes:**
- `cx`, `cy`: Center coordinates
- `r`: Radius
- `fill`, `stroke`, `stroke-width`

### 3. Ellipse (`<ellipse>`)
```html
<svg viewBox="0 0 100 100">
  <ellipse 
    cx="50" 
    cy="50" 
    rx="40" 
    ry="20" 
    fill="none"
    stroke="yellow"
    stroke-width="3"
  />
</svg>
```

**Attributes:**
- `cx`, `cy`: Center coordinates
- `rx`, `ry`: Horizontal and vertical radii

### 4. Line (`<line>`)
```html
<svg viewBox="0 0 100 100">
  <line 
    x1="20" 
    y1="20" 
    x2="80" 
    y2="80" 
    stroke="currentColor"
    stroke-width="3"
  />
</svg>
```

**Attributes:**
- `x1`, `y1`: Start point
- `x2`, `y2`: End point
- `stroke`, `stroke-width`

### 5. Polyline (`<polyline>`)
```html
<svg viewBox="0 0 100 100">
  <polyline 
    points="20,20 40,40 60,20 80,40" 
    fill="none"
    stroke="currentColor"
    stroke-width="3"
  />
</svg>
```

**Attributes:**
- `points`: Space-separated coordinate pairs

### 6. Polygon (`<polygon>`)
```html
<svg viewBox="0 0 100 100">
  <polygon 
    points="50,20 20,80 80,80" 
    fill="none"
    stroke="yellow"
    stroke-width="3"
  />
</svg>
```

**Attributes:**
- `points`: Space-separated coordinate pairs (automatically closes)

### 7. Path (`<path>`)
```html
<svg viewBox="0 0 100 100">
  <path 
    d="M 20 20 L 80 20 L 80 80 L 20 80 Z" 
    fill="none"
    stroke="currentColor"
    stroke-width="3"
  />
</svg>
```

**Attributes:**
- `d`: Path data (commands and coordinates)

---

## How Shapes Are Made

### The Path Model in Action

When you draw a shape on paper, you typically:
1. Draw the outline first
2. Color it in or leave it as an outline
3. Adjust the thickness of your pen/marker

SVGs work exactly the same way:

```html
<!-- Just the outline -->
<rect 
  x="20" 
  y="20" 
  width="60" 
  height="40" 
  fill="none"
  stroke="white"
  stroke-width="3"
/>

<!-- Filled shape -->
<rect 
  x="20" 
  y="20" 
  width="60" 
  height="40" 
  fill="blue"
  stroke="white"
  stroke-width="3"
/>
```

### Building Complex Shapes

Complex icons are built by combining multiple simple shapes:

```html
<!-- Monitor icon example -->
<svg viewBox="0 0 100 100">
  <!-- Screen (rectangle outline) -->
  <rect 
    x="20" 
    y="20" 
    width="60" 
    height="40" 
    fill="none"
    stroke="white"
    stroke-width="3"
  />
  
  <!-- Base (line) -->
  <line 
    x1="35" 
    y1="80" 
    x2="65" 
    y2="80" 
    stroke="white"
    stroke-width="2"
  />
</svg>
```

---

## Coordinate System

### Understanding Coordinates

SVGs use a **coordinate system** where:
- Origin (0,0) is at the **top-left corner**
- X-axis increases **rightward**
- Y-axis increases **downward**
- Units are **user units** (scalable)

### ViewBox - The SVG Camera

The `viewBox` attribute acts like a camera, determining which part of the infinite SVG canvas is visible:

```html
<svg viewBox="0 0 100 100">
  <!-- Shows a 100x100 area starting at (0,0) -->
</svg>

<svg viewBox="50 50 100 100">
  <!-- Shows a 100x100 area starting at (50,50) -->
</svg>
```

**ViewBox Syntax:**
```html
<svg viewBox="x y width height">
```

- `x`: X-coordinate of top-left visible region
- `y`: Y-coordinate of top-left visible region  
- `width`: Width of visible region
- `height`: Height of visible region

### Responsive SVGs

ViewBox makes SVGs responsive - they scale to any size while maintaining proportions:

```html
<svg viewBox="0 0 24 24" width="16" height="16">
  <!-- 16px icon -->
</svg>

<svg viewBox="0 0 24 24" width="128" height="128">
  <!-- 128px icon - same proportions -->
</svg>
```

---

## Styling Attributes

### Fill and Stroke

```html
<rect 
  fill="red"           <!-- Fill color -->
  stroke="blue"        <!-- Border color -->
  stroke-width="2"     <!-- Border thickness -->
  fill-opacity="0.5"   <!-- Fill transparency -->
  stroke-opacity="0.8" <!-- Border transparency -->
/>
```

### Color Values

SVGs accept various color formats:

```html
<!-- Named colors -->
fill="red"

<!-- Hex colors -->
fill="#ff0000"

<!-- RGB -->
fill="rgb(255, 0, 0)"

<!-- RGBA with transparency -->
fill="rgba(255, 0, 0, 0.5)"

<!-- Current color (inherits from parent) -->
fill="currentColor"
```

### Stroke Properties

```html
<path 
  stroke="black"
  stroke-width="3"
  stroke-linecap="round"    <!-- Line endings: butt, round, square -->
  stroke-linejoin="round"   <!-- Corner joins: miter, round, bevel -->
  stroke-dasharray="5,5"    <!-- Dashed line pattern -->
/>
```

---

## Grouping Elements

### The Group Element (`<g>`)

Use the `<g>` element to group related shapes and apply styles to multiple elements:

```html
<svg viewBox="0 0 100 100">
  <g fill="red" stroke="black" stroke-width="2">
    <circle cx="30" cy="30" r="10"/>
    <circle cx="70" cy="30" r="10"/>
    <circle cx="50" cy="70" r="10"/>
  </g>
</svg>
```

### Benefits of Grouping

1. **Apply styles to multiple elements at once**
2. **Transform multiple elements together**
3. **Organize complex SVGs**
4. **Reuse common elements**

---

## Practice Exercises

### Exercise 1: Basic Shapes
Create an SVG with all seven primitive shapes:

```html
<svg viewBox="0 0 200 200">
  <!-- Rectangle -->
  <rect x="10" y="10" width="40" height="30" fill="red"/>
  
  <!-- Circle -->
  <circle cx="80" cy="25" r="15" fill="blue"/>
  
  <!-- Ellipse -->
  <ellipse cx="120" cy="25" rx="20" ry="10" fill="green"/>
  
  <!-- Line -->
  <line x1="10" y1="60" x2="50" y2="60" stroke="purple" stroke-width="3"/>
  
  <!-- Polyline -->
  <polyline points="60,50 80,70 100,50 120,70" fill="none" stroke="orange" stroke-width="2"/>
  
  <!-- Polygon -->
  <polygon points="140,50 160,70 180,50" fill="yellow"/>
  
  <!-- Path -->
  <path d="M 10 100 L 50 100 L 50 130 L 10 130 Z" fill="cyan"/>
</svg>
```

### Exercise 2: Icon Building
Create a simple icon using multiple shapes:

```html
<!-- Heart icon -->
<svg viewBox="0 0 24 24">
  <path 
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    fill="red"
  />
</svg>
```

### Exercise 3: Responsive Design
Create an SVG that works at multiple sizes:

```html
<!-- Responsive icon -->
<svg viewBox="0 0 24 24" width="16" height="16">
  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M12 6v6l4 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
```

---

## Key Takeaways

1. **SVGs use the path model** - everything is constructed from paths
2. **Only seven primitive shapes** form the foundation
3. **ViewBox makes SVGs responsive** and scalable
4. **Coordinate system** starts at top-left (0,0)
5. **Grouping** helps organize complex SVGs
6. **Styling attributes** control appearance
7. **Practice is essential** for mastering SVG creation

---

## Next Steps

You're now ready to move on to **Module 2: Your First Animation** where you'll learn how to bring these static shapes to life with CSS animations and transitions. 