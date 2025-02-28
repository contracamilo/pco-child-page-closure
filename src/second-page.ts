import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './styles/second-page.styles';

@customElement('second-page')
export class SecondPage extends LitElement {
  static styles = styles;

  @property()
  title = 'Second Page';

  @property()
  windowId = '';

  protected getOrigin(): string {
    try {
      return window.location.origin;
    } catch (e) {
      console.warn('Error getting origin:', e);
      return 'http://localhost:8000';
    }
  }

  protected getWindowId(): string {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('id') || crypto.randomUUID();
    } catch (e) {
      console.warn('Error getting window ID:', e);
      return crypto.randomUUID();
    }
  }

  constructor() {
    super();
    this.windowId = this.getWindowId();
    window.addEventListener('message', this._handleMessage.bind(this));
    this._notifyReady();
  }

  render() {
    return html`
      <div class="card">
        <h1>${this.title}</h1>
        <p>
          Window ID: 
          <span class="window-id">${this.windowId}</span>
        </p>
        <p>This window can only be closed from the main page</p>
      </div>
    `;
  }

  private _notifyReady() {
    try {
      window.opener?.postMessage({
        type: 'WINDOW_READY',
        id: this.windowId,
        title: this.title
      }, this.getOrigin());
    } catch (e) {
      console.warn('Failed to notify ready:', e);
    }
  }

  private _handleMessage(event: MessageEvent) {
    try {
      const allowedOrigin = this.getOrigin();
      if (event.origin !== allowedOrigin) return;

      const { type, id } = event.data;
      
      if (type === 'CLOSE_WINDOW' && id === this.windowId) {
        this._closeWindow();
      }
    } catch (e) {
      console.warn('Error handling message:', e);
    }
  }

  private _closeWindow() {
    try {
      window.opener?.postMessage({
        type: 'WINDOW_CLOSED',
        id: this.windowId
      }, this.getOrigin());
      window.close();
    } catch (e) {
      console.warn('Failed to close window:', e);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('message', this._handleMessage.bind(this));
  }
} 