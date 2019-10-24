<template>
  <div>
    <CardsList :items="myVotings" itemKey="_id" emptyText="Any your own votings!">
      <template #card="{item}" >
        <VotingCard
          :voting="item"
          :userId="profile.userId"
          my
          @remove="remove"/>
      </template>
    </CardsList>

    <v-dialog v-model="createVotingDialog" max-width="600">
      <CreateVoting @create="create" @cancel="createVotingDialog = false"/>
    </v-dialog>
    <v-btn class="float-button" color="primary" fab @click="createVotingDialog = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
  MY_VOTINGS,
  MY_VOTINGS_LOADING,
  GET_MY_VOTINGS,
  CREATE_VOTING,
  DELETE_VOTING
} from '../store/actions/votings';
import { PROFILE } from '../store/actions/user';

import CreateVoting from '../components/CreateVoting';
import VotingCard from '../components/VotingCard';
import CardsList from '../components/CardsList';

export default {
  name: 'MyVotings',
  components: {
    CreateVoting,
    VotingCard,
    CardsList
  },
  data: () => ({
    createVotingDialog: false
  }),
  computed: {
    ...mapGetters({
      myVotings: MY_VOTINGS,
      loading: MY_VOTINGS_LOADING,
      profile: PROFILE
    })
  },
  methods: {
    ...mapActions({
      getMyVotings: GET_MY_VOTINGS,
      createVoting: CREATE_VOTING,
      deleteVoting: DELETE_VOTING
    }),
    async create(votingData) {
      await this.createVoting(votingData);
      this.createVotingDialog = false;
    },
    async remove({ _id }) {
      await this.deleteVoting(_id);
    }
  },
  mounted() {
    this.getMyVotings();
  }
};
</script>
