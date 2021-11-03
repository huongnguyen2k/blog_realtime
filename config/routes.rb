Rails.application.routes.draw do

  resources :posts
  resources :profiles
  devise_for :users
  root "static_pages#home"

  resources :rooms
  resources :messages

end
