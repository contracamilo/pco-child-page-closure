import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { MyElement } from '../src/my-element.js';

// Ensure the component is defined
customElements.define('my-element', MyElement);

describe('MyElement', () => {
  let element: MyElement;

  beforeEach(async () => {
    element = await fixture<MyElement>(html`<my-element></my-element>`);
    await element.updateComplete;
  });

  afterEach(() => {
    // Clean up any stubs
    sinon.restore();
  });

  it('renders with default values', async () => {
    const container = element.shadowRoot!.querySelector('.container');
    expect(container).to.exist;
    expect(element.name).to.equal('World');
    expect(element.count).to.equal(0);
  });

  it('increases count on button click', async () => {
    const button = element.shadowRoot!.querySelector('button');
    expect(button).to.exist;
    
    button!.click();
    await element.updateComplete;
    expect(element.count).to.equal(1);
  });

  it('disables nav button when max tabs are open', async () => {
    const navButton = element.shadowRoot!.querySelector('.nav-button') as HTMLButtonElement;
    expect(navButton).to.exist;
    expect(navButton.disabled).to.be.false;

    // Simulate opening two tabs
    element['tabOpenCount'] = 2;
    await element.updateComplete;
    
    expect(navButton.disabled).to.be.true;
  });

  it('shows timer when process is running', async () => {
    element['isProcessRunning'] = true;
    element['remainingTime'] = 25;
    await element.updateComplete;

    const status = element.shadowRoot!.querySelector('.status');
    expect(status).to.exist;
    expect(status!.textContent).to.include('25 seconds');
  });

  it('handles window messages correctly', async () => {
    const windowInfo = {
      id: 'test-id',
      title: 'Test Window',
      window: window
    };

    const postMessageStub = stub(window, 'postMessage');

    element['_closeWindow'](windowInfo);
    
    expect(postMessageStub.calledOnce).to.be.true;
    expect(postMessageStub.firstCall.args[0]).to.deep.equal({
      type: 'CLOSE_WINDOW',
      id: 'test-id'
    });
  });

  it('cleans up resources on disconnect', async () => {
    const removeEventListenerSpy = stub(window, 'removeEventListener');
    const timer = setInterval(() => {}, 1000);
    element['timer'] = timer as any;

    element.remove();

    expect(removeEventListenerSpy.calledOnce).to.be.true;
    expect(removeEventListenerSpy.firstCall.args[0]).to.equal('message');
    
    clearInterval(timer);
  });
}); 