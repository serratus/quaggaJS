export default {
    drawRect: function(pos, size, ctx, style){
        ctx.strokeStyle = style.color;
        ctx.fillStyle = style.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeRect(pos.x, pos.y, size.x, size.y);
    },
    drawPath: function(path, def, ctx, style) {
        ctx.strokeStyle = style.color;
        ctx.fillStyle = style.color;
        ctx.lineWidth = style.lineWidth;
        ctx.beginPath();
        ctx.moveTo(path[0][def.x], path[0][def.y]);
        for (var j = 1; j < path.length; j++) {
            ctx.lineTo(path[j][def.x], path[j][def.y]);
        }
        ctx.stroke();
    },
    drawVertex: function(vertex, def, ctx) {
        ctx.beginPath();
        ctx.moveTo(vertex[def.x]-2, vertex[def.y]-2);
        ctx.lineTo(vertex[def.x]+2, vertex[def.y]+2);
        ctx.moveTo(vertex[def.x]-2, vertex[def.y]+2);
        ctx.lineTo(vertex[def.x]+2, vertex[def.y]-2);
        ctx.stroke();
    },
    drawVertices: function(vertices, def, ctx, style) {
        ctx.strokeStyle = style.color;
        ctx.fillStyle = style.color;
        ctx.lineWidth = style.lineWidth;
        vertices.forEach((vertex) => {
            this.drawVertex(vertex, def, ctx);
        });
    },
    drawImage: function(imageData, size, ctx) {
        var canvasData = ctx.getImageData(0, 0, size.x, size.y),
            data = canvasData.data,
            imageDataPos = imageData.length,
            canvasDataPos = data.length,
            value;

        if (canvasDataPos / imageDataPos !== 4) {
            return false;
        }
        while (imageDataPos--){
            value = imageData[imageDataPos];
            data[--canvasDataPos] = 255;
            data[--canvasDataPos] = value;
            data[--canvasDataPos] = value;
            data[--canvasDataPos] = value;
        }
        ctx.putImageData(canvasData, 0, 0);
        return true;
    }
};
