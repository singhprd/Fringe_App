class AddHasDataBooleanToReview < ActiveRecord::Migration[5.1]
  def change
    add_column(:reviews, :has_data, :boolean)
  end
end
