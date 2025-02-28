import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('second-page')
export class SecondPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--second-page-text-color, #000);
    }
    .card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2196F3;
      margin-top: 0;
    }
    .window-id {
      font-family: monospace;
      background: #f5f5f5;
      padding: 4px 8px;
      border-radius: 4px;
      margin-left: 8px;
    }
  `;

  @property()
  title = 'Segunda Página';

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
          ID de Ventana: 
          <span class="window-id">${this.windowId}</span>
        </p>
        <p>Esta ventana solo puede ser cerrada desde la página principal</p>
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