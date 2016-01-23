class UsersController < ApplicationController
  before_action :authenticate,            except: [:new, :create]
  before_action :load_user,               except: [:index, :new, :create]
  before_action :authorize_user,          except: [:new, :create]


  def index
    @users = User.all
    current_user = session[:user_id]
    respond_to do |format|
      format.json { render :json => current_user }
    end
  end

  def show
    @tapes = Tape.where(user_id: session[:user_id])
    @user = User.find(params[:id])
  end


  def new
    @user = User.new
  end


  def password
  end

  def create
    @user = User.new(user_params)
     if @user.save
      log_in(@user)
      redirect_to user_path(@user)
    else
      render :new
    end
  end


  def update
      if params[:user] != nil
      @user.update(user_params)
      redirect_to(user_path(@user.id))
    else
      user = {
        name: params[:name],
        city: params[:city],
        twitter: params[:twitter]
      }
      @user.update(user)
      render :json => @user
    end
  end


  def destroy
    if current_user == @user
      @user.destroy
      log_out!

      redirect_to(root_path)
    else
      @user.destroy
      redirect_to(users_path)
    end
  end

  def confirm_delete
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :password, :city, :twitter, :avatar)
    end

    def user_password_params
      @user_password_params ||= params.require(:user).permit(
        :old_password,
        :password,
        :password_confirmation
        )
    end

    def load_user
      @user = User.find_by(id: params[:id])
      redirect_to root_path if !@user
    end

    def authorize_user
      unless current_user == @user
        redirect_to user_path(current_user)
      end
    end
end
