class UsersController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate,            except: [:new, :create]
  before_action :load_user,               except: [:index, :new, :create]
  # before_action :authorize_admin_only,    only:   :index
  # before_action :authorize_user_only,     only:   :show
  before_action :authorize_user_or_admin, except: [:index, :show, :new, :create]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    current_user = session[:user_id]
    respond_to do |format|
      format.json { render :json => current_user }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @tapes = Tape.where(user_id: session[:user_id])
    user = User.find(params[:id])
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  def password
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
     if @user.save
      log_in(@user)
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
      @user.update(user_params)
      redirect_to(user_path(session[:user_id]))
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    if current_user == @user
      @user.destroy
      log_out!
      flash[:notice] = "Chao tam biet!"
      redirect_to(root_path)
    else #admin is deleting....
      @user.destroy
      redirect_to(users_path)
    end
  end

  def confirm_delete
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(
        :name,
        :email,
        :password
        )
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

    # def authorize_admin_only
    #   unless current_user.is_admin?
    #     redirect_to user_path(current_user)
    #   end
    # end

    def authorize_user_only
      unless current_user == @user
        redirect_to user_path(current_user)
      end
    end

    def authorize_user_or_admin
      unless current_user == @user || current_user.is_admin?
        redirect_to user_path(current_user)
      end
    end
end
