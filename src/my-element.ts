import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
    .nav-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .status {
      margin-top: 10px;
      font-style: italic;
      color: #666;
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

  private timer: number | undefined;

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
          Abrir Segunda Página (${2 - this.tabOpenCount} restantes)
        </button>
        ${this.isProcessRunning ? html`
          <p class="status">Próxima pestaña se abrirá en: ${this.remainingTime} segundos</p>
        ` : ''}
        ${this.tabOpenCount >= 2 ? html`
          <p class="status">Se han abierto todas las pestañas permitidas</p>
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
    window.open('/second', '_blank');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
} 