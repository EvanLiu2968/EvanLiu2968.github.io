<template>
  <div>
    <div class="canvas-container"></div>
    <canvas id="tearCloth"></canvas>
  </div>
</template>
<style scoped>
.canvas-container{
  position:absolute;
  left:50%;
  margin-left:-400px;
  width:800px;
  height:800px;
  background-image: url('/public/images/hope/jump.jpg');
  background-size:cover;
  z-index:-1
}
#tearCloth{
  position:relative;
  margin:0 auto;
  width:800px;
  height:800px;
  display:block;
  cursor:crosshair;
  z-index:1
}
</style>
<script>
var physics_accuracy = 3
var mouse_influence = 20
var mouse_cut = 5
var gravity = 1200
var cloth_height = 70
var cloth_width = 100
var start_y = 20
var spacing = 8
var tear_distance = 60

window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

var canvas
var ctx
var cloth
var boundsx
var boundsy
var mouse = {
  down: false,
  button: 1,
  x: 0,
  y: 0,
  px: 0,
  py: 0
}

var Point = function(x, y) {
  this.x = x
  this.y = y
  this.px = x
  this.py = y
  this.vx = 0
  this.vy = 0
  this.pin_x = null
  this.pin_y = null

  this.constraints = []
}

Point.prototype.update = function(delta) {
  if (mouse.down) {
    var diff_x = this.x - mouse.x
    var diff_y = this.y - mouse.y
    var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y)

    if (mouse.button == 1) {
      if (dist < mouse_influence) {
        this.px = this.x - (mouse.x - mouse.px) * 1.8
        this.py = this.y - (mouse.y - mouse.py) * 1.8
      }
    } else if (dist < mouse_cut) this.constraints = []
  }

  this.add_force(0, gravity)

  delta *= delta
  const nx = this.x + ((this.x - this.px) * 0.99) + ((this.vx / 2) * delta)
  const ny = this.y + ((this.y - this.py) * 0.99) + ((this.vy / 2) * delta)

  this.px = this.x
  this.py = this.y

  this.x = nx
  this.y = ny

  this.vy = this.vx = 0
}

Point.prototype.draw = function() {
  if (this.constraints.length <= 0) return

  var i = this.constraints.length
  while (i--) this.constraints[i].draw()
}

Point.prototype.resolve_constraints = function() {
  if (this.pin_x != null && this.pin_y != null) {
    this.x = this.pin_x
    this.y = this.pin_y
    return
  }

  var i = this.constraints.length
  while (i--) this.constraints[i].resolve()

  if (this.x > boundsx) {
    this.x = 2 * boundsx - this.x
  } else if (this.x < 1) {
    this.x = 2 - this.x
  }

  if (this.y > boundsy) {
    this.y = 2 * boundsy - this.y
  } else if (this.y < 1) {
    this.y = 2 - this.y
  }
}

Point.prototype.attach = function(point) {
  this.constraints.push(
    new Constraint(this, point)
  )
}

Point.prototype.remove_constraint = function(lnk) {
  var i = this.constraints.length
  while (i--) { if (this.constraints[i] == lnk) this.constraints.splice(i, 1) }
}

Point.prototype.add_force = function(x, y) {
  this.vx += x
  this.vy += y
}

Point.prototype.pin = function(pinx, piny) {
  this.pin_x = pinx
  this.pin_y = piny
}

var Constraint = function(p1, p2) {
  this.p1 = p1
  this.p2 = p2
  this.length = spacing
}

Constraint.prototype.resolve = function() {
  var diff_x = this.p1.x - this.p2.x
  var diff_y = this.p1.y - this.p2.y
  var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y)
  var diff = (this.length - dist) / dist

  if (dist > tear_distance) this.p1.remove_constraint(this)

  var px = diff_x * diff * 0.5
  var py = diff_y * diff * 0.5

  this.p1.x += px
  this.p1.y += py
  this.p2.x -= px
  this.p2.y -= py
}

Constraint.prototype.draw = function() {
  ctx.moveTo(this.p1.x, this.p1.y)
  ctx.lineTo(this.p2.x, this.p2.y)
}

var Cloth = function() {
  this.points = []

  var start_x = canvas.width / 2 - cloth_width * spacing / 2

  for (var y = 0; y <= cloth_height; y++) {
    for (var x = 0; x <= cloth_width; x++) {
      var p = new Point(start_x + x * spacing, start_y + y * spacing)

      x != 0 && p.attach(this.points[this.points.length - 1])
      y == 0 && p.pin(p.x, p.y)
      y != 0 && p.attach(this.points[x + (y - 1) * (cloth_width + 1)])

      this.points.push(p)
    }
  }
}

Cloth.prototype.update = function() {
  var i = physics_accuracy

  while (i--) {
    var p = this.points.length
    while (p--) this.points[p].resolve_constraints()
  }

  i = this.points.length
  while (i--) this.points[i].update(0.016)
}

Cloth.prototype.draw = function() {
  ctx.beginPath()

  var i = cloth.points.length
  while (i--) cloth.points[i].draw()

  ctx.stroke()
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  cloth.update()
  cloth.draw()

  window.requestAnimFrame(update)
}

function start() {
  canvas.onmousedown = function(e) {
    mouse.button = e.which
    mouse.px = mouse.x
    mouse.py = mouse.y
    var rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
    mouse.down = true
    e.preventDefault()
  }

  canvas.onmouseup = function(e) {
    mouse.down = false
    e.preventDefault()
  }

  canvas.onmousemove = function(e) {
    mouse.px = mouse.x
    mouse.py = mouse.y
    var rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
    e.preventDefault()
  }

  canvas.oncontextmenu = function(e) {
    e.preventDefault()
  }

  boundsx = canvas.width - 1
  boundsy = canvas.height - 1

  ctx.strokeStyle = '#fff'
  cloth = new Cloth()
  update()
}

export default {
  data: function() {
    return {
    }
  },
  mounted: function() {
    canvas = document.getElementById('tearCloth')
    ctx = canvas.getContext('2d')

    canvas.width = 800// 560
    canvas.height = 800// 350

    start()
  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！')
    }
  }
}
</script>
<style scoped>
</style>
