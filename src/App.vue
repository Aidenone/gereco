<script>

export default {
    name: 'App',
    data() {
        return {
            showConnLost: false,
            showConnBack: false,
            alertMessage: '',
            onLine: navigator.onLine,
            showBackOnline: false,
        };
    },
    methods: {
        updateOnlineStatus() {
            this.onLine = navigator.onLine;
            if (!this.onLine) {
                this.showTemporaryAlert('Connexion Internet perdue !', 'lost');
            }
        },
        showTemporaryAlert(message, status) {
            this.alertMessage = message;
            if(status == 'lost') {
                this.showConnLost = true;
            }
            if(status == 'back') {
                this.showConnBack = true;
                this.showConnLost = false;
                setTimeout(() => {
                    this.showConnBack = false;
                }, 3000);
            }
        }
    },
    watch: {
        onLine(val) {
            if (val) {
                this.showBackOnline = true;
                setTimeout(() => {
                    this.showBackOnline = false;
                    this.showTemporaryAlert('Connexion Internet rétablie !', 'back');
                }, 1000);
            }
        }
    },
    async mounted () {
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    beforeUnmount() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    }
};

</script>

<template>
  <div v-bind:class = "showConnLost ? '':'hide'" class="alert lost">{{ alertMessage }}</div>
  <div v-bind:class = "showConnBack ? '':'hide'" class="alert back">{{ alertMessage }}</div>
<!--   <nav>
    <router-link to="/">Home</router-link>
  </nav> -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
}

/* style message connexion */
.alert {
    padding: 10px; 
    width: 95%;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 10px;
    position: fixed;
    z-index: 9999;
    opacity: 1;
    /*transition: opacity 0.3s ease-in-out;*/
    top: 30px;
    left: 50%;
    transform: translate(-50%, -50%);
} .back {
    background-color: #82ff82;
} .lost {
    background-color: #ff8282;
}
.alert.hide {
  display: none;
  /*transition: opacity 0.3s ease-in-out;*/
}
</style>
