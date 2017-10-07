class PopulateSearchModel < ActiveRecord::Migration[5.1]
  create_join_table :searches, :events
end
