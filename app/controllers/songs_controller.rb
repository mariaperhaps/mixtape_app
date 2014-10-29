class SongsController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]

  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.all
    render :json => @songs
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
    @songs = Song.where(tape_id: params[:tape_id])
    render :json => @songs
  end

  # GET /songs/new
  def new
    @song = Song.new
  end

  # GET /songs/1/edit
  def edit
  end

  # POST /songs
  # POST /songs.json
  def create
    @song = Song.create(song_params)
     songs = Song.where(tape_id: params[:tape_id])
     song = songs.last
     render :json => song
  end

  # PATCH/PUT /songs/1
  # PATCH/PUT /songs/1.json
  def update
    respond_to do |format|
      if @song.update(song_params)
        format.html { redirect_to @song, notice: 'Song was successfully updated.' }
        format.json { render :show, status: :ok, location: @song }
      else
        format.html { render :edit }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /songs/1
  # DELETE /songs/1.json
  def destroy
    song = Song.find(params[:id])
    song.destroy
    respond_to do |format|
      format.html { redirect_to songs_url, notice: 'Song was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_song
      @songs = Song.where(tape_id = params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def song_params
      params.permit(:name, :artist, :duration, :soundcloud_id, :tape_id)
    end
end
