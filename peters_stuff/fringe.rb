require 'festivals_lab'

api_key = "GycryAtJk62QvK"

secret_key = "PVaK396goH0aGmobpAg0T84m1p61awI9"

# import hmac
# import hashlib
# api_key     = '12345678'
# secret_key  = '135fa25acs33'
# query       = '/events?filter=that&key=' + api_key
# signature   = hmac.new(secret_key, query, hashlib.sha1).hexdigest()
# url         = 'http://api.edinburghfestivalcity.com' + query + '&signature=' + signature


api = FestivalsLab.new(api_key, secret_key)

    # api.events # The first page of events (using the API's default of 25 per page)

    # puts api.events(festival: 'book', size: 50, from: 100)

    # puts api.events(festival: 'fringe', post_code: 'EH1', price_to: 5)

    puts api.events(title: "'Dino Day'").count 
