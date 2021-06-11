class WearMachineTxt {
    constructor(scene, x, y) {

        this.wear = 100;
        this.maxWear = 100;

        this.txt = scene.add.text(x, y, Math.round((this.wear/this.maxWear)*100)+"%",{
            fontSize:'35px',
            fill:'#ffffff',
            fontStyle:'bold',
        }).setOrigin(0.5).setDepth(5);
    
    }

    ChangeValue(newValue){

        this.wear = newValue;
        this.txt.setText(Math.round((this.wear/this.maxWear)*100)+'%');
    }

}