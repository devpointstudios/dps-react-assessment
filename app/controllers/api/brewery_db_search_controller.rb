class Api::BreweryDbSearchController < ApplicationController
  # brewery_db.search.all(q: 'IPA')
  # brewery_db.search.beers(q: 'IPA')
  # brewery_db.search.breweries(q: 'IPA')

  def all
    send_response(brew_client.search.all(q: params[:query], p: @page))
  end

  def beers
    send_response(brew_client.search.beers(q: params[:query], p: @page))
  end

  def breweries
    send_response(brew_client.search.breweries(q: params[:query], p: @page))
  end
end
