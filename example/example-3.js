function start() {
    initTiledMap("isometric_grass_and_water");
}

// game.scale = 0.25;
function updateTiledMap(timeStep, now) {

    var scale = game.scale;
    var viewX = game.viewX;
    var viewY = game.viewY;
    var ox = 0;
    var oy = 0;

    // scale = 1 + (Math.sin(now / 800)) * 0.2;
    scaleTiledMap(scale);

    // var ox = (Math.sin(now / 1200) - 0.2) * 200;
    // var oy = (Math.cos(now / 1200) + 0.5) * 200;
    ox = -300;
    oy = -50;
    viewX = game.viewX + ox;
    viewY = game.viewY + oy;

    game.tileLayers.forEach(function(tileLayer) {
        tileLayer.scrollViewTo(viewX, viewY);
        tileLayer.updateTilemap(tileLayer.tilemap);
    });
}

