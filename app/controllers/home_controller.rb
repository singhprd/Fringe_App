class HomeController < ApplicationController
  # GET /
  def welcome
    @events = Event.all.order(score: :desc)
  end
end
