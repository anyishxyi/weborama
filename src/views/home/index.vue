<template>
	<div class="home-page">
		<div class="title"></div>
		<el-input
			class="input"
			placeholder="Veuillez entrez un nom utilisateur..."
			v-model="username"
			clearable>
		</el-input>
		<el-button type="primary" icon="el-icon-edit" @click="getUserData"></el-button>
    <UserData
      :visibility="showLoginPage"
      @eventToggleLoginVisibility="toggleLoginVisibility"
    />
	</div>
</template>

<script>
import UserData from '@/components/UserData/index'

export default {
	components: { UserData },
  data() {
    return {
      username: '',
			userData: {},
			showLoginPage: false
    }
  },
	methods: {
		//get user data from github
		getUserData() {
			// console.log('this.username', this.username)
			if(!this.username) return
      this.$store.dispatch('getUserData', this.username)
                  .then((res) => {
										this.userData = res.data
										this.showLoginPage = true
									})
                  .catch(() => this.$notify.error({title: 'Error', message: "Erreur lors de la création d'évènement"}))
    }
	}
}
</script>

<style  lang="scss">
  .home-page {
		cursor: pointer;
		.title {
			.input {

			}
		}
  }
</style>