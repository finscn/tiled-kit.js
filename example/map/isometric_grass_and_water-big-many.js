(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("isometric_grass_and_water",
{ "height":10,
 "layers":[
        {
         "data":[317, 376, 376, 9, 376, 376, 376, 376, 376, 334, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 304, 304, 304, 304, 304, 304, 368, 376, 1, 376, 304, 380, 380, 380, 375, 304, 368, 376, 376, 376, 304, 380, 380, 380, 375, 304, 376, 376, 376, 376, 304, 380, 380, 380, 375, 304, 376, 376, 376, 376, 304, 380, 380, 380, 375, 304, 376, 109, 376, 376, 353, 353, 304, 304, 304, 304, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 336, 376, 376, 376, 376, 376, 97, 376, 376, 311],
         "height":10,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"isometric",
 "renderorder":"right-down",
 "tiledversion":"1.0.3",
 "tileheight":32,
 "tilesets":[
        {
         "columns":16,
         "firstgid":1,
         "image":"isometric_grass_and_water.png",
         "imageheight":1536,
         "imagewidth":1024,
         "margin":0,
         "name":"isometric_grass_and_water",
         "spacing":0,
         "tilecount":384,
         "tileheight":64,
         "tilewidth":64
        }],
 "tilewidth":64,
 "type":"map",
 "version":1,
 "width":10
});