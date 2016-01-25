angular.module('starter')

.factory('favoritesService', function(toastr) {
	 var _this= this;

	 _this.indexFilms= [];
	 _this.listFilms= [];

	 _this.add = function(id){
	 	if(_this.indexFilms.indexOf(id) == -1){
	 		_this.indexFilms.push(id);
	 		_this.listFilms.push({id:id,
	 							order: _this.indexFilms.length
	 		                    })
	 		toastr.success('Ha sido agregado a Favoritos');
	 	}
	 };
	 _this.find = function(id){
	 	if(_this.indexFilms.indexOf(id) == -1)
	 		return false;
	 	else 
	 		return true;
	 };

	 return _this;
});