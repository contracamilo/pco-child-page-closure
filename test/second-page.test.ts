import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/second-page.js';
import { SecondPage } from '../src/second-page.js';

suite('SecondPage', () => {
  let element: SecondPage;
  let windowCloseSpy: sinon.SinonStub;
  let openerPostMessage: sinon.SinonStub;

  setup(async () => {
    // Reset stubs for each test
    if (windowCloseSpy) windowCloseSpy.restore();
    windowCloseSpy = stub(window, 'close');

    // Mock window.opener
    (window as any).opener = {
      postMessage: stub()
    };
    openerPostMessage = (window as any).opener.postMessage;

    element = await fixture<SecondPage>(html`<second-page></second-page>`);
    // Wait for element to be ready
    await element.updateComplete;
  });

  teardown(() => {
    if (windowCloseSpy) windowCloseSpy.restore();
  });

  test('renders with default values', async () => {
    const card = element.shadowRoot!.querySelector('.card');
    expect(card).to.exist;
    expect(element.title).to.equal('Second Page');
    expect(element.windowId).to.not.be.empty;
  });

  test('displays window ID', async () => {
    const testId = 'test-window-id';
    element.windowId = testId;
    await element.updateComplete;

    const idElement = element.shadowRoot!.querySelector('.window-id');
    expect(idElement).to.exist;
    expect(idElement!.textContent).to.contain(testId);
  });

  test('notifies parent window on ready', async () => {
    expect(openerPostMessage.called).to.be.true;
    expect(openerPostMessage.firstCall.args[0]).to.deep.equal({
      type: 'WINDOW_READY',
      id: element.windowId,
      title: element.title
    });
  });

  test('handles close message', async () => {
    openerPostMessage.reset();

    // Simulate receiving close message
    window.dispatchEvent(new MessageEvent('message', {
      data: {
        type: 'CLOSE_WINDOW',
        id: element.windowId
      },
      origin: window.location.origin
    }));

    expect(openerPostMessage.calledOnce).to.be.true;
    expect(openerPostMessage.firstCall.args[0]).to.deep.equal({
      type: 'WINDOW_CLOSED',
      id: element.windowId
    });
    expect(windowCloseSpy.calledOnce).to.be.true;
  });

  test('ignores messages with wrong ID', async () => {
    openerPostMessage.reset();
    windowCloseSpy.reset();

    window.dispatchEvent(new MessageEvent('message', {
      data: {
        type: 'CLOSE_WINDOW',
        id: 'wrong-id'
      },
      origin: window.location.origin
    }));

    expect(openerPostMessage.called).to.be.false;
    expect(windowCloseSpy.called).to.be.false;
  });

  test('ignores messages from wrong origin', async () => {
    openerPostMessage.reset();
    windowCloseSpy.reset();

    window.dispatchEvent(new MessageEvent('message', {
      data: {
        type: 'CLOSE_WINDOW',
        id: element.windowId
      },
      origin: 'https://wrong-origin.com'
    }));

    expect(openerPostMessage.called).to.be.false;
    expect(windowCloseSpy.called).to.be.false;
  });

  test('removes event listener on disconnect', async () => {
    const removeEventListenerSpy = stub(window, 'removeEventListener');
    
    // Trigger the component's disconnectedCallback
    element.remove();
    
    expect(removeEventListenerSpy.called).to.be.true;
    expect(removeEventListenerSpy.firstCall.args[0]).to.equal('message');
    
    removeEventListenerSpy.restore();
  });
}); 