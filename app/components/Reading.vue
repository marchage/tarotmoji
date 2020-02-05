<template>
  <StackLayout>
    <Label row="0" text="My Reading" class="title med" />
    <GridLayout rows="auto,1,*" columns="*" class="card">
      <GridLayout row="0" rows="*" columns="*,*,*">
        <Label col="0" :class="tabButtonClasses('Past')" text="PAST" @tap="getCard('Past')" />
        <Label
          col="1"
          :class="tabButtonClasses('Present')"
          text="PRESENT"
          @tap="getCard('Present')"
        />
        <Label col="2" :class="tabButtonClasses('Future')" text="FUTURE" @tap="getCard('Future')" />
      </GridLayout>
      <StackLayout row="1" backgroundColor="#8089A8" style="opacity: .2"></StackLayout>
      <GridLayout row="2" rows="2*,3*,3*" class="card">
        <Label row="0" textWrap="true" class="card-title" :text="name" />
        <Image row="1" v-if="major" :class="icon" :src="emoji" />
        <StackLayout
          row="1"
          rows="*"
          columns="*,*"
          v-if="!major"
          horizontalAlignment="center"
          orientation="horizontal"
        >
          <Image style="margin:5" v-if="!major" :class="icon" :src="emoji1" />
          <Image style="margin:5" v-if="!major" :class="icon" :src="emoji2" />
        </StackLayout>
        <Label row="2" class="meaning" textWrap="true" :text="meaning" />
      </GridLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
import Tarot from "../mixins/tarot";
import { createNamespacedHelpers } from "../vuex";

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "Readings"
);

export default {
  mixins: [Tarot],
  data() {
    return {
      currentTab: "Present"
    };
  },
  computed: {
    tabButtonClasses() {
      return tab => ({
        label: true,
        selected: tab === this.currentTab
      });
    },
    ...mapGetters([
      "past",
      "present",
      "future"
    ])
  },
  methods: {
    getCard(context) {
      // @TODO rotate cards based on date (+ number of views per day?), not just checking if it is time for a random change
      // fill all 3 positions if current info is outdated or empty/default.
      if (this.howManyDaysAgo(this.timestamp) >= 1 || !Object.keys(this.present).length) {
        this.$store.dispatch("Readings/set", {
          timestamp: this.todaysDate(),
          pastPresFut: [this.getCardInstance(), this.getCardInstance(), this.getCardInstance()]
        });
      }

      this.currentTab = context;
      this.loadCardSetPropsToThis(this[context.toLowerCase()].direction, this[context.toLowerCase()].id);
    }
  },
  created() {
    // this.$store.dispatch('reset');
    this.$store.dispatch("Readings/load");
    this.getCard("Present");
  }
};
</script>

<style scoped>
.label {
  font-family: Nunito, Nunito-Sans;
  font-size: 15;
  opacity: 0.5;
  text-align: center;
  margin: 15;
}

.selected {
  color: #5326bf;
  opacity: 1;
}
</style>

