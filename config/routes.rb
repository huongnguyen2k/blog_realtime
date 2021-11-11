Rails.application.routes.draw do

  resources :posts do 
    resources :comments, only: [:create, :destroy]
    resources :notifications
  end
  resources :profiles
  devise_for :users
  root "static_pages#home"

  resources :rooms
  resources :messages




end
