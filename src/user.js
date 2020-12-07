class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.countdowns = user.countdowns
    }

    renderUser() {
        const countdownList = document.getElementById('countdown-list')
        const h3 = document.createElement('h3')
        const li = document.createElement('li')
        h3.textContent = this.name
        h3.id = 'name-card'
        countdownList.appendChild(h3)
        countdownList.appendChild(li)
        const update = document.getElementById('user-edit')
        const userDelete = document.getElementById('user-delete')
        const form = document.getElementById('user-form')
        form.id.value = this.id
        userDelete.addEventListener('click', deleteUserHandler)
        update.addEventListener('click', editUserHandler)
        if (this.countdowns.length > 0) {
            this.countdowns.forEach(c => {
                const cd = new Countdown(c)
                    // console.log(cd)
                cd.renderCountdown()
            })
        } else {
            li.textContent = 'No Counters to show'
        }
    }
    showForm() {
        const form = document.getElementById('countdown-form')
        form.className = ''
        form.addEventListener('submit', (e) => newCountdownHandler(e, this))
    }


}