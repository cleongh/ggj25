He intentado que este bocadillo (bubble) de texto sea 9-slice para que se pueda redimensionar más fácilmente

Según lo que pone aquí: <https://docs.phaser.io/phaser/concepts/gameobjects/nine-slice> para crear un nineslice con
esto haríamos:

```
var nineSlice = this.make.nineslice({
    x: 0,
    y: 0,
    key: '',
    width: 128,
    height: 128,
    leftWidth: 32,
    rightWidth: 32,
    topHeight: 32,
    bottomHeight: 32,
    add: true
)}
```