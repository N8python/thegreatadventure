const levels = {
    1: {
        platforms: [{
            x: 500,
            y: 450,
            width: 200,
            height: 32
        }],
        enemies: [{
            type: "bug",
            x: 650,
            y: 520
        }],
        signs: [{
            x: 200,
            y: 568 - (32 * 3),
            title: "Welcome to your great adventure!",
            text: "Use the arrows keys to move around. Watch out for that enemy over there. A bop on the head should take care of it."
        }, {
            x: 500,
            y: 450 - (32 * 2.5),
            title: "Keep an eye on your health!",
            text: "The red bar in the corner shows your health. If you get hit by that enemy over there, you'll take a bit of damage. Once your health drops to zero, you'll lose your all coins and return to the beginning of the level. So be careful."
        }]
    },
    2: {
        platforms: [{
            x: 250,
            y: 450,
            width: 200,
            height: 32
        }, {
            x: 450,
            y: 350,
            width: 200,
            height: 32
        }, {
            x: 650,
            y: 250,
            width: 200,
            height: 32
        }, {
            x: 775,
            y: 500,
            height: 533,
            width: 50
        }],
        enemies: [{
            type: "bug",
            x: 160,
            y: 400
        }, {
            type: "bug",
            x: 360,
            y: 300
        }, {
            type: "bug",
            x: 560,
            y: 200
        }]
    },
    3: {
        platforms: [{
            x: 350,
            y: 450,
            width: 200,
            height: 32
        }, {
            x: 450,
            y: 350,
            width: 200,
            height: 32
        }, {
            x: 650,
            y: 400 - 16,
            width: 300,
            height: 100
        }, {
            x: 775,
            y: (400 - 16) / 2,
            width: 50,
            height: (400 - 16)
        }],
        enemies: [{
            type: "bug",
            x: 250,
            y: 400
        }, {
            type: "bug",
            x: 350,
            y: 300
        }, {
            type: "bug",
            x: 550,
            y: 505
        }],
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 50
        }],
        signs: [{
            x: 200,
            y: 568 - (32 * 3),
            title: "Collect all the stars!",
            text: "Only once you have collected all the stars will you be allowed to complete the level."
        }],
        stars: [{
            x: 300,
            y: 505
        }, {
            x: 400,
            y: 405
        }, {
            x: 500,
            y: 305
        }],
        starsLeft: 3
    },
    4: {
        platforms: [{
            x: 400,
            y: 525,
            width: 200,
            height: 50
        }, {
            x: 400,
            y: 425,
            width: 200,
            height: 25
        }, {
            x: 400,
            y: 325,
            width: 200,
            height: 25
        }, {
            x: 400,
            y: 225,
            width: 200,
            height: 25
        }, {
            x: 400,
            y: 125,
            width: 200,
            height: 25
        }],
        enemies: [{
            type: "bug",
            x: 150,
            y: 505
        }, {
            type: "bug",
            x: 650,
            y: 505
        }, {
            type: "bug",
            x: 375,
            y: 480
        }, {
            type: "bug",
            x: 375,
            y: 380
        }, {
            type: "bug",
            x: 375,
            y: 280
        }, {
            type: "bug",
            x: 375,
            y: 180
        }],
        stars: [{
            x: 400,
            y: 80
        }],
        starsLeft: 1
    },
    5: {
        platforms: [{
            x: 200,
            y: 450,
            width: 200,
            height: 32
        }, {
            x: 450,
            y: 350,
            width: 300,
            height: 32
        }],
        enemies: [{
            type: "bug",
            x: 200,
            y: 400
        }],
        lava: [{
            x: 300,
            y: 485
        }, {
            x: 375,
            y: 280
        }],
        signs: [{
            x: 200,
            y: 450 - 32 * 2.5,
            title: "Avoid lava springs!",
            text: "Don't walk in the lava. Don't even go near the lava. It's scorching hot, and can damage you from afar."
        }],
        stars: [{
            x: 550,
            y: 300
        }],
        starsLeft: 1
    },
    6: {
        platforms: [{
            x: 200,
            y: 425,
            width: 200,
            height: 25
        }, {
            x: 200,
            y: 325,
            width: 200,
            height: 25
        }, {
            x: 600,
            y: 425,
            width: 200,
            height: 25
        }, {
            x: 600,
            y: 325,
            width: 200,
            height: 25
        }, {
            x: 775,
            y: (400 - 16) / 2,
            width: 50,
            height: (400 - 16)
        }, {
            x: 400,
            y: 0,
            width: 32,
            height: 800
        }],
        lava: [{
            x: 100,
            y: 485
        }, {
            x: 400,
            y: 485
        }, {
            x: 700,
            y: 485
        }],
        enemies: [{
            type: "bug",
            x: 150,
            y: 400
        }, {
            type: "bug",
            x: 550,
            y: 400
        }],
        stars: [{
            x: 200,
            y: 275
        }, {
            x: 600,
            y: 275
        }],
        starsLeft: 2
    },
    7: {
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 75
        }],
        lava: [{
            x: 200,
            y: 485
        }, {
            x: 400,
            y: 485
        }, {
            x: 600,
            y: 485
        }],
        enemies: [{
            type: "bug",
            x: 100,
            y: 520
        }, {
            type: "bug",
            x: 300,
            y: 520
        }, {
            type: "bug",
            x: 500,
            y: 520
        }, {
            type: "bug",
            x: 700,
            y: 520
        }]
    },
    8: {
        platforms: [{
            x: 250,
            y: 475 - 12.5,
            width: 50,
            height: 25
        }, {
            x: 300,
            y: 450,
            width: 100,
            height: 50
        }, {
            x: 400,
            y: 425,
            width: 100,
            height: 100
        }, {
            x: 500,
            y: 400,
            width: 100,
            height: 150
        }, {
            x: 600,
            y: 375,
            width: 100,
            height: 200
        }, {
            x: 700,
            y: 350,
            width: 100,
            height: 250
        }, {
            x: 800,
            y: 325,
            width: 100,
            height: 300
        }, {
            x: 820,
            y: (400 - 16) / 2,
            width: 50,
            height: (400 - 16)
        }],
        lava: [{
            x: 385,
            y: 342,
            scale: 0.65
        }, {
            x: 585,
            y: 242,
            scale: 0.65
        }],
        enemies: [{
            type: "bug",
            x: 300,
            y: 400
        }, {
            type: "bug",
            x: 500,
            y: 300
        }, {
            type: "bug",
            x: 700,
            y: 200
        }],
        stars: [{
            x: 775,
            y: 140
        }],
        starsLeft: 1
    },
    9: {
        platforms: [{
            x: 400,
            y: 450,
            width: 400,
            height: 32
        }],
        lava: [{
            x: 100,
            y: 485
        }, {
            x: 700,
            y: 485
        }],
        enemies: [{
            type: "bug",
            x: 200,
            y: 400
        }, {
            type: "bug",
            x: 500,
            y: 400
        }],
        stars: [{
            x: 400,
            y: 400
        }],
        starsLeft: 1
    },
    10: {
        platforms: [{
            x: 200,
            y: 450,
            width: 100,
            height: 32
        }, {
            x: 400,
            y: 450,
            width: 100,
            height: 32
        }, {
            x: 600,
            y: 450,
            width: 100,
            height: 32
        }],
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 250
        }],
        boss: 1
    },
    11: {
        signs: [{
            x: 300,
            y: 568 - (32 * 3),
            title: "You unlocked the shield!",
            text: "Press S to summon your shield. Control it with your mouse pointer. It can protect against damage inflicted by enemies. Try it out on that one over there!"
        }, {
            x: 500,
            y: 568 - (32 * 3),
            title: "Keep an eye on your shield's health!",
            text: "Shields can take damage too. Once your shield's health drops to zero, you'll have to wait for its health to regenerate fully before you use it again."
        }],
        enemies: [{
            type: "bug",
            x: 650,
            y: 520
        }],
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 250
        }],
    },
    12: {
        platforms: [{
                x: 200,
                y: 500,
                width: 32,
                height: 100
            }, {
                x: 400,
                y: 500,
                width: 32,
                height: 100
            },
            {
                x: 600,
                y: 500,
                width: 32,
                height: 100
            }, {
                x: 800,
                y: 500,
                width: 32,
                height: 100
            }
        ],
        signs: [{
            x: 100,
            y: 568 - (32 * 3),
            title: "Beware the floating robots!",
            text: "They shoot powerful projectiles at you. Upon impact, they will knock you back and deal significant damage. They only way to deflect them is with your shield. If you deflect a projectile back at a floating robot, it explodes."
        }],
        lava: [{
            x: 290,
            y: 485
        }, {
            x: 490,
            y: 485
        }, {
            x: 690,
            y: 485
        }],
        enemies: [{
            type: "robot",
            x: 400,
            y: 400
        }, {
            type: "robot",
            x: 600,
            y: 400
        }]
    },
    13: {
        platforms: [{
            x: 600,
            y: 450,
            width: 600,
            height: 32
        }, {
            x: 775,
            y: (400 - 16) / 2,
            width: 50,
            height: (500 - 16)
        }],
        lava: [{
            x: 200,
            y: 485
        }],
        enemies: [{
                type: "bug",
                x: 450,
                y: 400
            }, {
                type: "robot",
                x: 600,
                y: 400
            },
            {
                type: "robot",
                x: 600,
                y: 500
            }
        ],
        stars: [{
            x: 700,
            y: 400
        }],
        starsLeft: 1
    },
    14: {
        enemies: [{
            type: "robot",
            x: 200,
            y: 150,
        }, {
            type: "robot",
            x: 400,
            y: 150
        }, {
            type: "robot",
            x: 600,
            y: 150
        }],
        platforms: [{
            x: 200,
            y: 500,
            width: 32,
            height: 150
        }, {
            x: 225,
            y: 400,
            width: 32,
            height: 300
        }, {
            x: 400,
            y: 500,
            width: 32,
            height: 150
        }, {
            x: 425,
            y: 400,
            width: 32,
            height: 300
        }, {
            x: 600,
            y: 500,
            width: 32,
            height: 150
        }, {
            x: 625,
            y: 400,
            width: 32,
            height: 300
        }],
        stars: [{
            x: 200,
            y: 200
        }, {
            x: 400,
            y: 200
        }, {
            x: 600,
            y: 200
        }],
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 100
        }],
        starsLeft: 3
    },
    15: {
        platforms: [{
            x: 600,
            y: 450,
            width: 600,
            height: 32
        }, {
            x: 600,
            y: 300,
            width: 600,
            height: 32
        }, {
            x: 600,
            y: 150,
            width: 600,
            height: 32
        }, {
            x: 150,
            y: 225,
            width: 100,
            height: 32
        }, {
            x: 150,
            y: 375,
            width: 100,
            height: 32
        }, {
            x: 775,
            y: ((400 - 16) / 2) + 186,
            width: 50,
            height: (500 - 16)
        }],
        enemies: [{
            type: "robot",
            x: 600,
            y: 400
        }, {
            type: "robot",
            x: 600,
            y: 250
        }, {
            type: "robot",
            x: 600,
            y: 100
        }, {
            type: "bug",
            x: 100,
            y: 325
        }, {
            type: "bug",
            x: 100,
            y: 175
        }],
        stars: [{
            x: 700,
            y: 400
        }, {
            x: 700,
            y: 250
        }, {
            x: 700,
            y: 100
        }],
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 150
        }],
        starsLeft: 3
    },
    16: {
        signs: [{
            x: 100,
            y: 568 - (32 * 3),
            title: "Beware the Saw Eyes!",
            text: "Saw Eyes are living, very territorial saws. They'll leave you alone if you stay far away, but if you get to close they'll attack and rough you up a bit before going back to leaving you alone permanently. You can use your shield to block their attacks."
        }],
        boosts: [{
            type: "wrench",
            x: 200,
            y: 495,
            boostAmt: 50
        }],
        enemies: [{
            type: "saw",
            x: 400,
            y: 500
        }]
    },
    17: {
        enemies: [{
            type: "saw",
            x: 400,
            y: 500
        }, {
            type: "robot",
            x: 200,
            y: 150,
        }, {
            type: "robot",
            x: 400,
            y: 150,
        }, {
            type: "robot",
            x: 600,
            y: 150,
        }]
    },
    18: {
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 250
        }],
        platforms: [{
            x: 200,
            y: 500,
            width: 32,
            height: 125
        }, {
            x: 600,
            y: 500,
            width: 32,
            height: 125
        }],
        enemies: [{
            type: "saw",
            x: 200,
            y: 400
        }, {
            type: "saw",
            x: 600,
            y: 400
        }]
    },
    19: {
        boosts: [{
            type: "heart",
            x: 200,
            y: 505,
            boostAmt: 250
        }],
        platforms: [{
            x: 250,
            y: 450,
            width: 200,
            height: 32
        }, {
            x: 450,
            y: 350,
            width: 200,
            height: 32
        }, {
            x: 650,
            y: 250,
            width: 200,
            height: 32
        }, {
            x: 775,
            y: 100,
            height: 700,
            width: 50
        }],
        enemies: [{
            type: "bug",
            x: 160,
            y: 400
        }, {
            type: "bug",
            x: 360,
            y: 300
        }, {
            type: "bug",
            x: 560,
            y: 200
        }, {
            type: "saw",
            x: 200,
            y: 480
        }, {
            type: "saw",
            x: 750,
            y: 480
        }, {
            type: "robot",
            x: 150,
            y: 150
        }, {
            type: "robot",
            x: 300,
            y: 150
        }, {
            type: "robot",
            x: 450,
            y: 150
        }],
        stars: [{
            x: 700,
            y: 200
        }],
        starsLeft: 1
    },
    20: {
        texts: [{
            x: 25,
            y: 200,
            text: "Congratulations!",
            textSize: 80
        }, {
            x: 25,
            y: 300,
            text: "You won. You finished \n with {coins} coins.",
            textSize: 60
        }]
    }
}
let levelObjects = [];

function renderLevel(level) {
    localStorage.level = level;
    if (level === 11) {
        shieldUnlocked = true;
        delete levels[10].boss;
    }
    if (level > 11) {
        shieldUnlocked = true;
    }
    levelObjects.forEach(object => {
        console.log(object);
        if (object !== undefined) {
            if (object.destroy) {
                object.destroy();
            } else {
                object.stop();
            }
        }
    })
    levelObjects = [];
    level = levels[level];
    if (level) {
        if (level.platforms) {
            level.platforms.forEach(({ x, y, width, height }) => {
                levelObjects.push(platforms.create(x, y, 'ground').setScale(width / 400, height / 32).refreshBody());
            });
        }
        if (level.enemies) {
            level.enemies.forEach(enemy => {
                if (!enemy.killed) {
                    const { x, y, type } = enemy;
                    const daEnemy = enemies.create(x, y, type);
                    daEnemy.orgin = enemy;
                    if (enemy.starCarrier) {
                        //daEnemy.setTint(0xffff00);
                    }
                    if (enemy.type === "robot") {
                        daEnemy.setImmovable(true);
                        daEnemy.body.setAllowGravity(false);
                    }
                    if (enemy.type === "saw") {
                        daEnemy.emitter = zs.createEmitter({
                            x: enemy.x,
                            y: enemy.y,
                            radial: true,
                            angle: -80,
                            speed: 100,
                            maxParticles: 1,
                            scale: { start: 1, end: 0 },
                        });
                        levelObjects.push(daEnemy.emitter);
                    }
                    levelObjects.push(daEnemy);
                }
            })
        }
        if (level.signs) {
            level.signs.forEach(({ x, y, title, text }) => {
                const sign = signs.create(x, y, "sign");
                sign.title = title;
                sign.text = text;
                levelObjects.push(sign)
            })
        }
        if (level.boosts) {
            level.boosts.forEach((boost) => {
                if (!boost.used) {
                    const { x, y, type, boostAmt } = boost;
                    const daBoost = boosts.create(x, y, type);
                    daBoost.type = type;
                    daBoost.boostAmt = boostAmt
                    daBoost.orgin = boost;
                    levelObjects.push(daBoost);
                }
            })
        }
        if (level.stars) {
            level.stars.forEach((star) => {
                if (!star.collected) {
                    const { x, y } = star;
                    const daStar = stars.create(x, y, "star");
                    daStar.orgin = star;
                    daStar.setScale(1.4);
                    levelObjects.push(daStar);
                }
            })
        }
        if (level.lava) {
            level.lava.forEach(({ x, y, scale }) => {
                const daLava = lavaSpurts.create(x, y, "lava");
                daLava.setAlpha(0);
                daLava.on("animationcomplete", () => {
                    daLava.setAlpha(0);
                    daLava.erupting = false;
                })
                if (typeof scale === "number") {
                    daLava.setScale(scale);
                }
                daLava.tick = Math.round(Phaser.Math.Between(150, 270));
                levelObjects.push(daLava);
            })
        }
        if (level.texts) {
            level.texts.forEach(({ x, y, text, textSize }) => {
                levelObjects.push(that.add.text(x, y, text.replace("{coins}", coinAmount.toString()), { fontFamily: "monospace", fontSize: textSize }));
            })
        }
        if (level.boss === 1) {
            bugBoss = that.physics.add.sprite(400, 400, "bugBoss");
            bugBoss.setScale(2);
            bugBoss.setCollideWorldBounds(true);
            bugBoss.step = 0;
            bugBoss.health = 100;
            that.physics.add.collider(bugBoss, platforms);
            that.physics.add.overlap(player, bugBoss, () => {
                if (player.body.touching.top && player.dazed < 1) {
                    player.setVelocity(-250);
                    player.health -= 15;
                    player.dazed = 30;
                } else if (player.dazed < 1) {
                    if (player.x <= bugBoss.x) {
                        player.setVelocityX(-160);
                    } else {
                        player.setVelocityX(160);
                    }
                    player.dazed = 30;
                    player.health -= 10;
                }
            });
        }
    }
}

function setLevel(l) {
    level = l;
    renderLevel(l);
}