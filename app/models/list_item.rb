# frozen_string_literal: true

class ListItem < ApplicationRecord
  belongs_to :list
  acts_as_list scope: :list
  belongs_to :event
  validates :event, presence: true
  validates :list, presence: true
  validates_uniqueness_of :event, scope: :list

  def self.swap_positions(list_id, position1, position2)
    list = List.find(list_id)

    puts list.list_items.sort(&:position).map(&:position)

    list_item1 = list.list_items.select { |li| li.position == position1 }.first
    list_item2 = list.list_items.select { |li| li.position == position2 }.first
    # raise "List Items not from same list" if (list_item1.list != list_item2.list)

    pos1 = list_item1.position
    pos2 = list_item2.position

    ActiveRecord::Base.transaction do
      list_item1.position = pos2
      list_item2.position = pos1

      list_item1.save!
      list_item2.save!
    end
  end
end
