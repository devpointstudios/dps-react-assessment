class Api::BreweriesController < ApplicationController
  # brewery_db.breweries.all(established: 2006)
  # brewery_db.breweries.find('d1zSa7')
  # brewery_db.brewery('d1zSa7').beers

  def all
    send_response(brew_client.breweries.all(p: @page))
  end

  def by_name
    send_response(brew_client.breweries.all(name: params[:name], p: @page))
  end
end
