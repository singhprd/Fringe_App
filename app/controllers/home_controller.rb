class HomeController < ApplicationController
  # GET /
  def welcome
    @events = Event.all.order(score: :desc).page(params[:page]).per(5)
  end
end
