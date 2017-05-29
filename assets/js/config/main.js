var require = {
baseUrl: "../../../",
paths:{
"bootstrap": "node_modules/bootstrap/dist/js/bootstrap",
"crossroads": "node_modules/crossroads/dist/crossroads",
"jquery": "assets/js/lib/jquery",
"knockout": "assets/js/lib/knockout",
"knockout-projections": "assets/js/lib/knockout-projections",
"signals": "node_modules/signals/dist/signals",
"hasher": "node_modules/hasher/dist/js/hasher",
"text": "assets/js/lib/text"
},
shim: {
"bootstrap": {
deps: ["jquery"]
}
}
}
