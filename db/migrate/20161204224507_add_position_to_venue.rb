class AddPositionToVenue < ActiveRecord::Migration[5.0]
  def change
		add_column(:venues, :position, :string)
		add_column(:venues, :description, :string)
  end
end
