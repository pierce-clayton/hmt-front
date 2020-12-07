const URL = 'http://localhost:3000/'
const TIMERARRAY = []

const header = (method, body = {}) => {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

const newCountdownHandler = (e, user) => {
    e.preventDefault()
    const user_id = user.id
    const name = e.target.name.value
    const date = e.target.date.value
    fetch(`${URL}countdowns`, header('POST', {
            user_id: user_id,
            name: name,
            date: date
        }))
        .then(r => r.json())
        .then(countdown => {
            fetch(`${URL}users/${user.id}`)
                .then(r => r.json())
                .then(user => {
                    TIMERARRAY.forEach(clearInterval)
                    const list = document.getElementById('countdown-list')
                    list.innerHTML = ''
                    const cardContainer = document.getElementById('card-container')
                    cardContainer.innerHTML = ''
                    const u = new User(user)
                    u.renderUser()
                    clearForm()
                })

        })

}
const clearForm = () => {
    const form = document.getElementById('countdown-form')
    form.name.value = ""
    form.date.value = ""
}
const removeCountdown = (id) => {
    const li = document.getElementById(`li${id}`)
    li.remove()
    const card = document.getElementById(`card-elem${id}`)
    card.remove()
}
const deleteCountHandler = (e, countdown) => {
    fetch(`${URL}countdowns/${countdown.id}`, header('DELETE', {}))
        .then(() => {
            clearInterval(TIMERARRAY[countdown.id])
            removeCountdown(countdown.id)
        })
}

const editCountdownHandler = (e, countdown) => {
    const update = document.getElementById('cd-edit')
    update.removeEventListener('click', updateCountdownHandler)
    update.addEventListener('click', updateCountdownHandler)
}

const updateCountdownHandler = (e) => {
    const form = document.getElementById('countdown-form')
    const id = form.id.value
    const name = form.name.value
    const date = form.date.value
    fetch(`${URL}countdowns/${id}`, header('PATCH', {
            name: name,
            date: date
        }))
        .then(r => r.json())
        .then(cd => {
            clearForm()
            const countdown = new Countdown(cd)
            clearInterval(TIMERARRAY[countdown.id])
            removeCountdown(id)
            countdown.renderCountdown()
        })
}

const addUserHandler = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    fetch(`${URL}users`, header('POST', {
            name: name
        }))
        .then(r => r.json())
        .then(user => {
            TIMERARRAY.forEach(clearInterval)
            const form = document.getElementById('user-form')
            form.name.value = ""
            const cardContainer = document.getElementById('card-container')
            cardContainer.innerHTML = ''
            const list = document.getElementById('countdown-list')
            list.innerHTML = ''
            const u = new User(user)
            u.renderUser()
            u.showForm()
        })
}

const editUserHandler = (e) => {
    const user_id = e.target.parentNode.id.value
    const form = document.getElementById('user-form')
    const name = form.name.value
    fetch(`${URL}users/${user_id}`, header('PATCH', {
            name: name
        }))
        .then(r => r.json())
        .then(user => {
            TIMERARRAY.forEach(clearInterval)
            const cardContainer = document.getElementById('card-container')
            cardContainer.innerHTML = ''
            const form = document.getElementById('user-form')
            form.name.value = ""
            const list = document.getElementById('countdown-list')
            list.innerHTML = ''
            const u = new User(user)
            u.renderUser()
        })


}
const deleteUserHandler = (e) => {
    const user_id = e.target.parentNode.id.value
    fetch(`${URL}users/${user_id}`, header('DELETE', {}))
        .then(() => {
            TIMERARRAY.forEach(clearInterval)
            location.reload()
        })
}

const buildPage = (e) => {
    const ul = document.getElementById('countdown-list')
    ul.removeEventListener('click', editCountdownHandler)
    ul.addEventListener('click', editCountdownHandler)
    const form = document.getElementById('countdown-form')
    form.className = 'is-hidden'
    const userform = document.getElementById('user-form')
    userform.removeEventListener('submit', addUserHandler)
    userform.addEventListener('submit', addUserHandler)

}

document.addEventListener('DOMContentLoaded', buildPage)