var Tiled = Tiled || {};

(function(exports) {

    var TileLayer = exports.TileLayer;
    var IsometricTileLayer = exports.IsometricTileLayer;
    var StaggeredTileLayer = exports.StaggeredTileLayer;
    var ObjectLayer = exports.ObjectLayer;
    var TileSet = exports.TileSet;

    var Map = exports.Map = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.init();
    };

    var proto = {

        id: null,

        data: null,

        viewWidth: 960,
        viewHeight: 640,

        width: 0,
        height: 0,
        cols: 0,
        rows: 0,
        tileWidth: 0,
        tileHeight: 0,
        tileSide: 0,

        init: function() {
            var data = this.data;
            this.cols = data.width;
            this.rows = data.height;
            this.tileWidth = data.tilewidth;
            this.tileHeight = data.tileheight;
            this.viewType = data.orientation;

            if (this.viewType === "orthogonal") {
                this.width = this.tileWidth * this.cols;
                this.height = this.tileHeight * this.rows;
            } else if (this.viewType === "isometric") {
                this.gridSize = Math.max(this.cols, this.rows);
                this.width = this.tileWidth * this.gridSize;
                this.height = this.tileHeight * this.gridSize;
            }

            var Me = this;

            this.initTileSets(data);
            // TODO:
            // this.initTerrains(data);
            this.initLayers(data);
        },

        initTileSets: function(data) {
            var Me = this;
            this.tileSetTable = {};
            this.tileSetList = [];
            this.tileTable = {};
            this.tileList = [];
            data.tilesets.forEach(function(tilesetData, idx) {
                var tileset = new TileSet({
                    map: Me,
                    data: tilesetData,
                });
                Me.tileSetTable[tileset.name] = tileset;
                Me.tileSetList[idx] = tileset;

                var first = tileset.firstgid;
                var count = tileset.tileCount;
                var col = 0;
                var row = 0;
                for (var k = first; k < first + count; k++) {
                    var id = k - 1;
                    var tileInfo = {
                        id: id,
                        tileset: tileset.name,
                        x: tileset.tileWidth * col,
                        y: tileset.tileHeight * row,
                        w: tileset.tileWidth,
                        h: tileset.tileHeight,
                    };
                    Me.tileTable[id] = tileInfo;
                    Me.tileList.push(tileInfo);

                    col++;
                    if (col >= tileset.cols) {
                        col = 0;
                        row++;
                    }
                }
            });

        },

        initLayers: function(data) {
            var Me = this;
            this.layers = [];

            this.tileLayers = [];
            this.objectLayers = [];
            this.imageLayers = [];
            this.layerGroups = [];

            data.layers.forEach(function(layerData, idx) {
                var layer;
                if (layerData.type === "tilelayer") {
                    if (Me.viewType === "orthogonal") {
                        layer = new TileLayer({
                            map: Me,
                            data: layerData,
                            tileSide: Me.tileSide,
                        });
                    } else if (Me.viewType === "isometric") {
                        layer = new IsometricTileLayer({
                            map: Me,
                            data: layerData,
                            tileSide: Me.tileSide,
                        });
                    } else if (Me.viewType === "staggered") {
                        layer = new StaggeredTileLayer({
                            map: Me,
                            data: layerData,
                            tileSide: Me.tileSide,
                        });
                    }

                    if (layer) {
                        Me.initTileLayerBaseData(layer);
                        Me.tileLayers.push(layer);
                    }
                } else if (layerData.type === "objectgroup") {
                    layer = new ObjectLayer({
                        map: Me,
                        data: layerData
                    });
                    Me.objectLayers.push(layer);
                }
                // TODO
                // Image Layer
                // Layer Group

                if (layer) {
                    Me.layers.push(layer);
                }
            });
        },

        initTileLayerBaseData: function(layer) {
            var layerData = layer.data;

            layer.rawMapData = layerData.data;

            layer.name = layerData.name;
            layer.type = layerData.type;
            layer.visible = layerData.visible !== false;
            layer.offsetX = layerData.offsetx || 0;
            layer.offsetY = layerData.offsety || 0;

            layer.cols = layerData.width;
            layer.rows = layerData.height;
            layer.col = layerData.x;
            layer.row = layerData.y;

            // var compression = layerData.compression;
            // var encoding = layerData.encoding;
            var mapData = this.arrayTo2D(layer.rawMapData, this.cols);
            layer.mapData = mapData;

            layer.mapCols = this.cols;
            layer.mapRows = this.rows;

            layer.tileWidth = this.tileWidth;
            layer.tileHeight = this.tileHeight;

            layer.viewType = this.viewType;
            layer.viewWidth = this.viewWidth;
            layer.viewHeight = this.viewHeight;
        },

        getTileLayer: function(name) {
            for (var i = 0; i < this.tileLayers.length; i++) {
                var layer = this.tileLayers[i];
                if (layer.name === name) {
                    return layer;
                }
            }
            return null;
        },

        getObjectLayer: function(name) {
            for (var i = 0; i < this.objectLayers.length; i++) {
                var layer = this.objectLayers[i];
                if (layer.name === name) {
                    return layer;
                }
            }
            return null;
        },

        // common
        getMinEven: function(n) {
            return n + (n % 2);
        },

        getMaxEven: function(n) {
            return n - (n % 2);
        },

        arrayTo2D: function(arr, cols) {
            cols = cols || 1;
            var arr2 = [];
            var rows = Math.floor((arr.length + cols) / cols) - 1;
            var r = 0,
                c = 0,
                i = 0;
            for (r = 0; r < rows; r++) {
                arr2[r] = [];
                for (c = 0; c < cols; c++) {
                    arr2[r][c] = arr[i++];
                }
            }
            return arr2;
        },
    };

    for (var p in proto) {
        Map.prototype[p] = proto[p];
    }

}(Tiled));