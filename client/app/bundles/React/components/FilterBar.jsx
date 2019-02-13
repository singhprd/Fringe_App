import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class FilterBar extends Component {
    static propTypes = {
      current_filter: PropTypes.object,
      // userSignedIn: PropTypes.bool.isRequired,
      // is_favourited: PropTypes.bool.isRequired,
    };
    constructor(props) {
      super(props);
      // this.state = {
      //   event: $.parseJSON(this.props.event),
      //   isFavourited: this.props.is_favourited,
      // };
    }
    params() {
      var filter = this.props.current_filter;
      return {
        favourites: filter.favourites,
        year: filter.year
      };
    }
    redirect(param, value) {
      var params = this.params();
      // Update the params to change the filter
      params[param] = value;
      Turbolinks.clearCache();
      Turbolinks.visit('/?' + $.param(params), {'action':'replace'});

      // window.location = '/?' + $.param(params);
    }
    isActive(param, value) {
      var params = this.params();
      if (typeof params === 'undefined') {
        return; }
      if (params[param].toString() == value) {
        return 'active';
      }
    }
    handleSearch(e) {
      e.preventDefault()

      var params = this.params()
      var merged = {...params, ...{"term": "bbc"}};
      // Update the params to change the filter
      // params[param] = value;

      var searchTerm = document.getElementById('searchInput').value


      // fetch('/home/search', {
      //   method: "POST",
      //   body: JSON.stringify(body),
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Accept": "application/json",
      //     "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
      //   },
      //   credentials: 'same-origin'
      // }).then(function(response) {
      //   // window.location.replace("/")
      //   console.log(response.status)
      //   console.log(response)
      // });
      // Turbolinks.clearCache();
      Turbolinks.visit('/?' + $.param(merged), {'action':'replace'});      
    }
    render() {
      var divStyle = {
        height: '30px',
      };
      var group1style = {
        marginRight:'5px',
      }
      return (
        <div className="btn-toolbar">
          <div className="row">
            <div className="col-sm-6">
              <div className="btn-group" role="group" style={group1style}>
                <button onClick={() => this.redirect('favourites', 'false')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('favourites', 'false'))}>All</button>
                <button onClick={() => this.redirect('favourites', 'true')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('favourites', 'true'))}>Favourites</button>
              </div>
              <div className="btn-group">
                <button onClick={() => this.redirect('year', '2015')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('year', '2015'))}>2015</button>
                <button onClick={() => this.redirect('year', '2016')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('year', '2016'))}>2016</button>
                <button onClick={() => this.redirect('year', '2017')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('year', '2017'))}>2017</button>
                <button onClick={() => this.redirect('year', '2018')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('year', '2018'))}>2018</button>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="btn-group">
              <form onSubmit={this.handleSearch.bind(this)}>
                <div className="input-group">
                  <input id="searchInput" style={divStyle} className="form-control navbar-btn btn-sm"  placeholder="Search"/>
                  <div className="input-group-btn">
                    <button id="searchInput" className="btn btn-default navbar-btn btn-sm" type="submit" style={divStyle}>
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>    
        </div>    
      );
    }
}

module.exports = FilterBar;
