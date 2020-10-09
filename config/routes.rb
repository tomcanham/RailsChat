Rails.application.routes.draw do
  root to: 'home#index'
  resources :rooms, only: [:index, :show]
  resources :messages, only: [:index, :create]
  resources :users, only: [:index, :create]
  mount ActionCable.server => '/cable'
end
