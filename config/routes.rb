Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'top#index'

  # 四択問題のroutes
  get  "multiplechoicequestions/index"  => "multiple_choice_questions#index"
  get  "multiplechoicequestions/start"  => "multiple_choice_questions#Start"

  # 単語学習機能のroutes
  resources :study
end
