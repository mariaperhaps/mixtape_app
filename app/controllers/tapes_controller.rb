class TapesController < ApplicationController
  before_action :set_tape, only: [:show, :edit, :update, :destroy]
  before_action :authenticate,  except: [:show]

  def index
    @tapes = Tape.where(user_id: session[:user_id])
    render :json => @tapes
  end

  def show
    @tape = Tape.find(params[:id])
    @songs = Song.where(tape_id: params[:id]).order(id: :asc)
  end

  def new
    @tape = Tape.new
  end

  def edit
    @tape = Tape.find(params[:id])
  end

  def create
    @tape = Tape.create(name: params[:name], user_id: session[:user_id], receiver: params[:receiver], message: params[:message])
    render :json => @tape
  end

  def update
    @tape
    @tape.update(tape_params)
    render json: @tape
  end


  def destroy
    @tape.destroy
  end

  private
    def set_tape
      @tape = Tape.find(params[:id])
    end

    def tape_params
      params.permit(:name, :message, :receiver, :user_id, :img_url, :fill_primary, :fill_secondary, :id)
    end
end
