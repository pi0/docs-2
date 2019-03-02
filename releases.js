const axios = require('axios')
const fs = require('fs')

const githubApiUrl = 'https://api.github.com/repos/sarahdayan/dinero.js/releases'

// TODO: Create one from https://github.com/settings/tokens/new without any scope but keep it SECRET (not version control)
const githubToken = process.env.GITHUB_TOKEN
if (!githubToken) {
  console.warn('WARNING: No GITHUB_TOKEN set!')
}

let data = fs.existsSync('releases.json') ? JSON.parse(fs.readFileSync('releases.json')) : { _time: -1 , releases: [{}] }

async function getReleases() {
  const now = Date.now()

  // Cache for 30 minutes
  if (now - data.time < 1000 * 60 * 30) {
    return data
  }

  const releases = await axios.get(githubApiUrl, {
    headers: {
      Authorization: githubToken ? `token ${githubToken}` : undefined
    }
  })
    .then(r => r.data)
    .catch(error => {
      console.error(`Error while fetching releases. Using old cache! (${error})`)
      return data.releases
    })

  data = {
    time: now,
    releases
  }

  // Write in background
  fs.writeFile('releases.json', JSON.stringify(data), () => { })

  return data
}

module.exports = {
  getReleases
}
