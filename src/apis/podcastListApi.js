export const podcastListApi = {
    get: async () => {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`)
      if (response.ok) {
        console.error('Network response was not ok.')
      }
      const {feed: {entry}} = JSON.parse(((await response.json()).contents));
      return entry;
    }
  }