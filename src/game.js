kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0,0,0,1],
})

// env variables
const MOVE_SPEED = 120
const JUMP_FORCE = 360

/*
  sprites
*/

loadRoot('https://i.imgur.com/')

// characters
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('goomba', 'KPO3fR9.png')

// items
loadSprite('coin', 'wbKxhcd.png')
loadSprite('mushroom', '0wMd92p.png')

// blocks
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('surprise', 'gesQ1KP.png')

// pipe
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

scene("game", ()=> {
  layers(['bg','obj','ui'], 'obj')

  const map = [
    '                                      ',
    '                                      ',
    '                                      ',
    '                                      ',
    '                                      ',
    '    %  =*=%=                          ',
    '                                      ',
    '                            -+        ',
    '                 ^    ^     ()        ',
    '==============================   =====',
  ]

  const levelConfig = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    '$': [sprite('coin')],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
    '^': [sprite('goomba'), solid()],
    '#': [sprite('mushroom'), solid()],
  }

  const gameLevel = addLevel(map, levelConfig)

  const scoreLabel = add([
    text('score'),
    pos(30,6),
    layer('ui'),
    {
      value: 'score',
    }
  ])

  add([text('level ' + 'test', pos(4,6))])

  function big(){
    let timer = 0
    let isBig = false
    return {
      update(){
        if(isBig){
          timer -=dt()
          if(time<=0){
            this.smallify()
          }
        }
      },
      isBig(){
        return isBig
      },
      smallify(){
        this.scale = vec2(1)
        timer = 0
        isBig = false
      },
      biggify(time){
        this.scale = vec2(2)
        timer = time
        isBig = true
      }
    }
  }

  const player = add([
    sprite('mario'), solid(),
    pos(30,0),
    body(),
    big(),
    origin('bot')
  ])

  player.on('headbump', (obj) => {
    if(obj.is('coin-surprise')){
      gameLevel.spawn('$', obj.gridPos.sub(0,1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
  })

  keyDown('left', () => {
    player.move(-MOVE_SPEED,0)
  })

  keyDown('right', () => {
    player.move(MOVE_SPEED,0)
  })

  keyPress('space', () => {
    if(player.grounded()){
      player.jump(JUMP_FORCE)
    }
  })

})

start("game")