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
  `;

  @property()
  title = 'Segunda Página';

  render() {
    return html`
      <div class="card">
        <h1>${this.title}</h1>
        <p>Este es el contenido de la segunda página</p>
        <button @click=${this._goToHome}>Volver al Inicio</button>
      </div>
    `;
  }

  private _goToHome() {
    window.location.href = '/';
  }
} 