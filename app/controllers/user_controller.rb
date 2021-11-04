class UsersController < ApplicationController
    before_action :authenticate_user!
  
    layout 'users'
    def index
      @users = User.all
    end
    def show
      @users = User.find_by_id(params[:id])
    end
  end