class Api::GlasswareController < ApplicationController
  # brewery_db.glassware.all

  def all
    send_response(brew_client.glassware.all(p: @page))
  end
end
