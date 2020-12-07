class Countdown {
    constructor(countdown) {
        this.id = countdown.id;
        this.name = countdown.name;
        this.date = countdown.date;
        this.user_id = countdown.user_id
    }

    renderCountdown() {
        const cardContainer = document.getElementById('card-container')
        const card = document.createElement('div')
        card.className = 'card'
        card.id = 'card-elem' + this.id
        const cardHeader = document.createElement('header')
        cardHeader.className = 'card-header'
        const headerTitle = document.createElement('p')
        headerTitle.className = 'card-header-title'
        headerTitle.textContent = this.name
        cardHeader.appendChild(headerTitle)
        const cardContent = document.createElement('div')
        cardContent.className = 'card-content'
        cardContent.id = 'card' + this.id
        card.appendChild(cardHeader)
        card.appendChild(cardContent)
        cardContainer.appendChild(card)
        TIMERARRAY[this.id] = setInterval(() => this.calculateDate(), 1000)
            // card above, list item below
            // -----------------------------------------------------------
        const countdownList = document.getElementById('countdown-list')
        const li = document.createElement('li')
        const a = document.createElement('a')
        const btn = document.createElement('button')
        li.id = 'li' + this.id
        btn.textContent = 'Delete'
        btn.addEventListener('click', (e) => deleteCountHandler(e, this))
        a.id = 'a' + this.id
        a.addEventListener('click', () => {
            const form = document.getElementById('countdown-form')
            form.name.value = this.name
            form.date.value = this.date
            form.id.value = this.id
        })
        li.appendChild(a)
        li.appendChild(btn)
        countdownList.appendChild(li)
        a.textContent = `${this.name}, ${this.date}`


    }

    calculateDate() {
        const card = document.getElementById(`card${this.id}`)
        const today = new Date()
        const countdownDate = new Date(this.date)
        let totalSeconds = Math.abs((countdownDate.getTime() - today.getTime()) / 1000)
        const days = Math.floor(totalSeconds / 86400)
        totalSeconds %= 86400
        const hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = parseInt(totalSeconds % 60)
        let retArr = []
        if (days) {
            retArr.push(days + 'D')
        }
        if (hours) {
            retArr.push(hours + 'H')
        }
        if (minutes) {
            retArr.push(minutes + 'M')
        }
        retArr.push(seconds + 'S')

        card.textContent = retArr.join(', ')



    }



}