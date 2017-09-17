var Tiled = Tiled || {};

(function(exports) {

    var TileSet = exports.TileSet = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.init();
    };

    var proto = {

        data: null,
        map: null,

        init: function() {
            var data = this.data;
            this.name = data.name;
            this.firstgid = data.firstgid;
            this.cols = data.columns;
            this.tileWidth = data.tilewidth;
            this.tileHeight = data.tileheight;
            this.tileCount = data.tilecount;
            this.imgHeight = data.imageheight;
            this.imgWidth = data.imagewidth;
            this.margin = data.margin;
            this.spacing = data.spacing;
            this.imagePath = data.image;
        },
    };

    for (var p in proto) {
        TileSet.prototype[p] = proto[p];
    }


}(Tiled));