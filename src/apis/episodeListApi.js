export const episodeListApi = {
    get: async (podcastId) => {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }
      const {results} = JSON.parse(((await response.json()).contents));
      return results;
    }
  }