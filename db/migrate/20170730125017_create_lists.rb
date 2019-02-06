# frozen_string_literal: true

class CreateLists < ActiveRecord::Migration[5.1]
  def change
    create_table :lists do |t|
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
