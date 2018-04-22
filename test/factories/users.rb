FactoryBot.define do
  factory :user do
    email Faker::Internet.email
    username Faker::LordOfTheRings.character
    password 'password'
  end
end
