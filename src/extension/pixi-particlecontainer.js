var Tiled = Tiled || {};

// pixi-particlecontainer

(function(exports) {

    var plugin = {
        name: "pixi-particlecontainer"
    };
    Tiled.Plugins[plugin.name] = plugin;

    plugin.Map = {};
    plugin.OrthogonalTileLayer = {};
    plugin.IsometricTileLayer = {};
    plugin.StaggeredTileLayer = {};

    // `imgLoader` is a function that load img object by `tileset.name , tileset.image`
    plugin.Map.createTileTextures = function(imgLoader) {
        var baseTextureTable = {};

        for (var i = 0, len = this.tilesetList.length; i < len; i++) {
            var tileset = this.tilesetList[i];
            var name = tileset.name;
            var image = tileset.image;
            var baseTexture;
            if (typeof imgLoader === 'function') {
                baseTexture = PIXI.BaseTexture.from(imgLoader(name, image));
            } else {
                baseTexture = PIXI.BaseTexture.from(image);
            }
            baseTextureTable[name] = baseTexture;
        }

        var tileTextures = [];

        for (var i = 0, len = this.tileList.length; i < len; i++) {
            var t = this.tileList[i];
            var baseTexture = baseTextureTable[t.tileset];
            var texture = new PIXI.Texture(baseTexture,
                new PIXI.Rectangle(t.x, t.y, t.w, t.h)
            );
            tileTextures.push(texture);
        }

        return tileTextures;
    };

    plugin.Map.createTilemap = function(tileTextures, texPerChild, emptyTexture) {
        // var tilemap = new PIXI.Container();
        var tilemap = new PIXI.particles.ParticleContainer(3000, {
            scale: true,
            position: true,
            rotation: false,
            uvs: true,
            alpha: false
        });
        tilemap.tileTextures = tileTextures;
        tilemap.emptyTexture = emptyTexture || PIXI.Texture.EMPTY;

        if (this.updateTilemap) {
            this.updateTilemap(tilemap);
        }

        return tilemap;
    };

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    var createTilemap = plugin.Map.createTilemap;

    var getTileSprite = function(tilemap, col, row) {
        this.tileSprites = this.tileSprites || {}
        var placeHolder = tilemap.tileTextures[0];
        var sprite = this.tileSprites[col + ',' + row];
        if (!sprite) {
            sprite = new PIXI.Sprite(placeHolder);
            this.tileSprites[col + ',' + row] = sprite;
            tilemap.addChild(sprite);
        }
        return sprite;
    };

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////


    plugin.OrthogonalTileLayer.createTilemap = createTilemap;
    plugin.OrthogonalTileLayer.getTileSprite = getTileSprite;

    plugin.OrthogonalTileLayer.updateTilemap = function(tilemap) {
        var scale = this.scale;

        var pivotX, pivotY;
        var viewOriginX, viewOriginY;
        var x, y;

        if (this.originX === null) {
            pivotX = this.viewX;
            viewOriginX = x = 0;
        } else {
            pivotX = this.originX;
            viewOriginX = this.originX - this.viewX;
            x = viewOriginX * scale;
        }

        if (this.originY === null) {
            pivotY = this.viewY;
            viewOriginY = y = 0;
        } else {
            pivotY = this.originY;
            viewOriginY = this.originY - this.viewY;
            y = viewOriginY * scale;
        }

        tilemap.opacity = this.opacity;
        tilemap.pivot.set(pivotX, pivotY);
        tilemap.position.set(x, y);
        tilemap.scale.set(scale, scale);

        var changed = this.scaleChanged || this.originChanged || this.scrolled;
        if (changed || this.updateCount === 0) {

            var tileWidth = this.tileWidth;
            var tileHeight = this.tileHeight;
            var mapData = this.mapData;
            var tileTable = this.map.tileTable;

            var startRow = this.viewRow;
            var endRow = this.viewEndRow;
            var startCol = this.viewCol;
            var endCol = this.viewEndCol;

            for (var r = startRow; r < endRow; r++) {
                var rowData = this.getRowData(mapData, r);
                for (var c = startCol; c < endCol; c++) {
                    var sprite = this.getTileSprite(tilemap, c - startCol, r - startRow);
                    if (!rowData) {
                        if (tilemap.emptyTexture) {
                            sprite.texture = tilemap.emptyTexture;
                        }
                        continue;
                    }
                    var gid = this.getColData(rowData, c);
                    if (!gid) {
                        if (tilemap.emptyTexture) {
                            sprite.texture = tilemap.emptyTexture;
                        }
                        continue;
                    }
                    var tileIndex = gid - 1;
                    var x = c * tileWidth;
                    var y = r * tileHeight;
                    var t = tileTable[gid];
                    // console.log(tileIndex, tilemap.tileTextures)
                    var texture = tilemap.tileTextures[tileIndex];
                    sprite.texture = texture;
                    sprite.position.set(x + t.ox, y + t.oy);
                }
            }
        }
        this.updateCount++;
        this.restoreChangedState();
    };





    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    plugin.IsometricTileLayer.createTilemap = createTilemap;
    plugin.IsometricTileLayer.getTileSprite = getTileSprite;

    plugin.IsometricTileLayer.updateTilemap = function(tilemap) {
        var scale = this.scale;

        var pivotX, pivotY;
        var viewOriginX, viewOriginY;
        var x, y;

        if (this.originX === null) {
            pivotX = this.viewX;
            viewOriginX = x = 0;
        } else {
            pivotX = this.originX;
            viewOriginX = this.originX - this.viewX;
            x = viewOriginX * scale;
        }

        if (this.originY === null) {
            pivotY = this.viewY;
            viewOriginY = y = 0;
        } else {
            pivotY = this.originY;
            viewOriginY = this.originY - this.viewY;
            y = viewOriginY * scale;
        }

        tilemap.opacity = this.opacity;
        tilemap.pivot.set(pivotX, pivotY);
        tilemap.position.set(x, y);
        tilemap.scale.set(scale, scale);

        var changed = this.scaleChanged || this.originChanged || this.scrolled;
        if (changed || this.updateCount === 0) {

            var tileWidth = this.tileWidth;
            var tileHeight = this.tileHeight;
            var halfTileWidth = this.halfTileWidth;
            var halfTileHeight = this.halfTileHeight;

            var mapData = this.mapData;
            var tileTable = this.map.tileTable;

            var startRow = this.viewRow;
            var endRow = this.viewEndRow;
            var startCol = this.viewCol;
            var endCol = this.viewEndCol;

            var dataCol = Math.ceil((startCol * 2 + startRow) / 2);
            var dataRow = startRow - dataCol;
            var evenRow = startRow % 2 === 0;

            for (var r = startRow; r < endRow; r++) {
                var col = dataCol;
                var row = dataRow;
                var offsetX = evenRow ? -halfTileWidth : 0;
                for (var c = startCol; c < endCol; c++) {
                    var sprite = this.getTileSprite(tilemap, c - startCol, r - startRow);
                    var rowData = this.getRowData(mapData, row);
                    if (rowData) {
                        var gid = this.getColData(rowData, col);
                        if (gid) {
                            var tileIndex = gid - 1;
                            var x = c * tileWidth + offsetX;
                            var y = r * halfTileHeight;
                            var t = tileTable[gid];

                            var texture = tilemap.tileTextures[tileIndex];
                            sprite.texture = texture;
                            sprite.position.set(x + t.ox, y + t.oy);
                        } else if (tilemap.emptyTexture) {
                            sprite.texture = tilemap.emptyTexture;
                        }
                    } else {
                        if (tilemap.emptyTexture) {
                            sprite.texture = tilemap.emptyTexture;
                        }
                    }
                    col++;
                    row--;
                }

                if (evenRow) {
                    dataCol++;
                } else {
                    dataRow++;
                }
                evenRow = !evenRow;
            }
        }

        this.updateCount++;
        this.restoreChangedState();
    };



    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    plugin.StaggeredTileLayer.createTilemap = createTilemap;
    plugin.StaggeredTileLayer.getTileSprite = getTileSprite;

    plugin.StaggeredTileLayer.updateTilemap = function(tilemap) {
        var scale = this.scale;

        var pivotX, pivotY;
        var viewOriginX, viewOriginY;
        var x, y;

        if (this.originX === null) {
            pivotX = this.viewX;
            viewOriginX = x = 0;
        } else {
            pivotX = this.originX;
            viewOriginX = this.originX - this.viewX;
            x = viewOriginX * scale;
        }

        if (this.originY === null) {
            pivotY = this.viewY;
            viewOriginY = y = 0;
        } else {
            pivotY = this.originY;
            viewOriginY = this.originY - this.viewY;
            y = viewOriginY * scale;
        }

        tilemap.opacity = this.opacity;
        tilemap.pivot.set(pivotX, pivotY);
        tilemap.position.set(x, y);
        tilemap.scale.set(scale, scale);

        var changed = this.scaleChanged || this.originChanged || this.scrolled;
        if (changed || this.updateCount === 0) {

            var tileWidth = this.tileWidth;
            var tileHeight = this.tileHeight;
            var halfTileWidth = this.halfTileWidth;
            var halfTileHeight = this.halfTileHeight;
            var mapData = this.mapData;
            var tileTable = this.map.tileTable;

            var startRow = this.viewRow;
            var endRow = this.viewEndRow;
            var startCol = this.viewCol;
            var endCol = this.viewEndCol;

            var evenRow = startRow % 2 === 0;

            for (var r = startRow; r < endRow; r++) {
                var offsetX = evenRow ? -halfTileWidth : 0;
                var rowData = this.getRowData(mapData, r);
                for (var c = startCol; c < endCol; c++) {
                    var sprite = this.getTileSprite(tilemap, c - startCol, r - startRow);
                    if (!rowData) {
                        if (tilemap.emptyTexture) {
                            sprite.texture = tilemap.emptyTexture;
                        }
                        continue;
                    }
                    var gid = this.getColData(rowData, c);
                    if (!gid) {
                        if (tilemap.emptyTexture) {
                            sprite.texture = tilemap.emptyTexture;
                        }
                        continue;
                    }
                    var tileIndex = gid - 1;
                    var x = c * tileWidth + offsetX;
                    var y = r * halfTileHeight;
                    var t = tileTable[gid];

                    var texture = tilemap.tileTextures[tileIndex];
                    sprite.texture = texture;
                    sprite.position.set(x + t.ox, y + t.oy);
                }
                evenRow = !evenRow;
            }
        }

        this.updateCount++;
        this.restoreChangedState();
    };

}(Tiled));
