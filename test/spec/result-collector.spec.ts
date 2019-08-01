import sinon from 'sinon';

import { ResultCollector, ResultCollectorConfig } from '../../src/analytics/result-collector';
import { ImageDebug } from '../../src/common/image-debug';

describe('ResultCollector', () => {
    let imageWidth: number;
    let imageHeight: number;
    let config: ResultCollectorConfig;
    let createElementStub: sinon.SinonStub;
    let drawImageStub: sinon.SinonStub;

    beforeEach(() => {
        imageWidth = 320;
        imageHeight = 240;
        config = {
            capture: true,
            capacity: 20,
            blacklist: [{ code: '3574660239843', format: 'ean_13' }],
            filter: () => {
                return true;
            }
        };
        const canvasMock = {
            getContext: () => {
                return {};
            },
            toDataURL: sinon.spy(),
            width: 0,
            height: 0
        } as unknown as HTMLCanvasElement;
        createElementStub = sinon.stub(document, 'createElement').callsFake(type => {
            if (type === 'canvas') {
                return canvasMock;
            }
            return null;
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('constructor', () => {
        it('should return a new collector', () => {
            const collector = new ResultCollector(config);
            expect(createElementStub.calledOnce).to.equal(true);
            expect(createElementStub.getCall(0).args[0]).to.equal('canvas');
        });
    });

    describe('addResult', () => {
        beforeEach(() => {
            drawImageStub = sinon.stub(ImageDebug, 'drawImage').callsFake(() => true);
        });

        afterEach(() => {
            drawImageStub.restore();
        });

        it('should not add result if capacity is full', () => {
            config.capacity = 1;
            const collector = new ResultCollector(config);
            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '423423443',
                format: 'ean_13'
            });
            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '423423443',
                format: 'ean_13'
            });
            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '423423443',
                format: 'ean_13'
            });
            expect(collector.getResults()).to.have.length(1);
        });

        it('should only add results which match constraints', () => {
            const collector = new ResultCollector(config);

            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '423423443',
                format: 'ean_13'
            });
            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '3574660239843',
                format: 'ean_13'
            });
            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '3574660239843',
                format: 'code_128'
            });

            const results = collector.getResults();
            expect(results).to.have.length(2);

            results.forEach(result => {
                expect(result).not.to.deep.equal(config.blacklist[0]);
            });
        });

        it('should add result if no filter is set', () => {
            delete config.filter;
            const collector = new ResultCollector(config);

            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '423423443',
                format: 'ean_13'
            });
            expect(collector.getResults()).to.have.length(1);
        });

        it('should not add results if filter returns false', () => {
            config.filter = () => false;
            const collector = new ResultCollector(config);

            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '423423443',
                format: 'ean_13'
            });
            expect(collector.getResults()).to.have.length(0);
        });

        it('should add result if no blacklist is set', () => {
            delete config.blacklist;
            const collector = new ResultCollector(config);

            collector.addResult(new Uint8Array(), imageWidth, imageHeight, {
                code: '3574660239843',
                format: 'ean_13'
            });
            expect(collector.getResults()).to.have.length(1);
        });
    });
});
