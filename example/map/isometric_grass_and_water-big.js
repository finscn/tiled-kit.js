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
{ "height":4,
 "layers":[
        {
         "data":[9, 15, 15, 12, 14, 1, 2, 16, 14, 4, 3, 16, 10, 13, 13, 9],
         "height":4,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":4,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"isometric",
 "renderorder":"right-down",
 "tiledversion":"1.0.3",
 "tileheight":256,
 "tilesets":[
        {
         "columns":4,
         "firstgid":1,
         "image":"isometric_grass_and_water.png",
         "imageheight":2048,
         "imagewidth":2048,
         "margin":0,
         "name":"isometric_grass_and_water",
         "spacing":0,
         "tilecount":16,
         "tileheight":512,
         "tilewidth":512
        }],
 "tilewidth":512,
 "type":"map",
 "version":1,
 "width":4
});