Rails.application.routes.draw do
  namespace :api do
    # Beers
    get 'all_beers', to: 'beers#all'
    get 'beer/:name', to: 'beers#by_name'
    get 'random_beer', to: 'beers#random'

    # Breweries
    get 'all_breweries', to: 'breweries#all'
    get 'brewery/:name', to: 'breweries#by_name'

    # Search
    get 'search_all', to: 'brewery_db_search#all'
    get 'search_beers', to: 'brewery_db_search#beers'
    get 'search_breweries', to: 'brewery_db_search#breweries'

    # Glassware
    get 'all_glassware', to: 'glassware#all'

    # Locations
    get 'all_locations', to: 'locations#all'
    get 'locations/:city', to: 'locations#by_city'

    # Assignment Details Markdown
    get 'assignment_details', to: 'assignment_details#show'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
