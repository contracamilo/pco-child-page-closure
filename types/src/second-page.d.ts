import { LitElement } from 'lit';
export declare class SecondPage extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    windowId: string;
    protected getOrigin(): string;
    protected getWindowId(): string;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    private _notifyReady;
    private _handleMessage;
    private _closeWindow;
    disconnectedCallback(): void;
}
