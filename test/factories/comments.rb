# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    user nil
    event nil
    text "MyText"
    in_reply_to 1
  end
end
