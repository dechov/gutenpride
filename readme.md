
# Veganberg

A gutenberg block that embeds a Vega (or Vega-Lite) graphic. Assumes vega unless Vega-Lite schema indicated in the spec (`"$schema": "https://vega.github.io/schema/vega-lite/v2.json"`)

(Used https://github.com/mkaz/gutenpride as starter kit.)

### Basic testing instructions

- If you don't have a WordPress test install: poopy.life/create, open new instance, close "Brought you by Oxygen" banner
- If you don't have Gutenberg: Plugins -> Add New, search for, install, and activate "Gutenberg"
- Upload Plugin -> choose [zip](https://github.com/dechov/veganberg/archive/master.zip), and activate
- Posts -> Add New
- Insert Vega block
- Paste spec
- Publish and view post

### Example vega spec

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://vega.github.io/vega-lite/data/cars.json"},
  "selection": {
    "grid": {
      "type": "interval", "bind": "scales"
    }
  },
  "mark": "circle",
  "encoding": {
    "x": {
      "field": "Horsepower", "type": "quantitative",
      "scale": {"domain": [75, 150]}
    },
    "y": {
      "field": "Miles_per_Gallon", "type": "quantitative",
      "scale": {"domain": [20, 40]}
    },
    "size": {"field": "Cylinders", "type": "quantitative"}
  }
}
```
(from: https://vega.github.io/vega-lite/examples/selection_translate_scatterplot_drag.html)


### Todo

- transform to and from core/image block
- transform from paste, matching vega or vega-lite schema
- renderer attribute (svg or canvas)
- align attribute
- size attributes
- support spec URL instead of only JSON
- support externally setting vega signals
- codemirror for JSON editing?
