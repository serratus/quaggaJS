import ImageDebug from '../common/image_debug';

function contains(codeResult, list) {
    if (list) {
        return list.some(function (item) {
            return Object.keys(item).every(function (key) {
                return item[key] === codeResult[key];
            });
        });
    }
    return false;
}

function passesFilter(codeResult, filter) {
    if (typeof filter === 'function') {
        return filter(codeResult);
    }
    return true;
}

export default {
    create: function(config) {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            results = [],
            capacity = config.capacity || 20,
            capture = config.capture === true;

        function matchesConstraints(codeResult) {
            return capacity
                && codeResult
                && !contains(codeResult, config.blacklist)
                && passesFilter(codeResult, config.filter);
        }

        return {
            addResult: function(data, imageSize, codeResult) {
                var result = {};

                if (matchesConstraints(codeResult)) {
                    capacity--;
                    result.codeResult = codeResult;
                    if (capture) {
                        canvas.width = imageSize.x;
                        canvas.height = imageSize.y;
                        ImageDebug.drawImage(data, imageSize, ctx);
                        result.frame = canvas.toDataURL();
                    }
                    results.push(result);
                }
            },
            getResults: function() {
                return results;
            }
        };
    }
};
