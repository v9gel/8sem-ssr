Rails.application.routes.draw do
  root 'projects#index'
  get '/admin' => 'projects#admin'
  get 'projects/:id/edit' => 'projects#edit'
  get 'projects/:id/delete' => 'projects#delete'
  get 'projects/new' => 'projects#new'
  get 'projects/:id' => 'projects#show'
end
