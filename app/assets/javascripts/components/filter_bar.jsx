var FilterBar = React.createClass({
		restore_prev_search: function() {
			window.location = "/?" + $.param( JSON.parse(document.cookie) );
		},
		params: function() {
			if (document.cookie) {
					return JSON.parse(document.cookie);
			} else {
				return {favourites: false, year: "2016"};
			}
		},
    update_filter: function(param, value) {
    	var params = this.params()
    	params[param] = value;
    	document.cookie = JSON.stringify( params )
    	window.location = "/?" + $.param( params )
    },
    is_active: function(param, value) {
  		var params = this.params()
    	if (params[param].toString() == value) {
    		return "active"
    	}
    },
    render: function() {
        return (
      	<div className="btn-toolbar">
        	<div className="btn-group">
        		<button onClick={() => this.update_filter("favourites", "false")} className={"btn btn-primary navbar-btn btn-sm " + (this.is_active("favourites", "false"))}>All</button>
        		<button onClick={() => this.update_filter("favourites", "true")} className={"btn btn-primary navbar-btn btn-sm " + (this.is_active("favourites", "true"))}>Favourites</button>
        	</div>
				
					<div className="btn-group">
        		<button onClick={() => this.update_filter("year", "2015")} className={"btn btn-primary navbar-btn btn-sm " + (this.is_active("year", "2015"))}>2015</button>
        		<button onClick={() => this.update_filter("year", "2016")} className={"btn btn-primary navbar-btn btn-sm " + (this.is_active("year", "2016"))}>2016</button>
        		<button onClick={() => this.update_filter("year", "2017")} className={"btn btn-primary navbar-btn btn-sm " + (this.is_active("year", "2017"))}>2017</button>
        	</div>
      	</div>
            );
    }
});
