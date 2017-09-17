var Tiled = Tiled || {};

(function(exports) {

    var Collision = exports.Collision;
    var TileLayer = exports.TileLayer;
    var IsometricTileLayer = exports.IsometricTileLayer;

    // the `view` is viewport.
    // the `screen` is not physical screen.

    var StaggeredTileLayer = exports.StaggeredTileLayer = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    };

    var proto = {
        constructor: StaggeredTileLayer,

        // x & y is view system
        viewToMap: function(x, y) {
            x = x;
            y = y / this.viewScaleY;
            return {
                x: x,
                y: y
            };
        },

        // x & y is map system
        mapToView: function(x, y) {
            x = x;
            y = y * this.viewScaleY;
            return {
                x: x,
                y: y
            };
        },

        // x & y is screen system
        screenToMap: function(x, y) {
            x = x / this.scale + this.viewX;
            y = (y / this.scale + this.viewY) / this.viewScaleY;
            return {
                x: x,
                y: y
            };
        },

        // x & y is map system
        mapToScreen: function(x, y) {
            x = (x - this.viewX) * this.scale;
            y = (y * this.viewScaleY - this.viewY) * this.scale;
            return {
                x: x,
                y: y
            };
        },

        // x & y is screen system
        getTileFromScreen: function(x, y) {
            x = (x - this.halfTileWidth) / this.scale + this.viewX;
            y = (y / this.scale + this.viewY) / this.viewScaleY;

            var newX = x * this.cos + y * this.sin;
            var newY = -x * this.sin + y * this.cos;

            var col = Math.floor(newX / this.tileSide);
            var row = Math.floor(newY / this.tileSide);

            var newCol = Math.floor((col - row) / 2);
            var newRow = col + row;
            return {
                col: newCol,
                row: newRow
            };
        },

    };

    for (var p in IsometricTileLayer.prototype) {
        StaggeredTileLayer.prototype[p] = IsometricTileLayer.prototype[p];
    }

    for (var p in proto) {
        StaggeredTileLayer.prototype[p] = proto[p];
    }

}(Tiled));