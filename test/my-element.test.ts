import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { MyElement } from '../src/my-element.js';

class TestMyElement extends MyElement {
  protected override getBasePath(): string {
    return '/test/';
  }

  protected override getOrigin(): string {
    return 'http://localhost:8000';
  }
}

// Register the test component
customElements.define('test-my-element', TestMyElement);

describe('MyElement', () => {
  let element: TestMyElement;

  beforeEach(async () => {
    element = await fixture<TestMyElement>(html`<test-my-element></test-my-element>`);
    await element.updateComplete;
  });

  afterEach(() => {
    // Clean up any stubs that might have been created
    const stubs = [
      'postMessage',
      'removeEventListener',
      'close'
    ].map(method => (window as any)[method]?.restore?.());
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
    const mockWindow = { postMessage: stub() };
    const windowInfo = {
      id: 'test-id',
      title: 'Test Window',
      window: mockWindow as unknown as Window
    };

    element['_closeWindow'](windowInfo);
    
    expect(mockWindow.postMessage).to.have.been.calledWith({
      type: 'CLOSE_WINDOW',
      id: 'test-id'
    });
  });

  it('cleans up resources on disconnect', async () => {
    const removeEventListenerSpy = stub(window, 'removeEventListener');
    const timer = setInterval(() => {}, 1000);
    element['timer'] = timer as any;

    element.remove();

    expect(removeEventListenerSpy).to.have.been.calledWith('message');
    removeEventListenerSpy.restore();
    clearInterval(timer);
  });
}); 