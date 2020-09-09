import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      const {
        user
      } = await firebase.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      dispatch("fetchUserProfile", user);
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await firebase.usersCollection
        .doc(user.uid)
        .get();

      commit("setUserProfile", userProfile.data());

      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async logout({ commit }) {
      await firebase.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },

    async signup({ dispatch }, form) {
      // sign user up
      const {
        user
      } = await firebase.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // 👇 Add this to your login form as the submit function
      //    login() {
      //      this.$store.dispatch("login", {
      //        email: this.loginForm.email,
      //        password: this.loginForm.password
      //      });
      //    },

      // create user profile object in userCollection
      await firebase.usersCollection.doc(user.uid).set({
        name: form.name
      });

      dispatch("fetchUserProfile", user);
    }
  }
});

export default store;
