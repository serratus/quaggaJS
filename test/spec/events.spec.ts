import sinon from 'sinon';

import { Events } from '../../src/common/events';

beforeEach(() => {
    Events.unsubscribe();
});
describe('subscribe', () => {
    it('should call one callback for a single event', () => {
        const callbackA = sinon.stub();
        const callbackB = sinon.stub();

        Events.subscribe('test', callbackA);
        Events.subscribe('test', callbackB);
        Events.publish('test');

        expect(callbackA.calledOnce).to.equal(true);
        expect(callbackB.calledOnce).to.equal(true);
    });

    it('should call one callback twice if published twice', () => {
        const callback = sinon.stub();

        Events.subscribe('test', callback);

        Events.publish('test');
        Events.publish('test');

        expect(callback.calledTwice).to.equal(true);
    });

    it('should call the callback asynchronuously', function (done) {
        const test = {
            callback: () => { }
        };

        const callbackStub = sinon.stub(test, 'callback').callsFake(() => {
            expect(callbackStub.calledOnce).to.equal(true);
            done();
        });
        Events.subscribe('test', test.callback, true);
        Events.publish('test');
        expect(callbackStub.called).to.equal(false);
    });
});

describe('once', () => {
    it('should call the callback once, even when published twice', () => {
        const callbackA = sinon.stub();
        const callbackB = sinon.stub();

        Events.once('test', callbackA);
        Events.subscribe('test', callbackB);

        Events.publish('test');
        Events.publish('test');

        expect(callbackA.calledOnce).to.equal(true);
        expect(callbackB.calledTwice).to.equal(true);
    });
});

describe('unsubscribe', () => {
    it('should unsubscribe all callbacks from a single event', () => {
        const callbackA = sinon.stub();
        const callbackB = sinon.stub();
        const callbackC = sinon.stub();

        Events.subscribe('test', callbackA);
        Events.subscribe('test', callbackB);
        Events.subscribe('testC', callbackC);

        Events.publish('test');

        expect(callbackC.called).to.equal(false);
        expect(callbackA.calledOnce).to.equal(true);
        expect(callbackB.calledOnce).to.equal(true);

        Events.publish('testC');

        expect(callbackC.calledOnce).to.equal(true);
        expect(callbackA.calledOnce).to.equal(true);
        expect(callbackB.calledOnce).to.equal(true);

        Events.unsubscribe('test');
        Events.publish('test');

        expect(callbackC.calledOnce).to.equal(true);
        expect(callbackA.calledOnce).to.equal(true);
        expect(callbackB.calledOnce).to.equal(true);
    });

    it('should unsubscribe a single callback from a single event', () => {
        const callbackA = sinon.stub();
        const callbackB = sinon.stub();

        Events.subscribe('test', callbackA);
        Events.subscribe('test', callbackB);

        Events.publish('test');

        expect(callbackA.calledOnce).to.equal(true);
        expect(callbackB.calledOnce).to.equal(true);

        Events.unsubscribe('test', callbackB);
        Events.publish('test');

        expect(callbackA.calledTwice).to.equal(true);
        expect(callbackB.calledOnce).to.equal(true);
    });
});
