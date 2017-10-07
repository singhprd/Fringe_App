class AddDescriptionToVenues < ActiveRecord::Migration[5.0]
  def change
		add_column(:venues, :description, :string)
  end
end
