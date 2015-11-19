class SongsController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]

  def index
    @songs = Song.all
    render :json => @songs
  end


  def show
    if params[:id]
      songs = Song.find(params[:id])
    else
      songs = Song.where(tape_id: params[:tape_id]).order(id: :asc)
    end
    render :json => songs
  end

  def edit
  end

  def create
    @song = Song.create(song_params)
     songs = Song.where(tape_id: params[:tape_id])
     song = songs.last
     render :json => song
  end

  def update
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy
    render :json => song
  end

  private

    def set_song
      @songs = Song.where(tape_id = params[:id])
    end

    def song_params
      params.permit(:name, :artist, :duration, :soundcloud_id, :tape_id)
    end
end
