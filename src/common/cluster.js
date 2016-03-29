const vec2 = {
    clone: require('gl-vec2/clone'),
    dot: require('gl-vec2/dot')
}
    /**
     * Creates a cluster for grouping similar orientations of datapoints
     */
export default {
    create: function(point, threshold) {
        var points = [],
            center = {
                rad: 0,
                vec: vec2.clone([0, 0])
            },
            pointMap = {};

        function init() {
            add(point);
            updateCenter();
        }

        function add(pointToAdd) {
            pointMap[pointToAdd.id] = pointToAdd;
            points.push(pointToAdd);
        }

        function updateCenter() {
            var i, sum = 0;
            for ( i = 0; i < points.length; i++) {
                sum += points[i].rad;
            }
            center.rad = sum / points.length;
            center.vec = vec2.clone([Math.cos(center.rad), Math.sin(center.rad)]);
        }

        init();

        return {
            add: function(pointToAdd) {
                if (!pointMap[pointToAdd.id]) {
                    add(pointToAdd);
                    updateCenter();
                }
            },
            fits: function(otherPoint) {
                // check cosine similarity to center-angle
                var similarity = Math.abs(vec2.dot(otherPoint.point.vec, center.vec));
                if (similarity > threshold) {
                    return true;
                }
                return false;
            },
            getPoints: function() {
                return points;
            },
            getCenter: function() {
                return center;
            }
        };
    },
    createPoint: function(newPoint, id, property) {
        return {
            rad: newPoint[property],
            point: newPoint,
            id: id
        };
    }
};
