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

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    this.windowId = urlParams.get('id') || crypto.randomUUID();
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
    window.opener?.postMessage({
      type: 'WINDOW_READY',
      id: this.windowId,
      title: this.title
    }, window.location.origin);
  }

  private _handleMessage(event: MessageEvent) {
    const allowedOrigin = window.location.origin;
    if (event.origin !== allowedOrigin) return;

    const { type, id } = event.data;
    
    if (type === 'CLOSE_WINDOW' && id === this.windowId) {
      this._closeWindow();
    }
  }

  private _closeWindow() {
    window.opener?.postMessage({
      type: 'WINDOW_CLOSED',
      id: this.windowId
    }, window.location.origin);
    window.close();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('message', this._handleMessage.bind(this));
  }
} 