json.array!(@songs) do |song|
  json.extract! song, :id, :name, :artist, :duration, :soundcloud_id, :tape_id_id
  json.url song_url(song, format: :json)
end
