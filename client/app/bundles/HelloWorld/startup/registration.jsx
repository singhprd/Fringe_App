import ReactOnRails from 'react-on-rails';
import HelloWorld from '../components/HelloWorld';
import FilterBar from '../components/FilterBar';
import List from '../components/List';

var EventCard = require('../components/EventCard');
var MultiSelectField = require('../components/MultiSelectField');
var Turbolinks = require("turbolinks");

Turbolinks.start();

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  FilterBar,
  EventCard,
  List,
  MultiSelectField,
});
