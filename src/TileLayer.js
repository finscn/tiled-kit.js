var Tiled = Tiled || {};

(function(exports) {

    var Collision = exports.Collision;

    // the `view` is viewport.
    // the `screen` is not physical screen.

    var TileLayer = exports.TileLayer = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    };

    var proto = {
        constructor: TileLayer,

        data: null,
        map: null,
        viewType: null,

        mapData: null,

        x: 0,
        y: 0,
        scale: 1,

        viewX: 0,
        viewY: 0,
        offsetX: 0,
        offsetY: 0,

        name: null,
        type: null,
        visible: true,

        minScale: 0.5,
        maxScale: 2,

        minViewX: null,
        maxViewX: null,
        minViewY: null,
        maxViewY: null,

        minViewCol: 0,
        minViewRow: 0,
        maxViewCol: null,
        maxViewRow: null,

        extRows: 0,
        extCols: 0,
        extX: 0,
        extY: 0,

        originX: null,
        originY: null,

        updateCount: 0,

        scaleChanged: false,
        originChanged: false,
        viewPosChanged: false,
        scrolled: false,

        init: function() {
            this.width = this.tileWidth * this.cols;
            this.height = this.tileHeight * this.rows;

            if (this.extX && !this.extCols) {
                this.extCols = Math.ceil(this.extX / this.tileWidth);
            }
            if (this.extY && this.extRows) {
                this.extRows = Math.ceil(this.extY / this.tileHeight);
            }

            this.mapWidth = this.mapCols * this.tileWidth;
            this.mapHeight = this.mapRows * this.tileHeight;

            this.maxViewCol = this.maxViewCol === null ? this.mapCols : this.maxViewCol;
            this.maxViewRow = this.maxViewRow === null ? this.mapRows : this.maxViewRow;

            this.restoreChangedState();
            this.setOrigin(this.originX, this.originY);
            this.setScale(this.scale, true);
        },

        initCollision: function(options) {
            options = options || {};

            options.mapData = this.mapData;
            options.mapCols = this.mapCols;
            options.mapRows = this.mapRows;
            options.tileWidth = this.tileWidth;
            options.tileHeight = this.tileHeight;

            this.collision = new Collision(options);
        },

        restoreChangedState: function() {
            this.originChanged = false;
            this.scaleChanged = false;
            this.viewPosChanged = false;
            this.scrolled = false;
        },

        setOrigin: function(x, y) {
            x = x === undefined ? null : x;
            y = y === undefined ? null : y;

            this.originChanged = x !== this.originX || y !== this.originY;

            if (!this.originChanged) {
                return false;
            }
            this.originX = x;
            this.originY = y;
            return true;
        },

        // originX & originY is map system
        // tileWidthScaled & tileHeightScaled is screen system
        setScale: function(scale, force) {
            scale = Math.max(this.minScale, Math.min(this.maxScale, scale));

            this.scaleChanged = this.scale !== scale;

            if (!force && !this.scaleChanged && !this.originChanged) {
                return false;
            }

            this.tileWidthScaled = this.tileWidth * scale;
            this.tileHeightScaled = this.tileHeight * scale;

            this.viewCols = Math.ceil(this.viewWidth / this.tileWidthScaled + 1) + 1;
            this.viewRows = Math.ceil(this.viewHeight / this.tileHeightScaled + 1) + 1;

            this.viewWidthScaled = this.viewWidth / scale;
            this.viewHeightScaled = this.viewHeight / scale;

            // this.viewWidthFull = this.viewCols * this.tileWidthScaled;
            // this.viewHeightFull = this.viewRows * this.tileHeightScaled;

            var viewOriginX = this.originX === null ? 0 : this.originX - this.viewX;
            var viewOriginY = this.originY === null ? 0 : this.originY - this.viewY;

            var d = 1 - this.scale / scale;
            var ox = viewOriginX * d;
            var oy = viewOriginY * d;

            this.scale = scale;

            this.setViewPos(this.viewX + ox, this.viewY + oy, true);

            return true;
        },

        // x & y is map system
        // viewX & viewY is map system
        // viewWidth & viewHeight is map system
        // viewWidthScaled & viewWidthScaled is screen system
        setViewPos: function(x, y, force) {
            var minX = this.minViewX || 0;
            var maxX = this.maxViewX === null ? this.mapWidth - this.viewWidthScaled : this.maxViewX;

            var minY = this.minViewY || 0;
            var maxY = this.maxViewY === null ? this.mapHeight - this.viewHeightScaled : this.maxViewY;

            x = Math.max(minX, Math.min(maxX, x));
            y = Math.max(minY, Math.min(maxY, y));

            this.viewPosChanged = this.viewX !== x || this.viewY !== y;
            this.scrolled = false;

            if (!force && !this.viewPosChanged) {
                // console.log("viewX === x && viewY === y", x, y);
                return false;
            }

            var lastCol = this.viewCol;
            var lastRow = this.viewRow;

            var col = Math.floor(x / this.tileWidth);
            var row = Math.floor(y / this.tileHeight);

            if (this.extCols !== 0) {
                col = Math.max(this.minViewCol, col - this.extCols);
                this.viewCols += this.extCols + this.extCols;
            }

            if (this.extRows !== 0) {
                row = Math.max(this.minViewRow, row - this.extRows);
                this.viewRows += this.extRows + this.extRows;
            }

            this.viewEndCol = Math.min(this.maxViewCol, col + this.viewCols);
            this.viewEndRow = Math.min(this.maxViewRow, row + this.viewRows);

            this.tileOffsetX = col * this.tileWidth - x;
            this.tileOffsetY = row * this.tileHeight - y;

            this.viewX = x;
            this.viewY = y;

            this.viewCol = col;
            this.viewRow = row;

            this.scrolled = lastCol !== col || lastRow !== row;

            return true;
        },

        // dx & dy is map system
        scrollViewBy: function(dx, dy) {
            var x = this.viewX + dx;
            var y = this.viewY + dy;
            return this.setViewPos(x, y);
        },

        // x & y is view system
        viewToMap: function(x, y) {
            return {
                x: x,
                y: y
            };
        },

        // x & y is map system
        mapToView: function(x, y) {
            return {
                x: x,
                y: y
            };
        },

        // x & y is screen system
        screenToMap: function(x, y) {
            return {
                x: x / this.scale + this.viewX,
                y: y / this.scale + this.viewY
            };
        },

        // x & y is map system
        mapToScreen: function(x, y) {
            return {
                x: (x - this.viewX) * this.scale,
                y: (y - this.viewY) * this.scale
            };
        },

        // x & y is screen system
        getTileFromScreen: function(x, y) {
            x = x / this.scale + this.viewX;
            y = y / this.scale + this.viewY;
            return {
                col: Math.floor(x / this.tileWidth),
                row: Math.floor(y / this.tileHeight)
            }
        },
    };

    for (var p in proto) {
        TileLayer.prototype[p] = proto[p];
    }

}(Tiled));