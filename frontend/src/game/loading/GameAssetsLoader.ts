export class GameAssetsLoader {

  /**
   * loadingText
   */

  private static _loadingText: string = "";

  public static get loadingText(): string {
    return GameAssetsLoader._loadingText;
  }

  public static set loadingText(newLoadingText: string) {
    this._loadingText = newLoadingText;
    this._loadingTextChangeSubscribers.forEach((subscriber) => {
      subscriber(newLoadingText);
    });
  }

  private static _loadingTextChangeSubscribers: ((newLoadingText: string) => void)[] = [];

  public static registerLoadingTextChangeSubscriber(func: (newLoadingText: string) => void): void {
    this._loadingTextChangeSubscribers.push(func);
  }

  public static removeLoadingTextChangeSubscriber(func: (newLoadingText: string) => void): void {
    const funcIndex = this._loadingTextChangeSubscribers.indexOf(func);
    if (funcIndex > -1) {
      this._loadingTextChangeSubscribers.splice(funcIndex, 1);
    }
  }

  /**
   * loadingPercentage
   */

  private static _loadingPercentage: number = 0;

  public static get loadingPercentage(): number {
    return GameAssetsLoader._loadingPercentage;
  }

  public static set loadingPercentage(newPercentage) {
    GameAssetsLoader._loadingPercentage = newPercentage;
    this._loadingPercentageChangeSubscribers.forEach((subscriber) => {
      subscriber(newPercentage);
    });
  }

  private static _loadingPercentageChangeSubscribers: ((newPercentage: number) => void)[] = [];

  public static registerLoadingPercentageChangeSubscriber(func: (newPercentage: number) => void): void {
    this._loadingPercentageChangeSubscribers.push(func);
  }

  public static removeLoadingPercentageChangeSubscriber(func: (newPercentage: number) => void): void {
    const funcIndex = this._loadingPercentageChangeSubscribers.indexOf(func);
    if (funcIndex > -1) {
      this._loadingPercentageChangeSubscribers.splice(funcIndex, 1);
    }
  }

  /**
   * isLoading
   */

  private static _isLoading: boolean = true;

  public static get isLoading(): boolean {
    return GameAssetsLoader._isLoading;
  }

  public static set isLoading(newIsLoading) {
    GameAssetsLoader._isLoading = newIsLoading;
    this._isLoadingChangeSubscribers.forEach((subscriber) => {
      subscriber(newIsLoading);
    });
  }

  private static _isLoadingChangeSubscribers: ((newIsLoading: boolean) => void)[] = [];

  public static registerIsLoadingChangeSubscriber(func: (newIsLoading: boolean) => void): void {
    this._isLoadingChangeSubscribers.push(func);
  }

  public static removeIsLoadingChangeSubscriber(func: (newIsLoading: boolean) => void): void {
    const funcIndex = this._isLoadingChangeSubscribers.indexOf(func);
    if (funcIndex > -1) {
      this._isLoadingChangeSubscribers.splice(funcIndex, 1);
    }
  }
}
