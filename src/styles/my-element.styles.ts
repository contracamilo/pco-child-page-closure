import { css } from 'lit';

export const styles = css`
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