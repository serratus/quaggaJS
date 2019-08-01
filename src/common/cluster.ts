import { Moment } from './moment';


/**
 * Creates a cluster for grouping similar orientations of moments
 */
export class Cluster {
    private _threshold: number;
    private _moments: Array<Moment>;
    private _center: Moment;

    static clusterize(moments: Array<Moment>, threshold: number): Array<Cluster> {
        const clusters = new Array<Cluster>();

        moments.forEach(moment => {
            const matchingCluster = clusters.find(cluster => cluster.fits(moment));

            if (matchingCluster) {
                matchingCluster.add(moment);
            } else {
                clusters.push(new Cluster(threshold, moment));
            }
        });

        return clusters;
    }

    constructor(threshold: number, moment: Moment) {
        this._threshold = threshold;
        this._moments = new Array<Moment>();
        this._center = {
            rad: 0,
            x: 0,
            y: 0
        };

        if (moment) {
            this.add(moment);
        }
    }

    add(point: Moment) {
        this._moments.push(point);

        // Update center
        this._center.rad = this._moments.reduce((sum, p) => sum + p.rad, 0) / this._moments.length;
        this._center.x = Math.cos(this._center.rad);
        this._center.y = Math.sin(this._center.rad);
    }

    fits(moment: Moment): boolean {
        // check cosine similarity to center-angle
        const similarity = Math.abs(moment.x * this._center.x + moment.y * this._center.y);
        return similarity > this._threshold;
    }

    get moments() {
        return this._moments;
    }
}
