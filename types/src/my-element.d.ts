import { LitElement } from 'lit';
export declare class MyElement extends LitElement {
    static styles: import("lit").CSSResult;
    name: string;
    count: number;
    private tabOpenCount;
    private isProcessRunning;
    private remainingTime;
    private openWindows;
    private timer;
    protected getBasePath(): string;
    protected getOrigin(): string;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    private _onClick;
    private _startTabOpenProcess;
    private _openNewTab;
    private _handleMessage;
    private _closeWindow;
    disconnectedCallback(): void;
}
