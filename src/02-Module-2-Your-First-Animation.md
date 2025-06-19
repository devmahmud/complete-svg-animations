# Module 2: Your First Animation

*Bring your SVG shapes to life with CSS animations and transforms*

---

## Table of Contents

1. [Introduction to SVG Animations](#introduction-to-svg-animations)
2. [CSS Transitions](#css-transitions)
3. [CSS Transforms](#css-transforms)
4. [Sequencing Animations](#sequencing-animations)
5. [Timing Functions](#timing-functions)
6. [Practice Projects](#practice-projects)

---

## Introduction to SVG Animations

Now that you understand how to create static SVG shapes, it's time to bring them to life! SVG animations can be achieved through several methods:

1. **CSS Transitions** - Simple state changes
2. **CSS Animations** - Keyframe-based animations
3. **CSS Transforms** - Moving, scaling, rotating elements
4. **SMIL** - SVG's native animation system (covered in Module 3)

### Why Animate SVGs?

- **Enhanced User Experience** - Provide visual feedback
- **Better Communication** - Guide user attention
- **Professional Polish** - Make interfaces feel more responsive
- **Storytelling** - Create engaging narratives

---

## CSS Transitions

### Basic Hover Effects

The simplest way to animate SVGs is with CSS transitions on hover:

```html
<svg viewBox="0 0 100 100">
  <circle 
    cx="50" 
    cy="50" 
    r="30" 
    fill="blue"
    class="hover-circle"
  />
</svg>
```

```css
.hover-circle {
  transition: fill 0.3s ease;
}

.hover-circle:hover {
  fill: red;
}
```

### Transition Properties

You can animate most SVG attributes with CSS:

```css
.svg-element {
  /* Animate fill color */
  transition: fill 0.3s ease;
  
  /* Animate stroke */
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
  
  /* Animate opacity */
  transition: opacity 0.3s ease;
  
  /* Animate multiple properties */
  transition: fill 0.3s ease, stroke 0.3s ease, opacity 0.3s ease;
}
```

### Interactive Button Example

```html
<button class="delete-btn">
  <svg viewBox="0 0 24 24" width="24" height="24">
    <g class="trash-body">
      <polygon points="6 8, 7 20, 17 20, 18 8"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
    </g>
    <g class="trash-lid">
      <line x1="5" y1="8" x2="19" y2="8"/>
      <rect width="4" height="2.5" x="10" y="5.5"/>
    </g>
  </svg>
  Delete
</button>
```

```css
.delete-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background: #b91c1c;
}

.trash-lid {
  transition: transform 0.2s ease;
  transform-origin: 50% 8px;
}

.delete-btn:hover .trash-lid {
  transform: translateY(-2px);
}
```

---

## CSS Transforms

### Transform Properties

CSS transforms allow you to move, scale, rotate, and skew SVG elements:

```css
.svg-element {
  /* Move */
  transform: translateX(20px) translateY(-10px);
  
  /* Scale */
  transform: scale(1.2);
  transform: scaleX(1.5) scaleY(0.8);
  
  /* Rotate */
  transform: rotate(45deg);
  
  /* Skew */
  transform: skewX(10deg) skewY(5deg);
  
  /* Combine transforms */
  transform: translateX(20px) rotate(45deg) scale(1.2);
}
```

### Transform Origin

Control the point around which transforms occur:

```css
.svg-element {
  /* Default: center of element */
  transform-origin: center;
  
  /* Top-left corner */
  transform-origin: 0 0;
  
  /* Bottom-right corner */
  transform-origin: 100% 100%;
  
  /* Custom point */
  transform-origin: 25% 75%;
}
```

### Advanced Transform Example

```html
<svg viewBox="0 0 100 100">
  <g class="rotating-group">
    <rect x="20" y="20" width="60" height="60" fill="blue"/>
    <circle cx="50" cy="50" r="10" fill="white"/>
  </g>
</svg>
```

```css
.rotating-group {
  animation: rotate 2s linear infinite;
  transform-origin: 50% 50%;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## Sequencing Animations

### Staggered Animations

Create sequences by delaying animations:

```html
<svg viewBox="0 0 200 100">
  <circle class="dot" cx="30" cy="50" r="10" fill="red"/>
  <circle class="dot" cx="70" cy="50" r="10" fill="green"/>
  <circle class="dot" cx="110" cy="50" r="10" fill="blue"/>
  <circle class="dot" cx="150" cy="50" r="10" fill="purple"/>
</svg>
```

```css
.dot {
  animation: bounce 1s ease-in-out infinite;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.1s; }
.dot:nth-child(3) { animation-delay: 0.2s; }
.dot:nth-child(4) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
```

### Complex Sequencing

```html
<svg viewBox="0 0 100 100">
  <g class="loading-spinner">
    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="8"/>
    <circle class="progress" cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="8" stroke-dasharray="251.2" stroke-dashoffset="251.2"/>
  </g>
</svg>
```

```css
.loading-spinner {
  animation: spin 2s linear infinite;
}

.progress {
  animation: progress 2s ease-in-out infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes progress {
  0% { stroke-dashoffset: 251.2; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -251.2; }
}
```

---

## Timing Functions

### Understanding Easing

Timing functions control how animations accelerate and decelerate:

```css
.element {
  /* Linear - constant speed */
  transition: transform 1s linear;
  
  /* Ease - slow start, fast middle, slow end */
  transition: transform 1s ease;
  
  /* Ease-in - slow start, fast end */
  transition: transform 1s ease-in;
  
  /* Ease-out - fast start, slow end */
  transition: transform 1s ease-out;
  
  /* Ease-in-out - slow start and end, fast middle */
  transition: transform 1s ease-in-out;
  
  /* Cubic bezier - custom curve */
  transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Custom Cubic Bezier

```css
/* Bounce effect */
transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Elastic effect */
transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* Smooth acceleration */
transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Timing Function Examples

```html
<div class="demo-container">
  <div class="demo-item linear">Linear</div>
  <div class="demo-item ease">Ease</div>
  <div class="demo-item ease-in">Ease-in</div>
  <div class="demo-item ease-out">Ease-out</div>
  <div class="demo-item ease-in-out">Ease-in-out</div>
  <div class="demo-item bounce">Bounce</div>
</div>
```

```css
.demo-container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.demo-item {
  width: 60px;
  height: 60px;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: transform 1s;
}

.demo-item:hover {
  transform: translateX(100px);
}

.linear { transition-timing-function: linear; }
.ease { transition-timing-function: ease; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }
.bounce { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
```

---

## Practice Projects

### Project 1: Animated Icon Set

Create a set of interactive icons with hover animations:

```html
<div class="icon-grid">
  <div class="icon-item">
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path class="icon-path" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
    <span>Layers</span>
  </div>
  
  <div class="icon-item">
    <svg viewBox="0 0 24 24" width="24" height="24">
      <circle class="icon-circle" cx="12" cy="12" r="10"/>
      <path class="icon-path" d="M12 6v6l4 2"/>
    </svg>
    <span>Clock</span>
  </div>
  
  <div class="icon-item">
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path class="icon-path" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span>Message</span>
  </div>
</div>
```

```css
.icon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.icon-item:hover {
  background-color: #f3f4f6;
}

.icon-path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.2s ease, transform 0.2s ease;
}

.icon-circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  transition: stroke 0.2s ease;
}

.icon-item:hover .icon-path,
.icon-item:hover .icon-circle {
  stroke: #3b82f6;
  transform: scale(1.1);
}
```

### Project 2: Loading Animation

Create a sophisticated loading animation:

```html
<div class="loading-container">
  <svg viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    
    <circle class="track" cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="8"/>
    <circle class="progress" cx="50" cy="50" r="40" fill="none" stroke="url(#gradient)" stroke-width="8" stroke-linecap="round"/>
    
    <circle class="pulse" cx="50" cy="50" r="20" fill="url(#gradient)"/>
  </svg>
</div>
```

```css
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.track {
  opacity: 0.3;
}

.progress {
  stroke-dasharray: 251.2;
  stroke-dashoffset: 251.2;
  animation: progress 2s ease-in-out infinite;
  transform-origin: center;
  transform: rotate(-90deg);
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes progress {
  0% { stroke-dashoffset: 251.2; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -251.2; }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.7;
  }
}
```

### Project 3: Interactive Button

Create a button with multiple animated states:

```html
<button class="animated-button">
  <span class="button-text">Click Me</span>
  <svg class="button-icon" viewBox="0 0 24 24" width="20" height="20">
    <path d="M7 17l9.2-9.2M17 17V7H7"/>
  </svg>
</button>
```

```css
.animated-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.animated-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.animated-button:hover::before {
  left: 100%;
}

.animated-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.animated-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}

.button-icon {
  transition: transform 0.3s ease;
}

.animated-button:hover .button-icon {
  transform: translateX(4px);
}

.button-text {
  transition: transform 0.3s ease;
}

.animated-button:hover .button-text {
  transform: translateX(-2px);
}
```

---

## Key Takeaways

1. **CSS transitions** provide simple state-based animations
2. **CSS transforms** allow movement, scaling, and rotation
3. **Transform origin** controls the pivot point of transformations
4. **Animation delays** create sequenced effects
5. **Timing functions** control animation acceleration/deceleration
6. **Cubic bezier curves** enable custom easing
7. **Practice with real projects** is essential for mastery

---

## Next Steps

You're now ready to explore **Module 3: Animating the Unanimatable** where you'll learn about SMIL (SVG's native animation system) and how to animate properties that CSS cannot handle. 