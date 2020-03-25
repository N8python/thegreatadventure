const game = new Phaser.Game({
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});
let levelsVisited = [];

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image("sign", "assets/sign2.png")
    this.load.spritesheet('bug',
        'assets/bug.png', { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet('bugBoss',
        'assets/bugBoss.png', { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet('dude',
        'assets/dude.png', { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet("coin",
        "assets/coins.png", { frameWidth: 200, frameHeight: 300 }
    )
    this.load.spritesheet("lava",
        "assets/lava.png", { frameWidth: 283, frameHeight: 212 }
    )
    this.load.spritesheet('explode', 'assets/explode.png', {
        frameWidth: 128,
        frameHeight: 128
    })
    this.load.spritesheet("robot", "assets/robot.png", {
        frameWidth: 50,
        frameHeight: 64
    })
    this.load.image("healthbar", "assets/health.png");
    this.load.image("heart", "assets/heart.png");
    this.load.image("wrench", "assets/wrench.png");
    this.load.image("star", "assets/star.png");
    this.load.image("shield", "assets/shield.png");
    this.load.image("shieldbar", "assets/shieldbar.png");
    this.load.image("projectile", "assets/projectile.png");
    this.load.image("saw", "assets/saw.png");
    this.load.image("z", "assets/z.png");
}
let platforms;
let enemies;
let signs;
let stars;
let player;
let boosts;
let cursors;
let level = localStorage.level ? Number(localStorage.level) : 1;
let levelText;
let signText;
let coinText;
let bossText;
let touchingSign = false;
let mouseDown = false;
let keys = [];
let healthRect;
let graphics;
let lavaSpurts;
let coin;
let coins;
let coinAmount = localStorage.coinAmount ? Number(localStorage.coinAmount) : 0;
let bugBoss = {};
let that;
let shieldUnlocked = false;
let shieldBar;
let shieldHealth = localStorage.shieldHealth ? Number(localStorage.shieldHealth) : 100;
let restart;
let maxShieldHealth = 100;
let shieldRect;
let projectiles;
let zs;
let ground;
let stopStorage = false;

function create() {
    that = this;
    this.add.image(400, 300, 'sky');
    graphics = this.add.graphics();
    healthRect = new Phaser.Geom.Rectangle(20, 40, 90, 21);
    shieldRect = new Phaser.Geom.Rectangle(20, 130, 90, 21);
    zs = this.add.particles("z");
    this.add.image(70, 50, "healthbar");
    shieldBar = this.add.image(60, 140, "shieldbar");
    platforms = this.physics.add.staticGroup();
    enemies = this.physics.add.group();
    signs = this.physics.add.staticGroup();
    coins = this.physics.add.staticGroup();
    boosts = this.physics.add.staticGroup();
    stars = this.physics.add.staticGroup();
    projectiles = this.physics.add.group();
    lavaSpurts = this.physics.add.staticGroup();
    ground = platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    renderLevel(level);
    player = this.physics.add.sprite(100, 450, 'dude');
    shield = this.physics.add.sprite(player.x, player.y, "shield");
    shield.dazed = 0;
    shield.body.allowGravity = false;
    shield.alpha = 0;
    shield.facing = 1;
    coin = this.physics.add.staticSprite(22, 100, "coin");
    coin.setScale(0.2);
    levelText = this.add.text(10, 10, 'Level: 1', { fontFamily: 'monospace' });
    restart = this.add.text(120, 10, "Restart", { fontFamily: 'monospace' });
    restart.setInteractive()
        .on("pointerover", () => restart.setStyle({ fill: '#ff0' }))
        .on("pointerout", () => restart.setStyle({ fill: '#fff' }))
        .on("pointerdown", () => restart.setStyle({ fill: '#0ff' }))
        .on("pointerup", () => {
            localStorage.playerHealth = 250;
            localStorage.coinAmount = 0;
            localStorage.shieldHealth = 100;
            localStorage.level = 1;
            stopStorage = true;
            location.reload();
        });
    signText = this.add.text(600, 10, '', { fontFamily: 'monospace' });
    coinText = this.add.text(50, 90, `${coinAmount}`, { fontFamily: "monospace" });
    bossText = this.add.text(350, 10, "", { fontFamily: 'monospace' });
    player.setBounce(0.2);
    player.dazed = 0;
    player.health = localStorage.playerHealth ? Number(localStorage.playerHealth) : 250;
    player.maxHealth = 250;
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "bugWalk",
        frames: this.anims.generateFrameNumbers('bug', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: "bugBossWalk",
        frames: this.anims.generateFrameNumbers('bugBoss', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: "coinSpin",
        frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: "lavaSpurt",
        frames: this.anims.generateFrameNumbers("lava", { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    })
    this.anims.create({
        key: 'explosion',
        frames: this.anims.generateFrameNumbers('explode', {
            start: 0,
            end: 15
        }),
        frameRate: 10,
        repeat: 0
    })
    this.anims.create({
        key: "robotWalk",
        frames: this.anims.generateFrameNumbers("robot", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    this.physics.add.collider(coin, platforms);
    this.physics.add.collider(player, projectiles, (player, p) => {
        const explosion = this.physics.add.staticSprite(p.x, p.y, "explode");
        explosion.setScale(0.25);
        explosion.on("animationcomplete", () => {
            explosion.destroy();
        });
        explosion.anims.play("explosion");
        player.jumpNext = true;
        player.setVelocityX(p.xVel * 0.2);
        if (player.dazed < 1) {
            player.health -= 15;
        }
        player.dazed = 30;
        p.destroy();
    })
    this.physics.add.collider(projectiles, platforms, (p) => {
        p.destroy();
    });
    this.physics.add.collider(projectiles, enemies, (p, enemy) => {
        p.destroy();
        if (enemy.texture.key === "robot" && p.hit) {
            const explosion = this.physics.add.staticSprite(enemy.x, enemy.y, "explode");
            explosion.on("animationcomplete", () => {
                explosion.destroy();
            });
            explosion.anims.play("explosion");
            const coin = coins.create(enemy.x, enemy.y, "coin");
            coin.setScale(0.2);
            coinAmount += 3;
            enemy.destroy();
        }
    })
    this.physics.add.overlap(projectiles, shield, (_, p) => {
        p.xVel *= -1;
        p.yVel *= -1;
        p.hit = true;
        if (shield.dazed < 1) {
            shieldHealth -= 5;
        }
        shield.dazed = 30;
    }, () => shield.alpha > 0);
    this.physics.add.collider(player, platforms, () => {
        player.collidingWithPlatforms = true;
    });
    this.physics.add.collider(enemies, platforms, (enemy, platform) => {
        if (enemy.texture.key === "saw" && enemy.attacking && platform !== ground) {
            if (platform.body.touching.left || platform.body.touching.right) {
                if (enemy.attack === 3 || Math.random() < 0.01) {
                    let interval = setInterval(() => {
                        platform.alpha -= 0.1;
                        if (platform.alpha <= 0) {
                            platform.destroy();
                            clearInterval(interval);
                        }
                    }, 30);
                }
            }
        }
    }, (enemy, platform) => {
        return !enemy.fallen && platform.alpha === 1;
    });
    this.physics.add.collider(player, enemies, (player, enemy) => {
        if (enemy.texture.key === "bug") {
            if (enemy.body.touching.up && !enemy.fallen) {
                enemy.fallen = true;
                enemy.orgin.killed = true;
                const coin = coins.create(enemy.x, enemy.y, "coin");
                coin.setScale(0.2);
                coinAmount += 1;
                if (enemy.minion && bugBoss.health > 0) {
                    bugBoss.health -= 10;
                }
                setInterval(() => {
                    enemy.destroy();
                }, 10000)
            } else {
                if (player.x <= enemy.x) {
                    player.setVelocityX(-160);
                } else {
                    player.setVelocityX(160);
                }
                player.health += -10;
                player.dazed = 30;
            }
        } else if (enemy.texture.key === "saw" && enemy.attacking) {
            if (enemy.attack === 3) {
                player.health -= 100;
            } else {
                player.health -= 30;
            }
            if (player.x <= enemy.x) {
                player.setVelocityX(-160);
            } else {
                player.setVelocityX(160);
            }
            player.dazed = 30;
            enemy.attacking = false;
        }
    });
    this.physics.add.overlap(shield, enemies, (shield, enemy) => {
        if (enemy.texture.key === "bug") {
            enemy.setVelocityX(160 * shield.facing);
            enemy.dazed = 30;
            enemy.goodX = undefined;
            if (shield.dazed < 1) {
                shieldHealth -= 5;
            }
            shield.dazed = 30;
        }
        if (enemy.texture.key === "saw" && enemy.attacking) {
            if (shield.dazed < 1) {
                shieldHealth -= 15;
            }
            shield.dazed = 30;
            enemy.attacking = false;
        }
    }, () => shield.alpha > 0);
    this.physics.add.overlap(player, lavaSpurts, (player, lava) => {
        if (lava.erupting && Math.abs(lava.x - player.x) < 100) {
            player.health -= 0.3;
        }
    })
    this.physics.add.overlap(player, signs, (player, sign) => {
        signText.text = "Press R to read sign";
        touchingSign = true;
        if ((keys['r'] || keys['R']) && !sign.reading) {
            sign.reading = true;
            Swal.fire(sign.title, sign.text).then(() => {
                sign.reading = false;
            })
        }
    })
    this.physics.add.overlap(player, boosts, (player, boost) => {
        if (!boost.used) {
            boost.used = true;
            boost.orgin.used = true;
            boost.step = 1;
            if (boost.type === "heart") {
                player.health += boost.boostAmt;
                player.health = Math.min(player.maxHealth, player.health);
            }
            if (boost.type === "wrench") {
                shieldHealth += boost.boostAmt;
                shieldHealth = Math.min(maxShieldHealth, shieldHealth);
            }
        }
    })
    this.physics.add.overlap(player, stars, (player, star) => {
        if (!star.collected) {
            star.collected = true;
            star.orgin.collected = true;
            star.step = 1;
            levels[level].starsLeft -= 1;
        }
    })
    cursors = this.input.keyboard.createCursorKeys();
}
const radians = degrees => degrees * Math.PI / 180;
window.onmousedown = () => {
    mouseDown = true;
}
window.onmouseup = () => {
    mouseDown = false;
}

window.onkeydown = (e) => {
    keys[e.key] = true;
}
window.onkeyup = (e) => {
    keys[e.key] = false;
}
const degrees = radians => radians * 180 / Math.PI;

function update() {
    if (!stopStorage) {
        localStorage.coinAmount = coinAmount;
        localStorage.playerHealth = player.health;
        localStorage.shieldHealth = shieldHealth;
    }
    graphics.clear();
    graphics.fillStyle(0xff0000, 1);
    healthRect.setSize((Math.max(player.health, 0) / player.maxHealth) * 90, 21);
    graphics.fillRectShape(healthRect);
    if (!touchingSign) {
        signText.text = "";
    }
    if (shieldUnlocked) {
        shieldBar.alpha = 1;
        graphics.fillStyle(0x0000ff, 1);
        shieldRect.setSize((Math.max(shieldHealth, 0) / maxShieldHealth) * 90, 21);
        graphics.fillRectShape(shieldRect);
    } else {
        shieldBar.alpha = 0;
    }
    coinText.text = `${coinAmount}`;
    touchingSign = false;
    if (player.health < 1 && !player.exploded) {
        const explosion = this.physics.add.staticSprite(player.x, player.y, "explode");
        explosion.on("animationcomplete", () => {
            explosion.destroy();
            player.alpha = 1;
            coinAmount = 0;
            player.x = 100;
            player.y = 450;
            player.health = player.maxHealth;
            player.exploded = false;
        })
        explosion.anims.play("explosion");
        player.alpha = 0;
        player.exploded = true;
    }
    if (player.x < 0) {
        if (level === 1 || bugBoss.health > 0) {
            player.x = 0;
        } else {
            player.x = 800;
            level -= 1;
            renderLevel(level);
        }
    } else if (player.x > 800 && (levels[level].starsLeft ? levels[level].starsLeft : 0) < 1 && (bugBoss.health ? bugBoss.health < 1 : true)) {
        player.x = 0;
        if (!levelsVisited.includes(level)) {
            coinAmount += level;
        }
        levelsVisited.push(level);
        level += 1;
        level %= 21;
        if (level === 0) {
            level = 1;
        }
        renderLevel(level);
    } else if (player.x > 800) {
        player.x = 800;
    }
    levelText.text = `Level: ${level}`
    if (cursors.left.isDown && player.dazed < 1) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown && player.dazed < 1) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    } else {
        if (player.dazed < 1) {
            player.setVelocityX(0);
        }
        player.anims.play('turn');
    }
    player.dazed--;

    if (cursors.up.isDown && player.body.touching.down && player.collidingWithPlatforms) {
        player.setVelocityY(-250);
    }
    if (player.jumpNext) {
        player.setVelocityY(-250);
        player.jumpNext = false;
    }
    if (shieldHealth < 1 && !shield.regening) {
        shieldHealth = 0;
        shield.regening = true;
    }
    if (shield.regening) {
        shieldHealth += 0.1;
        if (shieldHealth >= maxShieldHealth) {
            shield.regening = false;
            shieldHealth = maxShieldHealth;
        }
    }
    shieldHealth += 0.025;
    if (shieldHealth > maxShieldHealth) {
        shieldHealth = maxShieldHealth;
    }
    if ((keys['s'] || keys['S']) && shieldUnlocked && shieldHealth > 0 && !shield.regening && player.dazed < 1) {
        shield.alpha = 1;
        shield.x = player.x + 30 * shield.facing;
        shield.y = player.y;
        if (player.body.velocity.x > 0) {
            shield.facing = 1;
        } else if (player.body.velocity.x < 0) {
            shield.facing = -1;
        }
        const pointer = this.input.activePointer;
        const xDist = pointer.worldX - shield.x;
        const yDist = pointer.worldY - shield.y;
        shield.setVelocityX(0.01);
        let direction;
        if (xDist > 0 && yDist > 0) {
            direction = degrees(Math.atan(yDist / xDist));
        } else if (xDist > 0 && yDist < 0) {
            direction = 360 + degrees(Math.atan(yDist / xDist));
        } else {
            direction = 180 + degrees(Math.atan(yDist / xDist));
        }
        shield.angle = direction;
    } else {
        shield.alpha = 0;
    }
    coins.children.entries.forEach(coin => {
        coin.anims.play('coinSpin', true);
        coin.y -= 5;
        if (coin.step) {
            coin.step += 1;
        } else {
            coin.step = 1;
        }
        coin.setAlpha(1 - 0.03 * coin.step)
        if (coin.step > 30) {
            coin.destroy();
        }
    });
    boosts.children.entries.forEach(boost => {
        if (!boost.used) {
            if (boost.step === undefined) {
                boost.step = 0;
            } else {
                boost.step += 0.1;
            }
            boost.y += Math.sin(boost.step) / 2;
        } else {
            boost.y -= 5;
            boost.step += 1;
            boost.setAlpha(1 - 0.03 * boost.step)
            if (boost.step > 30) {
                boost.destroy();
            }
        }
    })
    lavaSpurts.children.entries.forEach(lava => {
        if (!lava.step) {
            lava.step = 1;
        } else {
            lava.step += 1;
        }
        if (lava.step % lava.tick === 0) {
            lava.setAlpha(1);
            lava.anims.play("lavaSpurt", true);
            lava.erupting = true;
        }
    })
    stars.children.entries.forEach(star => {
        if (!star.collected) {
            if (star.step === undefined) {
                star.step = 0;
            } else {
                star.step += 0.1;
            }
            star.y += Math.sin(star.step) / 2;
        } else {
            star.y -= 5;
            star.step += 1;
            star.setAlpha(1 - 0.03 * star.step)
            if (star.step > 30) {
                star.destroy();
            }
        }
    })
    enemies.children.entries.forEach(enemy => {
        if (enemy.dazed === undefined) {
            enemy.dazed = 0;
        }
        if (enemy.texture.key === "bug") {
            if (!enemy.fallen && enemy.dazed < 1) {
                if (!enemy.step) {
                    enemy.step = 1;
                    enemy.anims.play('bugWalk', true);
                }
                if (enemy.step <= 60) {
                    enemy.setVelocityX(100);
                } else if (enemy.step <= 120) {
                    enemy.setVelocityX(-100);
                } else {
                    if (enemy.goodX) {
                        enemy.x = enemy.goodX;
                    }
                    enemy.goodX = enemy.x;
                    enemy.step = 1;
                    enemy.anims.play('bugWalk', true);
                }
                enemy.step++;
            } else if (enemy.fallen) {
                enemy.setVelocityX(0);
            }
            enemy.dazed--;
        } else if (enemy.texture.key === "robot") {
            if (enemy.step === undefined) {
                enemy.step = Math.round(Phaser.Math.Between(0, 10));
            } else {
                enemy.step += 0.1;
            }
            enemy.y += Math.sin(enemy.step) / 2;
            if (Math.round(enemy.step) % 10 === 0) {
                enemy.step += 1;
                let p = projectiles.create(enemy.x, enemy.y + 10, "projectile");
                levelObjects.push(p);
                p.setScale(0.5);
            }
            enemy.anims.play("robotWalk", true);
        } else if (enemy.texture.key === "saw") {
            enemy.setCollideWorldBounds(true);
            enemy.emitter.setPosition(enemy.x, enemy.y)
            if (!enemy.mode) {
                enemy.mode = "passive";
            } else if (enemy.mode === "passive") {
                enemy.angle += 1;
                if (Math.abs(enemy.x - player.x) < 100 && !enemy.docile) {
                    enemy.step = 0;
                    enemy.emitter.stop();
                    enemy.mode = "hostile";
                    enemy.orginX = enemy.x;
                    enemy.attacking = true;
                    enemy.attack = 1;
                    enemy.retreat = 0;
                }
                enemy.setVelocityX(0);
            } else if (enemy.mode === "hostile") {
                if (enemy.attack < 3 && enemy.attacking) {
                    enemy.angle += 5;
                    if (enemy.x < player.x) {
                        enemy.setVelocityX(160)
                    } else {
                        enemy.setVelocityX(-160);
                    }
                } else if (enemy.attack === 3 && enemy.attacking) {
                    if (!enemy.attackStep) {
                        enemy.attackStep = 0;
                    }
                    enemy.attackStep++;
                    enemy.angle += 10;
                    if (enemy.attackStep > 60) {
                        if (enemy.x < player.x) {
                            enemy.setVelocityX(480)
                        } else {
                            enemy.setVelocityX(-480);
                        }
                    }
                } else {
                    if (enemy.attack === 3) {
                        enemy.mode = "passive";
                        enemy.emitter.start();
                        enemy.docile = true;
                        return;
                    }
                    enemy.retreat++;
                    if (enemy.x < player.x) {
                        enemy.setVelocityX(-150)
                    } else {
                        enemy.setVelocityX(150);
                    }
                    if (enemy.retreat >= 60) {
                        enemy.retreat = 0;
                        enemy.attacking = true;
                        enemy.attack += 1;
                    }
                }
            }
        }
    })
    projectiles.children.iterate(projectile => {
        projectile.body.setGravityY(0);
        if (projectile.hit) {
            projectile.yVel += 8;
        }
        if (!projectile.xVel) {
            const xDist = player.x - projectile.x;
            const yDist = player.y - projectile.y;
            //shield.setVelocityX(0.01);
            let direction;
            if (xDist > 0 && yDist > 0) {
                direction = degrees(Math.atan(yDist / xDist));
            } else if (xDist > 0 && yDist < 0) {
                direction = 360 + degrees(Math.atan(yDist / xDist));
            } else {
                direction = 180 + degrees(Math.atan(yDist / xDist));
            }
            projectile.xVel = 320 * Math.cos(radians(direction));
            projectile.yVel = 320 * Math.sin(radians(direction));
        }
        projectile.setVelocityX(projectile.xVel);
        projectile.setVelocityY(projectile.yVel);
    })
    if (level === 10 && levels[10].boss) {
        if (bugBoss.health < 1 && !bugBoss.exploded) {
            bossText.text = `Boss Health: 0`;
            const explosion = this.physics.add.staticSprite(bugBoss.x, bugBoss.y, "explode");
            explosion.setScale(2);
            explosion.on("animationcomplete", () => {
                explosion.destroy();
            })
            explosion.anims.play("explosion");
            enemies.children.iterate(enemy => {
                if (enemy) {
                    const explosion = this.physics.add.staticSprite(enemy.x, enemy.y, "explode");
                    explosion.on("animationcomplete", () => {
                        explosion.destroy();
                    })
                    explosion.anims.play("explosion");
                    enemy.destroy();
                }
            })
            bugBoss.exploded = true;
            bugBoss.destroy();
            delete levels[10].boss;
        } else if (!bugBoss.exploded) {
            bossText.text = `Boss Health: ${bugBoss.health}`;
            bugBoss.anims.play('bugBossWalk', true);
            if (bugBoss.step < 600) {
                if (Math.abs(player.x - bugBoss.x) > 100) {
                    if (bugBoss.x < player.x) {
                        bugBoss.setVelocityX(120);
                    } else if (player.x < bugBoss.x) {
                        bugBoss.setVelocityX(-120);
                    }
                }
                if (player.y <= bugBoss.y && bugBoss.body.touching.down) {
                    bugBoss.setVelocityY(-300)
                }
            } else if (bugBoss.step === 600) {
                bugBoss.setVelocityX(0);
                bugBoss.setVelocityY(0);
                bugBoss.target = Math.random() > 0.5 ? 500 : 300;
            } else if (bugBoss.step < 1200) {
                bugBoss.x += (bugBoss.target - bugBoss.x) / 100
            } else if (bugBoss.step === 1200) {
                bugBoss.setVelocityY(-300);
                bugBoss.summoned = false;
            } else if (bugBoss.step < 1800) {
                if (bugBoss.body.touching.down && !bugBoss.summoned) {
                    bugBoss.summoned = true;
                    const enemyList = [enemies.create(200, 520, "bug"),
                        enemies.create(400, 520, "bug"),
                        enemies.create(600, 520, "bug"),
                        enemies.create(150, 402, "bug"),
                        enemies.create(350, 402, "bug"),
                        enemies.create(550, 402, "bug")
                    ];
                    enemyList.forEach(enemy => {
                        enemy.minion = true;
                        enemy.orgin = {};
                        levelObjects.push(enemy);
                    })
                    let spurts = [lavaSpurts.create(250, 485, "lava"), lavaSpurts.create(450, 485, "lava")];
                    spurts.forEach(spurt => {
                        spurt.on("animationcomplete", () => {
                            spurt.destroy();
                        })
                        spurt.anims.play("lavaSpurt", true)
                    })

                }
            }
            bugBoss.step += 1;
            bugBoss.step = bugBoss.step % 1800;
        }
    }
    coin.anims.play('coinSpin', true);
    player.collidingWithPlatforms = false;
    shield.dazed--;
}