<template>
  <StackLayout>
    <Label row="0" text="My Reading" class="title med" />
    <GridLayout rows="auto,1,*" columns="*" class="card">
      <GridLayout row="0" rows="*" columns="*,*,*">
        <Label col="0" :class="tabButtonClasses('Past')" text="PAST" @tap="getCardDetails('Past')" />
        <Label
          col="1"
          :class="tabButtonClasses('Present')"
          text="PRESENT"
          @tap="getCardDetails('Present')"
        />
        <Label
          col="2"
          :class="tabButtonClasses('Future')"
          text="FUTURE"
          @tap="getCardDetails('Future')"
        />
      </GridLayout>
      <StackLayout row="1" backgroundColor="#8089A8" style="opacity: .2"></StackLayout>
      <CardDetails
        :name="pastPresFut[idx].name || ''"
        :major="pastPresFut[idx].major || false"
        :meaning="pastPresFut[idx].meaning || ''"
        :emoji="pastPresFut[idx].emoji || ''"
        :emoji1="pastPresFut[idx].emoji1 || ''"
        :emoji2="pastPresFut[idx].emoji2 || ''"
        :icon="pastPresFut[idx].icon || ''"
        :reversed="pastPresFut[idx].reversed || false"
      />
    </GridLayout>
  </StackLayout>
</template>

<script>
import { createNamespacedHelpers } from "../vuex";
import dayjs from "../dayjs";

import Tarot from "../mixins/tarot";
import CardDetails from "./CardDetails";

const { mapState, mapGetters } = createNamespacedHelpers("Readings");

export default {
  mixins: [Tarot],
  components: {
    CardDetails
  },
  data() {
    return {
      currentTab: "Present",
    };
  },
  computed: {
    tabButtonClasses() {
      return tab => ({
        label: true,
        selected: tab === this.currentTab
      });
    },
    idx() {
      return ['Past','Present', 'Future'].indexOf(this.currentTab);
    },
    ...mapState(["pastPresFut", "timestamp"]),
    ...mapGetters(["past", "present", "future"])
  },
  methods: {
    getCardDetails(context) {
      const now = dayjs();
      if (
        this.currentTab === context &&
        this.timestamp &&
        !dayjs(this.timestamp).isBefore(now)
      )
        return;
      this.currentTab = context;
      const key = context.toLowerCase();

      // @TODO rotate cards based on date (+ number of views per day?), not just checking if it is time for a random change
      // fill all 3 positions if current info is outdated or empty/default.
      if (
        !this.timestamp ||
        (this.timestamp && dayjs(this.timestamp).isBefore(now)) ||
        !this[key] ||
        (this[key] && !Object.keys(this[key]).length)
      ) {
        this.$store.dispatch("Readings/set", {
          timestamp: now.endOf("minute").format(),
          pastPresFut: [
            // card timestamps get ignored in reading
            this.getCardInstance(),
            this.getCardInstance(),
            this.getCardInstance()
          ]
        });
      }
    }
  },
  created() {
    // this.$store.dispatch('Readings/reset');
    this.$store.dispatch("Readings/load");
    this.getCardDetails("Present");
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

