import get_football_api_urls from "./get_football_api_urls";
import get_requests from "./get_requests";
import type Api_Response from "~/types/Api_Response";

const get_football_api_data = async () => {
  const urls = get_football_api_urls();
  const requests = get_requests(urls);
  const responses = await Promise.all<Api_Response>(requests);
  const combined_responses = responses
    .map((response) => response.response)
    .flat();

  return combined_responses;
};

export default get_football_api_data;
