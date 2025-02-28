import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { SecondPage } from '../src/second-page.js';

class TestSecondPage extends SecondPage {
  protected override getWindowId(): string {
    return 'test-window-id';
  }

  protected override getOrigin(): string {
    return 'http://localhost:8000';
  }
}

// Register the test component
customElements.define('test-second-page', TestSecondPage);

describe('SecondPage', () => {
  let element: TestSecondPage;
  let windowCloseSpy: ReturnType<typeof stub>;
  let openerPostMessageSpy: ReturnType<typeof stub>;

  beforeEach(async () => {
    windowCloseSpy = stub(window, 'close');
    openerPostMessageSpy = stub();
    Object.defineProperty(window, 'opener', {
      value: { postMessage: openerPostMessageSpy },
      configurable: true,
      writable: true
    });

    element = await fixture<TestSecondPage>(html`<test-second-page></test-second-page>`);
    await element.updateComplete;

    // Reset the spy after initial setup
    openerPostMessageSpy.reset();
  });

  afterEach(() => {
    if (windowCloseSpy.restore) {
      windowCloseSpy.restore();
    }
    Object.defineProperty(window, 'opener', {
      value: null,
      configurable: true,
      writable: true
    });
  });

  it('renders with default values', async () => {
    const card = element.shadowRoot!.querySelector('.card');
    expect(card).to.exist;
    expect(element.title).to.equal('Second Page');
    expect(element.windowId).to.equal('test-window-id');
  });

  it('displays window ID', async () => {
    const idElement = element.shadowRoot!.querySelector('.window-id');
    expect(idElement).to.exist;
    expect(idElement!.textContent).to.contain('test-window-id');
  });

  it('notifies parent window on ready', async () => {
    // Re-create element to trigger connectedCallback
    element = await fixture<TestSecondPage>(html`<test-second-page></test-second-page>`);
    await element.updateComplete;

    expect(openerPostMessageSpy).to.have.been.calledWith({
      type: 'WINDOW_READY',
      id: 'test-window-id',
      title: element.title
    });
  });

  it('handles close message', async () => {
    openerPostMessageSpy.reset();
    windowCloseSpy.reset();

    window.dispatchEvent(new MessageEvent('message', {
      data: {
        type: 'CLOSE_WINDOW',
        id: 'test-window-id'
      },
      origin: 'http://localhost:8000'
    }));

    expect(openerPostMessageSpy).to.have.been.calledWith({
      type: 'WINDOW_CLOSED',
      id: 'test-window-id'
    });
    expect(windowCloseSpy).to.have.been.called;
  });

  it('ignores messages with wrong ID', async () => {
    openerPostMessageSpy.reset();
    windowCloseSpy.reset();

    window.dispatchEvent(new MessageEvent('message', {
      data: {
        type: 'CLOSE_WINDOW',
        id: 'wrong-id'
      },
      origin: 'http://localhost:8000'
    }));

    expect(openerPostMessageSpy).not.to.have.been.called;
    expect(windowCloseSpy).not.to.have.been.called;
  });

  it('ignores messages from wrong origin', async () => {
    openerPostMessageSpy.reset();
    windowCloseSpy.reset();

    window.dispatchEvent(new MessageEvent('message', {
      data: {
        type: 'CLOSE_WINDOW',
        id: 'test-window-id'
      },
      origin: 'https://wrong-origin.com'
    }));

    expect(openerPostMessageSpy).not.to.have.been.called;
    expect(windowCloseSpy).not.to.have.been.called;
  });

  it('removes event listener on disconnect', async () => {
    const removeEventListenerSpy = stub(window, 'removeEventListener');
    
    element.remove();
    
    expect(removeEventListenerSpy).to.have.been.calledWith('message');
    removeEventListenerSpy.restore();
  });
}); 