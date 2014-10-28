class TapesController < ApplicationController
  before_action :set_tape, only: [:show, :edit, :update, :destroy]

  def index
    @tapes = Tape.where(user_id: session[:user_id])
    render :index
  end

  def show
  end

  def new
    @tape = Tape.new
  end

  def edit
    @tape = Tape.find(params[:id])
  end

  def create
    Tape.create(name: params[:name], user_id: session[:user_id])
    tapes = Tape.where(user_id: session[:user_id])
    tape = tapes.last
     respond_to do |format|
      format.json { render :json => tape }
    end
  end

  def update
    @tape
    @tape.update(img_url: params[:img_url])
    @tape.update(receiver: params[:receiver])
    # redirect_to(edit_tape_path(@tape.id))
    render json: @tape
  end

  # DELETE /tapes/1
  # DELETE /tapes/1.json
  def destroy
    @tape.destroy
    respond_to do |format|
      format.html { redirect_to tapes_url, notice: 'Tape was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tape
      @tape = Tape.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tape_params
      params.permit(:name, :message, :reciever, :user_id, :img_url)
    end
end
