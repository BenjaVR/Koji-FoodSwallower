interface IResizeHandler {
    handler: () => void;
    /**
     * If the handlers get reset, do not reset this one.
     * Should almost never be used, only for global things like the canvas resizing.
     */
    neverResetHandler: boolean;
}
type ResizeHandler =
    | (() => void)
    | IResizeHandler;

export class ResponsiveScaler {
    private static initialized = false;
    private static resizeHandlers: IResizeHandler[] = [];
    private static gameSizeDebouncerHandle: number | undefined;

    /**
     * Should be called when the game instance gets destroyed.
     */
    public static reset() {
        this.initialized = false;
        this.resizeHandlers = this.resizeHandlers.filter(handler => handler.neverResetHandler);
        window.clearTimeout(this.gameSizeDebouncerHandle);
        this.gameSizeDebouncerHandle = undefined;
        window.removeEventListener("resize", this.handleWindowResize);
    }

    /**
     * Register a handler callback to be executed when the game size is resized.
     * Returns a function to clear the event handler.
     */
    public static registerResizeHandler(handler: ResizeHandler): () => void {
        if (!ResponsiveScaler.initialized) {
            window.addEventListener("resize", this.handleWindowResize);
            ResponsiveScaler.initialized = true;
        }
        const resizeHandler: IResizeHandler = "neverResetHandler" in handler
            ? handler
            : {
                handler: handler,
                neverResetHandler: false
            };
        if (ResponsiveScaler.resizeHandlers.filter(rHandler => rHandler.handler === resizeHandler.handler).length === 0) {
            ResponsiveScaler.resizeHandlers.push(resizeHandler);
        }
        return () => {
            const indexOfHandler = ResponsiveScaler.resizeHandlers.indexOf(resizeHandler);
            if (indexOfHandler > -1) {
                // .splice(-1) will remove the last element, while an index of -1 actually means
                // the handler is not registered anymore!
                ResponsiveScaler.resizeHandlers.splice(indexOfHandler, 1);
            }
        };
    }

    private static handleWindowResize(): void {
        window.clearTimeout(this.gameSizeDebouncerHandle);
        this.gameSizeDebouncerHandle = window.setTimeout(
            () => {
                ResponsiveScaler.resizeHandlers.forEach((resizeHandler) => {
                    resizeHandler.handler();
                });
            },
            100
        );
    }
}
