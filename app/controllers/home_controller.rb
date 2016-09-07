class HomeController < ApplicationController
  # GET /
  def welcome
    # render json: "welcome home"
    @events = Event.all
  end
end
