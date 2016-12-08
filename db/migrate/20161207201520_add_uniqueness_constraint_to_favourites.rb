class AddUniquenessConstraintToFavourites < ActiveRecord::Migration[5.0]
  def change
  	add_index :favourites, [:user_id, :event_id], unique: true
  end
end
