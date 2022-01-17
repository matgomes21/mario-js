kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0,0,0,1],
})

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

screen("game", ()=> {
  layers(['bg','obj','ui'], 'obj')

  const map = [
    '                                        ',
    '                                        ',
    '                                        ',
    '                                        ',
    '                                        ',
    '                                        ',
    '                                        ',
    '                                        ',
    '                                        ',
    '===============================   ======',
  ]

  const levelConfig = {
    width: 20,
    height: 20
    '=': [sprite('block', solid())]
  }

  const gameLevel = addLevel(map, levelConfig)
})

start("game")