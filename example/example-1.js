function start() {
    var baseTexture = PIXI.BaseTexture.from(ImagePool["sewer_tileset"]);
    var emptyTexture = new PIXI.Texture(baseTexture,
        new PIXI.Rectangle(154, 0, 24, 24)
    );
    initTiledMap("sewers", emptyTexture);
}

function updateTiledMap(timeStep, now) {

    var scale = game.scale;
    var viewX = game.viewX;
    var viewY = game.viewY;
    var ox = 0;
    var oy = 0;

    // scale = 1 + (Math.sin(now / 800)) * 0.2;
    scaleTiledMap(scale);

    var ox = (Math.sin(now / 1200) + 0.5) * 200;
    var oy = (Math.cos(now / 1200) + 0.5) * 200;

    viewX = game.viewX + ox;
    viewY = game.viewY + oy;

    game.tileLayers.forEach(function(tileLayer) {
        tileLayer.scrollViewTo(viewX, viewY);
        tileLayer.updateTilemap(tileLayer.tilemap);
    });
}