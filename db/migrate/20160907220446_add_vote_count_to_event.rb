class AddVoteCountToEvent < ActiveRecord::Migration[5.0]
  def change
  	add_column :events, :vote_count, :string
  end
end
