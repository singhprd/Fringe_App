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
    render() {
      return (
        <div className="btn-toolbar">
          <div className="btn-group">
            <button onClick={() => this.redirect('favourites', 'false')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('favourites', 'false'))}>All
            </button>
            <button onClick={() => this.redirect('favourites', 'true')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('favourites', 'true'))}>Favourites</button>
          </div>
          <div className="btn-group">
            <button onClick={() => this.redirect('year', '2015')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('year', '2015'))}>2015</button>
            <button onClick={() => this.redirect('year', '2016')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('year', '2016'))}>2016</button>
            <button onClick={() => this.redirect('year', '2017')} className={'btn btn-primary navbar-btn btn-sm ' + (this.isActive('year', '2017'))}>2017</button>
          </div>
        </div>
      );
    }
}

module.exports = FilterBar;
