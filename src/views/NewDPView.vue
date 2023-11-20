<template>
  <div class="NewDP">
	<NewDP msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewDP from '@/components/NewDP.vue'

export default {
  name: 'NewDPView',
  components: {
    NewDP
  }
}
</script>
