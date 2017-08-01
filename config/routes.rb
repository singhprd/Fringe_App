Rails.application.routes.draw do
  resources :lists
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'hello_world', to: 'hello_world#index'
  resources :favourites
  resources :venues
  resources :votes
  resources :reviews
  resources :searches
  resources :performances
  resources :events

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'search' => 'search#index' 
  get 'search/results' => 'search#do_search' 

  root 'home#welcome'

  get '/events/:id/is_favourited' => 'events#is_favourited'
  get '/admin/panel' => 'admin#panel'
  get '/events/:id/votes' => 'events#votes'
  get '/events/:id/performances' => 'events#performances'

  post '/lists/swap_items' => 'lists#swap_items'

  # resources :search
  devise_for :users, controllers: { sessions: 'users/sessions' }

end
