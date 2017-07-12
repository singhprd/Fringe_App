desc "Replenish all Users Votes"
task :replenish_votes => :environment do
  User.replenish_votes
end