class ApplicationController < ActionController::API
  before_action :set_page

  protected
  def send_response(api_response)
    if api_response.is_a?(BreweryDB::PaginatedCollection) || api_response.is_a?(BreweryDB::Collection)
      if(api_response.count > 0)
        page = params[:page] ? params[:page].to_i : 1
        per_page = params[:per_page] ? params[:per_page].to_i : BreweryDB::PaginatedCollection::BATCH_SIZE
        paged_response = WillPaginate::Collection.create(page, per_page, api_response.count) do |pager|
          pager.replace api_response.take(per_page)
        end
        render json: {
                       total_entries: paged_response.total_entries,
                       per_page: paged_response.per_page,
                       page: paged_response.current_page,
                       total_pages: paged_response.total_pages,
                       entries: paged_response
                     }
      else
        render json: { message: 'No Results' }, status: :not_found
      end
    elsif api_response.is_a?(Hash)
      render json: api_response
    end
  end

  def brew_client
    @brewery_db ||= BreweryDB::Client.new do |config|
      config.logger = Rails.logger
      config.api_key = ENV['BREWERYDB_API_KEY']
    end
  end

  def set_page
    @page = params[:page] || 1
  end
end
