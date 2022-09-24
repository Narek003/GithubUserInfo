let url = 'https://api.github.com/users/Narek003'

async function showCart(){
    const promise = await fetch(url)
    const json = await promise.json()
    const user = document.createElement('div')
    const userInfo = document.createElement('div')
    const userAvatar = document.createElement('div')
    const userNameAndCreateData = document.createElement('div')
    const userFolows = document.createElement('div')
    user.className = 'user'
    userInfo.className = 'userInfo'
    userAvatar.className = 'userAvatar'
    userNameAndCreateData.className = 'userNameAndCreateData'
    userFolows.className = 'userFolows'

    // Avatar Part

    const avatarImg = document.createElement('img')
    avatarImg.src = json.avatar_url
    userAvatar.append(avatarImg)

    /************************************************ */

    // Name & accaunt created data part

    const userName = document.createElement('a')
    const CreatedData = document.createElement('p')
    userName.href = json.html_url
    userName.append(json.name ?? json.login)
    CreatedData.append(`Created at: ${json.created_at.slice(8, 10)}.${json.created_at.slice(5, 7)}.${json.created_at.slice(0, 4)}`)
    userNameAndCreateData.append(userName)
    userNameAndCreateData.append(CreatedData)

    /************************************************ */

    // Followers & follows part

    const userFolowers = document.createElement('p')
    const userFolowing = document.createElement('p')
    userFolowers.append(`Followers: ${json.followers}`)
    userFolowing.append(`Following: ${json.following}`)
    userFolows.append(userFolowers)
    userFolows.append(userFolowing)

    /************************************************ */

    // Repository part

    const repositoryPart = document.createElement('div')
    repositoryPart.className = 'repositoryPart'
    const tittle = document.createElement('h1')
    tittle.append('Repositories')
    repositoryPart.append(tittle)

    const repositories = await fetch(json.repos_url)
    let reposJson = await repositories.json()
    reposJson = reposJson.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const table = document.createElement('table')
    table.innerHTML = `
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th class = 'tableDate'>Created</th>
            </tr>
        </thead>
    `
    const tbody = document.createElement('tbody')
    reposJson.forEach((repos, indx) => {
        tbody.innerHTML += `
            <tr>
                <td>${indx + 1}</td>
                <td><a href = '${repos.html_url}'>${repos.name}</a></td>
                <td>${repos.created_at.slice(8, 10)}.${repos.created_at.slice(5, 7)}.${repos.created_at.slice(0, 4)}</td>
            </tr>
        `
    })
    table.append(tbody)
    repositoryPart.append(table)

    /************************************************ */

    userInfo.append(userAvatar)
    userInfo.append(userNameAndCreateData)
    userInfo.append(userFolows)
    user.append(userInfo)
    user.append(repositoryPart)

    document.body.append(user)
}
showCart()