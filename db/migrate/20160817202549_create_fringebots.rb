class CreateFringebots < ActiveRecord::Migration[5.0]
  def change
    create_table :fringebots do |t|

      t.timestamps
    end
  end
end
