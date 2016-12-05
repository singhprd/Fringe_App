Rails.application.routes.draw do
  mount Commontator::Engine => '/commontator'
  resources :venues
  resources :votes
  devise_for :users
  resources :reviews
  resources :searches
  resources :performances
  resources :events

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  post 'search' => 'search#do_search'
  # get 'search' => 'search#index'
  root 'home#welcome'

  resources :search


end
