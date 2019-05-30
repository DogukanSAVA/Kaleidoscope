const _colors = ['#092CEC','#092CEC','#092CEC','#092CEC','#092CEC','#092CEC','#092CEC','#092CEC','#092CEC','#092CEC','#092CEC']

Vue.component('color', {
    template: '#color-blade-template',
    props: ['color', 'index'],
    computed: {
        styles() {
            return {
                '--color': this.color,
                '--degree': this.rotateColor(this.index),
            }
        },
    },
    methods: {
        rotateColor(index) {
            return ((360 / _colors.length * index) - 270).toFixed(2) + 'deg'
        },
    },
})

let vm = new Vue({
    el: 'main',
    data: {
        colors: _colors,
        magic: true,
        position: {},
        metrics: {
            x: 29,
            y: 29,
            w: 0,
            h: 0,
        },
    },
    computed: {
        xCalc() {
            return this.metrics.x - (this.position.left + this.position.width/2)
        },
        yCalc() {
            return this.metrics.y - (this.position.top + this.position.height/2)
        },
        degree() {
            let a = Math.atan2(this.xCalc, this.yCalc) * (-180/Math.PI)

            if (a < 0) {
                a += 360
            }

            return a
        },
    },
    methods: {
        setMetrics() {
            this.position = this.$el.getBoundingClientRect()
        },
        setDimensions() {
            this.metrics.w =  document.body.clientWidth
            this.metrics.h =  document.body.clientHeight
        },
    },
    mounted() {
        this.setMetrics()
        this.setDimensions()

        window.addEventListener('resize', () => {
            this.setMetrics()
            this.setDimensions()
        }, false)

        window.addEventListener('mousemove', (event) => {
            this.setMetrics()
            this.metrics.x = event.clientX
            this.metrics.y = event.clientY
        }, false)
    },
    watch: {
        degree() {
            if (this.magic) {
                this.$el.style.setProperty('--mouse-x', Math.round((this.metrics.x / this.metrics.w) * 180))
                this.$el.style.setProperty('--mouse-y', Math.round((this.metrics.y / this.metrics.h) * 180))
            }
        }
    },
})
