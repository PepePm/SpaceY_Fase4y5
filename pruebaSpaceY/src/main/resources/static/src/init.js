var config = {
    width: 1600,
    height: 900,
    parent: "container",
    type: Phaser.AUTO,
    autoCenter: true,

    scene:[SceneLogos, SceneBoot,SceneMars,SceneEarth ,SceneMenu, SceneREST,SceneTutorial, SceneGame, ScenePause,SceneContact, SceneOptions, SceneGameEnd],

    physics: {
        default: "arcade",
        arcade: {
            debug:false,
            gravity: {
                y: 0,
                debug: false
            }
        }
    },
    dom: {
        createContainer: true
    },
}

var game = new Phaser.Game(config);