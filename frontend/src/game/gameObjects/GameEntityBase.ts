import { ResponsiveScaler } from "../../utilities";

export abstract class GameEntityBase extends Phaser.GameObjects.Sprite {
    /**
     * The size this game object has to be, relative to the game window width/height.
     * Should be between 0 (nothing) and 1 (full window).
     */
    protected relativeSize: number;

    private readonly clearUpdateSizeOnResizeHandler: () => void;

    public body!: Phaser.Physics.Arcade.Body;
    private readonly omitGravity: boolean;

    protected constructor(
        scene: Phaser.Scene,
        spawnLocation: Phaser.Math.Vector2,
        relativeSize: number,
        textureKey: string,
        omitGravity: boolean = false,
    ) {
        super(scene, spawnLocation.x, spawnLocation.y, textureKey);
        this.relativeSize = relativeSize;
        this.omitGravity = omitGravity;

        scene.add.existing(this);
        if (!this.omitGravity) {
            this.scene.physics.world.enable(this);
            // Assuming all images are circles!
            this.body.isCircle = true;
        }

        this.updateSize();
        this.clearUpdateSizeOnResizeHandler = ResponsiveScaler.registerResizeHandler(() => {
            this.updateSize();
        });
    }

    public destroy(fromScene?: boolean): void {
        super.destroy(fromScene);
        this.clearUpdateSizeOnResizeHandler();
    }

    /**
     * Updates this GameObject so it will always be the given percentage of the
     * width/height of the parent game window.
     * The smallest value of the two (width or height) is used to calculate the new scale.
     */
    private updateSize(): void {
        if (window.innerHeight < window.innerWidth) {
            const rawImageHeight = this.height;
            const newCalculatedHeight = window.innerHeight * this.relativeSize;
            const scale = newCalculatedHeight / rawImageHeight;
            this.setScale(scale);
        } else {
            const rawImageWidth = this.width;
            const newCalculatedWidth = window.innerWidth * this.relativeSize;
            const scale = newCalculatedWidth / rawImageWidth;
            this.setScale(scale);
        }
        if (!this.omitGravity) {
            this.body.updateBounds();
        }
    }
}
