import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './styles/my-element.styles';

interface OpenWindow {
  id: string;
  title: string;
  window: Window;
}

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = styles;

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
  protected getBasePath(): string {
    try {
      const baseElement = document.querySelector('base');
      return baseElement ? baseElement.getAttribute('href') || '/' : '/';
    } catch (e) {
      console.warn('Error getting base path:', e);
      return '/';
    }
  }

  // Get origin for postMessage
  protected getOrigin(): string {
    try {
      return window.location.origin;
    } catch (e) {
      console.warn('Error getting origin:', e);
      return 'http://localhost:8000';
    }
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
    try {
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
    } catch (e) {
      console.warn('Error opening new tab:', e);
    }
  }

  private _handleMessage(event: MessageEvent) {
    try {
      // Verificar el origen por seguridad
      const allowedOrigin = this.getOrigin();
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
    } catch (e) {
      console.warn('Error handling message:', e);
    }
  }

  private _closeWindow(windowInfo: OpenWindow) {
    try {
      // Enviar mensaje directamente a la ventana específica
      windowInfo.window.postMessage({
        type: 'CLOSE_WINDOW',
        id: windowInfo.id
      }, this.getOrigin());
    } catch (e) {
      console.warn('Error closing window:', e);
    }
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