Rails.application.routes.draw do
  resources :searches
  resources :performances
  resources :events
  resources :search
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#welcome'

  post "search#go", to: "search#do_search"
end
