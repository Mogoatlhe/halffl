const get_requests = (urls: string[]) => {
  const max_requests_per_second = 864; // seconds in a day / allowed requests per day ( 86400 / 100 )
  const max_batch_requests_per_second = max_requests_per_second * urls.length;

  return urls.map((url) =>
    fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.FOOTBALL_API_KEY as string,
      },
      next: {
        revalidate: max_batch_requests_per_second,
      },
    }).then((response) => response.json())
  );
};

export default get_requests;
