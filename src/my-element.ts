import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface OpenWindow {
  id: string;
  title: string;
  window: Window;
}

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--my-element-text-color, #000);
    }
    .container {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 4px;
    }
    .nav-button {
      background-color: #2196F3;
    }
    .close-button {
      background-color: #f44336;
      padding: 8px 16px;
      font-size: 14px;
    }
    .nav-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .status {
      margin-top: 10px;
      font-style: italic;
      color: #666;
    }
    .windows-list {
      margin-top: 20px;
      padding: 10px;
      border-top: 1px solid #eee;
    }
    .window-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      background: #f5f5f5;
      margin: 5px 0;
      border-radius: 4px;
    }
  `;

  @property()
  name = 'World';

  @property({ type: Number })
  count = 0;

  @state()
  private tabOpenCount = 0;

  @state()
  private isProcessRunning = false;

  @state()
  private remainingTime = 0;

  @state()
  private openWindows: OpenWindow[] = [];

  private timer: number | undefined;

  // Get base URL for GitHub Pages compatibility
  private getBasePath() {
    const baseElement = document.querySelector('base');
    return baseElement ? baseElement.getAttribute('href') || '/' : '/';
  }

  constructor() {
    super();
    // Configurar el listener de mensajes
    window.addEventListener('message', this._handleMessage.bind(this));
  }

  render() {
    return html`
      <div class="container">
        <h1>Hello, ${this.name}!</h1>
        <button @click=${this._onClick}>
          Click Count: ${this.count}
        </button>
        <button 
          class="nav-button" 
          @click=${this._startTabOpenProcess}
          ?disabled=${this.isProcessRunning || this.tabOpenCount >= 2}
        >
          Open Second Page (${2 - this.tabOpenCount} remaining)
        </button>
        ${this.isProcessRunning ? html`
          <p class="status">Next tab will open in: ${this.remainingTime} seconds</p>
        ` : ''}
        ${this.tabOpenCount >= 2 ? html`
          <p class="status">All allowed tabs have been opened</p>
        ` : ''}
        
        ${this.openWindows.length > 0 ? html`
          <div class="windows-list">
            <h3>Open Windows</h3>
            ${this.openWindows.map(window => html`
              <div class="window-item">
                <span>${window.title} (ID: ${window.id})</span>
                <button class="close-button" @click=${() => this._closeWindow(window)}>
                  Close Window
                </button>
              </div>
            `)}
          </div>
        ` : ''}
        <slot></slot>
      </div>
    `;
  }

  private _onClick() {
    this.count++;
  }

  private _startTabOpenProcess() {
    if (this.tabOpenCount >= 2 || this.isProcessRunning) return;
    
    this.isProcessRunning = true;
    this._openNewTab();
    this.tabOpenCount++;
    
    if (this.tabOpenCount < 2) {
      this.remainingTime = 30;
      this.timer = window.setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          this._openNewTab();
          this.tabOpenCount++;
          clearInterval(this.timer);
          this.isProcessRunning = false;
        }
      }, 1000);
    } else {
      this.isProcessRunning = false;
    }
  }

  private _openNewTab() {
    const windowId = crypto.randomUUID();
    const basePath = this.getBasePath();
    const newWindow = window.open(`${basePath}second.html?id=${windowId}`, '_blank');
    if (newWindow) {
      newWindow.focus();
      // Almacenar la referencia de la ventana junto con su ID
      this.openWindows = [...this.openWindows, { 
        id: windowId, 
        title: 'Second Page', 
        window: newWindow 
      }];
    }
  }

  private _handleMessage(event: MessageEvent) {
    // Verificar el origen por seguridad
    const allowedOrigin = window.location.origin;
    if (event.origin !== allowedOrigin) return;

    const { type, id, title } = event.data;
    
    if (type === 'WINDOW_READY') {
      // Actualizar el título si es necesario
      this.openWindows = this.openWindows.map(w => 
        w.id === id ? { ...w, title } : w
      );
    } else if (type === 'WINDOW_CLOSED') {
      this.openWindows = this.openWindows.filter(w => w.id !== id);
      this.tabOpenCount = Math.max(0, this.tabOpenCount - 1);
    }
  }

  private _closeWindow(windowInfo: OpenWindow) {
    // Enviar mensaje directamente a la ventana específica
    windowInfo.window.postMessage({
      type: 'CLOSE_WINDOW',
      id: windowInfo.id
    }, window.location.origin);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timer) {
      clearInterval(this.timer);
    }
    // Remover el listener de mensajes
    window.removeEventListener('message', this._handleMessage.bind(this));
  }
} 