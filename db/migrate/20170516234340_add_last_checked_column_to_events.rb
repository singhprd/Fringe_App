class AddLastCheckedColumnToEvents < ActiveRecord::Migration[5.0]
  def change
	add_column(:events, :last_checked_for_update, :string)
  end
end
