import { css } from 'lit';

export const styles = css`
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