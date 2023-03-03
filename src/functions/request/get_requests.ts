const get_requests = (urls: string[]) => {
  return urls.map((url) =>
    fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.FOOTBALL_API_KEY as string,
      },
    }).then((response) => response.json())
  );
};

export default get_requests;
