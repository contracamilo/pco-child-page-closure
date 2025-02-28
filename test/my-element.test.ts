import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/my-element.js';
import { MyElement } from '../src/my-element.js';

suite('MyElement', () => {
  let element: MyElement;

  setup(async () => {
    element = await fixture<MyElement>(html`<my-element></my-element>`);
    await element.updateComplete;
  });

  test('renders with default values', async () => {
    const container = element.shadowRoot!.querySelector('.container');
    expect(container).to.exist;
    expect(element.name).to.equal('World');
    expect(element.count).to.equal(0);
  });

  test('increases count on button click', async () => {
    const button = element.shadowRoot!.querySelector('button');
    expect(button).to.exist;
    
    button!.click();
    await element.updateComplete;
    expect(element.count).to.equal(1);
  });

  test('disables nav button when max tabs are open', async () => {
    const navButton = element.shadowRoot!.querySelector('.nav-button') as HTMLButtonElement;
    expect(navButton).to.exist;
    expect(navButton.disabled).to.be.false;

    // Simulate opening two tabs
    element['tabOpenCount'] = 2;
    await element.updateComplete;
    
    expect(navButton.disabled).to.be.true;
  });

  test('shows timer when process is running', async () => {
    element['isProcessRunning'] = true;
    element['remainingTime'] = 25;
    await element.updateComplete;

    const status = element.shadowRoot!.querySelector('.status');
    expect(status).to.exist;
    expect(status!.textContent).to.include('25 seconds');
  });

  test('handles window messages correctly', async () => {
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

    postMessageStub.restore();
  });

  test('cleans up resources on disconnect', async () => {
    const removeEventListenerSpy = stub(window, 'removeEventListener');
    const timer = setInterval(() => {}, 1000);
    element['timer'] = timer as any;

    element.remove();

    expect(removeEventListenerSpy.calledOnce).to.be.true;
    expect(removeEventListenerSpy.firstCall.args[0]).to.equal('message');
    
    removeEventListenerSpy.restore();
    clearInterval(timer);
  });
}); 