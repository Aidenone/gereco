<template>
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
    transition: opacity 0.3s ease-in-out;
    top: 30px;
    left: 50%;
    transform: translate(-50%, -50%);
} .back {
    background-color: #82ff82;
} .lost {
    background-color: #ff8282;
}
.alert.hide {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
</style>
