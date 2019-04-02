(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("sewers",
{ "height":16,
 "infinite":false,
 "layers":[
        {
         "data":[13, 14, 34, 34, 12, 13, 14, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 33, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 34, 34, 12, 13, 14, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 33, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 34, 34, 12, 13, 14, 34, 35, 28, 28, 33, 12, 13, 14, 36, 42, 37, 37, 42, 38, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 34, 34, 20, 2, 22, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 33, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 34, 34, 9, 10, 11, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 33, 20, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 14, 34, 34, 17, 18, 19, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 33, 9, 10, 10, 10, 10, 10, 10, 39, 10, 10, 10, 13, 14, 34, 34, 34, 34, 34, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 33, 17, 18, 18, 18, 18, 40, 18, 18, 18, 18, 18, 13, 14, 34, 34, 34, 34, 34, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 13, 14, 34, 34, 12, 13, 14, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 13, 14, 34, 34, 12, 13, 14, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 25, 26, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 13, 14, 34, 34, 12, 13, 14, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 33, 34, 35, 28, 28, 28, 28, 28, 28, 28, 28, 28, 2, 22, 34, 34, 20, 2, 22, 34, 35, 28, 28, 33, 12, 13, 14, 35, 28, 28, 28, 28, 41, 42, 43, 28, 28, 28, 28, 28, 28, 28, 28, 28, 10, 11, 34, 34, 9, 10, 11, 34, 35, 28, 28, 33, 20, 2, 22, 35, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 18, 19, 34, 34, 17, 18, 19, 34, 35, 28, 28, 33, 9, 10, 11, 35, 28, 28, 28, 28, 25, 26, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 34, 34, 34, 34, 34, 34, 34, 34, 35, 28, 28, 33, 17, 70, 19, 35, 28, 28, 28, 28, 33, 34, 35, 28, 28, 28, 28, 28, 28, 28, 28, 28, 42, 42, 42, 42, 42, 42, 42, 42, 43, 28, 28, 41, 42, 42, 42, 43, 28, 28, 28, 28, 41, 42, 43, 28, 28, 28, 28, 28, 28, 28, 28, 28],
         "height":16,
         "id":13,
         "name":"Bottom",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":32,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":16,
         "id":14,
         "name":"Top",
         "opacity":0.49,
         "type":"tilelayer",
         "visible":true,
         "width":32,
         "x":0,
         "y":0
        }],
 "nextlayerid":15,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.2.3",
 "tileheight":24,
 "tilesets":[
        {
         "columns":8,
         "firstgid":1,
         "image":"..\/..\/..\/..\/..\/..\/..\/Applications\/Tiled-examples\/sewer_tileset.png",
         "imageheight":217,
         "imagewidth":192,
         "margin":0,
         "name":"sewer_tileset",
         "spacing":0,
         "tilecount":72,
         "tileheight":24,
         "tilewidth":24,
         "transparentcolor":"#ff00ff"
        }],
 "tilewidth":24,
 "type":"map",
 "version":1.2,
 "width":32
});