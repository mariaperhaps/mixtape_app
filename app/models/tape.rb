class Tape < ActiveRecord::Base
  has_many :songs
  belongs_to :user

  def self.search(search)
     where({name: search})
  end

  def self.search_occurances(search)
    tapes = all
    hash = tapes.each_with_object(Hash.new(0)) { |tape, counts| counts[tape.name] = tape.message.scan(/#{Regexp.quote(search)}/).length }
    answer = hash.max_by{ |key,value| value }
    find_by(name: answer[0])
  end

  def has_name?
    if self.name
      true
    end
  end


end
