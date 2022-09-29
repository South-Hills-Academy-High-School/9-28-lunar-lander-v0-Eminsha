namespace SpriteKind {
    export const map = SpriteKind.create()
    export const rocketengine = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    apple.ay = 25 * Math.sin(angle)
    apple.ax = 25 * Math.cos(angle)
    fireball.setFlag(SpriteFlag.Invisible, false)
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    apple.ay = 20
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    angle += 30 * (3.14 / 180)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.darkGroundNorthWest1, function (sprite, location) {
    apple.setVelocity(0, -1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    angle += -30 * (3.14 / 180)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    apple.ay = 20
    fireball.setFlag(SpriteFlag.Invisible, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    apple.ay = 60
})
let apple: Sprite = null
let angle = 0
let fireball: Sprite = null
fireball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 4 4 4 4 4 . . . . . . 
    . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
    . . 4 d 5 d 5 5 5 d d d 4 4 . . 
    . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
    . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
    . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
    . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
    . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
    . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
    . . 2 4 d d 5 5 5 5 d d 5 4 . . 
    . . . 2 2 4 d 5 5 d d 4 4 . . . 
    . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
    . . . 2 2 4 4 4 4 4 4 2 2 . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    `, SpriteKind.Player)
fireball.setFlag(SpriteFlag.Invisible, true)
angle = 0
tiles.setCurrentTilemap(tilemap`level1`)
effects.clouds.startScreenEffect()
apple = sprites.create(img`
    . . . . . . 2 2 2 2 2 2 . . . . 
    . . . . . 2 3 3 3 3 3 3 2 . . . 
    . . . . . 2 3 1 1 1 1 3 2 . . . 
    . . . . . 3 2 1 1 1 1 2 3 . . . 
    . . . . . 3 2 1 1 1 1 2 3 . . . 
    . . . . . 3 2 1 1 1 1 2 3 . . . 
    . . . . . 3 2 1 1 1 1 2 3 . . . 
    . . . . . 3 2 1 1 1 1 2 3 . . . 
    . . . . . 2 3 1 1 1 1 2 3 . . . 
    . . . . . 2 3 1 1 1 1 3 2 . . . 
    . . . . . 2 3 1 1 1 1 3 2 . . . 
    . . . . . 2 2 1 1 1 1 2 2 . . . 
    . . . . . 2 2 3 1 1 2 3 2 . . . 
    . . . . . . 3 2 1 1 2 3 . . . . 
    . . . . . . 3 2 1 1 2 3 . . . . 
    . . . . . . 3 2 2 2 2 3 . . . . 
    `, SpriteKind.Player)
let engine = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 5 5 5 5 5 . . . . . 
    . . . . . . 5 5 5 5 5 . . . . . 
    . . . . . . 4 5 5 5 4 4 . . . . 
    . . . . . . 4 5 5 5 4 4 . . . . 
    . . . . . . 4 4 5 5 4 . . . . . 
    . . . . . . 4 4 4 4 4 . . . . . 
    . . . . . . . . 4 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.rocketengine)
scene.cameraFollowSprite(apple)
scaling.scaleByPercent(apple, -25, ScaleDirection.Uniformly, ScaleAnchor.Middle)
apple.ay = 20
let myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
let minimap2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.map)
game.onUpdate(function () {
    minimap2.destroy()
    myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
    minimap.includeSprite(myMinimap, apple, MinimapSpriteScale.MinimapScale)
    minimap2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.map)
    minimap2.setPosition(apple.x - 50, apple.y - 30)
    engine.setPosition(apple.x + -8 * Math.cos(angle), apple.y + -8 * Math.sin(angle))
    fireball.setPosition(apple.x + -8 * Math.cos(angle), apple.y + -8 * Math.sin(angle))
})
