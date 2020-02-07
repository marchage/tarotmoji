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
      <CardDetails
        :name="currentCard.name"
        :major="currentCard.major"
        :meaning="currentCard.meaning"
        :emoji="currentCard.emoji"
        :emoji1="currentCard.emoji1"
        :emoji2="currentCard.emoji2"
        :icon="currentCard.icon"
        :reversed="currentCard.reversed"
      />
    </GridLayout>
  </StackLayout>
</template>

<script>
import { createNamespacedHelpers } from "../vuex";
import dayjs from "../dayjs";

import Tarot from "../mixins/tarot";
import CardDetails from "./CardDetails";

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "Readings"
);

export default {
  mixins: [Tarot],
  components: {
    CardDetails
  },
  data() {
    return {
      currentTab: "Present",
      currentCard: {
        major: false,
        name: "",
        meaning: "",
        emoji: "",
        emoji1: "",
        emoji2: "",
        icon: "",
        reversed: false
      }
    };
  },
  computed: {
    tabButtonClasses() {
      return tab => ({
        label: true,
        selected: tab === this.currentTab
      });
    },
    count() {
      return this.$store.state.count;
    },
    ...mapState({
      timestamp: state => state.timestamp
    }),
    ...mapGetters(["past", "present", "future"])
  },
  methods: {
    getCard(context) {
      if (
        this.currentTab === context &&
        this.timestamp &&
        !dayjs(this.timestamp).isBefore(dayjs())
      )
        return;
      this.currentTab = context;
      const key = context.toLowerCase();

      // @TODO rotate cards based on date (+ number of views per day?), not just checking if it is time for a random change
      // fill all 3 positions if current info is outdated or empty/default.
      if (
        !this.timestamp ||
        (this.timestamp && dayjs(this.timestamp).isBefore(dayjs())) ||
        !this[key] ||
        (this[key] && !Object.keys(this[key]).length)
      ) {
        this.$store.dispatch("Readings/set", {
          timestamp: dayjs()
            .endOf("minute")
            .format(),
          pastPresFut: [
            this.getCardInstance(),
            this.getCardInstance(),
            this.getCardInstance()
          ]
        });
      }

      // this.loadCardThisProps(dayjs(this[key].timestamp), this[key].reversed, this[key].id);
      this.currentCard = this.getCardInstance(
        dayjs(this.timestamp),
        this[key].reversed,
        this[key].id
      );
    }
  },
  created() {
    // this.$store.dispatch('Readings/reset');
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

