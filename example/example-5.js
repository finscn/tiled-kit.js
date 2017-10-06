var sprite2d;
var quad = [
    new PIXI.Point(0, 0),
    new PIXI.Point(game.width, 0),
    new PIXI.Point(game.width + 200 * 1.5, game.height + 100),
    new PIXI.Point(0 - 200 * 1.5, game.height + 100)
];
var tex;

function start() {

    initTiledMap("isometric_grass_and_water");

    tex = PIXI.RenderTexture.create(game.width, game.height);

    sprite2d = new PIXI.projection.Sprite2d(tex);
    // sprite2d.anchor.set(0.5);
    app.stage.addChild(sprite2d);

    mapContainer.visible = false;
}

// game.scale = 0.25;
function updateTiledMap(timeStep, now) {

    var ox = 0;
    var oy = 0;
    var viewX = game.viewX;
    var viewY = game.viewY;
    var scale = game.scale;

    ox = (Math.sin(now / 1200) - 0.2) * 200;
    oy = (Math.cos(now / 1200) + 0.5) * 200;
    viewX = game.viewX + ox;
    viewY = game.viewY + oy;
    // scale = 1 + (Math.sin(now / 800)) * 0.2;

    scaleTiledMap(scale);

    game.tileLayers.forEach(function(tileLayer) {
        tileLayer.scrollViewTo(viewX, viewY);
        tileLayer.updateTilemap(tileLayer.tilemap);
    });


    mapContainer.visible = true;
    app.renderer.render(mapContainer, tex);
    mapContainer.visible = false;

    sprite2d.position.set(0, 0);
    sprite2d.proj.mapSprite(sprite2d, quad);
}